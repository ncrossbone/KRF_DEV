Ext.define('KRF_DEV.store.krad.krad_tmp2', {
	
	//extend: 'Ext.data.TreeStore',
	extend : 'Ext.data.Store',

	autoLoad: true,
	
	fields: [],
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/krad/krad_tmp2.json',
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
