"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.transformFederatedSchema = void 0;
var graphql_1 = require("graphql");
var apollo_graphql_1 = require("apollo-graphql");
var types_1 = require("./types");
var directives_1 = require("@apollo/federation/dist/directives");
var federation_1 = require("@apollo/federation");
function transformFederatedSchema(schema, resolvers) {
    if (resolvers === void 0) { resolvers = []; }
    // At this point in time, we have a schema to be printed into SDL which is
    // representative of what the user defined for their schema. This is before
    // we process any of the federation directives and add custom federation types
    // so its the right place to create our service definition sdl.
    //
    // We have to use a modified printSchema from graphql-js which includes
    // support for preserving the *uses* of federation directives while removing
    // their *definitions* from the sdl.
    var sdl = (0, federation_1.printSchema)(schema);
    // Add an empty query root type if none has been defined
    if (!schema.getQueryType()) {
        schema = new graphql_1.GraphQLSchema(__assign(__assign({}, schema.toConfig()), { query: new graphql_1.GraphQLObjectType({
                name: 'Query',
                fields: {}
            }) }));
    }
    var entityTypes = Object.values(schema.getTypeMap()).filter(function (type) { return (0, graphql_1.isObjectType)(type) && (0, directives_1.typeIncludesDirective)(type, 'key'); });
    var hasEntities = entityTypes.length > 0;
    schema = (0, apollo_graphql_1.transformSchema)(schema, function (type) {
        // Add `_entities` and `_service` fields to query root type
        if ((0, graphql_1.isObjectType)(type) && type === schema.getQueryType()) {
            var config = type.toConfig();
            return new graphql_1.GraphQLObjectType(__assign(__assign({}, config), { fields: __assign(__assign(__assign({}, (hasEntities && { _entities: types_1.entitiesField })), { _service: __assign(__assign({}, types_1.serviceField), { resolve: function () { return ({ sdl: sdl }); } }) }), config.fields) }));
        }
        return undefined;
    });
    schema = (0, apollo_graphql_1.transformSchema)(schema, function (type) {
        if (hasEntities && (0, graphql_1.isUnionType)(type) && type.name === types_1.EntityType.name) {
            return new graphql_1.GraphQLUnionType(__assign(__assign({}, types_1.EntityType.toConfig()), { types: entityTypes.filter(graphql_1.isObjectType) }));
        }
        return undefined;
    });
    resolvers.forEach(function (resolver) { return (0, apollo_graphql_1.addResolversToSchema)(schema, resolver); });
    return schema;
}
exports.transformFederatedSchema = transformFederatedSchema;
