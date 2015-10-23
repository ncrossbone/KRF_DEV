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
	
	sql = " WITH TMP_TBL AS      																																																		  		 ";                                                                                                                                                                                                                                                
	sql += "  (SELECT RANK() OVER(PARTITION BY FACT_CODE, WAST_NO ORDER BY BASE_TIME DESC) RN,                                               ";
	sql += "        FACT_CODE AS PT_NO , /* 사업장코드 */                                                                                    ";
	sql += "        FACT_NAME AS PT_NM , /* 사업장명 */                                                                                      ";
	sql += "        WAST_NO ,            /* 방류구번호 */                                                                                    ";
	sql += "        SUBSTR(BASE_TIME,1,4)||'.'||SUBSTR(BASE_TIME,5,2)||'.'||SUBSTR(BASE_TIME,7,2) AS WMCYMD ,  /* 측정일자 */                ";
	sql += "        BOD00 AS ITEM_BOD,              /* BOD (㎎/L) */                                                                         ";
	sql += "        COD00 AS ITEM_COD ,              /* COD (㎎/L) */                                                                        ";
	sql += "        SUS00 AS ITEM_SS ,              /* SS (㎎/L) */                                                                          ";
	sql += "        TON00 AS ITEM_TN ,              /* T-N (㎎/L) */                                                                         ";
	sql += "        TOP00 AS ITEM_TP ,              /* T-P (㎎/L) */                                                                         ";
	sql += "        PHY00 AS ITEM_PH ,              /* pH */                                                                                 ";
	sql += "        FLW01 AS ITEM_FLW ,              /* 적산유량(평균) (㎥/Hour) */                                                          ";
	sql += "        TOC00 AS ITEM_TOC               /* 총유기탄소 (㎎/L) */                                                                  ";
	sql += " FROM   (SELECT A.ADM_CD,                                                                                                        ";
	sql += "                A.BASE_TIME,                                                                                                     ";
	sql += "                A.FACT_CODE,                                                                                                     ";
	sql += "                A.FACT_NAME,                                                                                                     ";
	sql += "                A.WAST_NO ,                                                                                                      ";
	sql += "                AVG(DECODE(A.ITCD, 'BOD00', HOUR_VL)) AS BOD00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'COD00', HOUR_VL)) AS COD00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'SUS00', HOUR_VL)) AS SUS00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'TON00', HOUR_VL)) AS TON00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'TOP00', HOUR_VL)) AS TOP00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'PHY00', HOUR_VL)) AS PHY00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'FLW01', HOUR_VL)) AS FLW01,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'FLW00', HOUR_VL)) AS FLW00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'SAM00', HOUR_VL)) AS SAM00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'SAM01', HOUR_VL)) AS SAM01,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'TEM00', HOUR_VL)) AS TEM00,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'DORON', HOUR_VL)) AS DORON,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'SAM02', HOUR_VL)) AS SAM02,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'PWRON', HOUR_VL)) AS PWRON,                                                                  ";
	sql += "                AVG(DECODE(A.ITCD, 'TOC00', HOUR_VL)) AS TOC00,                                                                  ";
	sql += "                FACT_KIND,                                                                                                       ";
	sql += "                FACT_KIND_NAME,                                                                                                  ";
	sql += "                FACT_CAPACITY                                                                                                    ";
	sql += "         FROM   (SELECT DISTINCT A.ADM_CD,                                                                                       ";
	sql += "                        A.BASE_TIME,                                                                                             ";
	sql += "                        A.WAST_NO,                                                                                               ";
	sql += "                        A.FACT_CODE,                                                                                             ";
	sql += "                        A.FACT_NAME,                                                                                             ";
	sql += "                        B.ITEM_CODE ITCD,                                                                                        ";
	sql += "                        A.HOUR_VL,                                                                                               ";
	sql += "                        A.FACT_KIND,                                                                                             ";
	sql += "                        A.FACT_KIND_NAME,                                                                                        ";
	sql += "                        A.FACT_CAPACITY                                                                                          ";
	sql += "                 FROM   (SELECT A.FACT_CODE,                                                                                     ";
	sql += "                                A.BASE_TIME,                                                                                     ";
	sql += "                                A.WAST_NO,                                                                                       ";
	sql += "                                A.ITEM_CODE,                                                                                     ";
	sql += "                                CASE UPPER(A.HOUR_VL) WHEN 'NULL' THEN NULL ELSE A.HOUR_VL                                       ";
	sql += "                                END HOUR_VL ,                                                                                    ";
	sql += "                                A.TRANS_TIME,                                                                                    ";
	sql += "                                B.FACT_NAME,                                                                                     ";
	sql += "                                B.ADM_CD,                                                                                        ";
	sql += "                                C.FACT_KIND,                                                                                     ";
	sql += "                                F.FACT_KIND_NAME,                                                                                ";
	sql += "                                TO_NUMBER(C.FACT_CAPACITY) FACT_CAPACITY,                                                        ";
	sql += "                                C.FACT_BUSINESS,                                                                                 ";
	sql += "                                D.RIVER_CODE ,                                                                                   ";
	sql += "                                E.NAME RIVER_NAME                                                                                ";
	sql += "                         FROM   TMS_HOURDATA A,                                                                                  ";
	sql += "                                WTMSC_FACT_WAST_TEMP B,                                                                          ";
	sql += "                                WTMSC_FACT C,                                                                                    ";
	sql += "                                WTMSC_FACT_WAST D,                                                                               ";
	sql += "                                WTMSC_RIVER E,                                                                                   ";
	sql += "                                WTMSC_FACT_KIND F                                                                                ";
	sql += "                         WHERE  A.FACT_CODE = B.FACT_CODE                                                                        ";
	sql += "                         AND    A.WAST_NO = B.WAST_NO                                                                            ";
	sql += "                         AND    A.FACT_CODE = C.FACT_CODE                                                                        ";
	sql += "                         AND    A.FACT_CODE = D.FACT_CODE                                                                        ";
	sql += "                         AND    A.WAST_NO = D.WAST_NO                                                                            ";
	sql += "                         AND    D.WAST_USED = 'Y'                                                                                ";
	sql += "                         AND    D.RIVER_CODE = E.CODE(+)                                                                         ";
	sql += "                         AND    C.FACT_KIND = F.FACT_KIND(+) ) A,                                                                ";
	sql += "                        (SELECT DISTINCT A.ITEM_ORDER,                                                                           ";
	sql += "                                A.ITEM_CODE,                                                                                     ";
	sql += "                                A.ITEM_NAME,                                                                                     ";
	sql += "                                A.ITEM_MNAME,                                                                                    ";
	sql += "                                A.ITEM_UNIT_CODE ,                                                                               ";
	sql += "                                A.COL_NAME,                                                                                      ";
	sql += "                                A.TWTMS_CODE,                                                                                    ";
	sql += "                                A.ITEM_USED,                                                                                     ";
	sql += "                                A.LEVY_FLAG,                                                                                     ";
	sql += "                                A.EX_LEVY_FLAG,                                                                                  ";
	sql += "                                A.ITEM_DP,                                                                                       ";
	sql += "                                A.MEAS_KIND_CODE,                                                                                ";
	sql += "                                A.ITEM_KIND_CODE,                                                                                ";
	sql += "                                A.MEAS_KIND_CODE_SECOND,                                                                         ";
	sql += "                                A.ITEM_DP2,                                                                                      ";
	sql += "                                B.ITEM_UNIT                                                                                      ";
	sql += "                         FROM   WTMSC_ITEM A,                                                                                    ";
	sql += "                                WTMSC_CODE B                                                                                     ";
	sql += "                         WHERE  A.ITEM_UNIT_CODE = B.ITEM_UNIT_CODE                                                              ";
	sql += "                         AND    A.ITEM_USED = 'Y' ) B                                                                            ";
	sql += "                 WHERE  A.ITEM_CODE = B.ITEM_CODE) A                                                                             ";
	sql += "         GROUP BY A.ADM_CD, A.BASE_TIME, A.WAST_NO, A.FACT_CODE, A.FACT_NAME, FACT_KIND, FACT_KIND_NAME, FACT_CAPACITY ) A ,     ";
	sql += "        KESTI_WATER_ALL_MAP B ,                                                                                                  ";
	sql += "        COM_DISTRICT_RAW C                                                                                                       ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                                                      ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                                                      ";
	sql += "   AND SUBSTR(A.BASE_TIME,1,6) >= '"+ac+"'                                                                                       ";
	sql += "   AND SUBSTR(A.BASE_TIME,1,6) <= '"+bd+"'                                                                                       ";
	sql += "   AND A.FACT_CODE = '"+recordId+"')                                                                                                  ";
	if(defaultChart.equals("1")){
		sql += "     SELECT *                                                                                                                    ";
		sql += " FROM (SELECT *                                                                                                                  ";     
		sql += "             FROM TMP_TBL                                                                                                        ";         
		sql += "            WHERE ROWNUM <= 10                                                                                                   ";
		sql += "            ORDER BY WMCYMD)                                                                                                     ";
	}else{
		sql += "     SELECT *  FROM TMP_TBL                                                                                                                  ";
	}
	sql += "  UNION ALL                                                                                                                      ";        
	sql += "  SELECT 999 AS RN, '', '','', '', MAX(ITEM_BOD), MAX(ITEM_COD), MAX(ITEM_SS),                                                   ";   
	sql += "  MAX(ITEM_TN), MAX(ITEM_TP), MAX(ITEM_PH), MAX(ITEM_FLW), MAX(ITEM_TOC)                                                         ";
	sql += "    FROM TMP_TBL                                                                                                                 ";                                                                                                                                                            
                             


		
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

  		jsonRecord.put("PT_NO"	, rs.getString("PT_NO"));
  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WAST_NO"	, rs.getString("WAST_NO"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		
  		jsonRecord.put("ITEM_BOD" 	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_PH" 	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_FLW" 	, rs.getString("ITEM_FLW"));
  		jsonRecord.put("ITEM_TOC" 	, rs.getString("ITEM_TOC"));
  		
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