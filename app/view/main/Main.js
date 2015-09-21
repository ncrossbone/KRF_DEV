Ext.defer(function() {
	Ext.define('KRF_DEV.view.main.Main', {
	    extend: 'Ext.container.Container',
	    
	    requires: [
			'Ext.chart.*'
	    ],

	    xtype: 'app-main',
	    
	    viewModel: {
	        type: 'main'
	    },
	    
	    /*
	    layout: {
	    	type: 'vbox'
	    },
	    
	    items: [{
	    	xtype: 'app-default-north',
	    	id: 'north_container',
	    	width: '100%'
	    }, {
	    	xtype: 'container',
	    	layout: {
	    		type: 'hbox'
	    	},
	    	items: [{
	    		xtype: 'west-buttonpanel',
	    		height: '100%'
	    	}, {
	    		xtype: 'container',
	    		layout: {
	    			type: 'hbox'
	    		},
	    		items: [{
	    			xtype: 'panel',
	    	    	id: 'westContents',
	    	    	activeItem: 1,
	    			layout: {
	    	    		type: 'card'
	    	    	},
	    	    	items: [{
	    	    		xtype: 'west-Layer01'
	    	    	}, {
	    	    		xtype: 'west-searchArea'
	    	    	}],
	    	    	collapsible: true,
	    	        split: true,
	    	        header: false,
	    		}, {
	    			xtype: 'app-default-center',
	    	    	id: 'center_container'
	    		}]
	    	}]
	    }]
	    */

	    layout: {
	        type: 'border'
	    },
	    
	    initComponent: function(){
	    	
	    	var northContainer = {
    	    	xtype: 'app-default-north',
    	    	region: 'north',
    	    	id: 'north_container'
    	    };
	    	
	    	var westContainer = {
    	        xtype: 'app-default-west',
    	        region: 'west',
    	        id: 'west_container',
    	        weight: 10
    	    };
	    	
	    	var centerContainer = {
    	    	xtype: 'app-default-center',
    	    	region: 'center',
    	    	id: 'center_container'
    	    };
	    	
	    	// 아이템 추가
	    	this.items = [northContainer, westContainer, centerContainer];

	    	this.callParent();
	    	
	    	// 컨테이너 전역으로 담아두기
	    	KRF_DEV.getApplication().northContainer = Ext.getCmp("north_container");
	    	KRF_DEV.getApplication().westContainer = Ext.getCmp("west_container");
	    	KRF_DEV.getApplication().centerContainer = Ext.getCmp("center_container");
	    }
	});
}, 1000, this);
