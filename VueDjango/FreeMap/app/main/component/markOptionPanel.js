require("./optionPanel.css");
var Vue = require("vue");
var VueStrap = require('vue-strap');

Vue.component('mark-option-panel', {
    template:
    '<div class="panel panel-default">'+
    '	<div class="panel-heading">'+
    '		<h3 class="panel-title">{{panelTitle}}</h3>'+
    '	</div>'+
    '	<div class="panel-body">'+
    '		<div class="row">'+
    '			<div class="col-lg-10">'+
    '				<form class="form-horizontal">'+
    '					<div class="form-group">'+
    '						<label class="col-lg-3 control-label">Enable Popup :</label>'+
    '						<div class="col-lg-3">'+
    '							<div class="checkbox-slider--b-flat">'+
    '								<label>'+
    '									<input type="checkbox" v-model="markOption.enable"/><span></span>'+
    '								</label>'+
    '							</div>'+
    '						</div>'+
    '						<label class="col-lg-3 control-label">Enable HTML content :</label>'+
    '						<div class="col-lg-3">'+
    '							<div class="checkbox-slider--b-flat">'+
    '								<label>'+
    '									<input type="checkbox" v-model="markOption.isHTML"/><span></span>'+
    '								</label>'+
    '							</div>'+
    '						</div>'+
    '					</div>'+
    '				</form>'+
    '			<div>'+
    '		</div>'+
    '		<div class="row">'+
    '			<div class="col-lg-10">'+
    '				<form class="form-horizontal">'+
    '					<div class="form-group">'+
    '						<label class="col-lg-3 control-label">Popup Content :</label>'+
    '						<div class="col-lg-9">'+
    '							<textarea class="form-control" rows="6" v-model="markOption.content"></textarea>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<div class="col-lg-12">'+
    '							<a class="btn btn-primary function-btn" v-on:click="save">Save</a>'+
    '							<a class="btn btn-warning function-btn" v-on:click="reset">Reset</a>'+
    '						</div>'+
    '					</div>'+
    '				</form>'+
    '			<div>'+
    '		</div>'+
    '	</div>'+
    '</div>',
    data : function(){
        return {
            markOption: {
                isHTML: false,
                content: '',
                enable: true,
            },
            latestMarkOption: {
                isHTML: false,
                content: '',
                enable: true
            }
        }
    },
    methods:{
        save: function(){
            var me=this;
            for(var key in me.markOption){
                me.latestMarkOption[key]=me.markOption[key];
            }
            me.$dispatch('change-mark-option',me.markOption);
        },
        reset: function(){
            var me=this;
            for(var key in me.markOption){
                me.markOption[key]=me.latestMarkOption[key];
            }
        }
    },
    props: ['panelTitle']
})