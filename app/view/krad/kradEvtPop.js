Ext.define('KRF_DEV.view.krad.kradEvtPop', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradEvtPop',
	id: 'kradEvtPop',

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: {
		height: 1,
		style: "background-color: transparent; border: none;"
	},
	closable: false,
	resizable: false,
	
	drawOption: null,
	rchIds: null,
	evt: null,

	initComponent: function(){
		
		var me = this;
		var coreMap = GetCoreMap();
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "dojo/_base/Color"],
				function(SimpleMarkerSymbol,
						Color){
			
			var overSymbol = new SimpleMarkerSymbol();
			overSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			overSymbol.setSize(30);
			overSymbol.setColor(new Color([255,0,0,1]));
			
			var outSymbol = new SimpleMarkerSymbol();
			outSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			outSymbol.setSize(10);
			outSymbol.setColor(new Color([255,0,0,1]));
		
			var symbol = null;
			var btnId = null;
			
			if(me.drawOption == "startPoint" || me.drawOption == "start"){
				btnId = "btnMenu04";
				symbol = coreMap.reachLayerAdmin_v3_New.startSymbol;
			}
			if(me.drawOption == "endPoint" || me.drawOption == "end"){
				btnId = "btnMenu05";
				symbol = coreMap.reachLayerAdmin_v3_New.endSymbol;
			}
			
			var where = "";
			if(me.rchIds.length == 1){
				where = "RCH_ID = #RCH_ID#";
			}
			else{
				where = "RCH_ID IN (#RCH_ID#)";
			}
			
			var strRchId = "";
			for(var i = 0; i < me.rchIds.length; i++){
				strRchId += "'" + me.rchIds[i] + "', ";
			}
			
			strRchId = strRchId.substring(0, strRchId.length - 2);
			
			where = where.replace("#RCH_ID#", strRchId);
			
			me.items = [{
				xtype: "image",
				src:"./resources/images/button/btn_option_1_off.gif",
				//text: "Reach",
				style:"padding-left:4px; margin-top:2px; padding-right:4px; cursor: pointer;",
				width: "100%",
				height: 21,
				listeners: {
					el: {
						click: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_over.gif");
							coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Reach", me.drawOption, me.evt);
						},
						mouseover: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_over.gif");
						},
						mouseout: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_off.gif");
						}
					}
				}
			}, {
				xtype: "image",
				src:"./resources/images/button/btn_option_2_off.gif",
				//text: "Point",
				style:"padding-left:4px; padding-right:4px; cursor: pointer;",
				width: "100%",
				height: 21,
				listeners:{
					el:{
						click: function(){
							
							this.dom.setAttribute("src","./resources/images/button/btn_option_2_over.gif");
							coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Point", me.drawOption, me.evt);
						},
						mouseover: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_2_over.gif");
						},
						mouseout: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_2_off.gif");
						}
					}
				}
			}, {
				xtype: "image",
				//text: "Line",
				src:"./resources/images/button/btn_option_3_off.gif",
				style:"padding-left:4px; padding-right:4px; cursor: pointer;",
				height: 21,
				width: "100%",
				listeners:{
					el:{
						click: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_3_over.gif");
							coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Line", me.drawOption, me.evt);
						},
						mouseover: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_3_over.gif");
						},
						mouseout: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_3_off.gif");
						}
					}
				}
			}, {
				xtype: "image",
				//text: "Area",
				src:"./resources/images/button/btn_option_4_off.gif",
				style:"padding-left:4px; padding-right:4px; cursor: pointer;",
				height: 21,
				width: "100%",
				listeners:{
					el:{
						click: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_4_over.gif");
							coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Area", me.drawOption, me.evt);
						},
						mouseover: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_4_over.gif");
						},
						mouseout: function(){
							this.dom.setAttribute("src","./resources/images/button/btn_option_4_off.gif");
						}
					}
				}
			}
		}, {
			xtype: "image", // 취소
			src:"./resources/images/button/btn_cancel.gif",
			style:"padding-left:4px; padding-right:4px; cursor: pointer;",
			height: 15,
			width: "50%",
			listeners: {
				el: {
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = null;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						// 그래픽 레이어 초기화
						coreMap.kradLayerAdmin.tmpGrpLayer.clear();
						// 이벤트 초기화
						coreMap.kradLayerAdmin.clearEvent();
						// 맵 클릭 이벤트 생성
						coreMap.kradLayerAdmin.createMapClickEvt(coreMap.kradLayerAdmin.drawOption);
						
						//me.close();
					}
				}
			}, {
				xtype: "image",
				//text: "닫기",
				src:"./resources/images/button/btn_close4.gif",
				style:"padding-right:4px; cursor: pointer;",
				height: 15,
				width: "50%",
				listeners: {
					el: {
						click: function(){
							me.close();
						}
					}
				}
			}];
		});
		
		me.callParent();
	}

});