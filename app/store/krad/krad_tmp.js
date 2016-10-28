Ext.define('KRF_DEV.store.krad.krad_tmp', {
	
	//extend: 'Ext.data.TreeStore',
	extend : 'Ext.data.Store',

	autoLoad: true,
	
	fields: [],
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/krad/krad_tmp.json',
		reader: {
			type: 'json'
		}
	},
	
	constructor: function(){
		this.callParent();
	},
	
	listeners: {
		// beforeload, load, afterload
		beforeload: function(store) {
			console.info("store");
			return;
		}
	}
});
