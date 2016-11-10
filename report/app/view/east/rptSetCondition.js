Ext.define('Report.view.east.rptSetCondition', {
	
	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetCondition',
		
	id: 'rptSetCondition',
	
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
		text: "검색조건",
		style: "margin-top: 4px; margin-left: 10px; font-weight: bold;"
	}, {
		xtype: "container",
		width: 15
	},{
		id:"rptRadio",
		xtype:"radiogroup",
		vertical: true,
		items:[{boxLabel: '연 평균', name: 'rb', inputValue: '1', checked: true},
		       {boxLabel: '월 평균', name: 'rb', inputValue: '2'}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		
	}
});