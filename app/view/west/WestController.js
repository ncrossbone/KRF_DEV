/**
* West Controller
*/
Ext.define('KRF_DEV.view.west.WestController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.west',

	onClickButton: function(button, e) {
		Ext.create('KRF_DEV.view.common.Window', {
			params: button.params
		});
	},
	
	onClickWestScale: function() {
		
	}
});
