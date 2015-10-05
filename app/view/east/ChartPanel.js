Ext.define('KRF_DEV.view.east.ChartPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'east-chartpanel',
    id: 'chartPanel',
    //renderTo: Ext.getBody(),
    title: '차트정보',
    header: false,
    
    layout: {
		type: 'fit'
	},
	
	width: 400,
	height: 300,
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	items : [{
        xtype: 'chart',
        id: 'siteCharttest',
        width: '100%',
        height: 410,
        padding: '10 0 0 0',
        style: {
            'background' : '#fff'
        },
        animate: true,
        shadow: false,
        //store: this.myDataStore,
        store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
        insetPadding: 40,
        items: [{
            type  : 'text',
            id: 'chartDescText',
            text  : '하천수>남이섬',
            font  : '12px Helvetica',
            width : 100,
            height: 30,
            x : 40, //the sprite x position
            y : 12  //the sprite y position
        }],
        axes: [{
            type: 'Numeric',
            fields: 'data1',
            position: 'left',
            grid: true,
            minimum: 0/*,
            label: {
                renderer: function(v) { return v + '%'; }
            }*/
        }, {
            type: 'Category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
        	text: 'month',
            type: 'line',
            axis: 'left',
            xField: 'month',
            yField: 'data1',
            tips: {
                trackMouse: true,
                style: 'background: #FFF',
                height: 20,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                	this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1'));
                }
            }
        }]
    }],
	
    initComponent: function() {

        this.callParent();
        
    }
});