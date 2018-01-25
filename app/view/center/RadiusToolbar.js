/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.RadiusToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-radiustoolbar',

    title: '리치 이름 제어용 툴바',
    
    id: 'radiusToolbar',
    
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
    width: 300,
    height: 22,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:996,
    y:172,
    //style: 'padding: 0px;',
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    
    initComponent: function(){
    
    	this.items = [{
    		xtype: 'textfield',
    		id: 'radiusText',
    		cls: 'dj_etoptextfield',
    		width: this.itemWidth,
    		height: this.itemHeight

    	}];
	    
	    
	    
	    this.callParent();
	}
});