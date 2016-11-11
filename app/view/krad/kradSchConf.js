Ext.define('KRF_DEV.view.krad.kradSchConf', {
	
	extend: 'Ext.window.Window', 

	xtype: 'krad-kradSchConf',
	id: 'kradSchConf',
	title: 'KRAD',

	width: 300,
	height: 400,
	
	x: 902,
	y: 173,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: false,
	layout:{
		type:'vbox'
	},
	items:[{
		xtype: 'checkbox',
		boxLabel: 'KRAD',
		checked: false,
		handler: function(obj, checked){
			
			
			if(checked == true){
				//GetCoreMap().kradLayerAdmin.setDynamicLayer();
				console.info("true");
				_krad.setKradOnOff();
			}
			else{
				_krad.setKradOnOff();
			}
		},
		inputValue: 'isKrad'
	},{
		xtype:'container',
		height:165,
		items:[{
			layout: {
				type: 'accordion'
			},
			width: 300,
			items:[{
				xtype : 'panel',
				//autoScroll: true,
				layout : {
					type : 'vbox'
				},
				cls: 'dj_layer_nm',
				title: '공통',
				items:[{
					xtype: 'container',
					width: '100%',
					height: '100%',
					items: [{
						xtype: 'grid',
						columnLines: true,
						hideHeaders: true,
						id: 'krad_grid',
				        selType: 'checkboxmodel',
						store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
						columns: [{	 
							align:'center',
							xtype:'actioncolumn',
							width:50,
							items:[{
		                        getClass : function(value, meta, record, rowIx, ColIx, store) {
		                        	if(record.data.SHP == "Point"){
		                        		return 'icon_point';
		                        	}else if(record.data.SHP == "Line"){
		                        		return 'icon_line';
		                        	}
		                        }
		                    }]
						},{	 
								text      : '측정망명',
								dataIndex : 'TITLE',
								width: 160
								//filter: {type: 'numeric'}
							},{	 
								text:'버튼',
								align:'center',
								xtype:'actioncolumn',
								width:50,
								items:[{ 
									icon: './resources/images/button/info.png',  // Use a URL in the icon config
					                tooltip: 'Edit',
					                handler: function(grid, rowIndex, colIndex) {
					                	var metaInfo = Ext.getCmp("kradMetaInfo");
										if(metaInfo == undefined){
											metaInfo = Ext.create("KRF_DEV.view.krad.kradMetaInfo");
										}
										metaInfo.show();
					                }
								}]
							}],
						 listeners: {
							    selectionchange: function(model, records) {
							    	if(KRF_DEV.getApplication().kradFirst == "Y"){
							    		var confInfo = localStorage['_kradExtInfo_'];
					        			var jsonConf = JSON.parse(confInfo);
					        			
					        			var confObj = [];
							            for(var i =0 ; i < records.length ; i++){
							            	records[i].data.CHECKED = true;
							            	jsonConf.push(records[i].data);
							            }
							            
							    	}else{
							    		var confObj = [];
							            for(var i =0 ; i < records.length ; i++){
							            	records[i].data.CHECKED = true;
							            	confObj.push(records[i].data);
							            }
							            localStorage['_kradExtInfo_']= JSON.stringify(confObj);
							    	}
							    	KRF_DEV.getApplication().kradFirst = "N";
						            
						        }
					    },
					    
					    viewConfig: {
					    	stripeRows: false,
					        listeners : {
					        	beforerefresh : function(view) {
				                    var store = view.getStore();
				            	 	var model = view.getSelectionModel();
				                    var s = [];
				                    
				                    var confInfo = localStorage['_kradExtInfo_'];
				                    if(confInfo == undefined){
				                    	return;
				                    }
				        			var jsonConf = JSON.parse(confInfo);
				        			console.info(jsonConf);
				        			
				        			console.info(store);
				        			store.queryBy(function(record) {
				        				for(var i = 0; i < jsonConf.length;i++){
					        				if(jsonConf[i].TITLE == record.data.TITLE){
					        					s.push(record);
					        				}
					        			}
				        			});
				        			
				        			KRF_DEV.getApplication().kradFirst = "Y";
				        			model.select(s);
				        			
				              }
					       }
					    }
					}]
				}]
			},{
				xtype : 'panel',
				//autoScroll: true,
				layout : {
					type : 'vbox'
				},
				cls: 'dj_layer_nm',
				title: '사 용 자 지 정',
				items:[{
					xtype: 'container',
					width: '100%',
					height: '100%',
					items: [{
						xtype: 'grid',
						columnLines: true,
						hideHeaders: true,
						id: 'krad_grid2',
				        selType: 'checkboxmodel',
						store : Ext.create('KRF_DEV.store.krad.krad_tmp2'),
						columns: [{	 
							align:'center',
							xtype:'actioncolumn',
							width:50,
							items:[{
		                        getClass : function(value, meta, record, rowIx, ColIx, store) {
		                        	if(record.data.SHP == "Point"){
		                        		return 'icon_point';
		                        	}else if(record.data.SHP == "Line"){
		                        		return 'icon_line';
		                        	}
		                        }
		                    }]
						},{	 
								text      : '측정망명',
								dataIndex : 'TITLE',
								width: 160
								//filter: {type: 'numeric'}
							},{	 
								text:'버튼',
								align:'center',
								xtype:'actioncolumn',
								width:50,
								items:[{ 
									icon: './resources/images/button/info.png',  // Use a URL in the icon config
					                tooltip: 'Edit',
					                handler: function(grid, rowIndex, colIndex) {
					                	var metaInfo = Ext.getCmp("kradMetaInfo");
										if(metaInfo == undefined){
											metaInfo = Ext.create("KRF_DEV.view.krad.kradMetaInfo");
										}
										metaInfo.show();
					                }
								}]
							}],
						 listeners: {
						        selectionchange: function(model, records) {
						            var confObj2 = [];
						            for(var i =0 ; i < records.length ; i++){
						            	records[i].data.CHECKED = true;
						            	confObj2.push(records[i].data);
						            }
						            
						            localStorage['_kradExtInfo2_']= JSON.stringify(confObj2);
						            
						        }
					    },
					    viewConfig: { 
					    	stripeRows: true,
					        listeners : {
					             beforerefresh : function(view) {
					                    var store2 = view.getStore();
					            	 	var model2 = view.getSelectionModel();
					                    var s2 = [];
					                    
					                    var confInfo2 = localStorage['_kradExtInfo2_'];
					                    if(confInfo2 == undefined){
					                    	return;
					                    }
					        			var jsonConf2 = JSON.parse(confInfo2);
					        			console.info(jsonConf2);
					        			
					        			store2.queryBy(function(record2) {
					        				for(var i = 0; i < jsonConf2.length;i++){
						        				if(jsonConf2[i].TITLE == record2.data.TITLE){
						        					s2.push(record2);
						        				}
						        			}
					        			});
					        			model2.select(s2);
					              }
					       }
					    }
					}]
				}]
			}]
				}]
			},{
		xtype:'container',
		layout:{
			type: 'hbox'
		},
		items:[{
			xtype:'container',
			width:230
		},{
			xtype:'container',
			height:50,
			width:70,
			items:[{
				xtype:'image',
				src: './resources/images/button/btn_app.gif',
				listeners:{
					el:{
						click:function(){
							
							
							var confInfo = localStorage['_kradExtInfo_'];
		        			var jsonConf = JSON.parse(confInfo);
							console.info(jsonConf);
							
							_krad.setKradOnOff();
							
						}
					}
				}
			}]
		}]
	}]
	,
	initComponent: function(){
		
		this.callParent();
		
	}

});