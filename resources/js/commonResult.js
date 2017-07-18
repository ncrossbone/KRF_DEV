/*
 * 2017-07-17 pdj
 * 검색결과 common 
 * */

testResult = function(){
	
	var jsonData = "";
	
	Ext.Ajax.request({
		url: './resources/jsp/testResult.jsp',
		async: false, // 비동기 = async: true, 동기 = async: false
		//rootProperty : 'items',
		success : function(response, opts) {
			jsonData = Ext.util.JSON.decode( response.responseText );
			
		},
		failure: function(form, action) {
			console.info(error);
		}
	});
	
	var resultArray = [];
				
	var rn = 0;
	
	for(var a = 0 ; a < jsonData.data.length ; a++){
		if(a == 0){
			
			//처음 배열 생성
			setChartListPush(jsonData.data[a] , rn , resultArray);
			
			rn++;
			
		}else{
			if(jsonData.data[a].RN != rn){

				// rn 과 검색결과 rn 값이 다를경우 카운트 증가후 배열 재성성
				setChartListPush(jsonData.data[a] , rn , resultArray);

				rn++
				
			}else{
				// 현제 rn 카운트와 검색결과 rn 값이 같을경우 미니차트 값을 쌓아야 하므로 변주 4번째 type값을 chart로 지정 
				setResultDataPush(jsonData.data[a] , rn , resultArray, "Chart");
				
			}
		}
		
		if(rn == jsonData.data[a].RN_2){
			//검색결과에 표출되는 값은 rn과 rn_2 값이 같은 가장 최근에 데이터 값이 표출되야 한다 / 검색결과에 표출되는 항목이므로 변수 4번째 type값을 Data로 지정
			setResultDataPush(jsonData.data[a] , rn , resultArray, "Data");
		}
		
	}
	
	return resultArray;
	
	
},

// 임시 수절측정망 기본 리스트  추후 json 형태로 관리되어야 함
setChartListPush = function(dataList , rn , resultArray){

	var jsonData = "";
	
	// json으로 컬럼명 관리
	Ext.Ajax.request({
	   	url: 'resources/jsp/searchResult/SearchResultGridCol.json',
	   	method: 'POST',
	   	async: false,
	   	success: function(transport){
	   		jsonData = Ext.util.JSON.decode( transport.responseText );
	   	},
	   	failure: function(transport){
	   		console.info(transport);
	   	}
	});
	resultArray.push(jsonData);
	
	setResultDataPush(dataList, rn , resultArray, "");
	
},


//검색결과에 데이터 Push
setResultDataPush = function(dataList , rn , resultArray , type){
	
	//TYPE 값이 "" 은 처음 차트 리스트를 만들어지는 처음 시점데이터 이므로 RN 카운터는 RN  컬럼값을 찾아야 하므로 TYPE를 Chart로 변경
	if(type == "Chart" ||  type == "Data"){
		rn = rn-1;
	}else if(type == ""){
		type = "Chart";
	}
	
	var jsonData = "";
	
	
	// json으로 컬럼명 관리
	Ext.Ajax.request({
	   	url: 'resources/jsp/searchResult/SearchResultGrid.json',
	   	method: 'POST',
	   	async: false,
	   	success: function(transport){
	   		jsonData = Ext.util.JSON.decode( transport.responseText );
	   	},
	   	failure: function(transport){
	   		console.info(transport);
	   	}
	});
	
	
	// 2가지로 구분  (Data // Chart)  일반 표출값 Data , 미니차트 Chart
	// 해당 항목이 많아 json에서 eval로 컬럼값 매핑
	if(type == "Data"){
		for(var i = 0 ;  i < jsonData.length ; i++){
			var dataName = jsonData[i].data;
			
			var dataValue = "";
			
			//항목 변수 생성
			eval('var ' + dataName +' = null ;');
			
			//항목 값
			dataValue = eval('dataList.'+dataName);
			// 항목 값은 Number로 변환
			if(dataName.substring(0,4) == "CURR"){
				if(dataValue == null){
					eval('resultArray[rn].'+dataName+' = null;');
				}else{
					eval('resultArray[rn].'+dataName+' = '+dataValue+';');
				}
				
			}else{
				eval('resultArray[rn].'+dataName+' = "'+dataValue+'";');
				
			}
			
			
		}
	}else{
		for(var i = 0 ;  i < jsonData.length ; i++){
			var chartName = jsonData[i].chart;
			if(chartName != undefined){
				//항목 배열 지정 ,  배열 초기화
				eval('var ' + chartName +' = [];');
				
				var evalList = eval('dataList.'+chartName);
				var replace = dataList.RN_2 + dataList.CHART_DATE.replace(/\./g,'');
				
				
				
				if(eval('dataList.'+chartName+' != null')){
					//console.info(evalList.substring(0,2));
					if(evalList.substring(0,2) == "0."){
						var a = evalList.replace("0",""); 
						// 차트 데이터 첫번째 값은 rn_2 번호와 날짜    , 두번째 값은 항목값
						eval(chartName+'.push("'+replace+'")');
						eval(chartName+'.push("'+a+'")');
					}else{
						// 차트 데이터 첫번째 값은 rn_2 번호와 날짜    , 두번째 값은 항목값
						eval(chartName+'.push("'+replace+'")');
						eval(chartName+'.push("'+evalList+'")');
					}
					
					
					eval('resultArray[rn].'+chartName+'.push('+chartName+')');
				}
			}
			
			
		}
	}
	
}