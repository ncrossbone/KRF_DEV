Ext.define('Report.view.main.rptExtViewMain', {
	
    extend: 'Ext.container.Container',

    xtype: 'rpt-main-rptExtViewMain',
    
    requires:['Report.view.map.rptCoreMap',
              'Report.view.east.rptSetContainer'],
    
    layout: {
		type: "absolute"
	},
	
	//width: 600,

    items: [{
    	xtype: "container",
    	style:'background:white;',
    	layout: {
            type: 'hbox'
        },
        items: [{
        	xtype: "container",
        	layout: {
        		type: "fit",
        		align: "middle",
        		pack: "middle"
        	},
        	width: 860,
        	height: 860,
        	border:3,
        	style: 'borderColor: #BDBDBD; borderStyle: solid; margin: 20px 20px 20px 20px;',
        	items: [{
        		xtype: 'rpt-map-rptCoreMap',
            	width: 850,
            	height: 850
        	}]
        }, {
        	xtype: 'panel',
        	title: '지점설정',
        	width: 430,
        	height: 880,
        	style: 'margin-top: 20px;',
        	items: [{
        		xtype: 'rpt-east-rptSetContainer'
        	}]
        }]
    }]
});