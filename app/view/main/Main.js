Ext.defer(function() {
	Ext.define('KRF_DEV.view.main.Main', {
	    extend: 'Ext.container.Container',
	    
	    requires: [
			'KRF_DEV.view.main.MainModel',
			'KRF_DEV.view.north.North',
			'KRF_DEV.view.west.West',
			'KRF_DEV.view.west.WestTabLayer',
			'KEF_DEV.view.center.Center',
	        'KRF_DEV.view.common.Window',
	        'KRF_DEV.view.common.Grid',
	        'KRF_DEV.view.common.MapToolbar',
	        'KRF_DEV.view.map.CoreMap'
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
	    	
	    	//var timerId = window.setInterval(function(){
		    	// store에서 맵서비스 URL 가져오기
		        
		    	//console.info(KRF_DEV.app.testDD);
		    	this.items = [{
	    	    	xtype: 'app-default-north',
	    	    	region: 'north',
	    	    	id: 'north_container',
	    	    	weight: 10
	    	    }, {
	    	        xtype: 'app-default-west',
	    	        region: 'west',
	    	        id: 'west_container',
	    	        weight: 10
	    	    }, {
	    	    	xtype: 'app-default-center',
	    	    	region: 'center',
	    	    	id: 'center_container'
	    	    }];
		    	
		    	console.info(_serviceUrl);
		    	
		    	this.callParent();
	    }
	});
}, 1000, this);
