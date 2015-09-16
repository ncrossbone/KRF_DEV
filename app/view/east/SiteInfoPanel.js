Ext.define('KRF_DEV.view.east.SiteInfoPanel', {
	extend : 'Ext.panel.Panel',
	
	xtype : 'east-siteinfopanel',
	
	id: 'siteInfoPanel',
	
	title: '지점 정보',
	header: false,
	
	layout: {
		type: 'fit'
	},
	
	//bodyStyle: 'background-color: white;',
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	width: 400,
	height: 300,

	items: [{
		xtype: 'grid',
		plugins: 'gridfilters',
		cls: 'khLee-x-column-header-text',
		height: 215,
		header: {
		height: 5
		},
		title: '검색결과',
		header: false,
		//store: 'KRF_DEV.store.east.SiteInfoPanel',
		store: Ext.create('KRF_DEV.store.east.SiteInfoPanel'),
		columns: [{
			text      : '구분',
			dataIndex : 'column',
			width: 150
		}, {
			text      : '내용',
			dataIndex : 'cont',
			width: 240
		}]
	}]
});