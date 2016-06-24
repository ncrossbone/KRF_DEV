/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.drone.DroneToolbar', {
	extend: 'Ext.panel.Panel',
    
    xtype: 'center-dronetoolbar',
    
    id: "droneToolbar",
    
    headerPosition: 'left',
    
    header: {
    	html: "<img src='./resources/images/drone/title.png' />",
		width: 65,
		height: 80,
    	style: "padding: 0 !important; background-color: transparent;" // 백그라운드 투명
    },
    
    bodyStyle: "padding: 0 !important; background-color: transparent;", // 백그라운드 투명
    
    draggable: true,
    
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
    	items: [{ // 수계선택
        	xtype: "drone-vcombo",
        	id: "cboDroneArea", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_01.png', // 라벨
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "area",
        	fields: ["areaName", "areaValue"],
        	displayField: "areaName",
        	valueField: "areaValue",
        	onChange: "onAreaChange",
        	onItemClick: "onItemClickEmpty"
        }, { // 지점목록
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_06.png',
        	id: "cboDroneSiteList", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	fields: ["layerCd", "layerNm","level","tmX","tmY"],
        	displayField: "layerNm",
        	valueField: "layerCd",
        	onChange: "onBoChange",
        	onItemClick: "onItemClickEmpty"
        }, { // 항공영상
        	xtype: "drone-vcombo",
        	id: "cboDroneDate", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_02.png',
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["DroneLayerId", "DroneDate"],
        	displayField: "DroneDate",
        	valueField: "DroneLayerId",
        	onChange: "onDroneDateChange",
        	onItemClick: "onItemClickEmpty"
        }, { // 클로로필a
        	xtype: "drone-vcombo",
        	id: "cboDroneChla", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_03.png',
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["ChlaLayerId", "ChlaDate"],
        	displayField: "ChlaDate",
        	valueField: "ChlaLayerId",
        	onChange: "onDroneChlaChange",
        	onItemClick: "onItemClickEmpty"
        }, { // 조류측정자료
        	xtype: "drone-vcombo",
        	id: "cboDroneWBSite", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_04.png',
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["MeasureDate"],
        	displayField: "MeasureDate",
        	valueField: "MeasureDate",
        	onChange: "onDroneWBSiteChange",
        	onItemClick: "onItemClickEmpty"
        }, { // 레이어선택
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_05.png',
        	id: "cboDroneLayer", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "layer",
        	fields: ["layerId", "layerName", "image1"],
        	displayField: "layerName",
        	valueField: "layerId",
        	onChange: "onComboChangeEmpty",
        	onItemClick: "onDroneLayerClick",
        	listeners: {
        		render: function(a,b,c,d){
        		}
        	},
            noCollapse: true // 콤보 리스트가 닫히지 않게 한다.
        }, {
        	xtype: 'image',
        	title: '초기화',
        	width: 23,
        	src: './resources/images/drone/btn_reset.png',
        	listeners: {
        		el: {
	        		click: function(){
	        			
	        			var me = Ext.getCmp("droneToolbar");
	        			
	        			var cboDroneArea = Ext.getCmp("cboDroneArea");
	        			me.initVComboBox(cboDroneArea);
	        			
	        			var cboDroneSiteList = Ext.getCmp("cboDroneSiteList");
	        			me.initVComboBox(cboDroneSiteList);
	        			
	        			var cboDroneDate = Ext.getCmp("cboDroneDate");
	        			me.initVComboBox(cboDroneDate);
	        			
	        			var cboDroneChla = Ext.getCmp("cboDroneChla");
	        			me.initVComboBox(cboDroneChla);
	        			
	        			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite");
	        			me.initVComboBox(cboDroneWBSite);
	        			
	        			var cboDroneLayer = Ext.getCmp("cboDroneLayer");
	        			me.initVComboBox(cboDroneLayer);
	        		}
        		}
        	}
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
    },
    
    initVComboBox: function(comboCtl){
    	
    	var x = 0;
		var y = 14;
		
    	comboCtl.removeAll();
    	comboCtl.x = x;
    	comboCtl.y = y;
    	comboCtl.initComponent();
    }
});