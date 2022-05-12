"use strict";
exports.__esModule = true;
exports.extractFederationResolvers = void 0;
function extractFederationResolverForType(type) {
    if (type.resolveReference) {
        return { __resolveReference: type.resolveReference };
    }
}
function extractFederationResolvers(schema) {
    var map = {};
    for (var _i = 0, _a = Object.entries(schema.getTypeMap()); _i < _a.length; _i++) {
        var _b = _a[_i], typeName = _b[0], type = _b[1];
        var resolvers = extractFederationResolverForType(type);
        if (resolvers) {
            map[typeName] = resolvers;
        }
    }
    return map;
}
exports.extractFederationResolvers = extractFederationResolvers;
