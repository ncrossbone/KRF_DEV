<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
try{
	//String siteCodes = request.getParameter("siteCodes");
	//String measureDate = request.getParameter("measureDate");
	//String layerDate = request.getParameter("layerDate");   recordId
	//recordYear
	String recordId = request.getParameter("recordId");
	
	String a = request.getParameter("recordYear");
	String b = request.getParameter("recordYear2");
	
	String c = request.getParameter("recordMonth");
	String d = request.getParameter("recordMonth2");
	
	//out.print(withSql);
	
sql = " WITH TMP_TBL AS																																																							";
sql += "(SELECT RANK() OVER(PARTITION BY A.PT_NO ORDER BY C.WMCYMD DESC) RN                                                           ";
sql += "     , A.PT_NO, A.PT_NM                                                                                                       ";
sql += "     , C.WMCYMD                                                                                                               ";
sql += "     , B.WMYR , B.WMOD                                                                                                        ";
sql += "     , B.ITEM_BOD                                                                                                             ";
sql += "     , B.ITEM_DOC                                                                                                             ";
sql += "     , B.ITEM_COD                                                                                                             ";
sql += "     , B.ITEM_TN                                                                                                              ";
sql += "     , B.ITEM_TP                                                                                                              ";
sql += "     , B.ITEM_TEMP                                                                                                            ";
sql += "     , B.ITEM_PH                                                                                                              ";
sql += "     , B.ITEM_SS                                                                                                              ";
sql += "     , B.ITEM_CLOA                                                                                                            ";
sql += "     , A.ADMCODE                                                                                                              ";
sql += "  FROM RWMPT A                                                                                                                ";
sql += "     , RWMDTI B                                                                                                               ";
sql += "     , RWMDTD C                                                                                                               ";
sql += " WHERE A.PT_NO = B.PT_NO                                                                                                      ";
sql += "   AND A.PT_NO = C.PT_NO                                                                                                      ";
sql += "   AND B.WMYR  = C.WMYR                                                                                                       ";
sql += "   AND B.WMOD  = C.WMOD                                                                                                       ";
sql += "   AND B.WMWK  = C.WMWK                                                                                                       ";
sql += "   AND C.WMCYMD IS NOT NULL                                                                                                   ";
sql += "   and A.pt_no ='"+recordId+"'                                                                                                     ";
sql += "   and to_date((B.WMYR ||'.'|| B.WMOD), 'YYYY.MM') between to_date('"+a+"."+c+"', 'YYYY.MM') and to_date('"+b+"."+d+"', 'YYYY.MM')    ";
sql += "   order by wmod asc )                                                                                                        ";
sql += "   SELECT *                                                                                                                   ";
sql += "  FROM TMP_TBL                                                                                                                ";
sql += "UNION ALL                                                                                                                     ";
sql += "SELECT 999 as RN, '', '','', '', '', MAX(ITEM_BOD), MAX(ITEM_DOC), MAX(ITEM_COD),                                             ";
sql += "MAX(ITEM_TN), MAX(ITEM_TP), MAX(ITEM_TEMP), MAX(ITEM_PH),                                                                     ";
sql += "MAX(ITEM_SS), MAX(ITEM_CLOA), ''                                                                                              ";
sql += "  FROM TMP_TBL                                                                                                                ";	                                 


		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONArray jsonArrMax = new JSONArray();
	JSONObject jsonRecord = null;
	
	//int cnt = 0;
	while(rs.next()) {
		//cnt++;
		//out.print(cnt);
		jsonRecord = new JSONObject();

  		jsonRecord.put("month"	, rs.getString("WMOD"));
  		jsonRecord.put("year"	, rs.getString("WMYR"));
  		jsonRecord.put("yearMonth"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ptNm"	, rs.getString("PT_NM"));
  		jsonRecord.put("ITEM_BOD" 	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_DOC" 	, rs.getString("ITEM_DOC"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_TEMP" 	, rs.getString("ITEM_TEMP"));
  		jsonRecord.put("ITEM_PH" 	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_CLOA" 	, rs.getString("ITEM_CLOA"));
  		
  		if(rs.getString("RN").equals("999"))
  			jsonArrMax.add(jsonRecord);
  		else
  			jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("maxdata", jsonArrMax);
	jsonObj.put("data", jsonArr);
   //console.info(jsonObj);
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>