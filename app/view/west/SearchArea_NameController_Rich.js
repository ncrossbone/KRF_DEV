Ext.define('KRF_DEV.view.west.SearchArea_NameController_Rich', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_NameController_Rich',
	
	control:{
		'#btnSearchText_Start':{
			click: 'onTextSearch'
		},
		'#btnSearchText_End':{
			click: 'onTextSearch'
		},
		'#smartButton':{
			click: 'onClickSmart'
		}
	},
	
	onTextSearch: function(button, eOpts){
		
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		
		if(button.id == "btnSearchText_Start"){
			var where = "JIJUM_NM like '"+textSearchText_Start.value+"%'";
		}else{
			var where = "JIJUM_NM like '"+textSearchText_End.value+"%'";
		}
		
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + '/' + _siteInfoLayerId); // 레이어 URL
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		
		query.where = where;
		
		query.outFields = ["*"];
		queryTask.execute(query, function(result){
			Ext.each(result, function(objLayer, idx, objLayers){
				
				//console.info(result);
				
				var guBunNm = "";
				
				
				var listCtl = Ext.getCmp("searchAreaList");
				listCtl.removeAll();
				listCtl.doLayout();
				
				 //var itemCnt = 0;
				var layerCnt = 0;
				
				var saveCnt = [];
				
				var listCtl_Total = Ext.getCmp("searchAreaList_Total");
				listCtl_Total.doLayout();
				listCtl_Total.removeAll();
				
				if(button.id == "btnSearchText_Start"){
					var html = ' <span>"'+textSearchText_Start.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				}else{
					var html = ' <span>"'+textSearchText_End.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				}
				
				listCtl_Total.add({
					xtype: 'label',
					cls: 'dj_reach_list_title',
					html: html
					//html: ' <span>"'+textSearchText_Start.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				});	
				
				
				for(i = 0; i < result.features.length; i++){
					
					
					if(result.features[i].attributes.LAYER_NM != guBunNm){
							
							
							//iconCls 에 아이콘정보를 가져오기 위해 LAYER_CODE를 이용해 cls값의 layer번호를 구한다
							var layerId = "";
							var layerCode = result.features[i].attributes.LAYER_CODE;
							
							if(layerCode == "A001"){
								layerId = "layer1";
							}else if(layerCode == "A002"){
								layerId = "layer2";
							}else if(layerCode == "A003"){
								layerId = "layer3";
							}else if(layerCode == "A004"){
								layerId = "layer4";
							}else if(layerCode == "A005"){
								layerId = "layer5";
							}else if(layerCode == "B002"){
								layerId = "layer11"; // 사업장TMS
							}else if(layerCode == "C001"){
								layerId = "layer13"; // 퇴적물
							}else if(layerCode == "D001"){
								layerId = "layer15"; // 수위관측소
							}else if(layerCode == "D002"){
								layerId = "layer16"; // 우량관측소
							}else if(layerCode == "D003"){
								layerId = "layer17"; // 유량관측소
							}else if(layerCode == "D004"){
								layerId = "layer18"; // 댐관측소
							}else if(layerCode == "D005"){
								layerId = "layer19"; // AWS기상관측소
							}else if(layerCode == "D006"){
								layerId = "layer20"; // 지상기상관측소
							}else if(layerCode == "D007"){
								layerId = "layer21"; // 보관측소
							}else if(layerCode == "E001"){
								layerId = "layer23"; // 수생태계조사지점
							}else if(layerCode == "F001"){
								layerId = "layer31"; // 농공단지처리시설
							}else if(layerCode == "F002"){
								layerId = "layer32"; // 기타공동처리시설
							}else if(layerCode == "F003"){
								layerId = "layer28"; // 분뇨처리시설
							}else if(layerCode == "F004"){
								layerId = "layer27"; // 산업폐수종말처리시설
							}else if(layerCode == "F006"){
								layerId = "layer25"; // 축산폐수공공처리시설
							}else if(layerCode == "F007"){
								layerId = "layer30"; // 마을하수도
							}else if(layerCode == "F008"){
								layerId = "layer26"; // 하수종말처리시설
							}
							
							
							listCtl.addCls('dj_accordion');
							listCtl.add({
								xtype : 'panel',
								autoScroll: true,
								layout : {
									type : 'vbox'
								},
								cls: 'dj_layer_nm',
								title :  '&nbsp;' + result.features[i].attributes.LAYER_NM +'&nbsp; (Count)' ,
								layerCd : layerCode,
								iconCls: 'layerIconSize '+layerId+''
							});
							
							//console.info(layerCnt);
							saveCnt += "_"+layerCnt;
							guBunNm = result.features[i].attributes.LAYER_NM;
							layerCnt = 0;
							
							
						}else if(i == result.features.length-1 ){//마지막 카운트 구하기
							saveCnt += "_"+(layerCnt+1);
						}
						
						////console.info(listCtl.);
						var lstLength = listCtl.items.items.length;

						for(j = 0 ;  j < lstLength ; j++){
							/*//console.info(listCtl.items.items[j].title);
							//console.info(result.features[i].attributes.LAYER_NM);*/
							if(listCtl.items.items[j].layerCd == layerCode){
								listCtl.items.items[j].add({
									xtype : 'label',
									cls: 'dj_result_info',
									style: 'left: 13px !important;',
									html : 		/*"<input type=\"hidden\" value=\"\">&nbsp;&nbsp; <a href=\"#\" onClick=\"alert('dd')\">지점명 :"+result.features[i].attributes.JIJUM_NM+"</a> " +*/
											"<table class=\"dj_result\" border=\"0\" >										" +
											"<tr>                                 " +
											" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot01.png\" alt=\"시작위치\" height =\"41\" width = \"21\"  onClick=\"siteMovePoint('"+layerCode+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'start' );\"/></th> " +
											" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot03.png\" alt=\"끝위치\" height =\"41\" width = \"21\" onClick=\"siteMovePoint('"+layerCode+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'end');\" /></th> " +
											" <td><a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'addrLink');\" ><span>"+result.features[i].attributes.JIJUM_NM+"</span></a></td>                     " +
											"</tr>                                " +
											"<tr>                                 " +
											" <td> <a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"', 'addrLink');\" >" + result.features[i].attributes.ADDR + "</a></td> " +
											"</tr>                                " +
											"</table>                             "
											
								});
							
							layerCnt++;		
						}
					}
				}
				
				listCtl.doLayout();
				listCtl_Total.doLayout();
				
				var layerCount = [];
				layerCount = saveCnt.split("_");
				
				////console.info(listCtl.items.items[0].title);
				
				for(Cnt = 0 ; Cnt < listCtl.items.items.length ; Cnt++){
					
					listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("Count",layerCount[Cnt+2]));
					if(Cnt+1 == listCtl.items.items.length){
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined","1"));
					}
					
					if(Cnt+1 == listCtl.items.items.length){
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined","1"));
					}
					
				}
				
				//검색후 가장 처음값으로 이동
				siteMovePoint(result.features[0].attributes.LAYER_CODE,result.features[0].attributes.JIJUM_CODE, 'addrLink');
		
			});
		});
		
		
		
		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText_Start");
		var searchAreaContents_1 = Ext.getCmp("searchAreaContents_1");
		
		//var richSearch = Ext.create('KRF_DEV.store.east.SiteListWindow');
		
		
		Ext.ShowSiteListWindow("SEnameSearch"); // 지점목록 창 띄우기
			
	},
	onClickSmart : function(obj, el, evt){
		
		/*
		// khLee 임시 - 클릭시 리스트 초기화
		var listCtl = Ext.getCmp("searchAreaList");
		listCtl.removeAll();
		listCtl.doLayout();
		
		var listCtl_Total = Ext.getCmp("searchAreaList_Total");
		listCtl_Total.removeAll();
		listCtl_Total.doLayout();
		// khLee 임시 끝 - 클릭시 리스트 초기화
		*/
		
		// 검색설정 버튼 On/Off
		var btnMenu01 = Ext.getCmp("btnMenu01");
		var currCtl = SetBtnOnOff(btnMenu01.id);
		
		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("searchConfig");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create("KRF_DEV.view.center.SearchConfig", {
				x: 390,
				y: 170
			});
			
		}
		
		// 팝업 이미지 show, hide
		if(currCtl.btnOnOff == "on"){
			popCtl.show();
		}
		else{
			popCtl.hide();
		}
		
	}


	
});
