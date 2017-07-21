<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
	
	------수질측정지점---------
	
*/
try{
	
	
   sql = "select * from TEST_RESULT_KRF  order by rn , chart_date asc";
   
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	
	while(rs.next()) {
	
		jsonRecord = new JSONObject();
		jsonRecord.put("RN", rs.getString("RN"));
		jsonRecord.put("RN_2", rs.getString("RN_2"));
		jsonRecord.put("CHART_DATE", rs.getString("CHART_DATE"));
		jsonRecord.put("PT_NO", rs.getString("PT_NO"));
		jsonRecord.put("PT_NM", rs.getString("PT_NM"));
		jsonRecord.put("WMCYMD", rs.getString("WMCYMD"));
		jsonRecord.put("WMYR", rs.getString("WMYR"));
		jsonRecord.put("WMOD", rs.getString("WMOD"));
		jsonRecord.put("WMWK", rs.getString("WMWK"));
		jsonRecord.put("WMDEP", rs.getString("WMDEP"));
		jsonRecord.put("CURR_BOD", rs.getString("CURR_BOD"));
		jsonRecord.put("CHART_BOD", rs.getString("CHART_BOD"));
		jsonRecord.put("CURR_DO", rs.getString("CURR_DO"));
		jsonRecord.put("CHART_DO", rs.getString("CHART_DO"));
		jsonRecord.put("CURR_COD", rs.getString("CURR_COD"));
		jsonRecord.put("CHART_COD", rs.getString("CHART_COD"));
		jsonRecord.put("CURR_TN", rs.getString("CURR_TN"));
		jsonRecord.put("CHART_TN", rs.getString("CHART_TN"));
		jsonRecord.put("CURR_TP", rs.getString("CURR_TP"));
		jsonRecord.put("CHART_TP", rs.getString("CHART_TP"));
		jsonRecord.put("CURR_TEMP", rs.getString("CURR_TEMP"));
		jsonRecord.put("CHART_TEMP", rs.getString("CHART_TEMP"));
		jsonRecord.put("CURR_PH", rs.getString("CURR_PH"));
		jsonRecord.put("CHART_PH", rs.getString("CHART_PH")); 
		jsonRecord.put("CURR_SS", rs.getString("CURR_SS"));
		jsonRecord.put("CURR_SS_NEW", rs.getString("CURR_SS_NEW"));
		jsonRecord.put("CHART_SS", rs.getString("CHART_SS"));
		jsonRecord.put("CURR_CLOA", rs.getString("CURR_CLOA"));
		jsonRecord.put("CHART_CLOA", rs.getString("CHART_CLOA"));
		jsonRecord.put("CURR_TOC", rs.getString("CURR_TOC"));
		jsonRecord.put("CHART_TOC", rs.getString("CHART_TOC"));
		jsonRecord.put("CURR_AMNT",rs.getString("CURR_AMNT"));
		jsonRecord.put("CURR_DTN",rs.getString("CURR_DTN"));
		jsonRecord.put("CURR_NO3N",rs.getString("CURR_NO3N"));
		jsonRecord.put("CURR_NH3N",rs.getString("CURR_NH3N"));
		jsonRecord.put("CURR_DTP",rs.getString("CURR_DTP"));
		jsonRecord.put("CURR_POP",rs.getString("CURR_POP"));
		jsonRecord.put("CURR_TRANS",rs.getString("CURR_TRANS"));
		jsonRecord.put("CURR_ALGOL",rs.getString("CURR_ALGOL"));
		jsonRecord.put("CURR_TCOLI",rs.getString("CURR_TCOLI"));
		jsonRecord.put("CURR_ECOLI",rs.getString("CURR_ECOLI"));
		jsonRecord.put("CURR_ANTIMON",rs.getString("CURR_ANTIMON"));
		jsonRecord.put("CURR_PHENOL",rs.getString("CURR_PHENOL"));
		jsonRecord.put("CURR_COL",rs.getString("CURR_COL"));
		jsonRecord.put("CURR_NHEX",rs.getString("CURR_NHEX"));
		jsonRecord.put("CURR_MN",rs.getString("CURR_MN"));
		jsonRecord.put("CURR_FE",rs.getString("CURR_FE"));
		jsonRecord.put("CURR_CD",rs.getString("CURR_CD"));
		jsonRecord.put("CURR_CN",rs.getString("CURR_CN"));
		jsonRecord.put("CURR_PB",rs.getString("CURR_PB"));
		jsonRecord.put("CURR_CR6",rs.getString("CURR_CR6"));
		jsonRecord.put("CURR_CR",rs.getString("CURR_CR"));
		jsonRecord.put("CURR_AS",rs.getString("CURR_AS"));
		jsonRecord.put("CURR_HG",rs.getString("CURR_HG"));
		jsonRecord.put("CURR_CU",rs.getString("CURR_CU"));
		jsonRecord.put("CURR_ZN",rs.getString("CURR_ZN"));
		jsonRecord.put("CURR_FL",rs.getString("CURR_FL"));
		jsonRecord.put("CURR_ABS",rs.getString("CURR_ABS"));
		jsonRecord.put("CURR_CL",rs.getString("CURR_CL"));
		jsonRecord.put("CURR_TCE",rs.getString("CURR_TCE"));
		jsonRecord.put("CURR_PCE",rs.getString("CURR_PCE"));
		jsonRecord.put("CURR_CCL4",rs.getString("CURR_CCL4"));
		jsonRecord.put("CURR_DCETH",rs.getString("CURR_DCETH"));
		jsonRecord.put("CURR_DCM",rs.getString("CURR_DCM"));
		jsonRecord.put("CURR_BENZENE",rs.getString("CURR_BENZENE"));
		jsonRecord.put("CURR_CHCL3",rs.getString("CURR_CHCL3"));
		jsonRecord.put("CURR_OP",rs.getString("CURR_OP"));
		jsonRecord.put("CURR_PCB",rs.getString("CURR_PCB"));
		jsonRecord.put("CURR_DEHP",rs.getString("CURR_DEHP"));
		jsonRecord.put("CURR_DIOX",rs.getString("CURR_DIOX"));
		jsonRecord.put("CURR_HCHO",rs.getString("CURR_HCHO"));
		jsonRecord.put("CURR_HCB",rs.getString("CURR_HCB"));
		jsonRecord.put("CHART_AMNT",rs.getString("CHART_AMNT"));
		jsonRecord.put("CHART_DTN",rs.getString("CHART_DTN"));
		jsonRecord.put("CHART_NO3N",rs.getString("CHART_NO3N"));
		jsonRecord.put("CHART_NH3N",rs.getString("CHART_NH3N"));
		jsonRecord.put("CHART_DTP",rs.getString("CHART_DTP"));
		jsonRecord.put("CHART_POP",rs.getString("CHART_POP"));
		jsonRecord.put("CHART_TRANS",rs.getString("CHART_TRANS"));
		jsonRecord.put("CHART_ALGOL",rs.getString("CHART_ALGOL"));
		jsonRecord.put("CHART_TCOLI",rs.getString("CHART_TCOLI"));
		jsonRecord.put("CHART_ECOLI",rs.getString("CHART_ECOLI"));
		jsonRecord.put("CHART_ANTIMON",rs.getString("CHART_ANTIMON"));
		jsonRecord.put("CHART_PHENOL",rs.getString("CHART_PHENOL"));
		jsonRecord.put("CHART_COL",rs.getString("CHART_COL"));
		jsonRecord.put("CHART_NHEX",rs.getString("CHART_NHEX"));
		jsonRecord.put("CHART_MN",rs.getString("CHART_MN"));
		jsonRecord.put("CHART_FE",rs.getString("CHART_FE"));
		jsonRecord.put("CHART_CD",rs.getString("CHART_CD"));
		jsonRecord.put("CHART_CN",rs.getString("CHART_CN"));
		jsonRecord.put("CHART_PB",rs.getString("CHART_PB"));
		jsonRecord.put("CHART_CR6",rs.getString("CHART_CR6"));
		jsonRecord.put("CHART_CR",rs.getString("CHART_CR"));
		jsonRecord.put("CHART_AS",rs.getString("CHART_AS"));
		jsonRecord.put("CHART_HG",rs.getString("CHART_HG"));
		jsonRecord.put("CHART_CU",rs.getString("CHART_CU"));
		jsonRecord.put("CHART_ZN",rs.getString("CHART_ZN"));
		jsonRecord.put("CHART_FL",rs.getString("CHART_FL"));
		jsonRecord.put("CHART_ABS",rs.getString("CHART_ABS"));
		jsonRecord.put("CHART_CL",rs.getString("CHART_CL"));
		jsonRecord.put("CHART_TCE",rs.getString("CHART_TCE"));
		jsonRecord.put("CHART_PCE",rs.getString("CHART_PCE"));
		jsonRecord.put("CHART_CCL4",rs.getString("CHART_CCL4"));
		jsonRecord.put("CHART_DCETH",rs.getString("CHART_DCETH"));
		jsonRecord.put("CHART_DCM",rs.getString("CHART_DCM"));
		jsonRecord.put("CHART_BENZENE",rs.getString("CHART_BENZENE"));
		jsonRecord.put("CHART_CHCL3",rs.getString("CHART_CHCL3"));
		jsonRecord.put("CHART_OP",rs.getString("CHART_OP"));
		jsonRecord.put("CHART_PCB",rs.getString("CHART_PCB"));
		jsonRecord.put("CHART_DEHP",rs.getString("CHART_DEHP"));
		jsonRecord.put("CHART_DIOX",rs.getString("CHART_DIOX"));
		jsonRecord.put("CHART_HCHO",rs.getString("CHART_HCHO"));
		jsonRecord.put("CHART_HCB",rs.getString("CHART_HCB"));
		
		jsonArr.add(jsonRecord);
	}
	
	
	jsonObj.put("data", jsonArr);
   
	out.print(jsonObj);
	//System.out.print("end");
    jsonObj  = null;
	jsonArr = null;
	jsonRecord = null;
	
   //out.print("success");
}catch(Exception ex){
	//throw;
	
	//System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>