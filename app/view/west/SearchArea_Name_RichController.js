Ext.define('KRF_DEV.view.west.SearchArea_Name_RichController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_RichController',

	onClickSearch_Reach: function(evtArgs, el) {
		
		var listCtl = Ext.getCmp("searchAreaList");
		listCtl.removeAll();
		listCtl.doLayout();
		
	}
});
