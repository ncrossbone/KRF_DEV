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
				type: 'hbox'
			},
			width: "100%",
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				id : 'selectName',
				style: 'font-weight: bold; padding-left: 7px; margin: 3px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				//store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				//width: 175,
				width: "40%",
				height: 25
			},{
				xtype: 'label',
				id : 'selectItemName',
				style: 'font-family: 돋움;font-size: 12px; margin: 5px;',
				//style: 'font-weight: bold; padding-left: 10px;',
				//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
				text: 'BOD(㎎/ℓ)',
				//width: 125,
				width: "32%",
				height: 25
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
							}
							//console.info(dateWinCtl);
							
							dateWinCtl.show();
							dateWinCtl = undefined;
						}
					}
				},
				width: 45,
				height: 21,
				src: './resources/images/button/btn_date.gif'
			}, {
				xtype: 'label',
				id :  'chartName',
				labelWidth: 60,
				labelAlign: 'right'
			},{

				xtype: 'image',
				id: 'btnImageDown',
				listeners: {
					el: {
						click: function(obj, el, evt){
							
							var siteCharttest = Ext.getCmp('siteCharttest');
							//siteCharttest.download({
							siteCharttest.download({
								type: 'image/svg+xml',
								filename : 'image'
								//type: 'image/png',
		                        //filename: "Chart"+selectName.innerText+""
		                    })
							
						}
					}
				},
				
				/*handler: function(btn, e, eOpts) {
					var selectName = Ext.getCmp('selectName').text;
					var selectItemName = Ext.getCmp('selectItemName').text;
					
					var siteCharttest = Ext.getCmp('siteCharttest');
					
					siteCharttest.download({
                        filename: "Chart1231"+selectName+""
                    })
                    
					console.info(btn.up('panel').down("cartesian"));
                    btn.up('panel').down("cartesian").download({
                        filename: "Chart1"+selectName+""
                    })
                },*/
				width: 45,
				height: 21,
				src: './resources/images/button/btn_save.gif'
			
			}]
		},  {
	        //xtype: 'chart',
			xtype: 'cartesian',
	        id: 'siteCharttest',
	        //insetPadding: 30,
	        innerPadding: {
	             left: 30,
	             right:30
	        }, 
	        /*interactions: {
	            type: 'crosszoom',
	            zoomOnPanGesture: false
	        },*/
	        width: 450,
	        height: 250,
	        padding: '10 0 0 0',
	        style: {
	            'background' : '#fff'
	        },
	        animate: true,
	        shadow: false,
	        //store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
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
	            minimum: 0
	            /*,
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
	            xField: 'WMCYMD',
	            yField: 'ITEM_VALUE',
	            
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
	                	/*console.info(storeItem);
	                	console.info(item);
	                	console.info(series.series[0]._yField);*/
	                	//console.info(storeItem);
	                	if(storeItem.joined[0].parentId == "A"){
			                	if(storeItem.get(series.series[0]._yField) == 0){
			                		this.setTitle('측정일 : '+storeItem.get(series.series[0]._xField)+ '<br>' + '측정값 : ' + storeItem.get(series.series[0]._yField+"_1"));
			                	}else{
			                		this.setTitle('측정일 : '+storeItem.get(series.series[0]._xField)+ '<br>' + '측정값 : ' + storeItem.get(series.series[0]._yField));
			                	}
	                	}else{
	                		this.setTitle('측정일 : '+storeItem.get(series.series[0]._xField)+ '<br>' + '측정값 : ' + storeItem.get(series.series[0]._yField));
	                	}
	                	
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {
        this.callParent();
    }
});