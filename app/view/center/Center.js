Ext.define('KEF_DEV.view.center.Center', {
	
	extend: 'Ext.panel.Panel',
	
	title: '&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" />',
	
	collapsible: false,
	controller: 'center',
	
	cls: 'khLee-x-header',
	/*
	header: {
		items: [{ 
			xtype: 'image',
			id: 'btnModeNormal_center',
			groupId: 'grpMode',
	    	title: '일반모드',
	    	width: 65,
	    	height: 25,
	    	listeners: { el: { click: 'onClickNormalMode' } },
	    	btnOnOff: 'on',
	    	btnOnImg: './resources/images/button/btn_nor_on.png',
	    	btnOffImg: './resources/images/button/btn_nor_off.png',
	    	src: './resources/images/button/btn_nor_on.png'
	    }, { 
			xtype: 'image',
			id: 'btnModeReach_center',
			groupId: 'grpMode',
	    	title: '리치모드',
	    	width: 65,
	    	height: 25,
	    	listeners: { el: { click: 'onClickReachMode' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/btn_reach_on.png',
	    	btnOffImg: './resources/images/button/btn_reach_off.png',
	    	src: './resources/images/button/btn_reach_off.png'
	    }, {
			xtype: 'container',
			width: 50
		}]
	},
	*/
	/*
	tools: [{ 
		xtype: 'image',
		id: 'btnModeNormal_center',
		groupId: 'grpMode',
    	title: '일반모드',
    	listeners: { el: { click: 'onClickNormalMode' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_nor_on.png',
    	btnOffImg: './resources/images/button/btn_nor_off.png',
    	src: './resources/images/button/btn_nor_on.png'
    }, { 
		xtype: 'image',
		id: 'btnModeReach_center',
		groupId: 'grpMode',
    	title: '리치모드',
    	listeners: { el: { click: 'onClickReachMode' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_reach_on.png',
    	btnOffImg: './resources/images/button/btn_reach_off.png',
    	src: './resources/images/button/btn_reach_off.png'
    }, {
    	type: 'up',
    	//xtype: 'tool',
    	handler: function(t){
    		var panel = this.up('panel');
    		
    		if(panel.collapsed == false){
    			panel.collapse();
    			this.setType('down');
    		}
    		else{
    			panel.expand();
    			this.setType('up');
    		}
    	}
    }],*/
	
	xtype: 'app-default-center',
	
	layout: {
		type: 'absolute'
	},
	
	items: [{
		xtype: 'app-map-coreMap'
	}]
	
	
	
});