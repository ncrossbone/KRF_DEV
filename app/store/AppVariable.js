Ext.define('KRF_DEV.store.AppVariable', {
	
	extend: 'Ext.data.Store',

	autoLoad: true,
	
	fields: [{
		name: 'MapserviceUrl'
	}],

	proxy: {
		type: 'ajax',
		url: './resources/data/AppVariable.json',
		reader: {
			type: 'json'
		}
	}
});
