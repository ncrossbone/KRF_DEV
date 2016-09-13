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
				//id : 'selectYear',
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
					//id : 'selectYear',
					//..fieldLabel: '<b>년</b> ',
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
					value: '2014',
					//labelWidth: 30,
					//labelAlign: 'right',
					width: 65,
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
					src: './resources/images/button/icon_seah.gif'
				}]
    		}]
		}]
    }]

	
});