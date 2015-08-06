/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.ReachToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    
    xtype: 'center-reachtoolbar',

    title: '리치 제어용 툴바',
    
    //collapsible: true,
    //split: true,
    //header: false,
    
    /* 사이즈 지정 */
    itemWidth: 102,
    itemHeight: 74,
    
    //width: 78,
    height: 74,
    /* 사이즈 지정 끝 */
    //floating: true,
    //border: 0,
    
    style: 'padding: 0px;',
    
    //cls: 'khLee-x-reachtoolbar khLee-x-reachtollbar-default',
    
    controller: 'buttonpanel',
    
    onClickListener: {
        el: {
            click: 'onClickButton'
        }
    },
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'middle'
    },
    
    initComponent: function(){
    console.info(this.itemWidth);
	    this.items = [{
	    	xtype: 'image',
	    	id: 'btnMenu01',
	    	groupId: 'group1',
	    	title: '스마트선택',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/reach_menu01.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu02',
	    	groupId: 'group1',
	    	title: '리치추가',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/reach_menu02.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu03',
	    	groupId: 'group1',
	    	title: '구간제거',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/reach_menu03.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu04',
	    	groupId: 'group1',
	    	title: '시작위치',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/reach_menu04.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu05',
	    	groupId: 'group1',
	    	title: '끝위치',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	src: './resources/images/button/reach_menu05.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu06',
	    	groupId: 'group1',
	    	title: '드래그선택',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	src: './resources/images/button/reach_menu06.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu07',
	    	groupId: 'group1',
	    	title: '반경선택',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	src: './resources/images/button/reach_menu07.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu08',
	    	groupId: 'group1',
	    	title: '초기화',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	src: './resources/images/button/reach_menu08.png'
	    }, '->', {
	    	xtype: 'image',
	    	id: 'btnMenuSave',
	    	groupId: 'group1',
	    	title: '설정저장',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	src: './resources/images/button/reach_menu_save.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenuOpen',
	    	groupId: 'group1',
	    	title: '설정불러오기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	src: './resources/images/button/reach_menu_fileopen.png'
	    }];
	    
	    this.callParent();
	}
});