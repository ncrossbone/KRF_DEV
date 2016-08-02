Ext.define('KRF_DEV.view.center.drone.LegendChl', {
	
	extend: 'Ext.window.Window',
	id: 'chlLegend',
	xtype: 'legendchl-panel',
	
	height: 61,
	width: 244,
	
	title: '클로로필a 범례',
	header: false,
	
	layout: {
		type: 'absolute'
	},
	
	x: Ext.getBody().getViewSize().width - 244,
	y: Ext.getBody().getViewSize().height - 61,
	
	cls: 'khLee-window-panel-header-expand',
	style: 'border-width: 0px !important; background: #fff !important;',
	
	items: [{
		xtype: 'image',
		id: 'imgLegend',
		src: './resources/images/drone/legend/standard.png',
		style: 'border:0px;',
		height: 54,
		width: 232
	}]
	
});