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

	    layout: {
	        type: 'border'
	    },
	    
	    load: function(){
	    	console.info("load");
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
