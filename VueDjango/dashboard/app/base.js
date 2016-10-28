var Vue = require("vue");
var VueStrap = require('vue-strap');
var crossfilter = require('crossfilter')
var d3 = require('d3')
var dc = require('dc');
var uuid = require('uuid');
var objectHelper = require('./helper/objectHelper.js');

require('dc/dc.min.css');

module.exports = {
    Vue: Vue,
    VueStrap: VueStrap,
    uuid: uuid,
    objectHelper: objectHelper,
    d3:d3,
    dc:dc,
    crossfilter:crossfilter
}


