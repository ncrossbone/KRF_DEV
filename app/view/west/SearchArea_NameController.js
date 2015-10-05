Ext.define('KRF_DEV.view.west.SearchArea_NameController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_NameController',
	
	control:{
		'#btnSearchText':{
			click: 'onTextSearch'
		}
	},
	
	onTextSearch: function(button, eOpts){
		
		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText");
		
		var treeResach = Ext.getCmp("siteListTree");
			if(treeResach != undefined){
				var store = treeResach.getStore();
				store.nameInfo = btn.rawValue;
				console.info(store);
				store.load();
				treeResach.getView().refresh();
				return;
			}else{
				
				if(btn.disable == false){
					btnCtl = btn;
				}
				
				var currCtl = Ext.getCmp("btnSiteListWindow");
				if(currCtl.btnOnOff == "off"){
					SetBtnOnOff("btnSiteListWindow");
					Ext.ShowSiteListWindow("test"); // 지점목록 창 띄우기
				}
		
			}
	}


	
});
