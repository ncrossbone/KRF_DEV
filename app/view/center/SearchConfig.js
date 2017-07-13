/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {

	extend: 'Ext.window.Window',
	xtype: 'win-searchConfig',
	id: 'searchConfig',
	
	width: 303,
    //height: 150,
	height: 527,
	x: 387,
	y: 200,
	
	header: false,
	closable: false,
	
	style: "border: 0px;",
	layout: {
		type: 'vbox'
	},
	
	items: [{
		xtype: "panel",
		title: "검색설정",
		layout: {
			type: "vbox"
		},
		width: "100%",
		items: [{
			xtype: 'container',
            style:"padding-left: 30px; padding-top: 6px; font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px;",
			layout: {
				type: 'vbox'
			},
			width: "100%",
            height: 70,
			items:[{
				xtype: 'checkbox',
				boxLabel: '상류',
				checked: false,
				width:50,
				handler: function(obj, checked){
					
					if(checked == true){
						
						// 중권역 체크박스 활성
						this.up("container").query("#chkMWDraw")[0].enable();
						this.up("container").query("#chkMWDraw")[0].setValue(true);
						// 댐/보 체크박스 활성
						this.up("container").query("#chkDaemBoDraw")[0].enable();
					}
					else{
						
						// 중권역 체크박스 비활성
						this.up("container").query("#chkMWDraw")[0].disable();
						this.up("container").query("#chkMWDraw")[0].setValue(false);
						// 댐/보 체크박스 비활성
						this.up("container").query("#chkDaemBoDraw")[0].disable();
						this.up("container").query("#chkDaemBoDraw")[0].setValue(false);
					}
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isUpDraw'
			},{                
				xtype:"container",
				layout:{
					type:"hbox"
				},
                width: "100%",
                style:"padding-left: 20px;",
                height: 35,
                items:[{
                    xtype:"label",
                    text:"└"
                },{
                    xtype: 'checkbox',
                    itemId: "chkMWDraw",
                    id: "chkMWDraw",
                    style:"padding-left:10px;",
                    boxLabel: '중권역',
                    checked: false,
                    disabled: true,
                    width:65,
                    handler: function(obj, checked){
                        
                        
                        
                        var chkDaemBoDraw = Ext.getCmp('chkDaemBoDraw');
                        if(checked==true){
                            chkDaemBoDraw.setValue(false);
                        }else{
                            chkDaemBoDraw.setValue(true);
                        }
                        
                        // 로컬 스토리지 셋팅
                        this.up("win-searchConfig").setLocalStorage();
                        
                    },
                    inputValue: 'isMWDraw'
                }, {
                    xtype: 'checkbox',
                    itemId: "chkDaemBoDraw",
                    id: "chkDaemBoDraw",
                    style:"padding-left:10px;",
                    boxLabel: '댐/보',
                    checked: false,
                    disabled: true,
                    width:80,
                    handler: function(obj, checked){
                        
                        
                        var chkMWDraw = Ext.getCmp('chkMWDraw');
                        if(checked==true){
                            chkMWDraw.setValue(false);
                        }else{
                            chkMWDraw.setValue(true);
                        }
                        
                        // 로컬 스토리지 셋팅
                        this.up("win-searchConfig").setLocalStorage();
                        
                        
                        
                    },
                    inputValue: 'isDaemBoDraw'
                }]
			}]
		}, {
			xtype: 'container',
			style:"font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px; padding-left: 30px; padding-top: 6px; border-top: 1px dotted #595959;",
			layout: {
				type: 'hbox'
			},
			width: "100%",
            height: 35,
			items:[{
				xtype: 'checkbox',
				boxLabel: '본류',
				checked: true,
				width:50,
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
				handler: function(obj, checked){
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isJiDraw'
			}]
		}]
	},{
		
		xtype: "panel",
		title: "검색설정",
		layout: {
			type: "vbox"
		},
		width: "100%",
		items:[{
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
					title: '사 용 자 지 정',
					style:'margin-top: 5px;',
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
							            
							            _krad.kradInfo = confObj2;
							            
							            localStorage['_kradExtInfo2_']= JSON.stringify(confObj2);
							            
					        			//사용자지정 로컬스토리지
					        			var confInfo2 = localStorage['_kradExtInfo2_'];
					        			var jsonConf2 = JSON.parse(confInfo2);
										
										
										if(jsonConf2.length > 0){
											for(var i =0 ; i < jsonConf2.length;i++){
												if(jsonConf2[i].EVENT_TYPE == "Point"){
													kradLayer.push(jsonConf2[i].PE_LAYER_ID);
												}
												if(jsonConf2[i].EVENT_TYPE == "Line"){
													kradLayer.push(jsonConf2[i].LO_LAYER_ID);
												}
											}
										}
										_krad.setKradOnOff(kradLayer);
							            //console.info(jsonConf2);
							            //console.info(kradLayer);
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
						        			
						        			_krad.kradInfo = jsonConf2;
						        			
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
											kradLayer.push(jsonConf2[i].PE_LAYER_ID);
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
		
		// 체크박스 셋팅
		this.setCheckBox();
	},
	// 체크박스 셋팅
	setCheckBox: function(){
		
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		// 체크박스 컨트롤 배열
		var chkCtls = this.query("checkbox");
		//console.info(searchConfigInfo);
		if(chkCtls != undefined && chkCtls != null){
			
			// 로컬 스토리지 존재하면
			if(searchConfigInfo != undefined && searchConfigInfo != null){
			
				var searchConfigInfoJson = JSON.parse(searchConfigInfo);
				
				// 체크박스 셋팅
				for(var i = 0; i < chkCtls.length; i++){
					
					if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
						
						var checked = eval("searchConfigInfoJson." + chkCtls[i].inputValue);
						chkCtls[i].setValue(checked);
					}
				}
			}
			else{
				
				// 로컬 스토리지 셋팅
				this.setLocalStorage();
			}
		}
	},
	// 로컬 스토리지 셋팅
	setLocalStorage: function(){
		
		var chkCtls = this.query("checkbox");
		var jsonObj = {};
		
		for(var i = 0; i < chkCtls.length; i++){
			
			if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
				
				eval("jsonObj." + chkCtls[i].inputValue + " = " + chkCtls[i].checked);
			}
		}
		
		localStorage['_searchConfigInfo_'] = JSON.stringify(jsonObj);
	},
	getLocalStorage: function(){
		
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		var searchConfigInfoJson = null;
		
		if(searchConfigInfo != undefined && searchConfigInfo != null){
			
			searchConfigInfoJson = JSON.parse(searchConfigInfo);
		}
		else{
			
			// 로컬 스토리지 셋팅
			this.setLocalStorage();
			searchConfigInfoJson = JSON.parse(localStorage['_searchConfigInfo_']);
		}
		
		return searchConfigInfoJson;
	}
});