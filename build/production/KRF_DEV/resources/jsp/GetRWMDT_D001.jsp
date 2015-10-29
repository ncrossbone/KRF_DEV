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
	
	String ac = a+c;
	String bd = b+d;
		
	String defaultChart = request.getParameter("defaultChart");
	
	sql = " WITH TMP_TBL AS             																																	";                                                                                                                                                                                                                                            
	sql += "  ( SELECT * FROM ( SELECT RANK() OVER(PARTITION BY WLOBSCD ORDER BY WLOBSCD, WMCYMD DESC) AS RN /* 순번 */    ";
	sql += "      , WLOBSCD AS PT_NO /* 관측소코드 */                                                     ";
	sql += "      , OBSNM AS PT_NM /* 관측소명 */                                                         ";
	sql += "      , WMCYMD /* 관측일자 */                                                                 ";
	sql += "      , WL AS WL /* 수위(cm) */                                ";
	sql += "      , MXWL AS MXWL /* 최고수위(cm) */                        ";
	sql += "      , MNWL AS MNWL /* 최저수위(cm) */                        ";
	sql += " FROM   (                                                                                     ";
	sql += "         SELECT TO_CHAR(A.YMDH , 'YYYY.MM.DD') AS WMCYMD,                                     ";
	sql += "                A.WLOBSCD ,                                                                   ";
	sql += "                OBSNM,                                                                        ";
	sql += "                MAX(ADM_CD) ADM_CD,                                                           ";
	sql += "                ROUND(AVG(WL)/1, 2) WL,                                                       ";
	sql += "                ROUND(AVG(MXWL)/1, 2) MXWL,                                                   ";
	sql += "                ROUND(AVG(MNWL)/1, 2) MNWL                                                    ";
	sql += "         FROM   WLDY A,                                                                       ";
	sql += "                WLOBSIF D                                                                     ";
	sql += "         WHERE  A.WLOBSCD = D.WLOBSCD                                                         ";
	sql += "           AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) >='"+ac+"'                  ";
	sql += "           AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) <='"+bd+"'                 ";
	sql += "           AND A.WLOBSCD = '"+recordId+"'                                              ";
	sql += "         GROUP BY TO_CHAR(A.YMDH , 'YYYY.MM.DD') , A.WLOBSCD , OBSNM                          ";
	sql += "        ) A,                                                                                  ";
	sql += "        KESTI_WATER_ALL_MAP B,                                                                ";
	sql += "        COM_DISTRICT_RAW C                                                                    ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                   ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                   ";
	sql += " ) WHERE RN <= 10                                                               ";
	sql += " ORDER BY PT_NO, WMCYMD DESC)                                                               ";
	sql += " SELECT *                                                                                     ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                             ";
		sql += "         FROM   TMP_TBL                                                                       ";
		//sql += "         WHERE  ROWNUM <= 10                                                                  ";
		sql += "         ORDER BY WMCYMD                                                                      ";
		sql += "      )                                                                                       ";
	}else{
		sql += "  FROM TMP_TBL   ";
	}
	sql += "  UNION ALL                                                                                   ";
	sql += "  SELECT 999 AS RN, '','','',               ";                                      
	sql += " NVL(MAX(WL),0) + NVL(MAX(WL),0) / 10,			";
	sql += " NVL(MAX(MXWL),0) + NVL(MAX(MXWL),0) / 10,  ";
	sql += " NVL(MAX(MNWL),0) + NVL(MAX(MNWL),0) / 10   ";
	sql += "    FROM TMP_TBL                                                                              ";                                                                                                                                                     
                             


	//System.out.println(sql);
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONArray jsonArrMax = new JSONArray();
	JSONObject jsonRecord = null;
	
	int cnt = 0;
	while(rs.next()) {
		cnt++;
		
		jsonRecord = new JSONObject();

  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("WL" 	, rs.getString("WL"));
  		
  		if(rs.getString("RN").equals("999"))
  			jsonArrMax.add(jsonRecord);
  		else
  			jsonArr.add(jsonRecord);
	}
	
	//System.out.println(cnt);
	
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