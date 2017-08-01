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
	
	tmGraphicLayerCat: null, // 집수구역 단위 주제도 그래픽 레이어
	tmLabelLayerCat: null, // 집수구역 단위 주제도 라벨 레이어
	
	width: 2650, // 센터이동 및 툴팁 2200에 맞춰져있음
	height: 1250, // ?? 기준맞춰야할듯
	//height: "109%",
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
        	
        	/* 외부망 항공사진 주석 */
        	me.dynamicLayerAdmin1 = Ext.create('KRF_DEV.view.drone.map.DynamicLayerAdmin1', me.map);
        	me.reachLayerAdmin_dim = Ext.create('KRF_DEV.view.map.ReachLayerAdminBackground', me.map); // Dim처리 레이어
        	me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin', me.map);
        	me.reachLayerAdmin_v3_New = Ext.create('KRF_DEV.view.map.ReachLayerAdmin_v3_New', me.map); // v3 New
        	me.searchLayerAdmin = Ext.create('KRF_DEV.view.map.SearchLayerAdmin', me.map, me.geometryService);
        	me.graphicsLayerAdmin = Ext.create('KRF_DEV.view.map.GraphicsLayerAdmin', me.map);
        	//me.labelLayerAdmin = Ext.create('KRF_DEV.view.map.LabelLayerAdmin', me.map);
        	
        	// KRAD 전역 Object Setting
        	_krad = Ext.create('KRF_DEV.view.map.KRADLayerAdmin', me.map);
        	// 검색설정 "상류" 검색 전역 Object Setting
        	_rchUpSearch = Ext.create('KRF_DEV.view.map.SearchReachUp');
        	// 리치라인 전역 Object Setting
        	_rchLine = Ext.create('KRF_DEV.view.map.SearchReachLine');
        	// 집수구역 전역 Object Setting
        	_rchArea = Ext.create('KRF_DEV.view.map.SearchReachArea');
        	// 리치노드 전역 Object Setting
        	_rchNode = Ext.create('KRF_DEV.view.map.SearchReachNode');
        	
        	me.featureLayerAdmin = Ext.create('KRF_DEV.view.map.FeatureLayerAdmin1', me.map);
        	
        	// 전역 변수 설정 KRF_DEV.getApplication().coreMap
        	KRF_DEV.getApplication().coreMap = me;
        	
        	require(["KRF_DEV/view/map/task/CustomPrintTask"], function() {
                //"./resources/jsp/CustomPrintTask_New.jsp"
                me.printTask = new KRF_DEV.view.map.task.CustomPrintTask(me.map, "_mapDiv_", _API.CustomPrintTask_New, "./resources/jsp/proxy.jsp", _arcServiceUrl, "/resources/saveImgTemp/capture");
            });
        	
        	// Extent Change Event
    		dojo.connect(me.map, "onExtentChange", me.onExtentChange);
    		// 차트 부분의 리소스를 로딩해 놓는다
//    		Ext.create('KRF_DEV.view.east.WindowSiteNChart',{});
		}, 1);
        
        
        //console.info(changingImage);
        
        
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
		      
		      
		      
		      var size = {
					  width: window.innerWidth || document.body.clientWidth,
					  height: window.innerHeight || document.body.clientHeight 
					}
			
		      
		      if(size.width < 1700){
		    	  var xmax = 15228416.63819833;
		    	  var xmin = 13607951.638552671;
		    	  var ymax = 4677314.267822344;
		    	  var ymin = 4079882.454745436;
		      }else if(size.width > 1700 && size.width <= 1850){
		    	  var xmax = 15236977.585366268;
		    	  var xmin = 13616512.58572061;
		    	  var ymax = 4616470.393307347;
		    	  var ymin = 3943824.5443978296;
		      }else if(size.width > 1850 && size.width <= 2100){
		    	  var xmax = 15164209.534438783;
		    	  var xmin = 13543744.534793125;
		    	  var ymax = 4692907.42159252;
		    	  var ymin = 4020261.5726830023;
		      }else if(size.width > 2100 && size.width <= 2300){
		    	  var xmax = 15074625.33728856;
		    	  var xmin = 13454771.833869183;
		    	  var ymax = 4719507.5074357595;
		    	  var ymin = 3903160.045350118;
		      }else if(size.width > 2300){
		    	  var xmax = 15034878.082580235;
				  var xmin = 13413801.586708296;
				  var ymax = 4748553.578184113;
				  var ymin = 3822748.291594104;
		      }
				
		      
		      
		      me.initialExtent = me.preExtent = this.initialExtent = new esri.geometry.Extent({
		    	
		    	  xmin: xmin,
		    	  ymin: ymin,
		    	  xmax: xmax,
		    	  ymax: ymax,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      
		      this.loaded = true;
		      this.onLoad(this);
		    },
		    getTileUrl: function(level, row, col) {

		    	var baseMapUrl = _baseMapUrl_vworld.replace(/#level#/gi, level).replace(/#row#/gi, row).replace(/#col#/gi, col);
      			//console.info(baseMapUrl);
      			
		    	return baseMapUrl;
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
		//alert("dd");
		me.printTask.capture();
	},
	
	favoriteExe:function(data){
		//console.info(data);
		
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
				if(_krad.lineGrpLayer){
					_krad.lineGrpLayer.clear();
					_krad.arrLineGrp = [];
					for(var i=0; i<reachLineGArr.length; i++){
						_krad.lineGrpLayer.add(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 그래픽 추가
						_krad.arrLineGrp.push(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 배열추가
					}
				}
				if(_krad.areaGrpLayer){
					_krad.areaGrpLayer.clear();
					_krad.arrAreaGrp = [];
					for(var i=0; i<reachAreaGArr.length; i++){
						_krad.areaGrpLayer.add(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 그래픽 추가
						_krad.arrAreaGrp.push(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 배열추가
					}
				}
				
				if(_krad.tmpGrpLayer){
					_krad.tmpGrpLayer.clear();
					for(var i=0; i<pointGArr.length; i++){
						_krad.tmpGrpLayer.add(new esri.Graphic(JSON.parse(pointGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}
				
				if(_krad.symGrpLayer){
					_krad.symGrpLayer.clear();
					for(var i=0; i<symbolGArr.length; i++){
						_krad.symGrpLayer.add(new esri.Graphic(JSON.parse(symbolGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}
				
				if(_krad.downGrpLayer){
					_krad.downGrpLayer.clear();
					for(var i=0; i<downLineGArr.length; i++){
						_krad.downGrpLayer.add(new esri.Graphic(JSON.parse(downLineGArr[i])));
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
		
		var coreMap = GetCoreMap();
		//console.info(extent);
		var size = {
				  width: window.innerWidth || document.body.clientWidth,
				  height: window.innerHeight || document.body.clientHeight 
				}
		
		// 툴팁 XY 셋팅
		setTooltipXY();
	}
});