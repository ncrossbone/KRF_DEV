Ext.define('KRF_DEV.view.krad.kradMetaInfo', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradMetaInfo',
	id: 'kradMetaInfo',
	title: '메타상세정보',
	header: true,
    frame: true,
	width: 400,
	height: 600,
	
	x: 687,
	y: 226,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	
	

	
	items:[{
		xtype : 'container',
		width: '400px',
		height: '100%',
		border: true,
		items:[{
			xtype: 'container',
			layout:{
				xtype:'vbox'
			},
			items:[{
				xtype:'label',
				text:'기본정보'
			},{
				xtype: 'container',
				layout : {
					type : 'vbox'
				},
				items:[{
					xtype:'textfield',
					fieldLabel:'지도명'					
				},{
					xtype:'container',
					layout:{
						type: 'hbox'
					},
					items:[{
						xtype:'textfield',
						fieldLabel:'도엽명',
						width:'130px'
					},{
						xtype:'textfield',
						fieldLabel:'도엽변호',
						width:'130px'
					},{
						xtype:'textfield',
						fieldLabel:'축척',
						width:'130px'
					}]
					
				},{
					xtype:'textfield',
					fieldLabel:'제작/갱신일자'
				},{
					xtype:'textfield',
					fieldLabel:'자료포맷명'
				},{
					xtype:'textfield',
					fieldLabel:'관리/배포기관'
				},{
					xtype:'textfield',
					fieldLabel:'홈페이지'
				},{
					xtype:'textfield',
					fieldLabel:'책임기관명'
				},{
					xtype:'textfield',
					fieldLabel:'요약설명'
				}]

			},{
				xtype:'label',
				text:'기준계/공간정보'
			},{
				xtype: 'container',
				layout : {
					type : 'vbox'
				},
				items:[{
					xtype:'textfield',
					fieldLabel:'지도명'					
				},{
					xtype:'container',
					layout:{
						type: 'hbox'
					},
					items:[{
						xtype:'textfield',
						fieldLabel:'도엽명',
						width:'130px'
					},{
						xtype:'textfield',
						fieldLabel:'도엽변호',
						width:'130px'
					},{
						xtype:'textfield',
						fieldLabel:'축척',
						width:'130px'
					}]
					
				},{
					xtype:'textfield',
					fieldLabel:'제작/갱신일자'
				},{
					xtype:'textfield',
					fieldLabel:'자료포맷명'
				},{
					xtype:'textfield',
					fieldLabel:'관리/배포기관'
				},{
					xtype:'textfield',
					fieldLabel:'홈페이지'
				},{
					xtype:'textfield',
					fieldLabel:'책임기관명'
				},{
					xtype:'textfield',
					fieldLabel:'요약설명'
				}]

			}]
		
			
		}]
	}],
	initComponent: function(){
		
		//store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
		
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