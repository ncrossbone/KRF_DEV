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
	
	width: 285,
	height: 165,
	
	items:[{
    	xtype: 'container',
    	y: 5,
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
				text: '기 간 : '
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
				text: ' 년'
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
					xtype: 'container'
					
	        	},{
					xtype: 'label',
					text: '항 목 : '
				},{
					xtype: 'combo',
					id : 'setPollItems',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'GNR_FLOW_S', name: '발생유량합계'}
							    ,{id: 'GNR_BOD_S', name: '발생BOD합계'}
						    ,{id: 'GNR_TN_S', name: '발생TN합계'}
							,{id: 'GNR_TP_S', name: '발생TP합계'}
							,{id: 'OUT_FLOW_S', name: '배출유량합계'}
							,{id: 'OUT_BOD_S', name: '배출BOD합계'}
							,{id: 'OUT_TN_S', name: '배출TN합계'}
							,{id: 'OUT_TP_S', name: '배출TP합계'}]
					}),
					value: 'GNR_BOD_S',
					width: 185,
					height: 25
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 10
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
								
								catTMLayerOnOff("on");
							}
						}
					}
				}]
    		}]
		},{
			xtype: 'container',
			height: 20
		},{
			xtype: 'container',
			//background-color: 'black' , 
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items:[{
        		xtype: 'label',
				text: '투명도 100%'
			},{
    			xtype: 'slider',
    			hideLabel: true,
    	        useTips: false,
    	        width: 104,
    	        value:40,
    	        increment: 10,
    	        minValue: 0,
    	        maxValue: 100,
    	        listeners: {
    	    		change: function(slider, thumb, oldValue, newValue) {
    	    			
    	    			
    	    			var rchMap = GetCoreMap();
    	    			var tmpAreaGrp = rchMap.reachLayerAdmin_v3_New.arrAreaGrp;
    	    			var catDid = [];
    	    			
    	    			if(tmpAreaGrp != null){
    	    				for(i = 0; i < tmpAreaGrp.length;i++){
    	    					
    	    					var polySymbol = $("#polySymbol_" + tmpAreaGrp[i].attributes.CAT_DID);
    	    	        		polySymbol[0].setAttribute("opacity", thumb*0.01);
    	    	        		
    	    	        		var labelSymbol = $("#labelSymbol_" + tmpAreaGrp[i].attributes.CAT_DID);
    	    	        		labelSymbol[0].setAttribute("opacity", thumb*0.01);
    	    	        		
    	    					
    	    				}
    	    			}
    	    			 
    	    		}
    	    	}
    	        	
    		},{
        		xtype: 'label',
				text: '0%'
			},{
				xtype: 'container',
				flex: 1
			},{
				xtype: 'image',
				width: 34,
				height: 19,
				src: './resources/images/button/icon_remark.gif'
			}]

    		
		
		}]
    }]

	
});