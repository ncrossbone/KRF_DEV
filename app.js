var _testUrl = null;
var _serviceUrl = null;

var store = Ext.create('Ext.data.Store', {
	autoLoad: true,
	
	fields: [{
		name: 'MapserviceUrl'
	}],

	proxy: {
		type: 'ajax',
		url: './resources/data/AppVariable.json',
		reader: {
			type: 'json'
		}
	},
	
	listeners: {
		beforeload: function(a, b, c){
			//console.info(this.data.record);
			_testUrl = "sss";
		}
	}
});

store.load(function(a, b, c){
	this.each(function(record, cnt, totCnt){
		//console.info(record);
		if(record.id == "ServiceUrl"){
			_serviceUrl = record.data;
			console.info(_serviceUrl);
		}
	});
	console.info(_serviceUrl);
});

/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'KRF_DEV',

    //extend: 'KRF_DEV.Application',
    
    autoCreateViewport: 'KRF_DEV.view.main.Main',
    
    arcServiceUrl:'http://112.217.167.123:6080/arcgis',
    //arcServiceUrl:'http://fireftp.iptime.org:6080/arcgis',
    layer1Url: 'http://112.217.167.123:6080/arcgis/rest/services/reach/MapServer/'
    //layer1Url: 'http://fireftp.iptime.org:6080/arcgis/rest/services/drone/MapServer',
    
    /*
    stores: [
 		'KRF_DEV.store.dev_test.GridStoreTest',
 		'KRF_DEV.store.dev_test.WestTabLayerStore',
 		'KRF_DEV.store.west.WestTabSearch_ADM_GRID'
 	]
 	*/
});
