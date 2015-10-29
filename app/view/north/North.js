Ext.define('KRF_DEV.view.north.North', {
	
	xtype: 'app-default-north',
	
	extend: 'Ext.panel.Panel',
	//extend: 'Ext.toolbar.Toolbar',
	
	requires: [
	    'KRF_DEV.view.north.NorthController'
   ],
	
	controller: 'north',
	
	//padding: 10,
	
	height: 64,
	
	//padding: 0,
	
	//cls: 'x-toolbar-default-north-khLee',
	//style: 'background-image:url(./resources/images/button/top_bg.png) !important;',
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},
	
	items: [{
    	xtype: 'container',
    	width: 10
    }, {
		xtype: 'image',
		id: 'top-logo-khLee',
		width: 273,
		height: 37,
		//cls: 'khLee-x-box-item',
		src: './resources/images/button/top_logo.png'
	}, {
		xtype: 'container',
		flex: 1
	}, { 
		xtype: 'image',
		id: 'btnReachLayer',
		layerId: '46',
		groupId: 'grpReach',
    	title: '리치라인',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReachLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_01_on.png',
    	btnOffImg: './resources/images/button/btn_top_01_off.png',
    	src: './resources/images/button/btn_top_01_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnAreaLayer',
		groupId: 'grpArea',
    	title: '집수구역',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickAreaLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_02_on.png',
    	btnOffImg: './resources/images/button/btn_top_02_off.png',
    	src: './resources/images/button/btn_top_02_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnFlowLayer',
		groupId: 'grpFlow',
    	title: '리치흐름',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickFlowLayer' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_04_on.png',
    	btnOffImg: './resources/images/button/btn_top_04_off.png',
    	src: './resources/images/button/btn_top_04_off.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnLayerReset',
		groupId: 'grpReset',
    	title: '초기화',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReset' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_03_on.png',
    	btnOffImg: './resources/images/button/btn_top_03_off.png',
    	src: './resources/images/button/btn_top_03_off.png'
    }, {
    	xtype: 'container',
    	width: 50
    }, {
		xtype: 'image',
    	title: '공지사항',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: 'onButtonClick'
    		}
    	},
    	src: './resources/images/button/top_btn4_off.png'			
	}, {
		xtype: 'image',
    	title: 'Q&A',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: 'onButtonClick'
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'			
	}, {
		xtype: 'image',
    	title: '인쇄',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().print();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn1_off.png'			
	}, {
		xtype: 'image',
    	title: '저장',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().capture();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn2_off.png'
	}, {
		xtype: 'image',
    	title: '로그아웃',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: 'onButtonClick'
    		}
    	},
    	src: './resources/images/button/top_btn3_off.png'
	}, {
		xtype: 'image',
    	title: '매뉴얼',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				/*
    				Ext.create("Ext.window.Window", {
    					title: 'test',
    					width: 300,
    					height: 300,
    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="./resources/menual/KRF_Menual.html"></iframe>'
    				}).show();
    				*/
    				OpenMenualPop();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn6_off.png'
	}, {
		xtype: 'container',
		width: 50
	}]
  
});