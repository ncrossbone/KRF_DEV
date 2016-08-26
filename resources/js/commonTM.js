/*
 * 주제도 표출 관련 공통 클래스 */

// 집수구역별 주제도 보여주기
showCatTMMap = function(){
	
	var coreMap = GetCoreMap();
	var arrAreaGrp = coreMap.reachLayerAdmin_v3_New.arrAreaGrp;
	var inStrCatDids = "";
	//console.info(coreMap.reachLayerAdmin_v3_New.arrAreaGrp);
	for(var i = 0; i < arrAreaGrp.length; i++){
		
		inStrCatDids += "'" + arrAreaGrp[i].attributes.CAT_DID + "', ";
	}
	
	if(inStrCatDids.length > 0){
		
		inStrCatDids = inStrCatDids.substring(0, inStrCatDids.length -2);
	}
	
	console.info(inStrCatDids);
	
	coreMap.TMLayerAdmin = Ext.create("KRF_DEV.view.map.TMLayerAdmin", inStrCatDids);
	//coreMap.DynamicLayerTMAdmin = Ext.create("KRF_DEV.view.map.DynamicLayerTMAdmin", coreMap.map, inStrCatDids);
}

// 그래픽 오브젝트에서 센터 포인트 가져오기
getCenterFromGraphic = function(graphic){
	
	var centerPoint = null;
	
	switch(graphic.geometry.type){
		case "point":
			centerPoint = graphic.geometry;
			break;
		case "extent":
			centerPoint = graphic.getCenter();
			break;
		default:
			centerPoint = graphic.geometry.getExtent().getCenter();
	}
	
	return centerPoint;
}