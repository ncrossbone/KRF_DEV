Ext.define('KRF_DEV.view.krad.kradSchConf', {
	
	extend: 'Ext.window.Window', 

	xtype: 'krad-kradSchConf',
	id: 'kradSchConf',
	title: 'KRAD',

	width: 300,
	height: 400,
	
	x: 387,
	y: 226,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: false,
	layout:{
		type:'vbox'
	},
	items:[{
		xtype:'container',
		height:365,
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
				title: '공 통',
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
								text      : '측정망명',
								dataIndex : 'TITLE',
								width: 210
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
						            var confObj = [];
						            for(var i =0 ; i < records.length ; i++){
						            	records[i].data.CHECKED = true;
						            	confObj.push(records[i].data);
						            }
						            
						            localStorage['_kradExtInfo_']= JSON.stringify(confObj);
						            
						        }
					    },
					    viewConfig: { 
					    	stripeRows: true,
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
					        			
					        			var krad_grid= Ext.getCmp("krad_grid");
					        			var krad_store = krad_grid.getStore();
					        			
					        			store.queryBy(function(record) {
					        				for(var i = 0; i < jsonConf.length;i++){
						        				if(jsonConf[i].TITLE == record.data.TITLE){
						        					s.push(record);
						        				}
						        			}
					        			});
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
								text      : '측정망명',
								dataIndex : 'TITLE',
								width: 210
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
					        			
					        			var krad_grid2= Ext.getCmp("krad_grid2");
					        			var krad_store2 = krad_grid2.getStore();
					        			
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
							console.info(confInfo);
							
							Ext.ShowSiteListWindow("", "krad");
							
							/*var listWinCtl = Ext.getCmp("siteListWindow");
							//console.info(listWinCtl);
							if (listWinCtl == undefined){
								listWinCtl = Ext.create('KRF_DEV.view.east.SiteListWindow');
							}

							listWinCtl.show();
							
							var treeCtl = listWinCtl.items.items[0];
							treeCtl.paramStore = 'KRF_DEV.store.east.KradListWindow';*/
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