require('./leaflet-mouse-position.css')
var L = require('leaflet');

L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: null,
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },
  __map : null,
  __zoom : null,
  __position : null,

  onAdd: function (map) {
    this.__map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);

    this.__zoom = this.__map.getZoom();
    this.__position = this.options.lngFirst ? 0 + this.options.separator + 0 : 0 + this.options.separator + 0;

    if(this.options.emptyString == null){
        this.options.emptyString = this._buildInfo();
    }
    this._container.innerHTML=this.options.emptyString;
    map.on('mousemove', this._changePosition, this);
    map.on('zoomend', this._zoomChange, this)
    map.on('updatemouseposition', this._zoomChange, this)
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._changePosition)
    map.off('zoomend', this._zoomChange)
    map.off('updatemouseposition', this._zoomChange)
  },

  _changePosition: function(e){
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    this.__position = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    this.__zoom = this.__map.getZoom();
    this._displayInfo();
  },

  _zoomChange: function(){
    this.__zoom = this.__map.getZoom();

    this._displayInfo();
  },

  _displayInfo: function() {
    this._container.innerHTML = this._buildInfo();
  },

  _buildInfo: function(){
    var info = '';
    var latLngTip = this.options.lngFirst ? 'Lng/Lat:' : 'Lat/Lng:';

    info += '<font color=\"\">Zoom:</font> <font color=\"#3692B4\">' + this.__zoom + '</font> | ';
    info += '<font color=\"\">'+latLngTip+'</font> <font color=\"#3692B4\">' + this.__position + '</font>';

    var prefixAndValue = this.options.prefix + ' ' + info;

    return prefixAndValue;
  }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
