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
		xtype: 'container',
		layout: {
			type: 'fit'
		},
		items: [{
			xtype: 'image',
			src: '../resources/images/button/btn_report.png',
			style: 'cursor: pointer;',
			text: '리포트보기',
			listeners: {
				el: {
					click: function(){
						
						var paramCode = "";
						var listStore = Ext.getCmp("treeRptSiteList").getStore();
						for(var i = 0; i < listStore.data.items.length; i++){
							
							if(listStore.data.items[i].data.leaf == true){
								
								if(listStore.data.items[i].data.checked == true){
									
									paramCode += "'" + listStore.data.items[i].data.id + "', ";
								}
							}
						}
						
						paramCode = paramCode.substring(0, paramCode.length - 2);
						//console.info(paramCode);
						
						//var paramCode = "'" + "1001A15" + "','" + "1001A60" + "','" + "1001A85" + "','" + "1016A10" + "'";
	    				var startYear = Ext.getCmp("cmbRptPeriodStYear").getValue();
	    				//console.info(startYear);
	    				var endYear = Ext.getCmp("cmbRptPeriodEdYear").getValue();
	    				//console.info(endYear);
	    				
						Ext.getCmp("_rptMapDiv_").report(paramCode, startYear, endYear);
					}
				}
			}
		}]
	}]
});