Ext.define('Report.view.east.rptSetContainer', {

	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetContainer',
	
	requires:['Report.view.east.rptSetPeriod',
	          'Report.view.east.rptSetItems',
	          'Report.view.east.rptSetSiteAttr',
	          'Report.view.east.rptSetSiteList'],
	
	id: 'rptSetContainer',
	
	title: '리포팅 셋팅 컨테이너',
	header: false,
	
	layout: {
		type: 'vbox'
	},
	
	width: "100%",
	height: 800,
	
	style: "margin-left: 10px; margin-top: 10px;",

	items: [{
		xtype: 'rpt-east-rptSetPeriod',
		title: '기간'
	}, {
		xtype: 'rpt-east-rptSetItems',
		title: '항목'
	}, {
		xtype: 'rpt-east-rptSetSiteAttr',
		title: '지점속성'
	}, {
		xtype: 'rpt-east-rptSetSiteList',
		title: '지점',
		height: 600
	}, {
		xtype: 'button',
		text: '리포트보기',
		listeners: {
			el: {
				click: function(){
					
					Ext.getCmp("_rptMapDiv_").capture();
				}
			}
		}
	}]
});