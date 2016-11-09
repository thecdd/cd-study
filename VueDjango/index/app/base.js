var Vue = require("vue");
var VueStrap = require('vue-strap');
var VueResource = require('vue-resource');
var crossfilter = require('crossfilter')
var d3 = require('d3')
var dc = require('dc');
var uuid = require('uuid');
var moment = require('moment');
var objectHelper = require('./helper/objectHelper.js');

require('dc/dc.min.css');
Vue.use(VueResource);

var csrftoken = objectHelper.getCookie('csrftoken');
Vue.http.headers.common['X-CSRFToken'] = csrftoken;

module.exports = {
    Vue: Vue,
    VueStrap: VueStrap,
    uuid: uuid,
    objectHelper: objectHelper,
    d3:d3,
    dc:dc,
    crossfilter: crossfilter,
    moment: moment
}


