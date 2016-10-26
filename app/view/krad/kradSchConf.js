Ext.define('KRF_DEV.view.krad.kradSchConf', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradSchConf',
	id: 'kradSchConf',
	title: 'KRAD',

	width: 300,
	height: 400,
	
	x: 387,
	y: 200,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: false,
	layout: {
		type: 'vbox',
	},
	
	items: [{
		xtype: 'checkbox',
		boxLabel: 'KRAD',
		checked: true,
		height: 25,
		style: "padding-left: 5px;"
	}, {
		title: '주제도 선택',
		xtype: 'treepanel',
		id: 'kradSchTree',
		header: false,
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store : Ext.create('KRF_DEV.store.west.Layer01Store'),
		rootVisible: false,
		useArrows: true,
		bufferedRenderer: false,
		width: "100%",
		height: 375,
		style: "padding-left: 10px;"
	}],

	initComponent: function(){
		
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