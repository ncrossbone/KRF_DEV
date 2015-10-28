Ext.define('KRF_DEV.view.east.ChartPanelDate', {
	
	extend: 'Ext.window.Window',
	xtype: 'east-chartpaneldate',
	
	id: 'datePanel1',
    width : 205,
    height : 200,
    header: true,
    title: '기간설정',
    controller: 'chartPanelDateController',
    //x: x,
    cls: 'khLee-window-panel-header khLee-x-window-default ',
    initComponent: function(){
    	this.callParent();
	    	var itemCtl = Ext.getCmp("selectItem");
	    	
	    	var f_Chart = Ext.getCmp("f_Chart");
	    	var f_ChartText = Ext.getCmp("f_ChartText");
	    	
	    	var parentChk = KRF_DEV.getApplication().parentFlag;
			var chartFlag_D = KRF_DEV.getApplication().chartFlag_D;
			console.info(f_Chart);
	    	console.info(parentChk);
	    	if(parentChk == "F"){
	    		//console.info(parentChk);
	    		f_Chart.hidden = false;
	    		f_ChartText.hidden = false;
	    	}else{
	    		//console.info(parentChk);
	    		f_Chart.hidden = true;
	    		f_ChartText.hidden = true;
	    	}
	    	
	    	//console.info(parentChk);
			//console.info(chartFlag_D);
			if(parentChk == "A"){
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_BOD', name: 'BOD'}
					,{id: 'ITEM_DOC', name: 'DO'}
					,{id: 'ITEM_COD', name: 'COD'}
					,{id: 'ITEM_TN', name: 'T.N'}
					,{id: 'ITEM_TP', name: 'T.P'}
					,{id: 'ITEM_TEMP', name: '수온'}
					,{id: 'ITEM_PH', name: 'pH'}
					,{id: 'ITEM_SS', name: 'SS'}
					,{id: 'ITEM_CLOA', name: '클로로필a'}]
			})
			
			}else if(parentChk == "B"){
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: 'ITEM_BOD', name: 'BOD'}
						,{id: 'ITEM_COD', name: 'COD'}
						,{id: 'ITEM_DOC', name: 'DO'}
						,{id: 'ITEM_TN', name: 'T.N'}
						,{id: 'ITEM_TP', name: 'T.P'}
						,{id: 'ITEM_FLW', name: 'FLW'}
						,{id: 'ITEM_PH', name: 'pH'}
						,{id: 'ITEM_SS', name: 'SS'}
						,{id: 'ITEM_TOC', name: 'TOC'}]
				})	
				
			}else if(parentChk == "C"){
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: 'ITEM_DOW', name: 'DOW'}
						,{id: 'ITEM_TEMP', name: '수온'}
						,{id: 'ITEM_DOC', name: 'DO'}
						,{id: 'ITEM_PH', name: 'PH'}
						,{id: 'ITEM_EC', name: 'EC'}
						,{id: 'ITEM_COD', name: 'COD'}
						,{id: 'ITEM_TOC', name: 'TOC'}
						,{id: 'ITEM_TN', name: 'T.N'}
						,{id: 'ITEM_TP', name: 'T.P'}]
				})
			}else if(parentChk == "D"){
				if(chartFlag_D == "D001"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'WL', name: 'WL'}]
					})
				}else if(chartFlag_D == "D002"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'RF', name: 'RF'}]
					})
				}else if(chartFlag_D == "D003"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'FW', name: 'FW'}]
					})
				}else if(chartFlag_D == "D004"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'SWL', name: 'SWL'},
						       {id: 'INF', name: 'INF'},
						       {id: 'OTF', name: 'OTF'},
						       {id: 'SFW', name: 'SFW'},
						       {id: 'ECPC', name: 'ECPC'}]
					})
				}else if(chartFlag_D == "D005"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'WD', name: 'WD'},
						       {id: 'WS', name: 'WS'},
						       {id: 'TA', name: 'TA'},
						       {id: 'HM', name: 'HM'},
						       {id: 'PA', name: 'PA'},
						       {id: 'PS', name: 'PS'},
						       {id: 'RNYN', name: 'RNYN'},
						       {id: 'RN1HR', name: 'RN1HR'},
						       {id: 'RNDAY', name: 'RNDAY'}]
					})
				}else if(chartFlag_D == "D006"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'RND', name: 'RND'},
						       {id: 'TA', name: 'TA'},
						       {id: 'SIDAY', name: 'SIDAY'}]
					})
				}else if(chartFlag_D == "D007"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'SWL', name: 'SWL'},
						       {id: 'OWL', name: 'OWL'},
						       {id: 'SFW', name: 'SFW'},
						       {id: 'ECPC', name: 'ECPC'},
						       {id: 'INF', name: 'INF'},
						       {id: 'TOTOTF', name: 'TOTOTF'},
						       {id: 'EGOTF', name: 'EGOTF'},
						       {id: 'GTOTF', name: 'GTOTF'},
						       {id: 'CBOTF', name: 'CBOTF'},
						       {id: 'FWOTF', name: 'FWOTF'},
						       {id: 'ETCOTF', name: 'ETCOTF'}]
					})
				}
			}else if(parentChk == "F"){
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
				})
			}
			
			itemCtl.bindStore(store);
    	this.on("beforeclose", function chartDateWinClose(){
    	});
    },
    items: [{
    	xtype: 'container',
    	y: 15,
    	x: 5,
    	layout: {
    		type: 'vbox',
    		align: 'left',
    		pack: 'middle'
    	},
    	items: [{
        	xtype: 'container',
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items: [{
				xtype: 'combo',
				id : 'selectYear',
				//..fieldLabel: '<b>년</b> ',
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
				value: '2014',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			},{
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width:  10
			},{
				xtype: 'combo',
				id : 'selectMonth',
				//fieldLabel: '<b>월</b> ',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '10',
				//labelWidth: 20,
				//labelAlign: 'right',
				width: 55,
				height: 25
			},{
				xtype: 'label',
				text: '월 부터'
			}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'left',
	        		pack: 'left'
	        	},
	        	items: [{
	        		xtype: 'combo',
					id : 'selectYear2',
					//fieldLabel: '<b>년</b> ',
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
					value: '2015',
					//labelWidth: 30,
					//labelAlign: 'right',
					width: 65,
					height: 25
				},{
					xtype: 'label',
					text: '년'
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'combo',
					id : 'selectMonth2',
					//fieldLabel: '<b>월</b> ',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					value: '10',
					//labelWidth: 20,
					//labelAlign: 'right',
					width: 55,
					height: 25
				},{
					xtype: 'label',
					text: '월 까지'
				}]
    		}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'selectItem',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'ITEM_BOD', name: 'BOD'}
							,{id: 'ITEM_DOC', name: 'DO'}
							,{id: 'ITEM_COD', name: 'COD'}
							,{id: 'ITEM_TN', name: 'T.N'}
							,{id: 'ITEM_TP', name: 'T.P'}
							,{id: 'ITEM_TEMP', name: '수온'}
							,{id: 'ITEM_PH', name: 'pH'}
							,{id: 'ITEM_SS', name: 'SS'}
							,{id: 'ITEM_CLOA', name: '클로로필a'}]
					}),
					value: '',
					width: 105,
					height: 25
					
	        	},{
					xtype: 'container',
					width: 10
					
	        	},{
					xtype: 'label',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'f_Chart',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: '1', name: '방류유량'}
							,{id: '2', name: '직접이송량'}
							,{id: '3', name: '총유입량'}
							,{id: '4', name: '관거이송량'}]
					}),
					value: '방류유량',
					width: 115,
					height: 25
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'label',
					id: 'f_ChartText',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		}, {
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
        		},
	        	items: [{
					xtype: 'container',
					width: 80
				},{
					xtype: 'image',
					//xtype: 'button',
					id: 'btnSearch',
					listeners: {
						el: {
							click: 'onSearchChartData'
						}
					},
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif'
				}]
    		}]
		}]
    }]
});