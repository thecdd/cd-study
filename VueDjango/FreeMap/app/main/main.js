var L = require('../base.js').L;
var Vue = require('../base.js').Vue;
var VueStrap = require('../base.js').VueStrap;

var mapHelper = require('../mix/mapHelper');
require('./main.css');
require('./component/pathOptionPanel.js');
require('./component/markOptionPanel.js');

var app = new Vue({
    el: '#app',
    component:['path-option-panel',''],
    components:{
        alert: VueStrap.alert
    },
    mixins:[mapHelper],
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
        me.map = me.createMap('main-map');
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