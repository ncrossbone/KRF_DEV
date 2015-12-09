Ext.define('KRF_DEV.view.west.SearchArea_NameController_Rich', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_NameController_Rich',
	
	control:{
		'#btnSearchText_Start':{
			click: 'onTextSearch'
		},
		'#btnSearchText_End':{
			click: 'onTextSearch'
		}
	},
	
	onTextSearch: function(button, eOpts){
		
		
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + '/' + _siteInfoLayerId); // 레이어 URL
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		
		
		query.where = "JIJUM_NM like '"+textSearchText_Start.value+"%'";
		
		query.outFields = ["*"];
		queryTask.execute(query, function(result){
			Ext.each(result, function(objLayer, idx, objLayers){
				console.info(result);
				
				var guBunNm = "";
				
				
				var listCtl = Ext.getCmp("searchAreaList");
				listCtl.removeAll();
				listCtl.doLayout();
				
				 //var itemCnt = 0;
				
				
				var listCtl_Total = Ext.getCmp("searchAreaList_Total");
				listCtl_Total.doLayout();
				listCtl_Total.removeAll();
				
				console.info(listCtl_Total);
				listCtl_Total.add({
					xtype: 'label',
					cls: 'dj_reach_list_title',
					html: ' <span>"'+textSearchText_Start.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				});	
				
				
				for(i = 0; i < result.features.length; i++){
					
					
					if(result.features[i].attributes.LAYER_NM != guBunNm){
							listCtl.addCls('dj_accordion');
							
							console.info(result.features[i].attributes);
							
							
							listCtl.add({
								xtype : 'panel',
								layout : {
									type : 'vbox'
								},
								cls: 'dj_layer_nm',
								title :  result.features[i].attributes.LAYER_NM + layerCnt,
								layerCd : result.features[i].attributes.LAYER_CODE,
							});
							

							
							var layerCnt = 0;
							guBunNm = result.features[i].attributes.LAYER_NM;
							//itemCnt++;
							
							
							
						}
						//console.info(result.features[i].attributes);
						
						
						//console.info(listCtl.);
						var lstLength = listCtl.items.items.length;

						for(j = 0 ;  j < lstLength ; j++){
							/*console.info(listCtl.items.items[j].title);
							console.info(result.features[i].attributes.LAYER_NM);*/
							if(listCtl.items.items[j].layerCd == result.features[i].attributes.LAYER_CODE){
								listCtl.items.items[j].add({
									xtype : 'label',
									cls: 'dj_result_info',
									html : 		/*"<input type=\"hidden\" value=\"\">&nbsp;&nbsp; <a href=\"#\" onClick=\"alert('dd')\">지점명 :"+result.features[i].attributes.JIJUM_NM+"</a> " +*/
											"<table class=\"dj_result\" border=\"0\">										" +
											"<tr>                                 " +
											" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot01.png\" alt=\"시작위치\" height =\"41\" width = \"21\"  /></th>       " +
											" <th rowspan=\"2\"><img src=\"./resources/images/symbol/spot03.png\" alt=\"끝위치\" height =\"41\" width = \"21\" /></th>         " +
											" <td><a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"');\" ><span>"+result.features[i].attributes.JIJUM_NM+"</span></a></td>                     " +
											"</tr>                                " +
											"<tr>                                 " +
											" <td> <a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"');\" >경북 상주시 함창읍 구향리</a></td>   " +
											"</tr>                                " +
											"</table>                             "
											
								});
							console.info(layerCnt);
							layerCnt++;		
						}
					}
				}
				
				listCtl.doLayout();
				listCtl_Total.doLayout();
				
		
			});
		});
		
		
		
		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText_Start");
		console.info(btn);
		var searchAreaContents_1 = Ext.getCmp("searchAreaContents_1");
		
		//var richSearch = Ext.create('KRF_DEV.store.east.SiteListWindow');
		
		
		Ext.ShowSiteListWindow("nameSearch"); // 지점목록 창 띄우기
			
	}


	
});
