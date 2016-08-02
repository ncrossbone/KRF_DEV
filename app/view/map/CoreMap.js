Ext.define('KRF_DEV.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'app-map-coreMap',
	
	id: '_mapDiv_',
	
	requires: [
		'KRF_DEV.view.map.DynamicLayerAdmin'
	],
	
	map:null,
	dynamicLayerAdmin:null,
	fullExtent:null,
	initialExtent:null,
	preExtent: null,
	preResolution: null,
	preLevel: null,
	layerInfo: null,
	printTask:null,
	baseMap: null,
	
	width: 2650, // 센터이동 및 툴팁 2200에 맞춰져있음
	height: 1100,
	x: -378,
	y: -80,
	
	initComponent: function() {
		this.on('render', this.mapRendered, this);
		this.callParent();
	},
	
	mapRendered: function(p){
        var me = this;   
        
        var timerId = window.setInterval(function(){
        	me.map = new esri.Map('_mapDiv_', {
    	     	isDoubleClickZoom:false,
    	     	isPan:false,
    	 		logo:false,
    	 		slider: true,
    	 		showAttribution: false,
    	 		sliderPosition: "bottom-right",
    	 		sliderStyle: "large",
    	 		zoom: 8,
    	 		autoResize: true
    		});
            
        	//me.map.resize();
        	me.baseMapInit();
        	me.map.setLevel(8);
        	window.clearInterval(timerId);
        	
        	
        	

        	
        	
        	me.dynamicLayerAdmin1 = Ext.create('KRF_DEV.view.drone.map.DynamicLayerAdmin1', me.map);
        	/*me.droneDynamicLayerAdmin1 = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin1', me.map);
        	me.droneDynamicLayerAdmin2 = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin2', me.map);
        	me.droneDynamicLayerAdmin3 = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin3', me.map);
        	me.droneDynamicLayerAdmin4 = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin4', me.map);*/
        	/*me.dynamicLayerAdmin2 = Ext.create('KRF_DEV.view.drone.map.DynamicLayerAdmin2', me.map);
        	me.dynamicLayerAdmin3 = Ext.create('KRF_DEV.view.drone.map.DynamicLayerAdmin3', me.map);
        	me.dynamicLayerAdmin4 = Ext.create('KRF_DEV.view.drone.map.DynamicLayerAdmin4', me.map);*/
        	
        	me.reachLayerAdmin_dim = Ext.create('KRF_DEV.view.map.ReachLayerAdminBackground', me.map); // Dim처리 레이어
        	me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin', me.map);
        	//me.reachLayerAdmin = Ext.create('KRF_DEV.view.map.ReachLayerAdmin', me.map); // v2
        	//me.reachLayerAdmin_v3_New = Ext.create('KRF_DEV.view.map.reachLayerAdmin_v3_New', me.map); // v3
        	me.reachLayerAdmin_v3_New = Ext.create('KRF_DEV.view.map.ReachLayerAdmin_v3_New', me.map); // v3 New
        	me.searchLayerAdmin = Ext.create('KRF_DEV.view.map.SearchLayerAdmin', me.map, me.geometryService);
        	me.featureLayerAdmin = Ext.create('KRF_DEV.view.map.FeatureLayerAdmin1', me.map);
        	me.graphicsLayerAdmin = Ext.create('KRF_DEV.view.map.GraphicsLayerAdmin', me.map);
        	me.labelLayerAdmin = Ext.create('KRF_DEV.view.map.LabelLayerAdmin', me.map);
        	//me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin_ReachTest', me.map); // 시뮬레이션용 레이어 서비스
        	
        	/* 레포트용 레이어 테스트 */
        	me.reportLayerTest = Ext.create('KRF_DEV.view.map.test.ReportLayerTest', me.map); // Dim처리 레이어
        	/* 레포트용 레이어 테스트 끝 */
        	
        	//dojo.require("esri.dijit.Scalebar");
        	//var scalebar = new esri.dijit.Scalebar({map:me.map, attachTo:"top-right"});
        	
        	// 전역 변수 설정 KRF_DEV.getApplication().coreMap
        	KRF_DEV.getApplication().coreMap = me;
        	
        	require(["KRF_DEV/view/map/task/CustomPrintTask"], function() {
            	//me.printTask  = new KRF_DEV.view.map.task.CustomPrintTask();
            	me.printTask = new KRF_DEV.view.map.task.CustomPrintTask(me.map, "_mapDiv_", "./resources/jsp/CustomPrintTask.jsp", _arcServiceUrl);
            });
        	
        	// Extent Change Event
    		dojo.connect(me.map, "onExtentChange", me.onExtentChange);
        	
		}, 1);
    },
    
    baseMapInit: function(){
		var me = this;
		dojo.declare('CustomMapsLayer', esri.layers.TiledMapServiceLayer, {
		    constructor: function(opts) {
		      opts = opts || {};
		      this.spatialReference = new esri.SpatialReference({wkid: 102100});
		      this.tileInfo = new esri.layers.TileInfo({
		        rows: 256, cols: 256, dpi: 96,
		        origin: {x: -20037508.342787, y: 20037508.342787},
		        spatialReference: {wkid: 102100},
		        lods: [
						{level:0, resolution:156543.033928,    scale:591657527.591555},
						{level:1, resolution:78271.5169639999, scale:295828763.795777},
						{level:2, resolution:39135.7584820001, scale:147914381.897889},
						{level:3, resolution:19567.8792409999, scale:73957190.948944},
						{level:4, resolution:9783.93962049996, scale:36978595.474472},
						{level:5, resolution:4891.96981024998, scale:18489297.737236},
						{level:6, resolution:2445.98490512499, scale:9244648.868618},
						{level:7, resolution:1222.99245256249, scale:4622324.434309}, //start
						{level:8, resolution:611.49622628138,  scale:2311162.217155},
						{level:9, resolution:305.748113140558, scale:1155581.108577},
						{level:10,resolution:152.874056570411, scale:577790.554289},
						{level:11,resolution:76.4370282850732, scale:288895.277144},
						{level:12,resolution:38.2185141425366, scale:144447.638572},
						{level:13,resolution:19.1092570712683, scale:72223.819286},
						{level:14,resolution:9.55462853563415, scale:36111.909643},
						{level:15,resolution:4.77731426794937, scale:18055.954822},
						{level:16,resolution:2.38865713397468, scale:9027.977411},
						{level:17,resolution:1.19432856685505, scale:4513.988705},
						{level:18,resolution:0.597164283559817,scale:2256.994353}, //end
						{level:19,resolution:0.298582141647617,scale:1128.497176}
		          ]
		      });
		      
		      me.tileInfo = this.tileInfo;
		      
		      this.fullExtent = new esri.geometry.Extent({
		    	  xmin: 13051204.69152676,
		    	  ymin: 3309091.461517964,
		    	  xmax: 15889117.943692,
		    	  ymax: 5341704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      
		      me.initialExtent = me.preExtent = this.initialExtent = new esri.geometry.Extent({
		    	  xmin: 13051204.69152676,
		    	  ymin: 3309091.461517964,
		    	  xmax: 15889117.943692,
		    	  ymax: 5341704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      
		      this.loaded = true;
		      this.onLoad(this);
		    },
		    getTileUrl: function(level, row, col) {
		    	var newrow = row + (Math.pow(2, level) * 47);
      			var newcol = col + (Math.pow(2, level) * 107);
      			// http://10.101.95.129/Base/201411/11/11/1747/800.png
      			// 토양지하수 베이스 맵 서비스 URL
      			//return "http://10.101.95.129/Base/201411/" + level + "/" + level + "/" + col + "/" + row + ".png";
      			// 테스트 서버 베이스 맵 서비스 URL
      			//return "http://112.218.1.243:20080/2d/Base/201411/" + level + "/" + level + "/" + col + "/" + row + ".png";
		    	return "http://xdworld.vworld.kr:8080/2d/Base/201301/" + level + "/" + col + "/" + row + ".png";
		    }	
		  });
		me.baseMap = new CustomMapsLayer();
		this.map.addLayer(me.baseMap);
	},
	
	extentMove:function(extent, level){
		var me = this;
		var deferred = me.map.setExtent(extent, true);
		deferred.then(function(value){
			me.map.setLevel(level);
		},function(error){
		});
	},
	
	print:function(){
		var me = this;
		me.printTask.print();
	},
	
	capture:function(){
		var me = this;
		alert("dd");
		me.printTask.capture();
	},
	
	favoriteExe:function(data){
		var me = this;
		var extentJson = data.EXTENT;
		var extent = new esri.geometry.Extent(extentJson);
		var level = data.LEVEL;
		var reachLineGArr = data.reachLineGArr;
		var reachAreaGArr = data.reachAreaGArr;
		var pointGArr = data.pointGArr;
		var symbolGArr = data.symbolGArr;
		var downLineGArr = data.downLineGArr;
		
		//me.reachLayerAdmin_v3_New.addLineGraphic(null);
		//me.reachLayerAdmin_v3_New.addAreaGraphic(null);
		
		var deferred = me.map.setExtent(extent, true);
		deferred.then(function(value){
			var deferred2 = me.map.setLevel(level);
			deferred2.then(function(value){
				if(me.reachLayerAdmin_v3_New.lineGrpLayer){
					me.reachLayerAdmin_v3_New.lineGrpLayer.clear();
					me.reachLayerAdmin_v3_New.arrLineGrp = [];
					for(var i=0; i<reachLineGArr.length; i++){
						me.reachLayerAdmin_v3_New.lineGrpLayer.add(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 그래픽 추가
						me.reachLayerAdmin_v3_New.arrLineGrp.push(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 배열추가
					}
				}
				if(me.reachLayerAdmin_v3_New.areaGrpLayer){
					me.reachLayerAdmin_v3_New.areaGrpLayer.clear();
					me.reachLayerAdmin_v3_New.arrAreaGrp = [];
					for(var i=0; i<reachAreaGArr.length; i++){
						me.reachLayerAdmin_v3_New.areaGrpLayer.add(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 그래픽 추가
						me.reachLayerAdmin_v3_New.arrAreaGrp.push(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 배열추가
					}
				}
				
				if(me.reachLayerAdmin_v3_New.pointGrpLayer){
					me.reachLayerAdmin_v3_New.pointGrpLayer.clear();
					for(var i=0; i<pointGArr.length; i++){
						me.reachLayerAdmin_v3_New.pointGrpLayer.add(new esri.Graphic(JSON.parse(pointGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}
				
				if(me.reachLayerAdmin_v3_New.symbolGrpLayer){
					me.reachLayerAdmin_v3_New.symbolGrpLayer.clear();
					for(var i=0; i<symbolGArr.length; i++){
						me.reachLayerAdmin_v3_New.symbolGrpLayer.add(new esri.Graphic(JSON.parse(symbolGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}
				
				if(me.reachLayerAdmin_v3_New.downLineLayer){
					me.reachLayerAdmin_v3_New.downLineLayer.clear();
					for(var i=0; i<downLineGArr.length; i++){
						me.reachLayerAdmin_v3_New.downLineLayer.add(new esri.Graphic(JSON.parse(downLineGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}

				/*
				me.reachLayerAdmin_v3_New.upRchGraphics = [];
				me.reachLayerAdmin_v3_New.downRchGraphics = [];
				me.reachLayerAdmin_v3_New.selRchGraphics = [];
				me.reachLayerAdmin_v3_New.startRchGraphics = [];
				me.reachLayerAdmin_v3_New.selAreaGraphics = [];
				for(var i=0; i<data.upRchGraphics.length; i++){
					me.reachLayerAdmin_v3_New.upRchGraphics.push(new esri.Graphic(JSON.parse(data.upRchGraphics[i])))
				}
				for(var i=0; i<data.downRchGraphics.length; i++){
					me.reachLayerAdmin_v3_New.downRchGraphics.push(new esri.Graphic(JSON.parse(data.downRchGraphics[i])))
				}
				for(var i=0; i<data.selRchGraphics.length; i++){
					me.reachLayerAdmin_v3_New.selRchGraphics.push(new esri.Graphic(JSON.parse(data.selRchGraphics[i])))
				}
				for(var i=0; i<data.startRchGraphics.length; i++){
					me.reachLayerAdmin_v3_New.startRchGraphics.push(new esri.Graphic(JSON.parse(data.startRchGraphics[i])))
				}
				for(var i=0; i<data.selAreaGraphics.length; i++){
					me.reachLayerAdmin_v3_New.selAreaGraphics.push(new esri.Graphic(JSON.parse(data.selAreaGraphics[i])))
				}
				*/
				//console.info(me.reachLayerAdmin.selAreaGraphics);
				// 지점 목록 창 띄우기
        		Ext.ShowSiteListWindow("selectReach");
        		
        		// 검색결과 창 띄우기
        		ShowSearchResultReach("");
        		
			},function(error2){
			});
		},function(error){
		});
	},
	
	onExtentChange: function(extent, a, b, obj, c){
		
		//console.info(extent);
		
		// 툴팁 XY 셋팅
		setTooltipXY();
	}
});