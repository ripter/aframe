/**
 * Automated mesh primitive registration.
 */
var getMeshMixin = require('../getMeshMixin');
var geometries = require('../../../core/geometry').geometries;
var geometryNames = require('../../../core/geometry').geometryNames;
var registerPrimitive = require('../primitives').registerPrimitive;
var utils = require('../../../utils/');

// For testing.
var meshPrimitives = {};
// var meshPrimitives = module.exports = {};

// Generate primitive for each geometry type.
geometryNames.forEach(function registerMeshPrimitive (geometryName) {
  var geometry = geometries[geometryName];
  var geometryHyphened = unCamelCase(geometryName);

  // Generate mappings.
  var mappings = {};
  Object.keys(geometry.schema).forEach(function createMapping (property) {
    mappings[unCamelCase(property)] = 'geometry.' + property;
  });

  // Register.
  var tagName = 'a-' + geometryHyphened;
  console.log('%cCreating primitive', 'background-color: #7FDBFF;', tagName, utils.extendDeep({}, getMeshMixin(), {
    defaultComponents: {geometry: {primitive: geometryName}},
    mappings: mappings
  }));
  var primitive = registerPrimitive(tagName, utils.extendDeep({}, getMeshMixin(), {
    defaultComponents: {geometry: {primitive: geometryName}},
    mappings: mappings
  }));
  console.log('%cCreated', 'background-color: #0074D9;', tagName, primitive);
  meshPrimitives[tagName] = primitive;
});
console.log('meshPrimitives', meshPrimitives);
module.exports = meshPrimitives;

/**
 * camelCase to hyphened-string.
 */
function unCamelCase (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
