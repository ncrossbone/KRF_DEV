Ext.define('KRF_DEV.view.east.ChartPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'east-chartpanel',
    
    id: 'chartPanel',
    //renderTo: Ext.getBody(),
    title: '차트정보',
    header: false,
    
    layout: {
		type: 'fit'
	},
	
	width: 400,
	height: 600,
	y: 5,
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	items : [{
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/arrow.gif'
			}, {
				xtype: 'label',
				id : 'selectName',
				style: 'font-weight: bold; padding-left: 15px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				//store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				displayField: 'ptNm',
				width: 65,
				height: 25
			},{
				xtype: 'container',
				width: 10
			},{
				xtype: 'image',
				src: './resources/images/button/arrow.gif'
			},{
				xtype: 'label',
				id : 'selectItemName',
				style: 'font-weight: bold; padding-left: 15px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				text: 'BOD(㎎/ℓ)',
				width: 125,
				height: 25
			}, {
				xtype: 'container',
				width:  77
			},{
				xtype: 'image',
				id : 'asdfasdf',
				listeners: {
					el: {
						click: function(){
							
							//console.info(Ext.getBody().getWidth());
							var x = Ext.getBody().getWidth() -500;
							
							var win = Ext.getCmp("datePanel1");
							
							if(win == undefined){
								var win = Ext.create('Ext.window.Window',{
									id: 'datePanel1',
							        width : 205,
							        height : 150,
							        header: true,
							        title: '기간설정',
							        x: x,
							        cls: 'khLee-window-panel-header khLee-x-window-default ',
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
												value: 'ITEM_BOD',
												/*labelWidth: 60,
												labelAlign: 'right',*/
												width: 75,
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
														//id: 'selecta',
														listeners: {
															el: {
																click: function(){
																	var chartCtl = Ext.getCmp("siteCharttest");
																	console.info(chartCtl);
																	var axes   = chartCtl.axes[0];
																	var series = chartCtl.series[0];
																	
																	//item 선택
																	var selectItem = Ext.getCmp("selectItem");
																	console.info(selectItem.lastMutatedValue);
																	
																	//년도
																	var selectYear = Ext.getCmp("selectYear");
																	
																	console.info(selectItem.lastValue);
																	console.info(series.yField);
																	console.info(axes);
																	console.info(series);
																	//series._yField = selectItem.lastValue;
																	series.setYField(selectItem.lastValue);
																	axes.fields = selectItem.lastValue;
																	console.info(axes.fields);
																	console.info(series.yField);
																	//axes.prevMax = '100';
																	//console.info(chartCtl.axes.items[0].fields);
																	var store = chartCtl.getStore();
																	//console.info(selectItem.lastMutatedValue);
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
																	}else {
																		axes.prevMax = ITEM_CLOA;
																	}
																	
																	var selectItemName = Ext.getCmp("selectItemName")
																	console.info(labelNm);
																	selectItemName.setText(labelNm);
																	
																	store.load();
																	console.info(chartCtl.series[0]);
																	
																	win.hide();
																												
													}
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
							}
							
							//console.info(win);
							if(win.hidden == true)
								win.show();
							else
								win.hide();
							
							//var parentCtl = Ext.getCmp("datePanel1");
							//console.info(parentCtl.getX());
							//win.setX(parentCtl.getX());
							//win.setY(parentCtl.getY());
						}
					}
				},
				//text: '선택',
				width: 61,
				height: 19,
				src: './resources/images/button/btn_date.gif'
			}, {
				xtype: 'label',
				id :  'chartName',
				labelWidth: 60,
				labelAlign: 'right'
			}]
		},  {
	        //xtype: 'chart',
			xtype: 'cartesian',
	        id: 'siteCharttest',
	        width: '95%',
	        height: 250,
	        padding: '10 0 0 0',
	        style: {
	            'background' : '#fff'
	        },
	        animate: true,
	        shadow: false,
	        store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
	        insetPadding: 10,
	       
	        axes: [{
	            type: 'numeric',
	            //fields: 'ITEM_BOD',
	            position: 'left',
	            grid: true,
	            majorTickSteps: 1,
	            minimum: 0/*,
	            label: {
	                renderer: function(v) { alert(v);return v + '%'; }
	            }*/
	            
	        }, {
	            type: 'category',
	            //fields: 'yearMonth',
	            position: 'bottom',
	            grid: true,
	            majorTickSteps: 1,
	            label: {
	                rotate: {
	                    degrees: -45
	                }
	            }
	        }],
	        
//	        type: 'line',
//	        xField: 'OBJECTID',
//	        yField: info[member]['index'],
//	        title:info[member]['text'],
//	        marker: true
	        
	        series: [{
	        	text: 'month',
	            type: 'line',
	            axis: 'left',
	            xField: 'yearMonth',
	            yField: 'ITEM_BOD',
	            /*
	            markerConfig: {
	                type: "circle",
	                size: 4,
	                radius: 4,
	                "stroke-width": 0
	            },*/
	            marker: true,
	            tips: {
	                trackMouse: true,
	                style: 'background: #FFF',
	                height: 40,
	                showDelay: 0,
	                dismissDelay: 0,
	                hideDelay: 0,
	                renderer: function(storeItem, item) {
	                    //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('ITEM_BOD') + '%');
	                	this.setTitle('측정일 : '+storeItem.get('yearMonth')+ '<br>' + '측정량 : ' + storeItem.get('ITEM_BOD'));
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {
        this.callParent();
        
    }
});