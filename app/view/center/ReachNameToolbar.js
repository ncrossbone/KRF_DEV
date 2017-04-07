/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.ReachNameToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-reachnametoolbar',

    title: '리치 이름 제어용 툴바',
    
    id: 'reachNameToolbar',
    
    //collapsible: true,
    //split: true,
    header: false,
    shadow: false,
    
    /* 사이즈 지정 */
    itemWidth: 102,
    itemHeight: 18,
    //alwaysOnTop: true , // 가장 상위에 있기 위한 함수
    plain: true, // 요게 있어야 background: transparent 먹음..
    style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important;',
    cls: 'dj_toolbarNm dj_spottextfield2',
    //width: 78,
    //height: 22,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:486,
    y:172,
    //html:"<div style='top:30px; left:2px; position:absolute; font:normal 11px 돋움; color:#3c5775;'>IE는 시작 끝 포인터가 보이지 않습니다.</div>",
    //style: 'padding: 0px;',
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    
    initComponent: function(){
    
	    this.items = [{
	    	xtype: 'textfield',
	    	cls: 'dj_stoptextfield',
	    	width: this.itemWidth,
	    	height: this.itemHeight
	    	
	    }, {
	    	xtype: 'textfield',
	    	cls: 'dj_etoptextfield',
	    	width: this.itemWidth,
	    	height: this.itemHeight
	    }];
	    
	    
	    
	    this.callParent();
	}
});