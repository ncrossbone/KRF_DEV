Ext.define('KEF_DEV.view.center.Center', {
	
	extend: 'Ext.panel.Panel',
	
	title: '&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> 수질측정지점 > 하천수 > 남이섬',
	
	collapsible: false,
	controller: 'buttonpanel',
	
	cls: 'khLee-x-header',
	
	tools: [{ 
		xtype: 'image',
		id: 'btnModeNomal_center',
		groupId: 'group4_center',
    	title: '일반모드',
    	listeners: {
    		el: {
    			click: 'onClickButton'
    		}
    	},
    	params: {title: '데이터', contents: '데이터 클릭', msgBox: 'alert'},
    	src: './resources/images/button/btn_nor_on.png'
    }, { 
		xtype: 'image',
		id: 'btnModeReach_center',
		groupId: 'group4_center',
    	title: '리치모드',
    	listeners: {
    		el: {
    			click: 'onClickButton'
    		}
    	},
    	params: {title: '데이터', contents: '데이터 클릭', msgBox: 'alert'},
    	src: './resources/images/button/btn_reach_off.png'
    }, {
    	type: 'up',
    	//xtype: 'tool',
    	handler: function(t){
    		var panel = this.up('panel');
    		//console.info(this.type);
    		if(panel.collapsed == false){
    			panel.collapse();
    			this.setType('down');
    		}
    		else{
    			panel.expand();
    			this.setType('up');
    		}
    	}
    }],
	
	xtype: 'app-default-center',
	
	layout: {
		type: 'border'
	},
	
	items: [/*{
		xtype: 'center-reachtoolbar',
		id: 'reachToolbar',
		region: 'north',
		width: '100%',
		hidden: true
		cls: 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target'
	}, */{
		xtype: 'app-map-coreMap',
		region: 'center',
		width: '100%',
		height: '100%'
	}]
	
});