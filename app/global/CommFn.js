/** 전역 변수 클래스
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
	//초기화 버튼
	arrNowYear: function(preYear, sort){

		var nowDate = new Date();
		var edYear = nowDate.getFullYear();
		var retVal = [];
		
		for(var i = preYear; i <= edYear; i++){
			
			retVal.push(i);
		}
	}
});