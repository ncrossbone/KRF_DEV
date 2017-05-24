/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.ReachCountSToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-reachcountstoolbar',

    title: '리치 카운트 제어용 툴바',
    
    id: 'reachCountSToolbar',
    
    //collapsible: true,
    //split: true,
    header: false,
    shadow: false,
    
    /* 사이즈 지정 */
    //alwaysOnTop: true , // 가장 상위에 있기 위한 함수
    plain: true, // 요게 있어야 background: transparent 먹음..
    style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important;',
    width: 28,
    height: 28,
    /* 사이즈 지정 끝 */
    floating: true,
    //border: 0,
    x:542,
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
    			_toolbarCtl.onClickStartReach("",{'id':'btnMenu04'},"");
    		})//{'cntNum':me.arrCnt, 'stNm':textSearchText_Start,'edNm':textSearchText_End}
    	}
    },
    
    initComponent: function(){
    
    	this.items = [{
    		xtype:"image",
    		id:"reachs_close",
    		hidden:true,
    		src:"./resources/images/symbol/btn_num1.png"
    	}];
	    
	    
	    
	    this.callParent();
	}
});