/**
* North Controller
*/
Ext.define('KRF_DEV.view.east.ChartPanelDateController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.chartPanelDateController',
	
	control: {
		'#f_Chart': {
			change: 'onComboGubunChange'
		}
	},
	
	onComboGubunChange: function() {
		//alert("dd");
		var itemCtl = Ext.getCmp("selectItem");															
		var f_Chart = Ext.getCmp("f_Chart");
		if(f_Chart.lastValue == "1"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'AMT_PHYS', name: 'AMT_PHYS'}
				,{id: 'AMT_BIO', name: 'AMT_BIO'}
				,{id: 'AMT_HIGHTEC', name: 'AMT_HIGHTEC'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'T.N'}
				,{id: 'ITEM_TP', name: 'T.P'}
				,{id: 'ITEM_COLI', name: 'COLI'}]
			});
			
		}else if(f_Chart.lastValue == "2" || f_Chart.lastValue == "3"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_AMT', name: 'AMT'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'T.N'}
				,{id: 'ITEM_TP', name: 'T.P'}
				,{id: 'ITEM_COLI', name: 'COLI'}]
			});	
			
		}else if(f_Chart.lastValue == "4"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_AMT', name: 'AMT'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'T.N'}
				,{id: 'ITEM_TP', name: 'T.P'}
				,{id: 'ITEM_COLI', name: 'COLI'}
				,{id: 'ITEM_BYPASS_AMT', name: 'BYPASS_AMT'}]
			});	
		}
		
		itemCtl.bindStore(store);
	},
	
	onSearchChartData: function() {
		//alert("dd");
		SetChartData("", "", "", "");
	}
});