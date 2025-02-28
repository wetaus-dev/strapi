import {
  GraphQLSchema,
  isObjectType,
  isUnionType,
  GraphQLUnionType,
  GraphQLObjectType,
} from 'graphql';
import {
  transformSchema,
  addResolversToSchema,
  GraphQLResolverMap,
} from 'apollo-graphql';
import { serviceField, entitiesField, EntityType } from './types';
import {typeIncludesDirective} from "@apollo/federation/dist/directives";
import {printSchema} from "@apollo/federation";

export function transformFederatedSchema(
    schema: GraphQLSchema,
    resolvers: GraphQLResolverMap<any>[] = [],
): GraphQLSchema {
  // At this point in time, we have a schema to be printed into SDL which is
  // representative of what the user defined for their schema. This is before
  // we process any of the federation directives and add custom federation types
  // so its the right place to create our service definition sdl.
  //
  // We have to use a modified printSchema from graphql-js which includes
  // support for preserving the *uses* of federation directives while removing
  // their *definitions* from the sdl.
  const sdl = printSchema(schema);

  // Add an empty query root type if none has been defined
  if (!schema.getQueryType()) {
    schema = new GraphQLSchema({
      ...schema.toConfig(),
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {},
      }),
    });
  }

  const entityTypes = Object.values(schema.getTypeMap()).filter(
      type => isObjectType(type) && typeIncludesDirective(type, 'key'),
  );
  const hasEntities = entityTypes.length > 0;

  schema = transformSchema(schema, type => {
    // Add `_entities` and `_service` fields to query root type
    if (isObjectType(type) && type === schema.getQueryType()) {
      const config = type.toConfig();
      return new GraphQLObjectType({
        ...config,
        fields: {
          ...(hasEntities && { _entities: entitiesField }),
          _service: {
            ...serviceField,
            resolve: () => ({ sdl }),
          },
          ...config.fields,
        },
      });
    }

    return undefined;
  });

  schema = transformSchema(schema, type => {
    if (hasEntities && isUnionType(type) && type.name === EntityType.name) {
      return new GraphQLUnionType({
        ...EntityType.toConfig(),
        types: entityTypes.filter(isObjectType),
      });
    }
    return undefined;
  });

  resolvers.forEach(resolver => addResolversToSchema(schema, resolver));

  return schema;
}