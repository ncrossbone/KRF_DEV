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
				displayField: 'ptNm',
				width: 65,
				height: 25
			},{
				xtype: 'container',
				width: 10
			},{
				xtype: 'image',
				src: './resources/images/button/arrow.gif'
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
				width:  77
			},{
				xtype: 'image',
				id: 'btnShowSearchWindow',
				listeners: {
					el: {
						click: function(obj, el, evt){
							var btnCtl = Ext.getCmp(el.id);
							var parentCtl = btnCtl.findParentByType("container");
							var dateWinCtl = Ext.getCmp("datePanel1");
							
							if(dateWinCtl == undefined){
								dateWinCtl = Ext.create("KRF_DEV.view.east.ChartPanelDate");
								//console.info(dateWinCtl);
							}
							console.info(dateWinCtl);
							
							dateWinCtl.show();
						}
					}
				},
				width: 61,
				height: 19,
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
	            majorTickSteps: 1,
	            minimum: 0/*,
	            label: {
	                renderer: function(v) { alert(v);return v + '%'; }
	            }*/
	            
	        }, {
	            type: 'category',
	            //fields: 'yearMonth',
	            position: 'bottom',
	            grid: true,
	            majorTickSteps: 1,
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
	                    //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('ITEM_BOD') + '%');
	                	this.setTitle('측정일 : '+storeItem.get('yearMonth')+ '<br>' + '측정량 : ' + storeItem.get('ITEM_BOD'));
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {
        this.callParent();
        console.info(this);
    }
});