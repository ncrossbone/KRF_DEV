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
    itemHeight: 22,
    plain: true, // 요게 있어야 background: transparent 먹음..
    style: 'border-style: none !important; height:22px !important; background: transparent none !important; ',
    //width: 78,
    height: 22,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:487,
    y:160,
    //style: 'padding: 0px;',
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    
    initComponent: function(){
    
	    this.items = [{
	    	xtype: 'textfield',
	    	cls: 'dj_stextfield',
	    	width: this.itemWidth,
	    	height: this.itemHeight
	    }, {
	    	xtype: 'textfield',
	    	width: this.itemWidth,
	    	cls: 'dj_etextfield',
	    	height: this.itemHeight
	    }];
	    
	    
	    
	    this.callParent();
	}
});