Ext.define('KRF_DEV.view.map.LabelLayerAdmin', {
	map:null, 
	graphicsLayer:null,
	bodDatas:null,
	codDatas:null,
	docDatas:null,
	tnDatas:null,
	tpDatas:null,
	tempDatas:null,
	font:null,
	selectType:null,
	
	constructor: function(map) {
		
		var me = this;
		me.map = map;
		me.font = new esri.symbol.Font("12px", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLDER);
		
		me.graphicsLayer = new esri.layers.GraphicsLayer();
		me.graphicsLayer.id = 'labelGraphics';
		me.map.addLayer(me.graphicsLayer);
		
		/*
		//ash rdbms에서 읽어오게 할 수 있습니다.
		var queryTask = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/16");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			me.bodDatas = results.features;
		});
		
		var queryTask2 = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/17");
		var query2 = new esri.tasks.Query();
		query2.returnGeometry = false;
		query2.where = "1=1";
		query2.outFields = ["*"];
		queryTask2.execute(query2,  function(results){
			me.codDatas = results.features;
		});
		*/
		
		Ext.Ajax.request({
    		url: _API.GetLabelLayerAdmin, //'./resources/jsp/GetLabelLayerAdmin.jsp',
    		async: true, // 비동기 = async: true, 동기 = async: false
    		timeout: 300000, // timeout 5분
    		success : function(response, opts) {
    			//console.info(response);
    			jsonData = Ext.util.JSON.decode( response.responseText );
    			
    			//console.info(jsonData.bodDatas);
    			//console.info(jsonData.codDatas);
    			me.bodDatas = jsonData.bodDatas;
    			me.codDatas = jsonData.codDatas;
    			me.docDatas = jsonData.docDatas;
    			me.tnDatas = jsonData.tnDatas;
    			me.tpDatas = jsonData.tpDatas;
    			me.tempDatas = jsonData.tempDatas;
    			
    		},
    		failure: function(form, action) {
    			//console.info(form);
    			//console.info(action);
    			//alert("라벨 데이터 조회 중 오류가 발생하였습니다.");
    			//alert("dd");
    		}
    	});
		
		dojo.connect(me.map, "onExtentChange", function(extent){
			me.renderLabel(extent);
		});
		
		KRF_DEV.getApplication().addListener('selectMapDisplayType', me.selectMapDisplayTypeHandler, me);
	},
	
	selectMapDisplayTypeHandler:function(val){
		var me = this;
		me.selectType = val;
		me.renderLabel();
	},
	
	renderLabel:function(extent){
		var me = this;
		var searchDatas;
		if(!extent){
			extent = me.map.extent;
		}
		me.graphicsLayer.clear();
		if(!me.selectType ||
				(
				   me.selectType!='BOD'
				&& me.selectType!='COD'
				&& me.selectType!='DO'
				&& me.selectType!='T-N'
				&& me.selectType!='T-P'
				&& me.selectType!='수온'
				)){
			return;
		}else{
			if(me.selectType=='BOD'){
				searchDatas = me.bodDatas;
			}else if(me.selectType=='COD'){
				searchDatas = me.codDatas;
			}else if(me.selectType=='DO'){
				searchDatas = me.docDatas;
			}else if(me.selectType=='T-N'){
				searchDatas = me.tnDatas;
			}else if(me.selectType=='T-P'){
				searchDatas = me.tpDatas;
			}else if(me.selectType=='수온'){
				searchDatas = me.tempDatas;
			}else{
				return;
			}
		}
		
		if(me.map.getLevel()>11){
			var layerIds = ["1", "2"];
			
			for(var lCnt = 0; lCnt < layerIds.length; lCnt++){
				//console.info(_mapServiceUrl_v3 + "/" + layerIds[lCnt]);
				var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + layerIds[lCnt]);
				var query = new esri.tasks.Query();
				query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				query.outSpatialReference = {"wkid":102100};
				query.geometry = extent;
				query.outFields = ["측정소코드"];
				queryTask.execute(query,  function(results){
					//console.info(searchDatas);
					if(searchDatas != null){
						for(var i=0; i<results.features.length; i++){
							var feature = results.features[i];
							var result = JSLINQ(searchDatas)
					    	 .Where(function (item) { 
					    		 // if(feature.attributes.측정소코드 == item.attributes.PT_NO){ // 레이어에서 가져왔을때
					    		 if(feature.attributes.측정소코드 == item.PT_NO){ // DB에서 가져왔을때
					    			 return true;
					    		 }
					    	  })
					    	 .ToArray();
							if(result.length>0){
					  			//var tsm = new esri.symbol.TextSymbol(result[0].attributes.VAL, me.font).setOffset(0, -22); // 레이어에서 가져왔을때
								var tsm = new esri.symbol.TextSymbol(result[0].VAL, me.font).setOffset(0, -22); // DB에서 가져왔을때
					  			tsm.color = new dojo.Color("#ff0000");
					  			feature.setSymbol(tsm);
					  			me.graphicsLayer.add(feature);
							}
						}
					}
					else{
						alert("데이터가 조회되지 않았습니다. 잠시 후 다시 시도해주세요.")
					}
					
				});
				
				dojo.connect(queryTask, "onError", function(err) {
					
				});
			}
		}
	}
});