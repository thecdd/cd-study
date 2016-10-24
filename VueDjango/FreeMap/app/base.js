var L = require('leaflet');
require('leaflet-draw/dist/leaflet.draw.css');
require('leaflet-draw');
require('./plugin/leaflet/leaflet-mouse-position.js');
L.Icon.Default.imagePath = '/static/leaflet/images/'

var Vue = require("vue");
var VueStrap = require('vue-strap');
var uuid = require('uuid');
var objectHelper = require('./helper/objectHelper.js');

module.exports = {
    L: L,
    Vue: Vue,
    VueStrap: VueStrap,
    uuid: uuid,
    objectHelper: objectHelper
}


