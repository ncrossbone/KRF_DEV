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
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'combo',
				id : 'selectYear',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>년도</b> ',
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
				value: '2015',
				labelWidth: 60,
				labelAlign: 'right',
				width: 150,
				height: 25
			},{
				xtype: 'combo',
				id : 'selectItem',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
				store: ['ITEM_BOD', 'ITEM_DOC', 'ITEM_COD', 'ITEM_TN', 'ITEM_TP', 'ITEM_TEMP', 'ITEM_PH', 'ITEM_SS', 'ITEM_CLOA'],
				value: 'ITEM_BOD',
				labelWidth: 60,
				labelAlign: 'right',
				width: 170,
				height: 25
			}, {
				xtype: 'container',
				width: 15
			}, {
				xtype: 'image',
				//xtype: 'button',
				//id: 'selecta',
				listeners: {
					el: {
						click: function(){
							//alert("dd");
							var chartCtl = Ext.getCmp("siteCharttest");
							console.info(chartCtl.axes);
							var axes   = chartCtl.axes.items[0];
							var series = chartCtl.series.items[0];
							
							//item 선택
							var selectItem = Ext.getCmp("selectItem");
							
							//년도
							var selectYear = Ext.getCmp("selectYear");
							
							series.yField = selectItem.lastMutatedValue;
							axes.fields = selectItem.lastMutatedValue;
							
							//axes.prevMax = '100';
							//console.info(chartCtl.axes.items[0].fields);
							var store = chartCtl.getStore();
							console.info(selectItem.lastMutatedValue);
							var s = selectItem.lastMutatedValue;
							
							var ITEM_BOD = parseFloat(store.arrMax[0].ITEM_BOD);
							var ITEM_DOC = parseFloat(store.arrMax[0].ITEM_DOC);
							var ITEM_COD = parseFloat(store.arrMax[0].ITEM_COD);
							var ITEM_TN = parseFloat(store.arrMax[0].ITEM_TN);
							var ITEM_TP = parseFloat(store.arrMax[0].ITEM_TP);
							var ITEM_TEMP = parseFloat(store.arrMax[0].ITEM_TEMP);
							var ITEM_PH = parseFloat(store.arrMax[0].ITEM_PH);
							var ITEM_SS = parseFloat(store.arrMax[0].ITEM_SS);
							var ITEM_CLOA = parseFloat(store.arrMax[0].ITEM_CLOA);
							
							if(s == "ITEM_BOD"){
								axes.prevMax = ITEM_BOD;
							}else if(s == "ITEM_DOC"){
								axes.prevMax = ITEM_DOC;
							}else if(s == "ITEM_COD"){
								axes.prevMax = ITEM_COD;
							}else if(s == "ITEM_TN"){
								axes.prevMax = ITEM_TN;
							}else if(s == "ITEM_TP"){
								axes.prevMax = ITEM_TP;
							}else if(s == "ITEM_TEMP"){
								axes.prevMax = ITEM_TEMP;
							}else if(s == "ITEM_PH"){
								axes.prevMax = ITEM_PH;
							}else if(s == "ITEM_SS"){
								axes.prevMax = ITEM_SS;
							}else {
								axes.prevMax = ITEM_CLOA;
							}
							console.info(axes.prevMax);
							
							store.load();
							//console.info(store.arrMax);
						}
					}
				},
				//text: '선택',
				width: 40,
				height: 25,
				//icon: './resources/images/button/icon_seah.gif'
				//iconCls: ' khLee-x-serch-btn',
				src: './resources/images/button/icon_seah.gif'
			}]
		}, {
	        xtype: 'chart',
	        id: 'siteCharttest',
	        width: '95%',
	        height: 230,
	        padding: '10 0 0 0',
	        style: {
	            'background' : '#fff'
	        },
	        animate: true,
	        shadow: false,
	        store: Ext.create('KRF_DEV.store.east.SiteChartPanel'),
	        insetPadding: 10,
	        items: [{
	            type  : 'text',
	            id: 'chartDescText',
	            //fields: 'ptNm',
	            //text  : 'text',
	            font  : '12px Helvetica',
	            width : 100,
	            height: 30,
	            x : 40, //the sprite x position
	            y : 12  //the sprite y position,
	            
	        }],
	        axes: [{
	            type: 'Numeric',
	            fields: 'ITEM_BOD',
	            position: 'left',
	            grid: true,
	            minimum: 0/*,
	            label: {
	                renderer: function(v) { return v + '%'; }
	            }*/
	        }, {
	            type: 'Category',
	            fields: 'yearMonth',
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
	            yField: 'ITEM_BOD',
	            tips: {
	                trackMouse: true,
	                style: 'background: #FFF',
	                height: 20,
	                showDelay: 0,
	                dismissDelay: 0,
	                hideDelay: 0,
	                renderer: function(storeItem, item) {
	                    //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('ITEM_BOD') + '%');
	                	this.setTitle(storeItem.get('year') +'/' +storeItem.get('month') + ': ' + storeItem.get('ITEM_BOD'));
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {

        this.callParent();
        
    }
});