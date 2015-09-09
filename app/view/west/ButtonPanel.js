/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.west.ButtonPanel', {
    extend: 'Ext.toolbar.Toolbar',
    
    xtype: 'west-buttonpanel',

    title: '화면제어판',
    
    //collapsible: true,
    //split: true,
    //header: false,
    
    /* 사이즈 지정 */
    itemWidth: 78,
    itemHeight: 86,
    
    width: 78,
    /* 사이즈 지정 끝 */
    
    border: 0,
    
    cls: 'x-toolbar-default-west-khLee',
    
    controller: 'buttonpanel',
    
    onClickListener: {
        el: {
            click: 'onClickButton'
        }
    },
    
    layout: {
    	type: 'vbox',
    	align: 'center'
    },
    
    initComponent: function(){
    
	    this.items = [{
	    	xtype: 'image',
	    	id: 'btnLayer',
	    	groupId: 'group1',
	    	title: '주제도선택',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/left_menu01.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnSearchArea',
	    	groupId: 'group1',
	    	title: '위치검색',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/left_menu02_on.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnSiteListWindow',
	    	groupId: 'group2',
	    	isOnOff: 'off',
	    	title: '정보창',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	//listeners: this.onClickListener,
	    	listeners: { el: { click: 'onClickInfo' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/left_menu03_on.png',
	    	btnOffImg: './resources/images/button/left_menu03.png',
	    	src: './resources/images/button/left_menu03.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnSearchResult',
	    	groupId: 'group3',
	    	title: '검색결과',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	//listeners: this.onClickListener,
	    	listeners: { el: { click: 'onClickResult' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/left_menu04_on.png',
	    	btnOffImg: './resources/images/button/left_menu04.png',
	    	src: './resources/images/button/left_menu04.png'
	    }, '->', {
	    	xtype: 'image',
	    	id: 'btnModeNomal',
	    	groupId: 'group4',
	    	title: '일반모드',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/left_menu05_on.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnModeReach',
	    	groupId: 'group4',
	    	title: '리치모드',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/left_menu06.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnFavorites',
	    	groupId: 'group5',
	    	title: '즐겨찾기',
	    	style: 'left: 0px !important;',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickFavorite' } },
	    	btnOnOff: 'off',
	    	src: './resources/images/button/left_menu07.png'
	    }];
	    
	    this.callParent();
	}
});