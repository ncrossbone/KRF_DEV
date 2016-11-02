drawKRADEvtGrp = function(rchIds, evt, drawOption){
	
	var coreMap = GetCoreMap();
	//coreMap.kradLayerAdmin.clearLayer();
	coreMap.kradLayerAdmin.clearEvent();
	
	//console.info(_kradInfo);
	//var rchId = "10071017";
	var extDataId = "OBS_WQ_STR_EV";
	// <== 리치검색 됐다고 치고..
	showKRADEvtPop(rchIds, evt, drawOption);
}

showKRADEvtPop = function(rchIds, evt, drawOption){
	
	var cursorX = _cursorX;
	var cursorY = _cursorY;
	var bodyWidth = Ext.getBody().getWidth();
	var bodyHeight = Ext.getBody().getHeight();
	var popWidth = 80;
	var popHeight = 120;
	
	if(_cursorX > bodyWidth - popWidth){
		cursorX = bodyWidth - popWidth;
	}
	if(_cursorY > bodyHeight - popHeight){
		cursorY = bodyHeight - popHeight;
	}
	
	var popupMenu = Ext.getCmp("kradEvtPop");
	if(popupMenu == undefined){
		popupMenu = Ext.create("KRF_DEV.view.krad.kradEvtPop", {
			width: popWidth,
			height: popHeight,
			x: cursorX,
			y: cursorY,
			rchIds: rchIds,
			evt: evt,
			drawOption: drawOption,
			style:"background-image: url(./resources/images/button/option_bg1.png); border:0px;"
		}).show();
	}
	else{
		popupMenu.setX(cursorX);
		popupMenu.setY(cursorY);
		popupMenu.rchIds = rchIds;
		popupMenu.evt = evt;
		popupMenu.drawOption = drawOption;
	}
}

drawKRADLayer = function(){
	
	var coreMap = GetCoreMap();
	
	var kradStRchId = coreMap.kradLayerAdmin.stRchId;
	var kradEdRchId = coreMap.kradLayerAdmin.edRchId;
	
	var kradStLineGrps = coreMap.kradLayerAdmin.arrStLineGrp;
	var kradStAreaGrps = coreMap.kradLayerAdmin.arrStAreaGrp;
	var kradEdLineGrps = coreMap.kradLayerAdmin.arrEdLineGrp;
	var kradEdAreaGrps = coreMap.kradLayerAdmin.arrEdAreaGrp;
	
	var kradStLDGrps = coreMap.kradLayerAdmin.arrStLDGrp;
	var kradEdLDGrps = coreMap.kradLayerAdmin.arrEdLDGrp;
	
	var reachLineGraphics = coreMap.reachLayerAdmin_v3_New.lineGrpLayer.graphics;
	
	for(var i = 0; i < reachLineGraphics.length; i++){
		
		var rchId = reachLineGraphics[i].attributes.RCH_ID;
		if(rchId == kradStRchId || rchId == kradEdRchId){
			
			coreMap.reachLayerAdmin_v3_New.removeLine(reachLineGraphics[i], "lineGrpLayer");
		}
		
		var stLDIdx = kradStLDGrps.map(function(e){
			//console.info(e);
			return e.attributes.RCH_ID;
		}).indexOf(rchId);
		
		if(stLDIdx > -1){
			
			coreMap.reachLayerAdmin_v3_New.removeGraphics(reachLineGraphics[i], "lineGrpLayer");
		}
	}
	
	var reachAreaGraphics = coreMap.reachLayerAdmin_v3_New.areaGrpLayer.graphics;
	
	for(var i = 0; i < reachAreaGraphics.length; i++){
		
		var catId = reachAreaGraphics[i].attributes.CAT_ID;
		
		var stAreaIdx = kradStAreaGrps.map(function(e){
			return e.attributes.CAT_ID;
		}).indexOf(catId);
		
		//console.info(stAreaIdx);
		if(stAreaIdx > -1){
			
			coreMap.reachLayerAdmin_v3_New.removeGraphics(reachAreaGraphics[i], "areaGrpLayer");
		}
	}
	
	coreMap.kradLayerAdmin.drawKRADLayer();
	
	coreMap.kradLayerAdmin.clearEvent();
	
	if(coreMap.kradLayerAdmin.stEvtType != null && coreMap.kradLayerAdmin.edEvtType != null){
	
		console.info(coreMap.kradLayerAdmin.stEvtType);
		console.info(coreMap.kradLayerAdmin.edEvtType);
		
		coreMap.reachLayerAdmin_v3_New.lineGrpLayer.setVisibility(true);
		coreMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(true);
		
		coreMap.kradLayerAdmin.clearKRADLayer();
		
		// 지점 목록 창 띄우기
		Ext.ShowSiteListWindow("selectReach");
		
		// 검색결과 창 띄우기
		ShowSearchResultReach("");
		//PollLoadSearchResult("");
	}
}