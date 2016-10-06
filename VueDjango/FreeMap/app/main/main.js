var Vue = require("vue");

Vue.config.delimiters = ['${', '}']

var app = new Vue({
    el: '#app',
    data:{
        message:'this is page'
    }
})