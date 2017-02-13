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
		listeners:{
			change:{
				fn:function(field,newValue,oldValue,options){
					
					var stMonth = Ext.getCmp("cmbRptPeriodStMonth");
					var edMonth = Ext.getCmp("cmbRptPeriodEdMonth");
					var stMonthLabel = Ext.getCmp("stMonthLabel");
					var edMonthLabel = Ext.getCmp("edMonthLabel");
					var rb = newValue.rb;
					
					if(rb!=1){
						stMonth.show();
						edMonth.show();
						stMonthLabel.show();
						edMonthLabel.show();
					}else{
						stMonth.hide();
						edMonth.hide();
						stMonthLabel.hide();
						edMonthLabel.hide();
					}
				}
			}
		},
		items:[{
			boxLabel: '연 평균', 
			name: 'rb', 
			inputValue: '1', 
			checked: true,
			width:80
			
		},{
			boxLabel: '월 평균', 
			name: 'rb', 
			inputValue: '2',
			width:80
		},{
			boxLabel: '일 자료', 
			name: 'rb', 
			inputValue: '3',
			disabled:true
		}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		
	}
});