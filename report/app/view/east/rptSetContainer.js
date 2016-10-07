Ext.define('KRF_DEV.view.east.rptSetContainer', {

	extend: 'Ext.container.Container',
	
	xtype : 'app-report-rptsetcontainer',
	
	id: 'rptSetContainer',
	
	title: '리포팅 셋팅 컨테이너',
	header: false,
	
	layout: {
		type: 'vbox'
	},
	
	//cls: 'khLee-window-panel-header khLee-x-window-default ',

	items: [{
		xtype: 'panel',
		id: 'panel1',
		title: '상단 패널',
		width: "100%",
		height: 450
	}, {
		xtype: 'panel',
		id: 'panel2',
		title: '하단 패널',
		width: "100%",
		height: 450
	}]
});