Ext.define('KRF_DEV.store.drone.AppVariable', {
	
	extend: 'Ext.data.Store',

	autoLoad: true,
	
	fields: [{
		name: 'MapserviceUrl1'
	}],

	proxy: {
		type: 'ajax',
		url: './resources/data/AppVariable.json',
		reader: {
			type: 'json'
		}
	}
});
