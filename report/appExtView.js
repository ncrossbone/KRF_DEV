Ext.application({
	
	name : 'Report',
	
	//appFolder: "./app",
	
	launch : function() {
		
		Ext.create("Report.view.main.rptExtViewMain", {
			renderTo: Ext.getBody()
		});
	}
});