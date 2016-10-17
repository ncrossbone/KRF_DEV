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
    	layout: {
            type: 'hbox'
        },
        items: [{
        	xtype: 'rpt-map-rptCoreMap',
        	width: 900,
        	height: 900
        }, {
        	xtype: 'panel',
        	title: '지점설정',
        	width: 450,
        	height: 900,
        	//style: 'margin-left: 10px;',
        	items: [{
        		xtype: 'rpt-east-rptSetContainer'
        	}]
        }]
    }]
});