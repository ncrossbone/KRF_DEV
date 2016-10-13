Ext.define('Report.view.east.rptSetPeriod', {
	
	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetPeriod',
		
	id: 'rptSetPeriod',
	
	title: '기간',
	
	layout: {
		type: 'hbox'
	},
	
	width: "100%",
	height: 25,
	
	items: [{
		xtype: "label",
		text: "기",
		style: "margin-top: 4px;"
	}, {
		xtype: "container",
		width: 26
	}, {
		xtype: "label",
		text: "간",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "label",
		text: ":",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "combo",
		id: "cmbRptPeriodStYear",
		width: 70
	}, {
		xtype: "label",
		text: "년",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	}, {
		xtype: "combo",
		id: "cmbRptPeriodStMonth",
		width: 50
	}, {
		xtype: "label",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	}, {
		xtype: "label",
		text: "~",
		style: "margin-top: 4px; padding-right: 5px;"
	}, {
		xtype: "combo",
		id: "cmbRptPeriodEdYear",
		width: 70
	}, {
		xtype: "label",
		text: "년",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	}, {
		xtype: "combo",
		id: "cmbRptPeriodEdMonth",
		width: 50
	}, {
		xtype: "label",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px;"
	}]
});