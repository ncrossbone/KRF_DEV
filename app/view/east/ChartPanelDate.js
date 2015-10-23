Ext.define('KRF_DEV.view.east.ChartPanelDate', {
	
	extend: 'Ext.window.Window',
	xtype: 'east-chartpaneldate',
	
	id: 'datePanel1',
    width : 205,
    height : 200,
    header: true,
    title: '기간설정',
    controller: 'chartPanelDateController',
    //x: x,
    cls: 'khLee-window-panel-header khLee-x-window-default ',
    initComponent: function(){
    	this.callParent();
    	this.on("beforeclose", function chartDateWinClose(){
    		alert("dd");
    	});
    },
    items: [{
    	xtype: 'container',
    	y: 15,
    	x: 5,
    	layout: {
    		type: 'vbox',
    		align: 'left',
    		pack: 'middle'
    	},
    	items: [{
        	xtype: 'container',
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items: [{
				xtype: 'combo',
				id : 'selectYear',
				//..fieldLabel: '<b>년</b> ',
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
				value: '2014',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			},{
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width:  10
			},{
				xtype: 'combo',
				id : 'selectMonth',
				//fieldLabel: '<b>월</b> ',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '10',
				//labelWidth: 20,
				//labelAlign: 'right',
				width: 55,
				height: 25
			},{
				xtype: 'label',
				text: '월 부터'
			}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'left',
	        		pack: 'left'
	        	},
	        	items: [{
	        		xtype: 'combo',
					id : 'selectYear2',
					//fieldLabel: '<b>년</b> ',
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
					value: '2015',
					//labelWidth: 30,
					//labelAlign: 'right',
					width: 65,
					height: 25
				},{
					xtype: 'label',
					text: '년'
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'combo',
					id : 'selectMonth2',
					//fieldLabel: '<b>월</b> ',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					value: '10',
					//labelWidth: 20,
					//labelAlign: 'right',
					width: 55,
					height: 25
				},{
					xtype: 'label',
					text: '월 까지'
				}]
    		}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'selectItem',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'ITEM_BOD', name: 'BOD'}
							,{id: 'ITEM_DOC', name: 'DO'}
							,{id: 'ITEM_COD', name: 'COD'}
							,{id: 'ITEM_TN', name: 'T.N'}
							,{id: 'ITEM_TP', name: 'T.P'}
							,{id: 'ITEM_TEMP', name: '수온'}
							,{id: 'ITEM_PH', name: 'pH'}
							,{id: 'ITEM_SS', name: 'SS'}
							,{id: 'ITEM_CLOA', name: '클로로필a'}]
					}),
					value: 'ITEM_BOD',
					width: 105,
					height: 25
					
	        	},{
					xtype: 'container',
					width: 10
					
	        	},{
					xtype: 'label',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'f_Chart',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: '1', name: '방류유량'}
							,{id: '2', name: '직접이송량'}
							,{id: '3', name: '총유입량'}
							,{id: '4', name: '관거이송량'}]
					}),
					value: '방류유량',
					width: 115,
					height: 25
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'label',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		}, {
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
        		},
	        	items: [{
					xtype: 'container',
					width: 80
				},{
					xtype: 'image',
					//xtype: 'button',
					id: 'btnSearch',
					listeners: {
						el: {
							click: 'onSearchChartData'
						}
					},
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif'
				}]
    		}]
		}]
    }]
});