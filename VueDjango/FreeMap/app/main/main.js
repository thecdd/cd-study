require('./main.css');
require('leaflet-draw/dist/leaflet.draw.css');
var L = require('leaflet');
require('leaflet-draw');
require('../plugin/leaflet/leaflet-mouse-position.js');

var Vue = require("vue");
var VueStrap = require('vue-strap');
require('./component/pathOptionPanel.js')

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
                    className: ''
                }
            },
            marker: {
                zIndexOffset: 2000,
                defaultPopup: 'A popup'
            }
        }
    },
    map: null,
    mapTool: null,
    ready:function(){
        var me = this;
        var osm =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

                if (type === 'marker') {
                    var popUpEl = document.createElement('input');
                    popUpEl.value = me.drawerOptions.marker.defaultPopup;
                    layer.bindPopup(popUpEl);
                }

                editableLayers.addLayer(layer);
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
        }
    }
})