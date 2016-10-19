require("./optionPanel.css");
var Vue = require("vue");
var VueStrap = require('vue-strap');

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
    '							<input type="text" class="form-control" name="color" placeholder="Color" v-model="pathOption.color" :disabled="!pathOption.stroke">'+
    '						</div>'+
    '                       <div class="col-lg-1 color-preview" v-bind:style="{background: pathOption.color}">&nbsp;</div>'+
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
    '						<div class="col-lg-6">'+
    '							<input type="text" class="form-control" :disabled="!pathOption.fill" name="fillColor" placeholder="Fill Color" v-model="pathOption.fillColor">'+
    '						</div>'+
    '                       <div class="col-lg-1 color-preview" v-bind:style="{background: pathOption.fillColor}">&nbsp;</div>'+
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
                color: '#03f',
                weight: 5,
                opacity: 0.5,
                fill: true,
                fillColor: '#03f',
                fillRule: 'evenodd',
                fillOpacity: 0.5,
            },
            latestPathOption: {
                stroke: true,
                color: '#03f',
                weight: 5,
                opacity: 0.5,
                fill: true,
                fillColor: '#03f',
                fillRule: 'evenodd',
                fillOpacity: 0.5,
            }
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
        }
    },
    props: ['panelTitle']
})