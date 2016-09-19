Ext.define('KRF_DEV.view.east.PollMapSetValue', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-PollMapSetValue',
	
	id: 'pollMapSetValue',
	//params: this.record,
	
	//title: '지점 목록',
	
	title: '부하량 지도 보기설정',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	width: 280,
	height: 135,
	
	items:[{
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
				xtype: 'label',
				text: '기 간'
			},{
				xtype: 'combo',
				id : 'setPollYear',
				store: ['', '2010', '2011', '2012', '2013'],
				value: '2013',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			},{
				xtype: 'label',
				text: '년'
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
					xtype: 'container',
					width: 10
					
	        	},{
					xtype: 'label',
					text: '항목'
				},{
					xtype: 'combo',
					id : 'setPollItems',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: '1', name: '발생유량합계'}
							    ,{id: '2', name: '발생BOD합계'}
						    ,{id: '3', name: '발생TN합계'}
							,{id: '4', name: '발생TP합계'}
							,{id: '6', name: '배출유량합계'}
							,{id: '7', name: '배출BOD합계'}
							,{id: '8', name: '배출TN합계'}
							,{id: '9', name: '배출TP합계'}]
					}),
					value: '2',
					width: 185,
					height: 25
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
					xtype: 'container',
					width: 80
				},{
					xtype: 'image',
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif',
					listeners:{
						el:{
							click: function(){
								
								tmCatLayerClear();  //주제도 레이어 클리어
								
								//showCatTMLayer(); //부하량 on
								
								var setPollYear = Ext.getCmp("setPollYear");
								var setPollItems = Ext.getCmp("setPollItems");
								alert("기간 :: "+ setPollYear.value);
								alert("항목 :: "+ setPollItems.value);
								console.info(setPollItems);
								
								var setItems = [];
								setItems.push(setPollYear.value);
								setItems.push(setPollItems.value);
								console.info(setItems);
								
								catTMLayerOnOff("on",setItems);
								
								
							}
						}
					}
				}]
    		}]
		}]
    }]

	
});