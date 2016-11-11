/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
	extend: 'Ext.window.Window',

	xtype: 'win-searchConfig',
	id: 'searchConfig',
	title: '검색설정',

	//width: 100,
	//height: 50,
	width: 300,
	height: 400,
	x: 387,
	y: 192,
	//style:"padding-bottom:50px;",
	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	header: false,
	style: "border: 0px;",
	layout: {
		type: 'vbox',
	},
	
	items: [{
		xtype: 'checkbox',
		boxLabel: '본류',
		checked: true,
		handler: function(obj, checked){
			if(checked == false){
				obj.setValue(true);
			}
		},
		inputValue: 'isBonDraw'
		
	}, {
		xtype: 'checkbox',
		boxLabel: '지류',
		checked: true,
		handler: function(obj, checked){
			
			var me = this.up("window");
			var isKrad = me.items.items[2].value;
			
			var saveObj = {isBonDraw:true, isJiDraw:checked, isKrad:isKrad };
			
			localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			
		},
		inputValue: 'isJiDraw'
		
	},{
		xtype: 'checkbox',
		boxLabel: 'KRAD',
		checked: false,
		handler: function(obj, checked){
			
			var me = this.up("window");
			var isJiDraw = me.items.items[1].value;
			
			var saveObj = {isBonDraw:true, isJiDraw:isJiDraw, isKrad:checked };
			
			localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			
			var confInfo = localStorage['_kradExtInfo_'];
			var jsonConf = JSON.parse(confInfo);
			
			if(checked == true){
				
				_krad.setKradOnOff();
				
			}else{
				
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
	}],

	initComponent: function(){
		
		this.callParent();
		
		//console.info(localStorage['_searchConfigInfo_']);
		if(localStorage['_searchConfigInfo_'] != null && localStorage['_searchConfigInfo_'] != undefined){
			
			confInfo = localStorage['_searchConfigInfo_'];
			console.info(confInfo);
			
			if(confInfo != undefined && confInfo != null){
				var jsonConf = JSON.parse(confInfo);
				console.info(jsonConf);
				this.items.items[1].setValue(jsonConf.isJiDraw);
				
				//this.items.items[0].items.items[0].setValue(jsonConf.isJiDraw);
			}
			else{
				console.info("else");
				var saveObj = {isBonDraw:true, isJiDraw:true, isKrad:false};
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			}
		}
	}

});