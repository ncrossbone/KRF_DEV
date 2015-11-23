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
	
sql = " WITH TMP_TBL AS  																							";                                                                                                                                                                                                                                                       
sql += "  (SELECT RANK() OVER(PARTITION BY A.PT_NO                                                                                                                               ";
sql += "         ORDER BY A.PT_NO, WMYR DESC, WMOM DESC, WMOD DESC) AS RN, /* 순번 */                                                                                            ";
sql += "        A.PT_NO, /* 측정소코드 */                                                                                                                                        ";
sql += "        A.PT_NM, /* 측정소명 */                                                                                                                                          ";
sql += "        WMYR , /* 년도 */                                                                                                                                                ";
sql += "        WMOM , /* 월 */                                                                                                                                                  ";
sql += "        WMYR||'.'||WMOM||'.'||WMOD AS WMCYMD , /* 측정일자 */                                                                                                            ";
sql += "        MCNT , /* 회차 */                                                                                                                                                ";
sql += "        JOSANAME , /* 조사기관 */                                                                                                                                        ";
sql += "        DECODE(ITEM_DOW , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW, 'FM999,999990.0' ) ) ITEM_DOW , /* 수심(m) */                                                  ";
sql += "        DECODE(ITEM_TEMP , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP, 'FM999,999990' ) ) ITEM_TEMP , /* 수온(℃) */                                                ";
sql += "        DECODE(ITEM_DO , '999999999', '정량한계미만', TO_CHAR(ITEM_DO, 'FM999,999990.0' ) ) ITEM_DO , /* DO(㎎/L) */                                                    ";
sql += "        DECODE(ITEM_PH , '999999999', '정량한계미만', TO_CHAR(ITEM_PH, 'FM999,999990.0' ) ) ITEM_PH , /* pH */                                                          ";
sql += "        DECODE(ITEM_EC , '999999999', '정량한계미만', TO_CHAR(ITEM_EC, 'FM999,999990' ) ) ITEM_EC , /* 전기전도도(SC)(25℃ μS/㎝) */                                   ";
sql += "        DECODE(ITEM_COD , '999999999', '정량한계미만', TO_CHAR(ITEM_COD, 'FM999,999990.00' ) ) ITEM_COD , /* COD(%) */                                                  ";
sql += "        DECODE(ITEM_TOC , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC, 'FM999,999990.00' ) ) ITEM_TOC , /* TOC(%) */                                                  ";
sql += "        DECODE(ITEM_TN , '999999999', '정량한계미만', TO_CHAR(ITEM_TN, 'FM999,999990' ) ) ITEM_TN , /* T-N(㎎/㎏) */                                                    ";
sql += "        DECODE(ITEM_TP , '999999999', '정량한계미만', TO_CHAR(ITEM_TP, 'FM999,999990' ) ) ITEM_TP, /* T-P(㎎/㎏) */                                                     ";
sql += "        B.ADMCODE                                                                                                                                                        ";
sql += " FROM   (SELECT A.PT_NO ,                                                                                                                                                ";
sql += "                A.WMYR ,                                                                                                                                                 ";
sql += "                A.WMWK ,                                                                                                                                                 ";
sql += "                A.WMYR || A.WMWK WMYRWK ,                                                                                                                                ";
sql += "                A.WMOM ,                                                                                                                                                 ";
sql += "                A.WMOD ,                                                                                                                                                 ";
sql += "                A.WMCTM ,                                                                                                                                                ";
sql += "                A.WMSD ,                                                                                                                                                 ";
sql += "                A.WMED ,                                                                                                                                                 ";
sql += "                SUBSTR(B.PT_NO, 5, 1) VGBN ,                                                                                                                             ";
sql += "                CD.CODE_CTN RAGBN ,                                                                                                                                      ";
sql += "                B.PT_NM ,                                                                                                                                                ";
sql += "                DECODE(SUBSTR(UPPER(B.PT_NM), LENGTH(TRIM(B.PT_NM)), 1), 'U', REPLACE(UPPER(B.PT_NM), 'U'), 'D', REPLACE(UPPER(B.PT_NM), 'D'), B.PT_NM) ORD_PT_NM ,      ";
sql += "                B.ORD_GBN ,                                                                                                                                              ";
sql += "                B.JOSACODE ,                                                                                                                                             ";
sql += "                CD2.CODE_CTN JOSANAME ,                                                                                                                                  ";
sql += "                                CASE                                                                                                                                     ";
sql += "                                  WHEN A.RGDT=A.UPDT THEN 'Y'                                                                                                            ";
sql += "                                  ELSE ''                                                                                                                                ";
sql += "                                END UPOK ,                                                                                                                               ";
sql += "                A.UPDT ,                                                                                                                                                 ";
sql += "                CD3.CODE_CTN MCNT ,                                                                                                                                      ";
sql += "                ROUND(ITEM_DOW , (SELECT PRECISON                                                                                                                        ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1001'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_DOW ,                                                                                                                    ";
sql += "                ROUND(ITEM_TEMP_LOW , (SELECT PRECISON                                                                                                                       ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1002'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_TEMP ,                                                                                                                   ";
sql += "                ROUND(ITEM_DO_LOW , (SELECT PRECISON                                                                                                                         ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1003'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_DO ,                                                                                                                     ";
sql += "                ROUND(ITEM_PH_LOW , (SELECT PRECISON                                                                                                                         ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1004'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_PH ,                                                                                                                     ";
sql += "                ROUND(ITEM_EC_LOW , (SELECT PRECISON                                                                                                                         ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1005'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_EC ,                                                                                                                     ";
sql += "                ROUND(ITEM_COD , (SELECT PRECISON                                                                                                                        ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1011'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_COD ,                                                                                                                    ";
sql += "                ROUND(ITEM_TOC , (SELECT PRECISON                                                                                                                        ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1012'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_TOC ,                                                                                                                    ";
sql += "                ROUND(ITEM_TN , (SELECT PRECISON                                                                                                                         ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1013'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_TN ,                                                                                                                     ";
sql += "                ROUND(ITEM_TP , (SELECT PRECISON                                                                                                                         ";
sql += "                         FROM   SDM_WMIT SW                                                                                                                              ";
sql += "                         WHERE  SW.ITCD='1014'                                                                                                                           ";
sql += "                         AND    ROWNUM=1)) ITEM_TP ,                                                                                                                     ";
sql += "                (SELECT COUNT(*)                                                                                                                                         ";
sql += "                 FROM   SDM_FILE_INFO FI                                                                                                                                 ";
sql += "                 WHERE  FI.UM_GBN = 'B'                                                                                                                                  ";
sql += "                 AND    FI.PT_NO = A.PT_NO                                                                                                                               ";
sql += "                 AND    FI.WMYR = A.WMYR                                                                                                                                 ";
sql += "                 AND    FI.WMWK = A.WMWK) IMG_CNT ,                                                                                                                      ";
sql += "                (SELECT COUNT(*)                                                                                                                                         ";
sql += "                 FROM   SDM_FILE_INFO FI                                                                                                                                 ";
sql += "                 WHERE  FI.UM_GBN = 'C'                                                                                                                                  ";
sql += "                 AND    FI.WMYR = A.WMYR                                                                                                                                 ";
sql += "                 AND    FI.WMWK = A.WMWK) IMG_CNT2                                                                                                                       ";
sql += "         FROM   SDM_RWMDTI A ,                                                                                                                                           ";
sql += "                SDM_RWMPT B ,                                                                                                                                            ";
sql += "                (SELECT CODE,                                                                                                                                            ";
sql += "                        CODE_CTN                                                                                                                                         ";
sql += "                 FROM   CODE                                                                                                                                             ";
sql += "                 WHERE  CODE_ID = 'SDM001') CD ,                                                                                                                         ";
sql += "                (SELECT CODE,                                                                                                                                            ";
sql += "                        CODE_CTN                                                                                                                                         ";
sql += "                 FROM   CODE                                                                                                                                             ";
sql += "                 WHERE  CODE_ID = 'ORG001') CD2 ,                                                                                                                        ";
sql += "                (SELECT SUBSTR(CODE, 2, 1) CODE,                                                                                                                         ";
sql += "                        CODE_CTN                                                                                                                                         ";
sql += "                 FROM   CODE                                                                                                                                             ";
sql += "                 WHERE  CODE_ID = 'ETS955'                                                                                                                               ";
sql += "                 AND    SUBSTR(CODE, 0, 1) = 'H') CD3                                                                                                                    ";
sql += "         WHERE  A.PT_NO = B.PT_NO                                                                                                                                        ";
sql += "         AND    SUBSTR(A.PT_NO, 5, 1) = CD.CODE(+)                                                                                                                       ";
sql += "         AND    B.JOSACODE = CD2.CODE(+)                                                                                                                                 ";
sql += "         AND    A.WMWK = CD3.CODE(+)                                                                                                                                     ";
sql += "        ) A                                                                                                                                                              ";
sql += "      , SDM_RWMPT B                                                                                                                                                      ";
sql += "  WHERE A.PT_NO = B.PT_NO                                                                                                                                                ";
sql += "    AND A.PT_NO = '"+recordId+"'                                                                                                                                              ";
if(defaultChart.equals("1")){
	sql += "    AND A.WMYR||A.WMOD BETWEEN '201001' AND '201512'                                                                                                          ";
}else{
	sql += "    AND A.WMYR||A.WMOD BETWEEN '"+ac+"' AND '"+bd+"'                                                                                                          ";
}
sql += "  ORDER BY WMYR DESC , WMOD DESC                                                                                                                                         ";
sql += "  )                                                                                                                                                                      ";
sql += "     SELECT *                                                                                                                                                            ";
if(defaultChart.equals("1")){
	sql += " FROM (SELECT *                                                                                                                                                          ";
	sql += "         FROM TMP_TBL                                                                                                                                                    ";
	sql += "        WHERE ROWNUM <= 10                                                                                                                                               ";
	sql += "            ORDER BY WMCYMD                                                                                                                                              ";
	sql += "      )                                                                                                                                                                  ";
}else{
	sql += " FROM TMP_TBL    ";
}
sql += "  UNION ALL                                                                                                                                                              ";
sql += "  SELECT 999 AS RN, '', '','', '', '', '', '', 									  ";
sql += "  			TO_CHAR(MAX(TO_NUMBER(ITEM_DOW)) + MAX(TO_NUMBER(ITEM_DOW)) / 10),	  ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_TEMP)) + (MAX(TO_NUMBER(ITEM_TEMP)) / 10)),   ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_DO)) + MAX(TO_NUMBER(ITEM_DO)) / 10),         ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_PH)) + MAX(TO_NUMBER(ITEM_PH)) / 10),         ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_EC)) + MAX(TO_NUMBER(ITEM_EC)) / 10),         ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_COD)) + MAX(TO_NUMBER(ITEM_COD)) / 10),       ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_TOC)) + MAX(TO_NUMBER(ITEM_TOC)) / 10),       ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_TN)) + MAX(TO_NUMBER(ITEM_TN)) / 10),         ";
sql += "         TO_CHAR(MAX(TO_NUMBER(ITEM_TP)) + MAX(TO_NUMBER(ITEM_TP)) / 10),         ";
sql += "    ''                                                                            ";
sql += "  FROM TMP_TBL                                                                    ";
	                                                                                                                                                             
                             


	System.out.println(sql);	
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
  		jsonRecord.put("WMYR"	, rs.getString("WMYR"));
  		jsonRecord.put("WMOM"	, rs.getString("WMOM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("MCNT"	, rs.getString("MCNT"));
  		jsonRecord.put("JOSANAME"	, rs.getString("JOSANAME"));
  		jsonRecord.put("ITEM_DOW" 	, rs.getString("ITEM_DOW"));
  		jsonRecord.put("ITEM_TEMP" 	, rs.getString("ITEM_TEMP"));
  		jsonRecord.put("ITEM_DO" 	, rs.getString("ITEM_DO"));
  		jsonRecord.put("ITEM_EC" 	, rs.getString("ITEM_EC"));
  		jsonRecord.put("ITEM_PH" 	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_TOC" 	, rs.getString("ITEM_TOC"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ADMCODE" 	, rs.getString("ADMCODE"));
  		
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