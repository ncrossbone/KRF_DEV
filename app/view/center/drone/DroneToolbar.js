/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.drone.DroneToolbar', {
	extend: 'Ext.panel.Panel',
    
    xtype: 'center-dronetoolbar',
    
    headerPosition: 'left',
    
    header: {
    	html: "<img src='./resources/images/drone/title.png' />",
		width: 65,
		height: 80,
    	style: "padding: 0 !important; background-color: transparent;" // 백그라운드 투명
    },
    
    bodyStyle: "padding: 0 !important; background-color: transparent;", // 백그라운드 투명
    
    style: " z-index: 99999;", // 항상 위에..
    
    //draggable: true,
    draggable: {
    	onDrag: function(a, b, c, d, e){
    		console.info(a);
    		console.info(b);
    		console.info(c);
    		console.info(d);
    		console.info(e);
    	}
    },
    
    //width: 806,
    height: 80,
    
    layout: {
    	type: "hbox"
    },
    
    items: [{
    	xtype: 'panel',
    	id: "toolbarCont",
    	/* 헤더 셋팅 Open, Close 버튼 */
    	header: {
        	html: "<img src='./resources/images/drone/btn_arrow_open2.png' />",
        	listeners: {
        		el: {
        			click: function(){
        				
        				var toolbarCont = Ext.getCmp("toolbarCont");

        				if(toolbarCont.collapsed == true || toolbarCont.collapsed == "left"){
        					toolbarCont.expand();
        					toolbarCont.updateHeaderPosition("right");
        					toolbarCont.header.setHtml("<img src='./resources/images/drone/btn_arrow_close2.png' />");
        					toolbarCont.setWidth(727);
        					toolbarCont.up("panel").setWidth(792);
        				}
        				else{
        					toolbarCont.collapse();
        					toolbarCont.updateHeaderPosition("left");
        					toolbarCont.header.setHtml("<img src='./resources/images/drone/btn_arrow_open2.png' />");
        					toolbarCont.setWidth(14);
        					toolbarCont.up("panel").setWidth(79);
        				}
        			}
        		}
        	},
    		width: 14,
        	style: "padding: 0 !important; background-color: transparent; cursor: pointer;"
        },
        /* 헤더 셋팅 Open, Close 버튼 끝 */
        bodyStyle: "padding: 0 !important;" +
        		"background-color: transparent;" + // 백그라운드 투명
        		"background: url(./resources/images/drone/drone_bg.png) 65px 4px repeat-x !important;", // 백그라운드 이미지
    	layout: {
    		type: "hbox"
    	},
    	headerPosition: 'left',
    	collapsed: true,
    	width: 14,
    	items: [{
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_01.png',
        	id: "cboSelArea"
        }, {
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_02.png',
        }, {
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_03.png',
        }, {
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_04.png',
        }, {
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_05.png',
        }, {
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_06.png',
        }, {
        	xtype: 'image',
        	title: '초기화',
        	width: 23,
        	src: './resources/images/drone/btn_reset.png'
        }]
    }],
    
    initComponent: function(){
    	
    	this.callParent();
    	
    	var totWidth = 0;
    	
    	Ext.each(this.items.items, function(){
    		totWidth += this.width;
    	});
    	
    	totWidth += this.header.width;
    	this.width = totWidth;
    	
    	//console.info(Ext.getCmp("cboSelArea"));
    }
});