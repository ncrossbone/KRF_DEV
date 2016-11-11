Ext.define('Report.view.east.rptSetItems', {
	
	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetItems',
		
	id: 'rptSetItems',
	
	title: '항목',
	
	layout: {
		type: 'hbox'
	},
	
	width: "100%",
	height: 25,
	
	items: [{
		xtype:"image",
		src:"../resources/images/button/blit_st_01.png",
		style:"margin-top: 8px"
	},{
		xtype: "label",
		text: "항",
		style: "margin-top: 4px; margin-left: 10px; font-weight: bold;"
	}, {
		xtype: "container",
		width: 26
	}, {
		xtype: "label",
		text: "목",
		style: "margin-top: 4px; padding-right: 10px; font-weight: bold;"
	}, {
		xtype: "label",
		text: "",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "checkbox",
		id: "chkRptItemBOD",
		checked: true,
		boxLabel: 'BOD',
		width: 60
	}, {
		xtype: "checkbox",
		id: "chkRptItemTP",
		checked: true,
		boxLabel: 'TP',
		width: 50
	}, {
		xtype: "checkbox",
		id: "chkRptItemCOD",
		checked: true,
		boxLabel: 'COD',
		width: 60
	}, {
		xtype: "checkbox",
		id: "chkRptItemChla",
		checked: true,
		boxLabel: 'Chl-a',
		width: 60
	}]
});