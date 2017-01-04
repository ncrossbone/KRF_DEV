Ext.define('KRF_DEV.view.krad.kradEvtPop', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradEvtPop',
	id: 'kradEvtPop',

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "background-image: url(./resources/images/button/option_bg2.png); background-size: 78px 130px; border:0px;",
	header: {
		height: 1,
		style: "background-color: transparent; border: none;"
	},
	closable: false,
	resizable: false,
	
	pClickEvt: null, // 포인트 버튼 클릭 이벤트
	pOverEvt: null, // 포인트 버튼 오버 이벤트
	pOutEvt: null, // 포인트 버튼 아웃 이벤트
	
	lClickEvt: null, // 라인 버튼 클릭 이벤트
	lOverEvt: null, // 라인 버튼 오버 이벤트
	lOutEvt: null, // 라인 버튼 아웃 이벤트
	
	polyClickEvt: null, // 면 버튼 클릭 이벤트
	polyOverEvt: null, // 면 버튼 오버 이벤트
	polyOutEvt: null, // 면 버튼 아웃 이벤트
	
	arrEvtType: [], // 이벤트 타입 배열

	initComponent: function(){
		
		var me = this;
		
		me.reachBtnObj = {
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
						
						this.dom.setAttribute("src","./resources/images/button/btn_option_1_on.gif");
						
						//coreMap.kradLayerAdmin.isPreExec = true;
						//coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Reach", me.drawOption, me.evt);
						
						// 포인트 그래픽 그리기
						_krad.setClickEvt(_krad.mapClickEvt, "Reach");
						// 이벤트 초기화
						initKradEvt();
						// 팝업 메뉴 닫기
						_krad.closePopup();
					},
					mouseover: function(){
						
						// 버튼이 클릭되지 않았을 때
						if(me.clickBtnId != this.id){
							
							this.dom.setAttribute("src","./resources/images/button/btn_option_1_on.gif");
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
		};
		
		me.pointBtnObj = {
			xtype: "image", // 점(Point)
			id: "btnKradPoint",
			src:"./resources/images/button/btn_option_2_off.gif",
			style:"padding-left:4px; padding-top: 0px; padding-right:4px;",
			width: "100%",
			height: 21
		};
		
		me.lineBtnObj = {
			xtype: "image", // 선(Line)
			id: "btnKradLine",
			src:"./resources/images/button/btn_option_3_off.gif",
			style:"padding-left:4px; padding-right:4px;",
			height: 21,
			width: "100%"
		};
		
		me.polygonBtnObj = {
			xtype: "image", // 면(Area)
			id: "btnKradPolygon",
			src:"./resources/images/button/btn_option_4_off.gif",
			style:"padding-left:4px; padding-right:4px;",
			height: 21,
			width: "100%"
		};
		
		me.cancelBtnObj = {
			xtype: "image", // 취소
			src:"./resources/images/button/btn_cancel.gif",
			style:"padding-left:4px; padding-right:2px;",
			height: 17,
			width: 40,
			listeners: {
				el: {
					click: function(){
						
						// 버튼 아이디 셋팅
						me.clickBtnId = null;
						
						// 버튼 src 초기화
						me.initBtnSrc();
						
						// 이벤트 초기화
						initKradEvt();
						
						me.close();
					}
				}
			}
		};
		
		me.closeBtnObj = {
			xtype: "image", // 닫기
			src:"./resources/images/button/btn_close4.gif",
			style:"padding-right:4px; cursor: pointer;",
			height: 17,
			width: 40,
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
		};
		
		me.callParent();
		
		me.setEvtType();
		
		var timerObj = window.setInterval(function(){
			
			if(_krad.kradInfo.length == me.queryCnt){
				
				me.setItemDisabled();
				window.clearInterval(timerObj);
			}
		}, 100);
	},
	// 버튼 src 초기화
	initBtnSrc: function(){
		
		//console.info(this.items.items);
		var btnItems = this.items.items;
		
		for(var i = 0; i < btnItems.length; i++){
			
			btnItems[i].setSrc(btnItems[i].src);
		}
	},
	setEvtType: function(){
		
		var me = this;
		
		me.arrEvtType = [];
		
		me.queryCnt = 0;
		
		for(var i = 0; i < _krad.kradInfo.length; i++){
			
			var layerId = "";
			
			if(_krad.kradInfo[i].EVENT_TYPE == "Point"){
				
				layerId = _krad.kradInfo[i].PE_LAYER_ID;
			}
			else if(_krad.kradInfo[i].EVENT_TYPE == "Line"){
				
				layerId = _krad.kradInfo[i].LO_LAYER_ID;
			}
			
			require(["esri/tasks/query",
	    	         "esri/tasks/QueryTask"],
	    	         function(Query,
	    	        		 QueryTask){
				
				var queryTask = new QueryTask(_krad.kradServiceUrl + "/" + layerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = false;
				query.outFields = ["*"];
				
				query.where = "EXT_DATA_ID = '" + _krad.kradInfo[i].EXT_DATA_ID + "' AND RCH_ID IN (";
				
				for(var j = 0; j < _krad.rchIds.length; j++){
					
					query.where += "'" + _krad.rchIds[j] + "', ";
				}
				
				query.where = query.where.substring(0, query.where.length - 2) + ")";
				//console.info(_krad.kradServiceUrl + "/" + layerId);
				//console.info(query.where);
				queryTask.execute(query, function(featureSet){
					
					if(featureSet.features.length > 0){
						
						var evtIdx = _krad.kradInfo.map(function(obj){
							return obj.EXT_DATA_ID;
						}).indexOf(featureSet.features[0].attributes.EXT_DATA_ID);
						
						var evtType = _krad.kradInfo[evtIdx].EVENT_TYPE;
						
						var evtIdx = me.arrEvtType.indexOf(evtType);
						
						if(evtIdx == -1){
							
							me.arrEvtType.push(evtType);
						}
					}
					
					me.queryCnt++;
				});
			});
		}
	},
	setItemDisabled: function(){
		
		var me = this;
		
		// 리치 버튼 추가
		me.add(me.reachBtnObj);
		
		// 점 버튼 추가
		var idx = me.arrEvtType.indexOf("Point");
		if(idx > -1){
			
			me.add(me.pointBtnObj);
			
			var pointBtn = Ext.getCmp("btnKradPoint");
			
			/*if(_krad.clickPopBtnId == "btnKradPoint"){
				
				pointBtn.setSrc("./resources/images/button/btn_option_2_on.gif");
			}
			else{*/
				
				pointBtn.setSrc("./resources/images/button/btn_option_2_off.gif");
			//}
			
			if(me.pClickEvt != undefined && me.pClickEvt != null){
				me.pClickEvt.remove();
			}
			
			me.pClickEvt = pointBtn.getEl().on("click", function(){
				
				// 버튼 아이디 셋팅
				_krad.clickPopBtnId = this.id;
				
				// 임시 그래픽 클리어
				_krad.tmpGrpLayer.clear();
				// 포인트 그래픽 그리기
				_krad.drawTempGrp("Point");
				// 팝업 메뉴 닫기
				_krad.closePopup();
			});
			
			if(me.pOverEvt != undefined && me.pOverEvt != null){
				me.pOverEvt.remove();
			}
			
			me.pOverEvt = pointBtn.getEl().on("mouseover", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_2_on.gif");
					this.setStyle("cursor", "pointer");
				}
			});
			
			if(me.pOutEvt != undefined && me.pOutEvt != null){
				me.pOutEvt.remove();
			}
			
			me.pOutEvt = pointBtn.getEl().on("mouseout", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_2_off.gif");
				}
			});
		}
		
		// 라인 버튼 추가
		idx = me.arrEvtType.indexOf("Line");
		if(idx > -1){
			
			me.add(me.lineBtnObj);
			
			var lineBtn = Ext.getCmp("btnKradLine");
			
			/*if(_krad.clickPopBtnId == "btnKradLine"){
				
				lineBtn.setSrc("./resources/images/button/btn_option_3_on.gif");
			}
			else{*/
				
				lineBtn.setSrc("./resources/images/button/btn_option_3_off.gif");
			//}
			
			if(me.lClickEvt != undefined && me.lClickEvt != null){
				me.lClickEvt.remove();
			}
			
			me.lClickEvt = lineBtn.getEl().on("click", function(){
				
				// 버튼 아이디 셋팅
				_krad.clickPopBtnId = this.id;
				
				// 임시 그래픽 클리어
				_krad.tmpGrpLayer.clear();
				// 임시 그래픽 그리기
				_krad.drawTempGrp("Line");
				// 팝업 메뉴 닫기
				_krad.closePopup();
			});
			
			if(me.lOverEvt != undefined && me.lOverEvt != null){
				me.lOverEvt.remove();
			}
			
			me.lOverEvt = lineBtn.getEl().on("mouseover", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_3_on.gif");
					this.setStyle("cursor", "pointer");
				}
			});
			
			if(me.lOutEvt != undefined && me.lOutEvt != null){
				me.lOutEvt.remove();
			}
			
			me.lOutEvt = lineBtn.getEl().on("mouseout", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_3_off.gif");
				}
			});
		}
		
		// 라인 버튼 추가
		idx = me.arrEvtType.indexOf("Polygon");
		if(idx > -1){
			
			me.add(me.polygonBtnObj);
			
			var polygonBtn = Ext.getCmp("btnKradPolygon");
			
			/*if(_krad.clickPopBtnId == "btnKradPolygon"){
				
				polygonBtn.setSrc("./resources/images/button/btn_option_4_on.gif");
			}
			else{*/
				
				polygonBtn.setSrc("./resources/images/button/btn_option_4_off.gif");
			//}
			
			if(me.polyClickEvt != undefined && me.polyClickEvt != null){
				me.polyClickEvt.remove();
			}
			
			me.polyClickEvt = polygonBtn.getEl().on("click", function(){
				
				// 버튼 아이디 셋팅
				_krad.clickPopBtnId = this.id;
				
				/*// 임시 그래픽 클리어
				_krad.tmpGrpLayer.clear();
				// 임시 그래픽 그리기
				_krad.drawTempGrp("Polygon");
				// 팝업 메뉴 닫기
				_krad.closePopup();*/
			});
			
			if(me.polyOverEvt != undefined && me.polyOverEvt != null){
				me.polyOverEvt.remove();
			}
			
			me.polyOverEvt = polygonBtn.getEl().on("mouseover", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_4_on.gif");
					this.setStyle("cursor", "pointer");
				}
			});
			
			if(me.polyOutEvt != undefined && me.polyOutEvt != null){
				me.polyOutEvt.remove();
			}
			
			me.polyOutEvt = polygonBtn.getEl().on("mouseout", function(){
				
				// 버튼이 클릭되지 않았을 때
				if(_krad.clickPopBtnId != this.id){
					
					// 이미지 변경
					this.dom.setAttribute("src","./resources/images/button/btn_option_4_off.gif");
				}
			});
		}
		
		me.add(me.cancelBtnObj);
		me.add(me.closeBtnObj);
		
		//me.setHeight(40);
		//me.setHeight(74);
		//me.setHeight(98);
		//me.setHeight(124);
		
		if(me.arrEvtType.length == 0){
			me.setHeight(40);
		}
		if(me.arrEvtType.length == 1){
			me.setHeight(74);
		}
		if(me.arrEvtType.length == 2){
			me.setHeight(98);
		}
		if(me.arrEvtType.length == 3){
			me.setHeight(124);
		}
	}
});