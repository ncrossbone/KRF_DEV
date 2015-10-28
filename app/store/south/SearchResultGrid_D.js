Ext.define('KRF_DEV.store.south.SearchResultGrid_D', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'WS_NM',
			'AM_NM',
			'AS_NM',
			'PT_NO',
			'PT_NM',
			'WMCYMD',
			'CURR_WL',
			{name: 'CHART_WL', type: 'number'},
			'CURR_MXWL',
			{name: 'CHART_MXWL', type: 'number'},
			'CURR_MNWL',
			{name: 'CHART_MNWL', type: 'number'}
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true,
    pageSize: 100,

	remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	orgParentIds: "",
	
	listeners: {
		load: function(store) {
			console.info(store.orgParentIds);
			if(store.orgParentIds == "D002"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RF',
										{name: 'CHART_RF', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D003"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_FW',
										{name: 'CHART_FW', type: 'number'}										
				                       ]
			}else if(store.orgParentIds == "D004"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										{name: 'CHART_SWL', type: 'number'},
										'CURR_INF',
										{name: 'CHART_INF', type: 'number'},
										'CURR_OTF',
										{name: 'CHART_OTF', type: 'number'},
										'CURR_SFW',
										{name: 'CHART_SFW', type: 'number'},
										'CURR_ECPC',
										{name: 'CHART_ECPC', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D005"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_WD',
										{name: 'CHART_WD', type: 'number'},
										'CURR_WS',
										{name: 'CHART_WS', type: 'number'},
										'CURR_TA',
										{name: 'CHART_TA', type: 'number'},
										'CURR_HM',
										{name: 'CHART_HM', type: 'number'},
										'CURR_PA',
										{name: 'CHART_PA', type: 'number'},
										'CURR_PS',
										{name: 'CHART_PS', type: 'number'},
										'CURR_RNYN',
										{name: 'CHART_RNYN', type: 'number'},
										'CURR_RN1HR',
										{name: 'CHART_RN1HR', type: 'number'},
										'CURR_RNDAY',
										{name: 'CHART_RNDAY', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D006"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RND',
										{name: 'CHART_RND', type: 'number'},
										'CURR_TA',
										{name: 'CHART_TA', type: 'number'},
										'CURR_SIDAY',
										{name: 'CHART_SIDAY', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D007"){
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										{name: 'CHART_SWL', type: 'number'},
										'CURR_OWL',
										{name: 'CHART_OWL', type: 'number'},
										'CURR_SFW',
										{name: 'CHART_SFW', type: 'number'},
										'CURR_ECPC',
										{name: 'CHART_ECPC', type: 'number'},
										'CURR_INF',
										{name: 'CHART_INF', type: 'number'},
										'CURR_TOTOTF',
										{name: 'CHART_TOTOTF', type: 'number'},
										'CURR_EGOTF',
										{name: 'CHART_EGOTF', type: 'number'},
										'CURR_GTOTF',
										{name: 'CHART_GTOTF', type: 'number'},
										'CURR_CBOTF',
										{name: 'CHART_CBOTF', type: 'number'},
										'CURR_FWOTF',
										{name: 'CHART_FWOTF', type: 'number'},
										'CURR_ETCOTF',
										{name: 'CHART_ETCOTF', type: 'number'}
				                       ]
			}
			
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			var jsonData = "";
			var arrData = [];
			//console.info(store.parentIds);
			
			if(store.orgParentIds == "D001"){

				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_1.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			
			}else if(store.orgParentIds == "D002"){
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_2.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}else if(store.orgParentIds == "D003"){

				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_3.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			
			}else if(store.orgParentIds == "D004"){
				
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_4.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}else if(store.orgParentIds == "D005"){
				
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_5.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}else if(store.orgParentIds == "D006"){
				
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_6.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}else if(store.orgParentIds == "D007"){
				
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_D_7.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			//console.info(response.responseText);
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        			console.info(jsonData.data);
	        			//store.loadData(jsonData.data);
	        			//for(var i = 0; i < jsonData.data.length; i++){
	        				//arrData.push({name: jsonData.data[i].name});
	        			//}
	        			//store.setData(arrData);
	        			//console.info(store.data.length);
	        			//store.load();
	        			
	        		},
	        		failure: function(form, action) {
	        			alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}
			
		}
    }
});