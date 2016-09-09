Ext.define('KRF_DEV.store.south.PollListWindow', {
		
		extend: 'Ext.data.TreeStore',

		autoLoad: true,

		proxy: {
			type: 'ajax',
			url: 'resources/data/PollListWindow.json',
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
				return;
			}
		}
	});
