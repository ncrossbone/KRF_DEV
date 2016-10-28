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
	style: "border: 1px;",
	header: false,
	layout:{
		type:'vbox'
	},
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
			title :  '공통',
			items:[{
				xtype: 'container',
				width: '100%',
				height: '100%',
				
				//id: 'krad_grid',
				items: [{
					xtype: 'grid',
					columnLines: true,
					hideHeaders: true,
			        selType: 'checkboxmodel',
					store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
					columns: [{	 
							text      : '측정망명',
							dataIndex : 'TITLE',
							width: 150
							//filter: {type: 'numeric'}
						},{	 
							text:'버튼',
							align:'center',
							xtype:'actioncolumn',
							width:50,
							items:[{
								xtype:'button',
								text:'button',
								handler: function(a,b,c,d){
									var metaInfo = Ext.getCmp("kradMetaInfo");
									if(metaInfo == undefined){
										metaInfo = Ext.create("KRF_DEV.view.krad.kradMetaInfo",{
											asdf: 'asdf'
										});
									}
									metaInfo.show();
								}
							}]
						}],
						 listeners: {
						        selectionchange: function(model, records) {
						            console.info(records);
						            //records[0].data
						            //localStorage['_kradExtInfo_']= JSON.stringify(confObj);
						            var confObj = [];
						            for(var i =0 ;i < records.length;i++){
						            	confObj.push(records[i].data);
						            }
						            
						            localStorage['_kradExtInfo_']= JSON.stringify(confObj);
						            
						            
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
				title :  '사용자지정',
				items:[{
					xtype: 'container',
					width: '100%',
					height: '100%',
					
					//id: 'krad_grid',
					items: [{
						xtype: 'grid',
						columnLines: true,
						hideHeaders: true,
				        selType: 'checkboxmodel',
						store : Ext.create('KRF_DEV.store.krad.krad_tmp2'),
						columns: [{	 
								text      : '측정망명',
								dataIndex : 'TITLE',
								width: 150
								//filter: {type: 'numeric'}
							},{	 
								text:'버튼',
								align:'center',
								xtype:'actioncolumn',
								width:50,
								items:[{
									xtype:'button',
									text:'button',
									handler: function(a,b,c,d){
										var metaInfo = Ext.getCmp("kradMetaInfo");
										if(metaInfo == undefined){
											metaInfo = Ext.create("KRF_DEV.view.krad.kradMetaInfo",{
												asdf: 'asdf'
											});
										}
										metaInfo.show();
									}
								}]
							}],
							 listeners: {
							        selectionchange: function(model, records) {
							            console.info(records);
							            //records[0].data
							            //localStorage['_kradExtInfo_']= JSON.stringify(confObj);
							            var confObj = [];
							            for(var i =0 ;i < records.length;i++){
							            	confObj.push(records[i].data);
							            }
							            
							            localStorage['_kradExtInfo_']= JSON.stringify(confObj);
							            
							            
							        }
							    }
						}]
					}]
				}]
	},{
		xtype:'button',
		text: '적용',
		listeners:{
			click:function(){
				var confInfo = localStorage['_kradExtInfo_'];
				console.info(confInfo);
			}
		}
	}]
	,
	initComponent: function(){
		
		//store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
		//localStorage['_kradExtInfo_']
		//localStorage['_kradGroupInfo_']
		//[{id: kk, name: kk, checked: true}, {{id: kk, name: kk, checked: true}]
		this.callParent();
		
		//console.info(localStorage['_searchConfigInfo_']);
		/*if(localStorage['_searchConfigInfo_'] != null && localStorage['_searchConfigInfo_'] != undefined){
			
			confInfo = localStorage['_searchConfigInfo_'];
			
			if(confInfo != undefined && confInfo != null){
				//console.info(JSON.parse(confInfo));
				var jsonConf = JSON.parse(confInfo);
				this.items.items[1].setValue(jsonConf.isJiDraw);
			}
			else{
				//console.info(checked);
				var saveObj = {isBonDraw:true, isJiDraw:true};
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			}
		}*/
	}

});