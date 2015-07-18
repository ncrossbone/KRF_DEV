Ext.define('KEF_DEV.view.center.Center', {
	
	extend: 'Ext.panel.Panel',
	
	title: '전체',
	
	collapsible: true,
	
	xtype: 'app-default-center',
	
	items: [{
		xtype: 'app-map-coreMap',
		width: '100%',
		height: '100%'
	}],
	
	initComponent: function(){
		Ext.create('KRF_DEV.view.common.MapToolbar');
		this.callParent();
	}
	
});