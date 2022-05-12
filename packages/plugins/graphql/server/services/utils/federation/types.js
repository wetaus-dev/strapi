"use strict";
exports.__esModule = true;
exports.isFederationType = exports.federationTypes = exports.serviceField = exports.entitiesField = exports.AnyType = exports.ServiceType = exports.EntityType = void 0;
var graphql_1 = require("graphql");
exports.EntityType = new graphql_1.GraphQLUnionType({
    name: '_Entity',
    types: []
});
exports.ServiceType = new graphql_1.GraphQLObjectType({
    name: '_Service',
    fields: {
        sdl: {
            type: graphql_1.GraphQLString,
            description: 'The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied'
        }
    }
});
exports.AnyType = new graphql_1.GraphQLScalarType({
    name: '_Any',
    serialize: function (value) {
        return value;
    }
});
// FIXME: move to apollo-env
function isPromise(value) {
    // @ts-ignore
    return Boolean(value && 'then' in value && typeof value.then === 'function');
}
function addTypeNameToPossibleReturn(maybeObject, typename) {
    if (maybeObject !== null && typeof maybeObject === 'object') {
        Object.defineProperty(maybeObject, '__typename', {
            value: typename
        });
    }
    return maybeObject;
}
exports.entitiesField = {
    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.EntityType)),
    args: {
        representations: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(exports.AnyType)))
        }
    },
    description: '',
    resolve: function (_source, _a, context, info) {
        var representations = _a.representations;
        return representations.map(function (reference) {
            var __typename = reference.__typename;
            var type = info.schema.getType(__typename);
            if (!type || !(0, graphql_1.isObjectType)(type)) {
                throw new Error("The _entities resolver tried to load an entity for type \"".concat(__typename, "\", but no object type of that name was found in the schema"));
            }
            function defaultResolveReference() {
                return reference;
            }
            var resolveReference = type.resolveReference ||
                defaultResolveReference;
            // FIXME somehow get this to show up special in Engine traces?
            var result = resolveReference(reference, context, info);
            if (isPromise(result)) {
                return result.then(function (x) {
                    return addTypeNameToPossibleReturn(x, __typename);
                });
            }
            return addTypeNameToPossibleReturn(result, __typename);
        });
    }
};
exports.serviceField = {
    type: new graphql_1.GraphQLNonNull(exports.ServiceType)
};
exports.federationTypes = [
    exports.ServiceType,
    exports.AnyType,
    exports.EntityType,
];
function isFederationType(type) {
    return ((0, graphql_1.isNamedType)(type) && exports.federationTypes.some(function (_a) {
        var name = _a.name;
        return name === type.name;
    }));
}
exports.isFederationType = isFederationType;
