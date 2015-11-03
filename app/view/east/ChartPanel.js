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
	
	width: 450,
	height: 600,
	y: 5,
	//controller: 'chartPanelController',
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	items : [{
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/arrow.gif'
			}, {
				xtype: 'label',
				id : 'selectName',
				style: 'font-weight: bold; padding-left: 15px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				//store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				width: 155,
				height: 25
			},{
				xtype: 'container',
				width: 10
			},{
				xtype: 'label',
				id : 'selectItemName',
				style: 'font-weight: bold; padding-left: 15px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				text: 'BOD(㎎/ℓ)',
				width: 125,
				height: 25
			}, {
				xtype: 'container',
				width:  17
			},{
				xtype: 'image',
				id: 'btnShowSearchWindow',
				listeners: {
					el: {
						click: function(obj, el, evt){
							var btnCtl = Ext.getCmp(el.id);
							var parentCtl = btnCtl.findParentByType("container");
							var dateWinCtl = Ext.getCmp("datePanel1");
							
							
							console.info(dateWinCtl);
							if(dateWinCtl == undefined){
								dateWinCtl = Ext.create("KRF_DEV.view.east.ChartPanelDate");
							}
							console.info(dateWinCtl);
							
							dateWinCtl.show();
							dateWinCtl = undefined;
						}
					}
				},
				width: 34,
				height: 21,
				src: './resources/images/button/btn_date.gif'
			}, {
				xtype: 'label',
				id :  'chartName',
				labelWidth: 60,
				labelAlign: 'right'
			}]
		},  {
	        //xtype: 'chart',
			xtype: 'cartesian',
	        id: 'siteCharttest',
	        //insetPadding: 10,
	        innerPadding: {
	             //left: 30,
	             right: 30
	        }, 
	        width: '100%',
	        height: 250,
	        padding: '10 0 0 0',
	        style: {
	            'background' : '#fff'
	        },
	        animate: true,
	        shadow: false,
	        store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
	        insetPadding: 10,
	       
	        axes: [{
	            type: 'numeric',
	            //fields: 'ITEM_BOD',
	            position: 'left',
	            grid: true,
	            //minorTickSteps: 5,
	            //majorTickSteps: 5,
	            //majorUnit: 1,
	            //step: 1,
	            //scale: 'Exponential', // Exponential, Logarithmic
	            minimum: 0/*,
	            label: {
	                renderer: function(v) { alert(v);return v + '%'; }
	            }*/
	            
	        }, {
	            type: 'category',
	            //fields: 'yearMonth',
	            position: 'bottom',
	            grid: true,
	            //majorTickSteps: 1,
	            label: {
	                rotate: {
	                    degrees: -45
	                }
	            }
	        }],
	        
//	        type: 'line',
//	        xField: 'OBJECTID',
//	        yField: info[member]['index'],
//	        title:info[member]['text'],
//	        marker: true
	        
	        series: [{
	        	text: 'month',
	            type: 'line',
	            axis: 'left',
	            xField: 'yearMonth',
	            yField: 'ITEM_BOD',
	            /*
	            markerConfig: {
	                type: "circle",
	                size: 4,
	                radius: 4,
	                "stroke-width": 0
	            },*/
	            marker: true,
	            tips: {
	                trackMouse: true,
	                style: 'background: #FFF',
	                height: 40,
	                showDelay: 0,
	                dismissDelay: 0,
	                hideDelay: 0,
	                renderer: function(storeItem, item) {
	                	var series = Ext.getCmp("siteCharttest");
	                	
	                    //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('ITEM_BOD') + '%');
	                	this.setTitle('측정일 : '+storeItem.get(series.series[0]._xField)+ '<br>' + '측정량 : ' + storeItem.get(series.series[0]._yField));
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {
        this.callParent();
    }
});