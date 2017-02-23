/** 전역 변수 클래스
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("KRF_DEV.global.DroneFn", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		globalTest: 0 // 테스트용 변수
	},
	//초기화 버튼
	onClickResetButton: function(){

		var me = Ext.getCmp('_mapDiv_');
		if(me.map == null){
			return;
		}
		
		//맵 불러오기
		var activeLayer = me.map.getLayer("DynamicLayer3");
		activeLayer.setVisibility(false);
		
		
		activeLayer= "";
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		
		if(cboDroneArea.lastValue == "R02"){
			activeLayer = me.map.getLayer("DroneFeatureLayer1");
		}else if(cboDroneArea.lastValue == "R01_1"){
			activeLayer = me.map.getLayer("DroneFeatureLayer2");
		}else if(cboDroneArea.lastValue == "R01_2"){
			activeLayer = me.map.getLayer("DroneFeatureLayer3");
		}else if(cboDroneArea.lastValue == "R04"){
			activeLayer = me.map.getLayer("DroneFeatureLayer4");
		}else{
			activeLayer = me.map.getLayer("DroneFeatureLayer5");
		}
		
		if(activeLayer != undefined && activeLayer != null)
			activeLayer.setVisibility(false);
		
		
		
		var me = Ext.getCmp("droneToolbar");
		
		// 수계선택 초기화
		var cboDroneArea = Ext.getCmp("cboDroneArea");
		me.initVComboBox(cboDroneArea);
		
		// 지점목록 초기화
		var cboDroneSiteList = Ext.getCmp("cboDroneSiteList");
		me.initVComboBox(cboDroneSiteList);
		// 항공영상 초기화
		var cboDroneDate = Ext.getCmp("cboDroneDate");
		me.initVComboBox(cboDroneDate);
		
		// 클로로필a 초기화
		var cboDroneChla = Ext.getCmp("cboDroneChla");
		me.initVComboBox(cboDroneChla);
		
		// 조류측정자료 초기화
		var cboDroneWBSite = Ext.getCmp("cboDroneWBSite");
		me.initVComboBox(cboDroneWBSite);
		
		// 레이어선택 초기화
		var cboDroneLayer = Ext.getCmp("cboDroneLayer");
		me.initVComboBox(cboDroneLayer);
		
		this.LayerVisibility();
	
	},
	LayerVisibility: function(){
		
		var me = Ext.getCmp('_mapDiv_');
		var meThis = this;
		
		Ext.defer(function(){
			
			if(me.map == null){
				return;
			}
			
			//맵 불러오기
			var activeLayer = me.map.getLayer("DynamicLayer3");
			activeLayer.setVisibility(true);
			
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
			
			if(chlLegend == undefined || chlLegend == null){
				chlLegend = Ext.create('KRF_DEV.view.center.drone.LegendChl');
			}
			
			
			var layers = [];
			
			var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
			var layerStore = cboDroneLayer.getStore();
			
			var droneOnOff = "";
			var chlOnOff = "";
			var measureOnOff = "";
			var wbSiteOnOff = "";
			
			//console.info(layerStore);
			layerStore.each(function(obj){
				
				if(obj.data.layerId == "Drone"){
					droneOnOff = obj.data.layerOnOff;
				}
				else if(obj.data.layerId == "Chla"){
					chlOnOff = obj.data.layerOnOff;
				}

				else if(obj.data.id == "reachLine"){
					
					// 주제도 선택에 리치노드, 리치라인 On/Off
					for(var i = 0; i < obj.data.layerId.length; i++){
						Layer01OnOff(obj.data.layerId[i], obj.data.layerOnOff);
					}
				}
				else{
					if(cboDroneArea.getValue() != null && cboDroneArea.getValue() != ""){
						if(obj.data.layerOnOff == "on"){
							layers.push(obj.data.layerId);
						}
					}
					
				}
			});
			
			//항공사진
			if(droneOnOff == "on"){
				if(cboDroneDate.value != null)
					layers.push(cboDroneDate.value);
			}

			//클로로필
			if(chlOnOff == "on"){
				
				if(cboDroneChla.value != null){
					chlLegend.show();
					layers.push(cboDroneChla.value);
					// 클로로필 범례 표시 후 레이어 선택 콤보 펼치기 (focus이동 때문..)
    				Ext.getCmp("cboDroneLayer").down("combo").expand();
				}else{
					chlLegend.hide();
				}
					
			}else{
				chlLegend.hide();
			}
			
			//측정지점
			if(measureOnOff == "on"){
				layers.push("3")
			}
			
			activeLayer.setVisibleLayers([-1]);
			
			if(layers.length > 0)
				activeLayer.setVisibleLayers(layers);
		}, 1);
	}
});