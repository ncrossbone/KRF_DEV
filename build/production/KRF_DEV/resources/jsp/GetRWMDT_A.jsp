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
	String b = request.getParameter("recordYear2"); //defaultCheck
	
	String c = request.getParameter("recordMonth");
	String d = request.getParameter("recordMonth2");
	
	String defaultChart = request.getParameter("defaultChart");
	//out.print(defaultChart);
	
sql = "   WITH TMP_TBL AS                                                               																												";	                                                                                                                                                             
sql += " (SELECT RANK() OVER(PARTITION BY A.PT_NO ORDER BY C.WMCYMD DESC) RN                                                                    ";
sql += "      , A.PT_NO, A.PT_NM                                                                                                                ";
sql += "      , C.WMCYMD                                                                                                                        ";
sql += "      , B.WMYR , B.WMOD                                                                                                                 ";
sql += "      , B.ITEM_BOD                                                                                                                      ";
sql += "      , B.ITEM_DOC                                                                                                                      ";
sql += "      , B.ITEM_COD                                                                                                                      ";
sql += "      , B.ITEM_TN                                                                                                                       ";
sql += "      , B.ITEM_TP                                                                                                                       ";
sql += "      , B.ITEM_TEMP                                                                                                                     ";
sql += "      , B.ITEM_PH                                                                                                                       ";
sql += "      , B.ITEM_SS                                                                                                                       ";
sql += "      , B.ITEM_CLOA                                                                                                                     ";
sql += "      , A.ADMCODE                                                                                                                       ";
sql += "   FROM RWMPT A                                                                                                                         ";
sql += " , (SELECT PT_NO																								" ;	 	
sql += "             , WMYR                                           " ;   
sql += "             , WMOD                                           " ;   
sql += "             , WMCD||'회차' AS WMWK                           " ;   
sql += "             , MAX(DECODE(ITCD,'1052',WMVL)) AS ITEM_BOD      " ;   
sql += "             , MAX(DECODE(ITCD,'1054',WMVL)) AS ITEM_DOC      " ;   
sql += "             , MAX(DECODE(ITCD,'1049',WMVL)) AS ITEM_COD      " ;   
sql += "             , MAX(DECODE(ITCD,'1055',WMVL)) AS ITEM_TN       " ;   
sql += "             , MAX(DECODE(ITCD,'1056',WMVL)) AS ITEM_TP       " ;   
sql += "             , MAX(DECODE(ITCD,'1060',WMVL)) AS ITEM_TEMP     " ;   
sql += "             , MAX(DECODE(ITCD,'1039',WMVL)) AS ITEM_PH       " ;   
sql += "             , MAX(DECODE(ITCD,'1053',WMVL)) AS ITEM_SS       " ;   
sql += "             , MAX(DECODE(ITCD,'1063',WMVL)) AS ITEM_CLOA     " ;   
sql += "          FROM TW_RWMDT                                       " ;   
sql += "         GROUP BY PT_NO, WMYR, WMOD, WMCD                     " ;   
sql += "       ) B                                                    " ;                                                           
sql += "     , (SELECT DISTINCT PT_NO                                 " ;   
sql += "             , WMYR                                           " ;   
sql += "             , WMOD                                           " ;   
sql += "             , SUBSTR(WMWK,1,1)||'회차' AS WMWK               " ;   
sql += "             , WMCYMD                                         " ;   
sql += "          FROM RWMDTD                                         " ;   
sql += "       ) C                                                    " ;   
sql += "  WHERE A.PT_NO = B.PT_NO                                                                                                               ";
sql += "    AND A.PT_NO = C.PT_NO                                                                                                               ";
sql += "    AND B.WMYR  = C.WMYR                                                                                                                ";
sql += "    AND B.WMOD  = C.WMOD                                                                                                                ";
sql += "    AND B.WMWK  = C.WMWK                                                                                                                ";
sql += "    AND C.WMCYMD IS NOT NULL                                                                                                            ";
sql += "    and A.pt_no ='"+recordId+"'                                                                                                         ";

if(defaultChart.equals("1")){
	sql += "  AND TO_DATE((B.WMYR ||'.'|| B.WMOD), 'YYYY.MM') BETWEEN CASE WHEN SUBSTR('"+recordId+"' 																											";
	sql += "                                                                               ,5,1) = 'D' THEN TO_DATE('2010.01', 'YYYY.MM')    ";
	sql += "                                                                   ELSE TO_DATE('2014.01', 'YYYY.MM')                           ";
	sql += "                                                              END                                                                                     ";
	sql += "                                                         AND TO_DATE('2015.12', 'YYYY.MM')                                           ";
}else{
	sql += "  AND TO_DATE((B.WMYR ||'.'|| B.WMOD), 'YYYY.MM') BETWEEN CASE WHEN SUBSTR('"+recordId+"' 																											";
	sql += "                                                                               ,5,1) = 'D' THEN TO_DATE('"+a+"."+c+"', 'YYYY.MM')    ";
	sql += "                                                                   ELSE TO_DATE('"+a+"."+c+"', 'YYYY.MM')                           ";
	sql += "                                                              END                                                                                     ";
	sql += "                                                         AND TO_DATE('"+b+"."+d+"', 'YYYY.MM')                                           ";
}

sql += "    ORDER BY WMCYMD asc                                                                                                      ";
sql += "     )                                                                                                                                  ";
sql += "    SELECT *                                                                                                                            ";
if(defaultChart.equals("1")){
	sql += "   FROM (SELECT *                                                                                                                       ";
	sql += "           FROM TMP_TBL                                                                                                                 ";
	sql += "          WHERE RN <= 10                                                                                                            ";
	sql += "          ORDER BY WMCYMD                                                                                                               ";
	sql += "        )                                                                                                                               ";	
}else{
	sql += "   FROM TMP_TBL                                                                                                                       ";
	//sql += "   order by wmcymd                                                                                                                      ";
}
sql += " UNION ALL                                                                                                                              ";
sql += " SELECT 999 as RN, '', '','', '', '', MAX(ITEM_BOD) + MAX(ITEM_BOD) / 10, MAX(ITEM_DOC) + MAX(ITEM_DOC) / 10, MAX(ITEM_COD) + MAX(ITEM_COD) / 10,                                                      ";
sql += " MAX(ITEM_TN) + MAX(ITEM_TN) / 10, MAX(ITEM_TP) + MAX(ITEM_TP) / 10, MAX(ITEM_TEMP) + MAX(ITEM_TEMP) / 10, MAX(ITEM_PH) + MAX(ITEM_PH) / 10,                                                                              ";
sql += " MAX(ITEM_SS) + MAX(ITEM_SS) / 10, MAX(ITEM_CLOA) + MAX(ITEM_CLOA) / 10, ''                                                                                                       ";
sql += "   FROM TMP_TBL                                                                                                                         ";	                                 


		
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