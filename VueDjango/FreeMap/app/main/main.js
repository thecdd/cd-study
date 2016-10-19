require('./main.css');
require('leaflet-draw/dist/leaflet.draw.css');
var L = require('leaflet');
require('leaflet-draw');
require('../plugin/leaflet/leaflet-mouse-position.js');


var Vue = require("vue");
var VueStrap = require('vue-strap');
require('./component/pathOptionPanel.js');
require('./component/markOptionPanel.js');

L.Icon.Default.imagePath = '/static/leaflet/images/'

var app = new Vue({
    el: '#app',
    component:['path-option-panel',''],
    components:{
        alert: VueStrap.alert
    },
    data:{
        alert:{
            showAlert:false,
            alertTitle:'',
            alertContext:''
        },
        drawerOptions:{
            polyline: {
                allowIntersection: true,
                guidelineDistance: 20,
                metric: true,
                zIndexOffset: 2000,
                shapeOptions: {
                    stroke: true,
                    color: '#03f',
                    weight: 5,
                    opacity: 0.5,
                    fill: true,
                    fillColor: '#03f',
                    fillRule: 'evenodd',
                    fillOpacity: 0.5,
                    className: '',
                    smoothFactor: 1.0,
                    noClip: false
                }
            },
            polygon: {
                showArea: false,
                allowIntersection: true,
                guidelineDistance: 20,
                metric: true,
                zIndexOffset: 2000,
                shapeOptions: {
                    stroke: true,
                    color: '#03f',
                    weight: 5,
                    opacity: 0.5,
                    fill: true,
                    fillColor: '#03f',
                    fillRule: 'evenodd',
                    fillOpacity: 0.5,
                    className: '',
                    smoothFactor: 1.0,
                    noClip: false
                }
            },
            rectangle: {
                shapeOptions: {
                    stroke: true,
                    color: '#03f',
                    weight: 5,
                    opacity: 0.5,
                    fill: true,
                    fillColor: '#03f',
                    fillRule: 'evenodd',
                    fillOpacity: 0.5,
                    className: ''
                }
            },
            circle: {
                shapeOptions: {
                    stroke: true,
                    color: '#03f',
                    weight: 5,
                    opacity: 0.5,
                    fill: true,
                    fillColor: '#03f',
                    fillRule: 'evenodd',
                    fillOpacity: 0.5,
                    className: ''
                }
            },
            marker: {
                zIndexOffset: 2000,
                defaultPopupContent: '',
                enable: true,
                isHTML: false
            }
        }
    },
    map: null,
    mapTool: null,
    ready:function(){
        var me = this;
        var osm =L.tileLayer('http://{s}.tiles.mapbox.com/v3/lrqdo.me2bng9n/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="http://mapbox.com">Mapbox</a>'
        });
        me.map = L.map('main-map',{
            layers: [osm],
            maxBounds: L.latLngBounds(L.latLng(-180, 180), L.latLng(180, -180)),
            minZoom: 2
        }).setView(new L.LatLng(0,0), true);
        me.mapTool = {};
        me.initMapControl(me.map);
        me.initMapDrawTool(me.map);
    },
    methods:{
        initMapControl: function(map){
            L.control.mousePosition().addTo(map);
            L.control.scale().addTo(map);
        },
        initMapDrawTool: function(map){
            var me = this;
            var editableLayers = new L.FeatureGroup();
            map.addLayer(editableLayers);

            var options = {
                position: 'topright',
                draw: me.drawerOptions,
                edit: {
                    featureGroup: editableLayers,
                    remove: true
                }
            };

            var drawControl = new L.Control.Draw(options);
            map.addControl(drawControl);
            me.mapTool.drawControl = drawControl;

            map.on('draw:created', function (e) {
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'marker' && me.drawerOptions.marker.enable) {
                    var popUpDom = document.createElement('div');
                    if(me.drawerOptions.marker.isHTML){
                        popUpDom.innerHTML = me.drawerOptions.marker.defaultPopupContent;
                    }else{
                        popUpDom.innerText = me.drawerOptions.marker.defaultPopupContent;
                    }
                    layer.bindPopup(popUpDom);
                }
                editableLayers.addLayer(layer);
            });
            map.on('draw:edited', function (e) {
                var layers = e.layers;
                layers.eachLayer(function (layer) {

                });
            });
            me.mapTool.editableLayers = editableLayers;
        },
        changePathOption: function(pathOption){
            var me = this;
            for(var type in me.drawerOptions){
                if(me.drawerOptions[type].shapeOptions){
                    for(var key in pathOption){
                        me.drawerOptions[type].shapeOptions[key] = pathOption[key];
                    }
                }
            }
            me.mapTool.drawControl.setDrawingOptions(me.drawerOptions);
            me.alert.showAlert = true;
            me.alert.alertTitle = 'Success';
            me.alert.alertContext = 'The new path options is applied';
        },
        changeMarkPopupOption: function(markOption) {
            var me = this;
            me.drawerOptions.marker.enable = markOption.enable;
            me.drawerOptions.marker.defaultPopupContent = markOption.content;
            me.drawerOptions.marker.isHTML = markOption.isHTML;

            me.alert.showAlert = true;
            me.alert.alertTitle = 'Success';
            me.alert.alertContext = 'The new mark options is applied';
        }
    }
})