require('./main.css');
var Vue = require("vue");
var VueStrap = require('vue-strap');
var L = require('leaflet');


Vue.config.delimiters = ['${', '}']

var app = new Vue({
    el: '#app',
    data:{
        message:'this is page'
    },
    map: null,
    ready:function(){
        var osm =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        this.map = L.map('main-map',{
            layers: [osm]
        }).setView(new L.LatLng(0,0), true);
    }
})