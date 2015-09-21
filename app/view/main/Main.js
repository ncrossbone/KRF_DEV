Ext.define('KRF_DEV.view.main.Main', {
	
    extend: 'Ext.container.Container',

    xtype: 'app-main',
    
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'vbox'
    },
    
    items: [{
    	xtype: 'app-default-north',
    	width: '100%',
    	id: 'north_container',
    	weight: 1
    }, {
    	xtype: 'container',
    	layout: {
    		type: 'hbox'
    	},
    	items: [{
    		xtype: 'west-buttonpanel',
    		id: 'west_buttonpanel'
    	}, {
    		xtype: 'container',
    		id: 'cont_container',
    		layout: {
    			type: 'border',
    		},
    		height: '100%',
    		items: [{
    			xtype: 'app-default-west',
    	        region: 'west',
    	        id: 'west_container',
    	        width: 300
    		}, {
    	    	xtype: 'app-default-center',
    	    	region: 'center',
    	    	id: 'center_container'
    	    }]
    	}],
    	weight: 2
    }],
    
    initComponent: function(){
    	
    	this.callParent();
    	
    	// 메인 컨테이너 전역변수
    	KRF_DEV.getApplication().northContainer = Ext.getCmp('north_container');
    	KRF_DEV.getApplication().westBtnContainer = Ext.getCmp('west_buttonpanel');
    	KRF_DEV.getApplication().contContainer = Ext.getCmp('cont_container');
    	KRF_DEV.getApplication().contWestContainer = Ext.getCmp('west_container');
    	KRF_DEV.getApplication().contCenterContainer = Ext.getCmp('center_container');
    	
    	//var contWestPlaceholder = Ext.get('west_container-placeholder');
    	//console.info(contWestPlaceholder);
    	
    	this.setControlSize(); // 사이즈 조절
    	this.on("resize", this.setControlSize); // 이벤트 생성
    },
    
    // 메인 컨테이너 사이즈 조절
    setControlSize: function(){
    	
    	var northContainer = KRF_DEV.getApplication().northContainer;
    	var westBtnContainer = KRF_DEV.getApplication().westBtnContainer;
    	var contContainer = KRF_DEV.getApplication().contContainer;
    	var contWestContainer = KRF_DEV.getApplication().contWestContainer;
    	var contCenterContainer = KRF_DEV.getApplication().contCenterContainer;
    	
    	//console.info(contWestContainer.el.placeholder);
    	
    	northContainer.setWidth(Ext.getBody().getViewSize().width);
    	westBtnContainer.setHeight(Ext.getBody().getViewSize().height - northContainer.height);
    	contContainer.setWidth(Ext.getBody().getViewSize().width - westBtnContainer.width);
    	contContainer.setHeight(Ext.getBody().getViewSize().height - northContainer.height);
    	
    }
    
});