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
		xtype:"image",
		src:"../resources/images/button/blit_st_01.png",
		style:"margin-top: 8px"
	},{
		xtype: "label",
		text: "기",
		style: "margin-top: 4px; margin-left: 10px; font-weight: bold;"
	}, {
		xtype: "container",
		width: 26
	}, {
		xtype: "label",
		text: "간",
		style: "margin-top: 4px; padding-right: 10px; font-weight: bold;"
	}, {
		xtype: "label",
		text: "",
		style: "margin-top: 4px; padding-right: 10px;"
	},/* {
		xtype: "label",
		text: "월평균",
		style: "margin-top: 4px; padding-right: 10px;"
	},*/ {
		xtype: "combo",
		id: "cmbRptPeriodStYear",
		width: 70,
		editable: false
	}, {
		xtype: "label",
		text: "년",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	}/*, {
		xtype: "combo",
		id: "cmbRptPeriodStMonth",
		width: 50
	}, {
		xtype: "label",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	}*/, {
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
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;",
		editable: false
	}/*, {
		xtype: "combo",
		id: "cmbRptPeriodEdMonth",
		width: 50
	}, {
		xtype: "label",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px;"
	}*/],
	initComponent: function(){
		
		this.callParent();
		
		var nowDate = new Date();
		var nowYear = nowDate.getFullYear();
		
		var yearData = [];
		for(var i = 2000; i <= nowYear; i++){
			yearData.push(i);
		}
		
		var cmbYear = Ext.getCmp("cmbRptPeriodStYear");
		
		cmbYear.setStore(yearData);
		cmbYear.setValue(nowYear - 2);
		
		cmbYear = Ext.getCmp("cmbRptPeriodEdYear");
		
		cmbYear.setStore(yearData);
		cmbYear.setValue(nowYear);
	}
});