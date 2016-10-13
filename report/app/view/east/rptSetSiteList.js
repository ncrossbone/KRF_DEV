Ext.define('Report.view.east.rptSetSiteList', {
	
	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetSiteList',
		
	id: 'rptSetSiteList',
	
	title: '지점',
	
	layout: {
		type: 'hbox'
	},
	
	width: "100%",
	
	items: [{
		xtype: "label",
		text: "지",
		style: "margin-top: 4px;"
	}, {
		xtype: "container",
		width: 26
	}, {
		xtype: "label",
		text: "점",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "label",
		text: ":",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "treepanel",
		id: "treeRptSiteList",
		rootVisible:false,
		width: 330,
		store: Ext.create('Report.store.east.treeRptSiteListStore'),
		columns: [{
            xtype: 'treecolumn',
            text: "지점명",
            align: "center",
            width: 100,
            sortable: true,
            dataIndex: 'siteName',
            //dataIndex: 'text',
            checked: true,
            locked: true
        }, {
            //xtype: 'treecolumn',
            text: "주소",
            width: 130,
            sortable: true,
            dataIndex: 'siteAddr',
            checked: true,
            locked: true
        }, {
            //xtype: 'treecolumn',
            text: "조사기관",
            width: 100,
            sortable: true,
            dataIndex: 'siteOrg',
            checked: true,
            locked: true
        }]
	}]
});