/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
	extend: 'Ext.window.Window',

	xtype: 'win-searchConfig',
	id: 'searchConfig',
	title: '검색설정',

	width: 200,
	//height: 50,
	x: 387,
	y: 172,
	style:"padding-bottom:50px;",
	plain: true, // 요게 있어야 background: transparent 먹음..
	cls: 'dj_toolbarConf',
	header: false,
	
	layout: {
		type: 'vbox',
    	align: 'top',
    	pack: 'middle'
	},
	
	items: [{
		xtype: 'container',
		layout:{
			type: 'hbox'
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
				var saveObj = {isBonDraw:true, isJiDraw:checked, isKrad: false};
				
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			},
			inputValue: 'isJiDraw'
			
		}]	
	},{
		xtype: 'checkbox',
		boxLabel: 'KRAD',
		checked: false,
		handler: function(obj, checked){
			console.info(obj);
			
			var kradConf = Ext.getCmp("kradSchConf");
			if(kradConf == undefined){
				kradConf = Ext.create("KRF_DEV.view.krad.kradSchConf");
			}
			
			
			if(checked == true){
				kradConf.show();
			}else{
				kradConf.hide();
			}
			
			
			
			var saveObj = {isBonDraw:true, isJiDraw:true, isKrad: checked};
			
			localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
		},
		inputValue: 'isKrad'
	}],

	initComponent: function(){
		
		this.callParent();
		
		//console.info(localStorage['_searchConfigInfo_']);
		if(localStorage['_searchConfigInfo_'] != null && localStorage['_searchConfigInfo_'] != undefined){
			
			confInfo = localStorage['_searchConfigInfo_'];
			
			
			if(confInfo != undefined && confInfo != null){
				var jsonConf = JSON.parse(confInfo);
				this.items.items[1].setValue(jsonConf.isKrad);
				this.items.items[0].items.items[0].setValue(jsonConf.isJiDraw);
			}
			else{
				console.info("else");
				var saveObj = {isBonDraw:true, isJiDraw:true, isKrad:false};
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			}
		}
	}

});