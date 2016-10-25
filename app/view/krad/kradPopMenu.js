Ext.define('KRF_DEV.view.krad.kradPopMenu', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradPopMenu',
	id: 'kradPopMenu',
	title: 'KRAD Popup Menu',

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: true,
	layout: {
		type: 'vbox',
	},

	initComponent: function(){
		
		var me = this;
		
		me.items = [{
			title: 'KRAD 기능 선택',
			xtype: 'treepanel',
			id: 'kradPopMnuTree',
			header: false,
			scroll: false,
			viewConfig: {
				style: { overflow: 'auto', overflowX: 'hidden' }
			},
			store : me.store,
			rootVisible: false,
			useArrows: true,
			bufferedRenderer: false,
			width: "100%",
			height: 350,
			style: "padding-left: 10px;"
		}];
		
		me.callParent();
		
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