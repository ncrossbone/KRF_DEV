/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.ReachCountEToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-reachcountetoolbar',

    title: '리치 카운트 제어용 툴바',
    
    id: 'reachCountEToolbar',
    
    //collapsible: true,
    //split: true,
    header: false,
    shadow: false,
    
    /* 사이즈 지정 */
    //alwaysOnTop: true , // 가장 상위에 있기 위한 함수
    plain: true, // 요게 있어야 background: transparent 먹음..
    hidden:true,
    style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important; width:31px !important;',
    bodyStyle:'z-index: -1',
    width: 28,
    height: 28,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:644,
    y:85,
    //style: 'padding: 0px;',
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    listeners:{
    	'render': function(panel){
    		panel.body.on('click', function(){
    			_toolbarCtl.onClickEndReach("",{'id':'btnMenu05'},"");
    		})//{'cntNum':me.arrCnt, 'stNm':textSearchText_Start,'edNm':textSearchText_End}
    	}
    },
    
    initComponent: function(){
    	
    	this.items = [{
    		xtype:"image",
    		id:"reache_close",
    		hidden:true,
    		src:"./resources/images/symbol/btn_num1.png"
    	}];
	    
	    
	    
	    this.callParent();
	}
});