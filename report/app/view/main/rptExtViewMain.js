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
        	xtype: 'rpt-east-rptSetContainer',
        	width: 300,
        	height: 900
        }]
    }]
});