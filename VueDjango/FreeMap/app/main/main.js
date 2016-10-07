require('./main.css');
require('leaflet-draw/dist/leaflet.draw.css');
var L = require('leaflet');
require('leaflet-draw');

var Vue = require("vue");
var VueStrap = require('vue-strap');


Vue.config.delimiters = ['${', '}'];
L.Icon.Default.imagePath = '/static/leaflet/images/'

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
        var editableLayers = new L.FeatureGroup();
        me.map.addLayer(editableLayers);

        var options = {
            position: 'topright',
            draw: {
                polyline: {
                    shapeOptions: {
                        color: '#f357a1',
                        weight: 10
                    }
                },
                polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#e1e100', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#bada55'
                    }
                },
                circle: true,
                rectangle: {
                    shapeOptions: {
                        clickable: false
                    }
                },
                marker: true
            },
            edit: {
                featureGroup: editableLayers,
                remove: true
            }
        };

        var drawControl = new L.Control.Draw(options);
        me.map.addControl(drawControl);

        me.map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }

            editableLayers.addLayer(layer);
        });
    }
})