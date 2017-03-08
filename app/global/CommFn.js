/** 전역 변수 클래스 (공통함수)
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("KRF_DEV.global.CommFn", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		globalTest: 0 // 테스트용 변수
	},
	/* 연도 콤보 바인딩 현재 날짜 기준
	 * preYear : 시작년도
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboYear: function(preYear, sort, allMsg){

		var nowDate = new Date();
		var edYear = nowDate.getFullYear();
		var retVal = [];
		
		if(allMsg != undefined){
			
			retVal.push(allMsg);
		}
		
		if(sort == "Asc"){
			
			for(var i = preYear; i <= edYear; i++){
				
				retVal.push(i);
			}
		}
		else if(sort == "Desc"){
			
			for(var i = edYear; i >= preYear; i--){
				
				retVal.push(i);
			}
		}
		
		return retVal;
	},
	/* 월 콤보 바인딩 현재 날짜 기준
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboMonth: function(sort, allMsg){
		
		var retVal = [];
		
		if(allMsg != undefined){
			
			retVal.push(allMsg);
		}
		
		if(sort == "Asc"){
			
			for(var i = 0; i < 12; i++){
				
				var strI = String(i + 1);
				
				if(strI.length == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		else if(sort == "Desc"){
			
			for(var i = 12; i > 0; i--){
				
				var strI = String(i);
				
				if(strI.length == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		
		return retVal;
	},
	/* 일 콤보 바인딩 현재 날짜 기준
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboDay: function(sort, allMsg){
		
		var nowDate = new Date();
		// 다음달 첫날
		var firstDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1);
		// 다음달 첫날 - 하루 = 이번달 마지막 날
		var lastDate = new Date(firstDate - 1);
		// 이번달 일 수
		var days = lastDate.getDate();
		var retVal = [];
		
		if(allMsg != undefined){
			
			retVal.push(allMsg);
		}
		
		if(sort == "Asc"){
			
			for(var i = 0; i < days; i++){
				
				var strI = String(i + 1);
				
				if(strI.length == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		else if(sort == "Desc"){
			
			for(var i = days; i > 0; i--){
				
				var strI = String(i);
				
				if(strI.length == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		
		return retVal;
	},
	/* 시간 콤보 바인딩
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboHour: function(sort, allMsg){
		
		var retVal = [];
		
		if(allMsg != undefined){
			
			retVal.push(allMsg);
		}
		
		if(sort == "Asc"){
			
			for(var i = 0; i < 24; i++){
				
				var strI = String(i);
				
				if(strI == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		else if(sort == "Desc"){
			
			for(var i = 23; i >= 0; i--){
				
				var strI = String(i);
				
				if(strI.length == 1){
					
					strI = "0" + strI;
				}
				
				retVal.push(strI);
			}
		}
		
		return retVal;
	},
	/* 현재날짜 관련 */
	nowDate: {
		/* 현재년도 가져오기 */
		getYear: function(){
			
			var nowDate = new Date();
			return nowDate.getFullYear();
		},
		/* 현재월 가져오기 */
		getMonth: function(){
			
			var nowDate = new Date();
			
			var strMonth = String(nowDate.getMonth() + 1);
			
			return strMonth.length == 1 ? "0" + strMonth : strMonth;
		},
		/* 현재일자 가져오기 */
		getDay: function(){
			
			var nowDate = new Date();
			
			var strDay = String(nowDate.getDate());
			
			return strDay.length == 1 ? "0" + strDay : strDay;
		},
		/* 현재시간 가져오기 */
		getHour: function(){
			
			var nowDate = new Date();
			
			var strHour = String(nowDate.getHours());
			return strHour.length == 1 ? "0" + strHour : strHour;
		},
		/* 월 더하기 빼기
		 * return year, month, day... */
		addMonth: function(addVal){
			
			var nowDate = new Date();
			nowDate.setMonth(nowDate.getMonth() + addVal);
			
			var year = nowDate.getFullYear();
			var month = String(nowDate.getMonth() + 1).length == 1 ? "0" + String(nowDate.getMonth() + 1) : String(nowDate.getMonth() + 1);
			var day = String(nowDate.getDate()).length == 1 ? "0" + String(nowDate.getDate()) : String(nowDate.getDate());
			var hour = String(nowDate.getHours()).length == 1 ? "0" + String(nowDate.getHours()) : String(nowDate.getHours());
			
			return {year: year, month: month, day: day, hour: hour};
		}
	}
});