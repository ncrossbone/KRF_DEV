Ext.define('KRF_DEV.view.krad.kradEvtPop', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradEvtPop',
	id: 'kradEvtPop',

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "background-image: url(./resources/images/button/option_bg1.png); border:0px;",
	header: {
		height: 1,
		style: "background-color: transparent; border: none;"
	},
	closable: false,
	resizable: false,
	
	clickBtnId: null,

	initComponent: function(){
		
		var me = this;
		var coreMap = GetCoreMap();
		
		me.items = [{
			xtype: "image", // 리치(Reach)
			id: "btnKradReach",
			src:"./resources/images/button/btn_option_1_off.gif",
			style:"padding-left:4px; margin-top:2px; padding-right:4px; cursor: pointer;",
			width: "100%",
			height: 21,
			listeners: {
				el: {
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = this.id;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						this.dom.setAttribute("src","./resources/images/button/btn_option_1_over.gif");
						//coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Reach", me.drawOption, me.evt);
					},
					mouseover: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_over.gif");
						}
					},
					mouseout: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_off.gif");
						}
					}
				}
			}
		}, {
			xtype: "image", // 점(Point)
			id: "btnKradPoint",
			src:"./resources/images/button/btn_option_2_off.gif",
			style:"padding-left:4px; padding-right:4px; cursor: pointer;",
			width: "100%",
			height: 21,
			listeners:{
				el:{ 
					click: function(a, b, c, d){ // 점 버튼 클릭
						
						// 버튼 아이디 셋팅
						me.clickBtnId = this.id;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						this.dom.setAttribute("src","./resources/images/button/btn_option_2_over.gif");
						
						// 맵 클릭 이벤트 삭제
						coreMap.kradLayerAdmin.clearMapClickEvt();
						
						// KRAD 이벤트 그래픽 그리기
						coreMap.kradLayerAdmin.drawKRADEvtGrp();
					},
					mouseover: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
							this.dom.setAttribute("src","./resources/images/button/btn_option_2_over.gif");
						}
					},
					mouseout: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
							this.dom.setAttribute("src","./resources/images/button/btn_option_2_off.gif");
						}
					}
				}
			}
		}, {
			xtype: "image", // 선(Line)
			src:"./resources/images/button/btn_option_3_off.gif",
			style:"padding-left:4px; padding-right:4px; cursor: pointer;",
			height: 21,
			width: "100%",
			listeners:{
				el:{
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = this.id;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						this.dom.setAttribute("src","./resources/images/button/btn_option_3_over.gif");
						//coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Line", me.drawOption, me.evt);
					},
					mouseover: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
							this.dom.setAttribute("src","./resources/images/button/btn_option_3_over.gif");
						}
					},
					mouseout: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
							this.dom.setAttribute("src","./resources/images/button/btn_option_3_off.gif");
						}
					}
				}
			}
		}, {
			xtype: "image", // 면(Area)
			src:"./resources/images/button/btn_option_4_off.gif",
			style:"padding-left:4px; padding-right:4px; cursor: pointer;",
			height: 21,
			width: "100%",
			listeners:{
				el:{
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = this.id;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						this.dom.setAttribute("src","./resources/images/button/btn_option_4_over.gif");
						//coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Area", me.drawOption, me.evt);
					},
					mouseover: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
							this.dom.setAttribute("src","./resources/images/button/btn_option_4_over.gif");
						}
					},
					mouseout: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							// 이미지 변경
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
			}
		}, {
			xtype: "image", // 닫기
			src:"./resources/images/button/btn_close4.gif",
			style:"padding-right:4px; cursor: pointer;",
			height: 15,
			width: "50%",
			listeners: {
				el: {
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = this.id;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						me.close();
					}
				}
			}
		}];
		
		me.callParent();
	},
	// 버튼 src 초기화
	initBtnSrc: function(){
		
		//console.info(this.items.items);
		var btnItems = this.items.items;
		
		for(var i = 0; i < btnItems.length; i++){
			
			btnItems[i].setSrc(btnItems[i].src);
		}
	}
});