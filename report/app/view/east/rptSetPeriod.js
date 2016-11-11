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
	},{
		xtype: "container",
		width: 26
	},{
		xtype: "label",
		text: "간",
		style: "margin-top: 4px; padding-right: 10px; font-weight: bold;"
	},{
		xtype: "label",
		text: "",
		style: "margin-top: 4px; padding-right: 10px;"
	},{
		xtype: "combo",
		id: "cmbRptPeriodStYear",
		width: 65,
		editable: false
	},{
		xtype: "label",
		text: "년",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	},{
		xtype: "combo",
		id: "cmbRptPeriodStMonth",
		width: 50,
		editable: false
	},{
		xtype: "label",
		id:"stMonthLabel",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
	},{
		xtype: "label",
		text: "~",
		style: "margin-top: 4px; padding-right: 5px;"
	}, {
		xtype: "combo",
		id: "cmbRptPeriodEdYear",
		width: 65
	}, {
		xtype: "label",
		text: "년",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;",
		editable: false
	},{
		xtype: "combo",
		id: "cmbRptPeriodEdMonth",
		width: 50,
		editable: false
	},{
		xtype: "label",
		id: "edMonthLabel",
		text: "월",
		style: "margin-top: 4px; padding-left: 2px; padding-right: 5px;"
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
		
		var stMonth = Ext.getCmp("cmbRptPeriodStMonth");
		var edMonth = Ext.getCmp("cmbRptPeriodEdMonth");
		var stMonthLabel = Ext.getCmp("stMonthLabel");
		var edMonthLabel = Ext.getCmp("edMonthLabel");
		
		var monthData = [];
		
		for(var i =1; i <= 12; i++){
			monthData.push(i);
		}
		
		stMonth.setStore(monthData);
		edMonth.setStore(monthData);
		
		stMonth.setValue(1);
		edMonth.setValue(1);
		
		stMonth.hide();
		edMonth.hide();
		stMonthLabel.hide();
		edMonthLabel.hide();
		
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