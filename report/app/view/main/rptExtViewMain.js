Ext.define('KRF_DEV.view.main.rptExtViewMain', {
	
    extend: 'Ext.container.Container',

    xtype: 'app-report-rptextviewmain',
    
    requires:['KRF_DEV.view.map.rptCoreMap',
              'KRF_DEV.view.east.rptSetContainer'],
    
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
        	xtype: 'app-report-rptcoremap',
        	width: 900,
        	height: 900
        }, {
        	xtype: 'app-report-rptsetcontainer',
        	width: 300,
        	height: 900
        }]
    }]
});