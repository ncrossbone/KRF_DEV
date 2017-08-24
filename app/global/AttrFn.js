/** 전역 변수 클래스 (탭관련함수)

 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */

Ext.define("KRF_DEV.global.AttrFn", {
	singleton : true,
	attrMap:{"BOD":{"format":"0.0"},
		     "ABOD":{"format":"0.0"},
		     "PH":{"format":"0.0"}
	},
	getAttrFormat:function(pId, attrId){
		var attr = this.attrMap[pId+attrId];
		if(attr == null){
			attr = this.attrMap[attrId];
		}
		if(attr == null){
			return "";
		}
		return attr.format;
	}
});