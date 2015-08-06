Ext.define('KRF_DEV.view.east.ChartWindow', {
    extend: 'Ext.window.Window',
    xtype: 'east-chartwindow',
    id: 'chartWindow',
    //renderTo: Ext.getBody(),
    title: '차트정보',
    
    layout: {
		type: 'fit'
	},
	
	width: 400,
	height: 300,
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',

    initComponent: function() {
        var me = this;

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1' ],
            data: [
                { month: '2014.01', data1: 0.5 },
                { month: '2014.02', data1: 0.5 },
                { month: '2014.03', data1: 0.5 },
                { month: '2014.04', data1: 0.9 },
                { month: '2014.05', data1: 0.3 },
                { month: '2014.06', data1: 0.8 },
                { month: '2014.07', data1: 1.2 },
                { month: '2014.08', data1: 0.6 },
                { month: '2014.09', data1: 0.7 },
                { month: '2014.10', data1: 1.8 },
                { month: '2014.11', data1: 1.2 },
                { month: '2014.12', data1: 0.6 },
                { month: '2015.01', data1: 0.5 },
                { month: '2015.02', data1: 0.6 },
                { month: '2015.03', data1: 0.5 },
                { month: '2015.04', data1: 0.6 },
                { month: '2015.05', data1: 1.3 }
            ]
        });


        me.items = [{
            xtype: 'chart',
            width: '100%',
            height: 410,
            padding: '10 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: this.myDataStore,
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
                type: 'line',
                axis: 'left',
                xField: 'month',
                yField: 'data1',
                style: {
                    //'stroke-width': 4
                	'stroke-width': 1
                },
                markerConfig: {
                    //radius: 4
                	radius: 1
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                },
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
        }];

        this.callParent();
    }
});