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
	String recordYear = request.getParameter("recordYear");
	//out.print(withSql);
	
	                                 


sql = " WITH TMP_TBL AS (																																";
sql += "  SELECT RANK() OVER(PARTITION BY PT_NO ORDER BY WMYR, WMOD DESC) RN              ";   
sql += "        , PT_NO                                                                   ";
sql += "        , PT_NM                                                                   ";
sql += "        , WMYR                                                                    ";
sql += "        , WMOD                                                                    ";
sql += "        , (WMYR||' / '|| WMOD) AS WMYMOD                                          ";       
sql += "        , MAX(ITEM_BOD)  AS ITEM_BOD                                              ";
sql += "        , MAX(ITEM_DOC)  AS ITEM_DOC                                              ";
sql += "        , MAX(ITEM_COD)  AS ITEM_COD                                              ";
sql += "        , MAX(ITEM_TN)   AS ITEM_TN                                               ";
sql += "        , MAX(ITEM_TP)   AS ITEM_TP                                               ";
sql += "        , MAX(ITEM_TEMP) AS ITEM_TEMP                                             ";
sql += "        , MAX(ITEM_PH)   AS ITEM_PH                                               ";
sql += "        , MAX(ITEM_SS)   AS ITEM_SS                                               ";
sql += "        , MAX(ITEM_CLOA) AS ITEM_CLOA                                             ";
sql += "        , MAX(ADMCODE)   AS ADMCODE                                               ";
sql += "     FROM (                                                                       ";
sql += "           SELECT A.PT_NO, A.PT_NM                                                ";
sql += "                , B.WMYR                                                          ";
sql += "                , B.WMOD                                                          ";
sql += "                , CASE WHEN ITCD = '1052' THEN WMVL ELSE NULL END ITEM_BOD        ";
sql += "                , CASE WHEN ITCD = '1054' THEN WMVL ELSE NULL END ITEM_DOC        ";
sql += "                , CASE WHEN ITCD = '1049' THEN WMVL ELSE NULL END ITEM_COD        ";
sql += "                , CASE WHEN ITCD = '1055' THEN WMVL ELSE NULL END ITEM_TN         ";
sql += "                , CASE WHEN ITCD = '1056' THEN WMVL ELSE NULL END ITEM_TP         ";
sql += "                , CASE WHEN ITCD = '1060' THEN WMVL ELSE NULL END ITEM_TEMP       ";
sql += "                , CASE WHEN ITCD = '1039' THEN WMVL ELSE NULL END ITEM_PH         ";
sql += "                , CASE WHEN ITCD = '1053' THEN WMVL ELSE NULL END ITEM_SS         ";
sql += "                , CASE WHEN ITCD = '1063' THEN WMVL ELSE NULL END ITEM_CLOA       ";
sql += "                , A.ADMCODE                                                       ";
sql += "             FROM RWMPT A                                                         ";
sql += "                , TM_RWMDT B                                                      ";
sql += "            WHERE A.PT_NO = B.PT_NO                                               ";
sql += "              AND A.PT_NO ='"+recordId+"'                                         ";
sql += "              AND B.WMYR ='"+recordYear+"'                                                  ";
sql += "          )                                                                       ";
sql += "    GROUP BY PT_NO, PT_NM, WMYR, WMOD                                             ";
sql += "    ORDER BY WMYR ASC, WMOD ASC                                                   ";
sql += "    )                                                                             ";
sql += "    SELECT *                                                                      ";
sql += "      FROM TMP_TBL                                                                ";
sql += "    UNION ALL                                                                     ";
sql += "    SELECT 999 as RN, '', '', '', '', '', MAX(ITEM_BOD), MAX(ITEM_DOC), MAX(ITEM_COD),  ";
sql += "    MAX(ITEM_TN), MAX(ITEM_TP), MAX(ITEM_TEMP), MAX(ITEM_PH),                     ";
sql += "    MAX(ITEM_SS), MAX(ITEM_CLOA), ''                                              ";
sql += "      FROM TMP_TBL                                                                ";
		
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
  		jsonRecord.put("yearMonth"	, rs.getString("WMYMOD"));
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