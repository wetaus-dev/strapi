"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.buildFederatedSchema = void 0;
var graphql_1 = require("graphql");
var apollo_graphql_1 = require("apollo-graphql");
require("apollo-server-env");
var transformFederatedSchema_1 = require("./transformFederatedSchema");
var extractFederationResolvers_1 = require("./extractFederationResolvers");
var directives_1 = require("@apollo/federation/dist/directives");
function buildFederatedSchema(modulesOrSDLOrSchema) {
    // Extract federation specific resolvers from already constructed
    // GraphQLSchema and transform it to a federated schema.
    if (modulesOrSDLOrSchema instanceof graphql_1.GraphQLSchema) {
        return (0, transformFederatedSchema_1.transformFederatedSchema)(modulesOrSDLOrSchema, [
            (0, extractFederationResolvers_1.extractFederationResolvers)(modulesOrSDLOrSchema),
        ]);
    }
    // Transform *modules* or *sdl* into a federated schema.
    var modules = (0, apollo_graphql_1.modulesFromSDL)(modulesOrSDLOrSchema);
    var resolvers = modules
        .filter(function (module) { return !!module.resolvers; })
        .map(function (module) { return module.resolvers; });
    return (0, transformFederatedSchema_1.transformFederatedSchema)((0, apollo_graphql_1.buildSchemaFromSDL)(modules, new graphql_1.GraphQLSchema({
        query: undefined,
        directives: __spreadArray(__spreadArray([], graphql_1.specifiedDirectives, true), directives_1["default"], true)
    })), resolvers);
}
exports.buildFederatedSchema = buildFederatedSchema;
