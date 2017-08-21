/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.ReachCountToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-reachcounttoolbar',

    title: '리치 카운트 제어용 툴바',
    
    id: 'reachCountToolbar',
    
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
    height: 2,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:519,
    y:100,
    //style: 'padding: 0px;',
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    
    initComponent: function(){
    
    	this.items = [{
    		xtype: 'textfield',
    		cls: 'dj_startCnt',
    		width: this.itemWidth,
    		height: this.itemHeight

    	}, {
    		xtype: 'textfield',
    		cls: 'dj_endCnt',
    		width: this.itemWidth,
    		height: this.itemHeight
    	}];
	    
	    
	    
	    this.callParent();
	}
});