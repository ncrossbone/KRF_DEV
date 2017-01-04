/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
	extend: 'Ext.window.Window',

	xtype: 'win-searchConfig',
	id: 'searchConfig',
	title: '검색설정',

	width: 100,
	//height: 10,
	
	x: 387,
	y: 172,

	plain: true, // 요게 있어야 background: transparent 먹음..
	cls: 'dj_toolbarConf',
	header: false,
	layout: {
		type: 'hbox',
    	align: 'top',
    	pack: 'middle'
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
			
			//console.info(checked);
			var saveObj = {isBonDraw:true, isJiDraw:checked};
			
			localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
		},
		inputValue: 'isJiDraw'
		
	}],

	initComponent: function(){
		
		this.callParent();
		
		//console.info(localStorage['_searchConfigInfo_']);
		if(localStorage['_searchConfigInfo_'] != null && localStorage['_searchConfigInfo_'] != undefined){
			
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
		}
	}

});