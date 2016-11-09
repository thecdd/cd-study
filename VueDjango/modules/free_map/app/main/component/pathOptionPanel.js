require("./optionPanel.css");
require("bootstrap-colorpicker");
require("bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css");
var Vue = require("../../base.js").Vue;
var VueStrap = require("../../base.js").VueStrap;
var objectHelper = require("../../base.js").objectHelper;

Vue.component('path-option-panel', {
    template:
    '<div class="panel panel-default">'+
    '   <div class="panel-heading">'+
    '       <h3 class="panel-title">{{panelTitle}}</h3>'+
    '   </div>'+
    '   <div class="panel-body">'+
    '		<div class="row">'+
    '			<div class="col-lg-5">'+
    '				<form class="form-horizontal">'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Stroke :</label>'+
    '						<div class="col-lg-8">'+
    '							<div class="checkbox-slider--b-flat">'+
    '								<label>'+
    '									<input type="checkbox" v-model="pathOption.stroke"/><span></span>'+
    '								</label>'+
    '							</div>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Color :</label>'+
    '						<div class="col-lg-6">'+
    '							<div id="{{id}}-color" class="colorpicker-component input-group">'+
    '                               <input type="text" class="form-control" name="color" placeholder="Color" v-model="pathOption.color" :disabled="!pathOption.stroke">'+
    '                               <span class="input-group-addon"><i></i></span>'+
    '                           </div>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Weight :</label>'+
    '						<div class="col-lg-8">'+
    '							<input type="number" class="form-control" name="weight" placeholder="Weight" v-model="pathOption.weight" :disabled="!pathOption.stroke">'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Opacity :</label>'+
    '						<div class="col-lg-8">'+
    '							<input type="text" class="form-control" name="opacity" placeholder="Opacity" v-model="pathOption.opacity" :disabled="!pathOption.stroke">'+
    '						</div>'+
    '					</div>'+
    '				</form>'+
    '			</div>'+
    '			<div class="col-lg-5">'+
    '				<form class="form-horizontal">'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Fill :</label>'+
    '						<div class="col-lg-8">'+
    '							<div class="checkbox-slider--b-flat">'+
    '								<label>'+
    '									<input type="checkbox" v-model="pathOption.fill"/><span></span>'+
    '								</label>'+
    '							</div>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Fill Color :</label>'+
    '						<div id="{{id}}-fill" class="col-lg-6">'+
    '                           <div class="colorpicker-component input-group">'+
    '							    <input type="text" class="form-control" :disabled="!pathOption.fill" name="fillColor" placeholder="Fill Color" v-model="pathOption.fillColor">'+
    '                               <span class="input-group-addon"><i></i></span>'+
    '                           </div>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Fill Rule :</label>'+
    '						<div class="col-lg-8">'+
    '                           <v-select :value.sync="pathOption.fillRule" :disabled="!pathOption.fill">'+
    '                               <v-option value="nonzero">nonzero</v-option>'+
    '                               <v-option value="evenodd">evenodd</v-option>'+
    '                           </v-select>'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<label class="col-lg-4 control-label">Fill Opacity :</label>'+
    '						<div class="col-lg-8">'+
    '							<input type="text" class="form-control" name="fillOpacity" placeholder="Fill Opacity" v-model="pathOption.fillOpacity" :disabled="!pathOption.fill">'+
    '						</div>'+
    '					</div>'+
    '					<div class="form-group">'+
    '						<div class="col-lg-12">'+
    '							<a class="btn btn-primary function-btn" v-on:click="save">Save</a>'+
    '							<a class="btn btn-warning function-btn" v-on:click="reset">Reset</a>'+
    '						</div>'+
    '					</div>'+
    '				</form>'+
    '			</div>'+
    '		</div>'+
    '   </div>'+
    '</div>',
    components:{
        vSelect: VueStrap.select,
        vOption: VueStrap.option
    },
    data : function(){
        return {
            pathOption: {
                stroke: true,
                color: '#0033ff',
                weight: 5,
                opacity: 0.5,
                fill: true,
                fillColor: '#0033ff',
                fillRule: 'evenodd',
                fillOpacity: 0.5,
            },
            latestPathOption: {
                stroke: true,
                color: '#0033ff',
                weight: 5,
                opacity: 0.5,
                fill: true,
                fillColor: '#0033ff',
                fillRule: 'evenodd',
                fillOpacity: 0.5,
            },
            id: objectHelper.generateID()
        }
    },
    methods:{
        save: function(){
            var me=this;
            for(var key in me.pathOption){
                me.latestPathOption[key]=me.pathOption[key];
            }
            me.$dispatch('change-path-option',me.pathOption);
        },
        reset: function(){
            var me=this;
            for(var key in me.pathOption){
                me.pathOption[key]=me.latestPathOption[key];
            }
            $('#'+me.id+'-color').colorpicker('setValue',me.pathOption.color);
            $('#'+me.id+'-fill').colorpicker('setValue',me.pathOption.fillColor);
        }
    },
    ready: function(){
        var me = this;
        $('#'+me.id+'-color').colorpicker().on('changeColor',function(e){
            me.pathOption.color = e.color.toHex();
        });
        $('#'+me.id+'-fill').colorpicker().on('changeColor',function(e){
            me.pathOption.fillColor = e.color.toHex();
        });
    },
    props: ['panelTitle']
})