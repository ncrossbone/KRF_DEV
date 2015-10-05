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
	
	String recordId = request.getParameter("recordId");
	//out.print(withSql);
	
	sql = "SELECT RANK() OVER(PARTITION BY A.PT_NO ORDER BY C.WMCYMD DESC) RN ";
	sql += "     , A.PT_NO, A.PT_NM , C.WMCYMD  ";
	sql += "     , B.WMYR , B.WMOD ";
	sql += "     , B.ITEM_BOD ";
	sql += "     , B.ITEM_DOC ";
	sql += "     , B.ITEM_COD ";
	sql += "     , B.ITEM_TN ";
	sql += "     , B.ITEM_TP ";
	sql += "     , B.ITEM_TEMP ";
	sql += "     , B.ITEM_PH ";
	sql += "     , B.ITEM_SS ";
	sql += "     , B.ITEM_CLOA ";
	sql += "     , A.ADMCODE ";
	sql += "  FROM RWMPT A   ";
	sql += "     , RWMDTI B  ";
	sql += "     , RWMDTD C  ";
	sql += " WHERE A.PT_NO = B.PT_NO ";
	sql += "   AND A.PT_NO = C.PT_NO ";
	sql += "   AND B.WMYR  = C.WMYR  ";
	sql += "   AND B.WMOD  = C.WMOD  ";
	sql += "   AND B.WMWK  = C.WMWK  ";
	sql += "   AND C.WMCYMD IS NOT NULL  ";
	sql += "   and A.pt_no ='"+recordId+"'   ";
	sql += "   and b.wmyr ='2014'    ";
	sql += "   order by wmod asc  ";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

  		jsonRecord.put("month"	, rs.getString("WMCYMD"));
  		jsonRecord.put("data1" 	, rs.getString("ITEM_BOD"));
  		
  	
  		jsonArr.add(jsonRecord);
	}
	
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