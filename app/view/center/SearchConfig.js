/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
	extend: 'Ext.window.Window',

	xtype: 'win-searchConfig',
	id: 'searchConfig',
	title: '▼',

	//width: 100,
	//height: 50,
	width: 303,
	height: 473,
	x: 387,
	y: 200,
	resizable: false,
	header: false,
	closable: false,
	//sortable: false,
	style: "border: 0px;",
	layout: {
		type: 'vbox',
	},
	
	items: [{
		xtype: 'panel',
		title: '검색설정',
		//bodyStyle:{"background-color":"#dfeaf2"}, 
		layout: {
			type: 'hbox',
		},
		width: 303,
		height: 70,
		items:[{
			xtype: 'checkbox',
			boxLabel: '본류',
			checked: true,
			width:50,
			style:"margin-top:5px; margin-left:30px;",
			handler: function(obj, checked){
				if(checked == false){
					obj.setValue(true);
				}
			},
			inputValue: 'isBonDraw'

		},{
			xtype: 'checkbox',
			boxLabel: '지류',
			checked: true,
			width:50,
			style:"margin-top:5px; margin-left:30px;",
			handler: function(obj, checked){
				
				var me = this.up("window");
				var isKrad = me.items.items[2].value;
				
				var saveObj = {isBonDraw:true, isJiDraw:checked, isKrad:isKrad };
				
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
				
			},
			inputValue: 'isJiDraw'
			
		}]
		//style:"background-color:black;"
	},{
		xtype: 'panel',
		title: '데이터 셋 선택',
		width: 303,
		height: 50
	},{
	xtype:'container',
	height:300,
	autoScroll: true,
	items:[{
		layout: {
			type: 'accordion',
			animate: true,
			multi: true
		},
		width: 287,
		items:[{
			collapsed: false,
			//width:300,
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
			        locked   : true,
					store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
					columns: [{	 
							text      : '측정망명',
							id		  : 'testtitle',
							dataIndex : 'TITLE',
							width: 208
							//filter: {type: 'numeric'}
						},{	 
							text:'버튼',
							align:'center',
							xtype:'actioncolumn',
							width:45,
							items:[{ 
								icon: './resources/images/button/info.png',  // Use a URL in the icon config
				                tooltip: 'Edit',
				                handler: function(grid, rowIndex, colIndex,a,rowdata) {
				                	
				                	kradMetaInfo(rowdata);
				                	
				                }
							}]
						}],
					 listeners: {
						 afterrender:function( thisObj, eOpts ){
						        var sm=thisObj.getSelectionModel();
						        sm.selectAll(true);
						        sm.setLocked(true);
						 }
				    },
				    viewConfig:{
				    	getRowClass: function(record, rowIndex, rowParams, store) {
							 return 'pdj_kradText';
							 
					   }
				    }
				 
				}]
			}]
		},{
			collapsed: false,
			xtype : 'panel',
			//autoScroll: true,
			layout : {
				type : 'vbox'
			},
			cls: 'dj_layer_nm',
			title: '사용자지정',
			style:'margin-top: 20px;',
			items:[{
				xtype: 'container',
				width: '100%',
				height: '100%',
				items: [{
					xtype: 'grid',
					columnLines: false,
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
		                        	if(record.data.EVENT_TYPE == "Point"){
		                        		return 'icon_point';
		                        	}else if(record.data.EVENT_TYPE == "Line"){
		                        		return 'icon_line';
		                        	}
		                        }
		                    }]
						},{	 
							text      : '측정망명',
							dataIndex : 'TITLE',
							width: 158
							//filter: {type: 'numeric'}
						},{	 
							text:'버튼',
							align:'center',
							xtype:'actioncolumn',
							width:45,
							items:[{ 
								icon: './resources/images/button/info.png',  // Use a URL in the icon config
				                tooltip: 'Edit',
				                handler: function(grid, rowIndex, colIndex, a, rowdata) {
				                	
				                	kradMetaInfo(rowdata);
									
				                }
							}]
						}],
					 listeners: {
					        selectionchange: function(model, records) {
					            var confObj2 = [];
					            var kradLayer = [];
					            
					            
					            for(var i =0 ; i < records.length ; i++){
					            	records[i].data.CHECKED = true;
					            	confObj2.push(records[i].data);
					            }
					            
					            localStorage['_kradExtInfo2_']= JSON.stringify(confObj2);
					            
			        			//사용자지정 로컬스토리지
			        			var confInfo2 = localStorage['_kradExtInfo2_'];
			        			var jsonConf2 = JSON.parse(confInfo2);
								
								
								if(jsonConf2.length > 0){
									for(var i =0 ; i < jsonConf2.length;i++){
										if(jsonConf2[i].EVENT_TYPE == "Point"){
											kradLayer.push(jsonConf2[i].PD_LAYER_ID);
										}
										if(jsonConf2[i].EVENT_TYPE == "Line"){
											kradLayer.push(jsonConf2[i].LO_LAYER_ID);
										}
									}
								}
								
								_krad.setKradOnOff(kradLayer);
					            
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
				        			
				        			
				        			store2.queryBy(function(record2) {
				        				for(var i = 0; i < jsonConf2.length;i++){
					        				if(jsonConf2[i].TITLE == record2.data.TITLE){
					        					s2.push(record2);
					        				}
					        			}
				        			});
				        			model2.select(s2);
				              }
					       },
					       getRowClass: function(record, rowIndex, rowParams, store) {
								 return 'pdj_kradText';
								 
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
			style:'margin-top:20px; margin-left:5px;',
			items:[{
				xtype:'image',
				src: './resources/images/button/btn_app.gif',
				listeners:{
					el:{
						click:function(){
							
							var kradLayer = [];
							
		        			//사용자지정 로컬스토리지
		        			var confInfo2 = localStorage['_kradExtInfo2_'];
		        			var jsonConf2 = JSON.parse(confInfo2);
							
							if(jsonConf2.length > 0){
								for(var i =0 ; i < jsonConf2.length;i++){
									if(jsonConf2[i].EVENT_TYPE == "Point"){
										kradLayer.push(jsonConf2[i].PD_LAYER_ID);
									}
									if(jsonConf2[i].EVENT_TYPE == "Line"){
										kradLayer.push(jsonConf2[i].LO_LAYER_ID);
									}
								}
							}
							
							_krad.setKradOnOff(kradLayer);
							
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
			//console.info(confInfo);
			
			if(confInfo != undefined && confInfo != null){
				var jsonConf = JSON.parse(confInfo);
				
				this.items.items[0].items.items[0].setValue(jsonConf.isJiDraw);
			}
			else{
				//console.info("else");
				var saveObj = {isBonDraw:true, isJiDraw:true};
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			}
		}
	}

});