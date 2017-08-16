Ext.define('KRF_DEV.view.main.Main', {
	
    extend: 'Ext.container.Container',

    xtype: 'app-main',
    
    requires:['KRF_DEV.view.south.SearchResultGrid_Reach',
              'KRF_DEV.view.south.SearchResultGrid',
              'KRF_DEV.view.south.SearchResultGrid_B',
              'Ext.grid.filters.Filters'],
    
    viewModel: {
        type: 'main'
    },
    
    layout: {
		type: "absolute"
	},

    items: [{
    	xtype: "container",
    	layout: {
            type: 'vbox'
        },
        items: [{
        	xtype: 'app-default-north',
        	width: '100%',
        	id: 'north_container',
        	weight: 1
        }, {
        	xtype: 'container',
        	layout: {
        		type: 'hbox'
        	},
        	items: [{
        		xtype: 'west-buttonpanel',
        		id: 'west_buttonpanel'
        	}, {
        		xtype: 'container',
        		id: 'cont_container',
        		layout: {
        			type: 'border'
        		},
        		height: '100%',
        		items: [{
        			xtype: 'app-default-west',
        	        region: 'west',
        	        id: 'west_container'
        		}, {
        	    	xtype: 'app-default-center',
        	    	region: 'center',
        	    	id: 'center_container'
        	    }]
        	}],
        	weight: 2
        }]
    }],
    
    initComponent: function(){
    	
var obj = window.chromePop;
		
	/*Ext.create("Ext.window.Window", {
		renderTo: Ext.getBody(),
		width: 460,
		height: 335,
		closable: true,
		id: "testPop",
		header: true,
		title: '알림',
		style: 'border: 0px; margin: 0 0 0 0',
		items: [{
			xtype: 'panel',
			header: false,
			items: [{
				html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
					+ '<html xmlns="http://www.w3.org/1999/xhtml">'
					+ '<head>'
					+ '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
					+ '<title>Untitled Document</title>'
					+ '<style>'
					+ 'html, body,'
					+ 'div, span,'
					+ 'dl, dt, dd, ul, ol, li,'
					+ 'h1, h2, h3, h4, h5, h6,'
					+ 'blockquote, p, address, pre, cite,'
					+ 'form, fieldset, input, textarea, select,'
					+ 'table, th, td {'
					+ 'margin:0;'
					+ 'padding:0;'
					+ '},'
					+ 'background-color:#D9E5FF;' 
					+ '</style>'
					+ '</head>'
					+ '<body>'
					+ '<div style="margin-left:10px;">'
					+ ' <br> '
					+ ' <b>물환경지리정보 서비스 이용제한 안내</b> '
					+ ' <br> '+ ' <br> '+ ' <br> '
					+ '서버 보안강화 작업으로 인해'
					+ ' <br> '+ ' <br> '
					+ '다음과 같이 물환경지리정보 서비스 이용이 제한됨을 알려드립니다'
					+ ' <br> '+ ' <br> '
					+ '작업시간내 서비스 이용이 제한되며,'
					+ ' <br> '+ ' <br> '
					+ '빠른시간내 서비스를 재개할 수 있도록 하겠습니다'
					+ ' <br> '+ ' <br> '
					+ '이용에 불편을드려 대단히 죄송합니다.'
					+ ' <br> '+ ' <br> '
					+ '* 일시  '
					+ ' <br> '
					+ '<b> 2017.8.11(금) 09:00 ~ 2017.8.11(금) 15:00 </b>'
					+ ' <br> '
					+ '※시간은 변동될 수 있습니다.    '
					+ '<map name="Map" id="Map">'
					+ '</map>'
					+ '</div>'
					+ '</body>'
					+ '</html>'
			}]
		}]
	}).show();*/

	//if(Ext.browser.is.IE == true ){ // IE11 아래 버전 막기
	if(Ext.browser.is.IE == true && Ext.browser.version.major < 10){ // IE11 아래 버전 막기
		
		Ext.create("Ext.window.Window", {
			renderTo: Ext.getBody(),
			width: 460,
			height: 335,
			closable: false,
			id: "chromePop",
			header: false,
			title: '알림',
			style: 'border: 0px; margin: 0 0 0 0',
			items: [{
				xtype: 'panel',
				header: false,
				items: [{
					html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
						+ '<html xmlns="http://www.w3.org/1999/xhtml">'
						+ '<head>'
						+ '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
						+ '<title>Untitled Document</title>'
						+ '<style>'
						+ 'html, body,'
						+ 'div, span,'
						+ 'dl, dt, dd, ul, ol, li,'
						+ 'h1, h2, h3, h4, h5, h6,'
						+ 'blockquote, p, address, pre, cite,'
						+ 'form, fieldset, input, textarea, select,'
						+ 'table, th, td {'
						+ 'margin:0;'
						+ 'padding:0;'
						+ '},'
						+ 'background-color:#D9E5FF;' 
						+ '</style>'
						+ '</head>'
						+ '<body>'
						+ '<div><img src="./resources/images/chrome_pop_2.jpg" usemap="#Map" border="0" />'
						+ '<map name="Map" id="Map">'
						+ '<area shape="rect" coords="431,0,460,29" onclick=\"chromePopClose();\" title="닫기" />'
						+ '</map>'
						+ '</div>'
						+ '</body>'
						+ '</html>'
				}]
			}]
		}).show();
	}
 		
    	
 		if(document.URL != "http://211.114.21.35:KRF_DEV"){
 			
	 		//if(Ext.browser.is.Chrome == false){
	 		//if(Ext.browser.is.IE == true ){ // IE11 아래 버전 막기
	 		if(Ext.browser.is.IE == true && Ext.browser.version.major < 10){ // IE11 아래 버전 막기
 			//if(Ext.browser.is.IE == true){
	 			
	 			Ext.create("Ext.window.Window", {
	 				renderTo: Ext.getBody(),
	 				width: 886,
	 				height: 620,
	 				closable: false,
	 				header: false,
	 				title: '알림',
	 				style: 'border: 0px; margin: 0 0 0 0',
	 				items: [{
	 					xtype: 'panel',
	 					layout: {
	 						type: 'vbox',
	 						align: 'middle',
	 						pack: 'middle'
	 					},
	 					header: false,
	 					items: [{
	 						html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	 							+ '<html xmlns="http://www.w3.org/1999/xhtml">'
	 							+ '<head>'
	 							+ '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
	 							+ '<title>Untitled Document</title>'
	 							+ '<style>'
	 							+ 'html, body,'
	 							+ 'div, span,'
	 							+ 'dl, dt, dd, ul, ol, li,'
	 							+ 'h1, h2, h3, h4, h5, h6,'
	 							+ 'blockquote, p, address, pre, cite,'
	 							+ 'form, fieldset, input, textarea, select,'
	 							+ 'table, th, td {'
	 							+ 'margin:0;'
	 							+ 'padding:0;'
	 							+ '}'
	 							+ '</style>'
	 							+ '</head>'
	 							+ '<body>'
	 							+ '<div><img src="./resources/images/chrome_pop.jpg" usemap="#Map" border="0" />'
	 							+ '<map name="Map" id="Map">'
	 							+ '<area shape="rect" coords="850,3,885,35" href="javascript:window.close();" title="닫기" />'
	 							+ '<area shape="rect" coords="135,184,749,315" href="./resources/downloads/ChromeStandaloneSetup.exe" title="Chrome 다운로드" />'
	 							+ '</map>'
	 							+ '</div>'
	 							+ '</body>'
	 							+ '</html>'
	 					}]
	 				}]
	 			}).show();
	 			return;
	 		}
 		}
 		
 		this.callParent();
 		
    	// 메인 컨테이너 전역변수
    	KRF_DEV.getApplication().northContainer = Ext.getCmp('north_container');
    	KRF_DEV.getApplication().westBtnContainer = Ext.getCmp('west_buttonpanel');
    	KRF_DEV.getApplication().contContainer = Ext.getCmp('cont_container');
    	KRF_DEV.getApplication().contWestContainer = Ext.getCmp('west_container');
    	KRF_DEV.getApplication().contCenterContainer = Ext.getCmp('center_container');
    	
    	/* >>>> khLee Drone 툴바 추가 20160613 */
    	var droneToolbar = Ext.create('KRF_DEV.view.center.drone.DroneToolbar', {
    		x: 390,
    		//y: Ext.getBody().getHeight() / 2 - 8
    		y: 97
    	});
    	this.add(droneToolbar);
    	//KRF_DEV.getApplication().contCenterContainer.add(droneToolbar);
    	/* <<<< khLee Drone 툴바 추가 20160613 */
    	
    	//var contWestPlaceholder = Ext.get('west_container-placeholder');
    	//console.info(contWestPlaceholder);
    	
    	this.setControlSize(); // 사이즈 조절
    	this.on("resize", this.setControlSize); // 이벤트 생성
    	
    	droneToolbar.hide();
    },
    
    
    
    // 메인 컨테이너 사이즈 조절
    setControlSize: function(){
    	
    	var northContainer = KRF_DEV.getApplication().northContainer;
    	var westBtnContainer = KRF_DEV.getApplication().westBtnContainer;
    	var contContainer = KRF_DEV.getApplication().contContainer;
    	var contWestContainer = KRF_DEV.getApplication().contWestContainer;
    	var contCenterContainer = KRF_DEV.getApplication().contCenterContainer;
    	
    	//console.info(contWestContainer.el.placeholder);
    	
    	northContainer.setWidth(Ext.getBody().getViewSize().width);
    	westBtnContainer.setHeight(Ext.getBody().getViewSize().height - northContainer.height);
    	contContainer.setWidth(Ext.getBody().getViewSize().width - westBtnContainer.width);
    	contContainer.setHeight(Ext.getBody().getViewSize().height - northContainer.height);
    	
    	try{
    		var nc = Ext.getCmp('north_container');
        	var wb = Ext.getCmp('west_buttonpanel');
        	var cc = Ext.getCmp('cont_container');
        	var wc = Ext.getCmp('west_container');
        	var ccn= Ext.getCmp('center_container');
        	var mapC = Ext.getCmp('_mapDiv_');
        	ccn.setWidth(ccn.getWidth()+wb.getWidth()+wc.getWidth());
    		mapC.setWidth(ccn.getWidth()+wb.getWidth()+wc.getWidth());
    		mapC.setHeight(ccn.getHeight());
    		KRF_DEV.getApplication().coreMap.map.resize();
    	}catch(e){}
    	
    	
    	var droneToolbar = Ext.getCmp('droneToolbar');
    	
		if(droneToolbar != undefined){
			
			var reachToolbar = Ext.getCmp("reachToolbar");
			if(reachToolbar != undefined && droneToolbar.y == 97 && Ext.getCmp("btnModeReach").btnOnOff == "on"){
				droneToolbar.setPosition(droneToolbar.x,droneToolbar.y + 105);
			}else{
            	droneToolbar.setPosition(droneToolbar.x,droneToolbar.y);
            }
			
		}
		
		var chlLegend = Ext.getCmp("chlLegend"); //피코시아닌 범례
		var phyLegend = Ext.getCmp("phyLegend"); //클로로필 범례

    	if(chlLegend != undefined){
    		chlLegend.setPosition(Ext.getBody().getViewSize().width - 244,Ext.getBody().getViewSize().height - 61)
    	}
		
		if(phyLegend != undefined){
    		phyLegend.setPosition(Ext.getBody().getViewSize().width - 244,Ext.getBody().getViewSize().height - 61)
    	}
    	
    	/* Drone 툴바 위치 조절 */
    	/*var droneCtl = Ext.getCmp("droneToolbar");
    	
    	var droneToolX = droneCtl.x;
    	var droneToolWidth = droneCtl.width;
    	var bodyWidth = Ext.getBody().getWidth();
    	
    	if(droneToolX + droneToolWidth > bodyWidth){
    		droneCtl.setX(bodyWidth - droneToolWidth);
    	}
    	
    	var droneToolY = droneCtl.y;
    	var droneToolHeight = droneCtl.height;
    	var bodyHeight = Ext.getBody().getHeight();
    	
    	if(droneToolY + droneToolHeight > bodyHeight){
    		
    		droneCtl.setY(bodyHeight - droneToolHeight);
    	}
    	//default 숨김
    	droneCtl.hide();*/
    	/* Drone 툴바 위치 조절 끝 */
    }
});