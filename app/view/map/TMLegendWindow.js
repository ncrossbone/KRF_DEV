Ext.define('KRF_DEV.view.map.TMLegendWindow', {
	
	extend : 'Ext.window.Window',
	xtype : 'tmlegendwindow',
	id: 'tmLegendWindow',
	title: '범례',
	constrain: true,
	//cls: 'khLee-window-panel-header khLee-x-window-default ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	width: 230,
	height: 290,
	
	x: 120,
	y: 700,
	
	items: [{
		xtype: "panel",
		id: "tmLegendPanel",
		html: '<div id="tmLegend" style="padding-top: 4px;"></div>'
	}]
});