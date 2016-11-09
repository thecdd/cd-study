var Vue = require('../base.js').Vue;
var objectHelper = require('../base.js').objectHelper;

var defaultOptions = {
    tileLayers:[{
        'url': 'http://{s}.tiles.mapbox.com/v3/lrqdo.me2bng9n/{z}/{x}/{y}.png',
        'attribution': '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="http://mapbox.com">Mapbox</a>'
    }],
    latLngBounds: L.latLngBounds(L.latLng(-180, 180), L.latLng(180, -180)),
    minZoom: 2,
    center: new L.LatLng(0,0)
}

var mapHelper = {
    methods: {
        createMap: function (id, options) {
            var mapOptions = {};
            var tileLayers = [];
            var i,tmp, map;

            options = options || defaultOptions;
            if(!objectHelper.undefinedOrNull(options.tileLayers)){
                for(i = 0; i < options.tileLayers.length; i++){
                    tmp = L.tileLayer(options.tileLayers[i].url,{
                        attribution: options.tileLayers[i].attribution
                    });
                    tileLayers.push(tmp);
                }
            }
            mapOptions.layers = tileLayers;

            if(!objectHelper.undefinedOrNull(options.latLngBounds)){
                mapOptions.latLngBounds = options.latLngBounds;
            }
            if(!objectHelper.undefinedOrNull(options.minZoom)){
                mapOptions.minZoom = options.minZoom;
            }
            if(!objectHelper.undefinedOrNull(options.extends)){
                if (typeof options.extends === 'object') {
                    for(i in options.extends){
                        mapOptions[i]=options.extends[i];
                    }
                }
            }


            map = L.map(id, mapOptions)
            if(!objectHelper.undefinedOrNull(options.center)){
                map.setView(options.center, true);
            }
            return map;
        }
    }
};

module.exports = mapHelper;