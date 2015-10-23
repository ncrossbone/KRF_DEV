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
		var chartCtl = Ext.getCmp("siteCharttest");
		var axes   = chartCtl.axes[0];
		var series = chartCtl.series[0];
		
		//item 선택
		var selectItem = Ext.getCmp("selectItem");
		
		//년도
		var selectYear = Ext.getCmp("selectYear");
		
		series.setYField(selectItem.lastValue);
		axes.fields = selectItem.lastValue;
		var store = chartCtl.getStore();
		var s = selectItem.lastValue;
		
		var labelNm = selectItem.lastMutatedValue;
		if(labelNm == "BOD"){
			labelNm = "BOD(㎎/L)";
		}else if(labelNm == "DO"){
			labelNm = "DO(㎎/L)";
		}else if(labelNm == "COD"){
			labelNm = "COD(㎎/L)";
		}else if(labelNm == "T.N"){
			labelNm = "T-N (㎎/L)";
		}else if(labelNm == "T.P"){
			labelNm = "T-P (㎎/L)";
		}else if(labelNm == "수온"){
			labelNm = "수온(℃)";
		}else if(labelNm == "pH"){
			labelNm = "pH";
		}else if(labelNm == "SS"){
			labelNm = "SS(㎎/ℓ)";
		}else if(labelNm == "클로로필a"){
			labelNm = "클로로필a(㎎/㎥)";
		}
		
		var ITEM_BOD = parseFloat(store.arrMax[0].ITEM_BOD);
		var ITEM_DOC = parseFloat(store.arrMax[0].ITEM_DOC);
		var ITEM_COD = parseFloat(store.arrMax[0].ITEM_COD);
		var ITEM_TN = parseFloat(store.arrMax[0].ITEM_TN);
		var ITEM_TP = parseFloat(store.arrMax[0].ITEM_TP);
		var ITEM_TEMP = parseFloat(store.arrMax[0].ITEM_TEMP);
		var ITEM_PH = parseFloat(store.arrMax[0].ITEM_PH);
		var ITEM_SS = parseFloat(store.arrMax[0].ITEM_SS);
		var ITEM_CLOA = parseFloat(store.arrMax[0].ITEM_CLOA);
		var ITEM_DOW = parseFloat(store.arrMax[0].ITEM_DOW);
		var ITEM_FLW = parseFloat(store.arrMax[0].ITEM_FLW);
		var ITEM_EC = parseFloat(store.arrMax[0].ITEM_EC);
		var AMT_PHYS = parseFloat(store.arrMax[0].AMT_PHYS);
		var AMT_BIO = parseFloat(store.arrMax[0].AMT_BIO);
		var AMT_HIGHTEC = parseFloat(store.arrMax[0].AMT_HIGHTEC);
		var ITEM_COLI = parseFloat(store.arrMax[0].ITEM_COLI);
		var ITEM_AMT = parseFloat(store.arrMax[0].ITEM_AMT);
		var ITEM_BYPASS_AMT = parseFloat(store.arrMax[0].ITEM_BYPASS_AMT);
		
		if(s == "ITEM_BOD"){
			axes.prevMax = ITEM_BOD;
		}else if(s == "ITEM_DOC"){
			axes.prevMax = ITEM_DOC;
		}else if(s == "ITEM_COD"){
			axes.prevMax = ITEM_COD;
		}else if(s == "ITEM_TN"){
			axes.prevMax = ITEM_TN;
		}else if(s == "ITEM_TP"){
			axes.prevMax = ITEM_TP;
		}else if(s == "ITEM_TEMP"){
			axes.prevMax = ITEM_TEMP;
		}else if(s == "ITEM_PH"){
			axes.prevMax = ITEM_PH;
		}else if(s == "ITEM_SS"){
			axes.prevMax = ITEM_SS;
		}else if(s == "ITEM_CLOA"){
			axes.prevMax = ITEM_CLOA;
		}else if(s == "ITEM_DOW"){
			axes.prevMax = ITEM_DOW;
		}else if(s == "ITEM_FLW"){
			axes.prevMax = ITEM_FLW;
		}else if(s == "ITEM_EC"){
			axes.prevMax = ITEM_EC;
		}else if(s == "AMT_PHYS"){
			axes.prevMax = AMT_PHYS;
		}else if(s == "AMT_BIO"){
			axes.prevMax = AMT_BIO;
		}else if(s == "AMT_HIGHTEC"){
			axes.prevMax = AMT_HIGHTEC;
		}else if(s == "ITEM_COLI"){
			axes.prevMax = ITEM_COLI;
		}else if(s == "ITEM_AMT"){
			axes.prevMax = ITEM_AMT;
		}else if(s == "ITEM_BYPASS_AMT"){
			axes.prevMax = ITEM_BYPASS_AMT;
		}
		
		//ITEM_BYPASS_AMT
		KRF_DEV.getApplication().chartFlag = "0";
		
		var selectItemName = Ext.getCmp("selectItemName")
		selectItemName.setText(labelNm);
		
		store.load();
		
		var win = Ext.getCmp("datePanel1");
		if(win != undefined)
			win.hide();
	}
});