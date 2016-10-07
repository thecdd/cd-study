require('./main.css');
var Vue = require("vue");
var VueStrap = require('vue-strap');
var L = require('leaflet');
require('leaflet-draw');
require('leaflet-draw/dist/leaflet.draw.css');


Vue.config.delimiters = ['${', '}'];
L.Icon.Default.imagePath = '/static/leaflet/images'

var app = new Vue({
    el: '#app',
    data:{
        message:'this is page'
    },
    map: null,
    ready:function(){
        var me = this;
        var osm =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        me.map = L.map('main-map',{
            layers: [osm]
        }).setView(new L.LatLng(0,0), true);
        // Initialise the FeatureGroup to store editable layers
        var drawnItems = new L.FeatureGroup();
        me.map.addLayer(drawnItems);

        // Initialise the draw control and pass it the FeatureGroup of editable layers
        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        me.map.addControl(drawControl);

        me.map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                // Do marker specific actions
            }

            // Do whatever else you need to. (save to db, add to map etc)
            me.map.addLayer(layer);
        });

        me.map.on('draw:edited', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                //do whatever you want, most likely save back to db
            });
        });
    }
})