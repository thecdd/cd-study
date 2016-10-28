require('./main.css');
var Vue = require('../base.js').Vue;
var VueStrap = require('../base.js').VueStrap;
var dc = require('../base.js').dc;
var crossfilter = require('../base.js').crossfilter;

var data = [{date: "2011-11-14", quantity: 2, total: 190, tip: 100, type: "CASE 1", id: "V00001"},
		  {date: "2011-11-14", quantity: 2, total: 190, tip: 100, type: "CASE 1", id: "V00002"},
		  {date: "2011-11-14", quantity: 1, total: 300, tip: 200, type: "CASE 1", id: "V00003"},
		  {date: "2011-11-14", quantity: 2, total: 90, tip: 0, type: "CASE 2", id: "V00004"},
		  {date: "2011-11-13", quantity: 2, total: 90, tip: 0, type: "CASE 2", id: "V00005"},
		  {date: "2011-11-13", quantity: 2, total: 90, tip: 0, type: "CASE 2", id: "V00001"},
		  {date: "2011-11-13", quantity: 1, total: 100, tip: 0, type: "CASE 2", id: "V00002"},
		  {date: "2011-11-15", quantity: 2, total: 90, tip: 0, type: "CASE 3", id: "V00003"},
		  {date: "2011-11-15", quantity: 2, total: 90, tip: 0, type: "CASE 3", id: "V00004"},
		  {date: "2011-11-15", quantity: 2, total: 90, tip: 0, type: "CASE 3", id: "V00005"},
		  {date: "2011-11-15", quantity: 2, total: 200, tip: 0, type: "CASE 3", id: "V00001"},
		  {date: "2011-11-15", quantity: 1, total: 100, tip: 100, type: "CASE 1", id: "V00001"}];
//创建数据处理器
var ndx = crossfilter(data);
console.log(ndx);
//统计总数
var all = ndx.groupAll().reduceSum(function(d) {
	return d.total
});
//按type进行维度划分
var typeDimension = ndx.dimension(function(d) {
	return d.type;
});
//统计各维度的total作为value [type,sumOfTotal]
var typeTotalSumGroup = typeDimension.group().reduceSum(function(d) {
	return d.total
});

var dateDimension = ndx.dimension(function(d) {
	return d.date;
});
var quanDimension = ndx.dimension(function(d) {
	return d.type;
});
var vslDimension = ndx.dimension(function(d) {
	return d.id;
});
var quanTotalSumGroup = quanDimension.group().reduceSum(function(d) {
	return d.total
});
var dateTotalSumGroup = dateDimension.group().reduceSum(function(d) {
	return d.total
});
var vslTotalSumGroup = vslDimension.group().reduceSum(function(d) {
	return d.total
});
//在id=test上绘制饼图
var pieChart = dc.pieChart('#test');
pieChart
	.width(450) //宽
	.height(250) //高
	.radius(100) //外圆半径
	.innerRadius(20) //内圆半径
	.externalRadiusPadding(10)
	.drawPaths(false)
	.dimension(typeDimension) //维度
	.group(typeTotalSumGroup) //维度统计值
	.label(function(d) { //label 将传入各维度的[key,value]
		return d.key;
	});
pieChart.render();
var barChart = dc.barChart('#test2');
barChart
	.width(450)
	.height(250)
	.margins({
		top: 30,
		right: 50,
		bottom: 30,
		left: 40
	})
	.dimension(vslDimension) //维度
	.group(vslTotalSumGroup) //维度统计值
	.x(d3.scale.ordinal())
	.renderLabel(true)
	.xUnits(dc.units.ordinal)
	.elasticX(true)
	.elasticY(true);
barChart.render();

var lineChart = dc.lineChart('#test3');
lineChart
	.width(450)
	.height(250)
	.margins({
		top: 30,
		right: 50,
		bottom: 30,
		left: 40
	})
	.dimension(dateDimension) //维度
	.group(dateTotalSumGroup) //维度统计值
	.x(d3.scale.ordinal())
	.renderLabel(true)
	.xUnits(dc.units.ordinal)
	.elasticX(true)
	.elasticY(true);
lineChart.render();
dc.renderAll();


$('.status').on('mouseover',function(){
	$(this).addClass('heighlight-status')
});
$('.status').on('mouseout',function(){
	$(this).removeClass('heighlight-status')
});

$('.status').on('click',function(){
	var handle = !$(this).hasClass('select-status');
	$('.status').removeClass('select-status');
	if(handle){
		$(this).addClass('select-status');
	}
})

