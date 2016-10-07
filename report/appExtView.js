Ext.application({
	
	name : 'KRF_DEV',
	
	appFolder: "./app",
	
	launch : function() {
		
		Ext.create("KRF_DEV.view.main.rptExtViewMain", {
			renderTo: Ext.getBody()
		});
	}
});