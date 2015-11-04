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
	
	sql =  " WITH TMP_TBL AS																																																							";
	sql += "  (select * from ( SELECT RANK() OVER(PARTITION BY A.FACI_CD, A.DISCHARGE_NUM ORDER BY A.FACI_CD, A.DISCHARGE_NUM, A.WORK_DT DESC) AS RN      ";
	sql += "      , A.FACI_CD                                                                                                             ";
	sql += "      , FACI_NM /* 처리시설명 */                                                                                              ";
	sql += "      , A.WORK_DT /* 운영일자 */                                                                                              ";
	sql += "      , '방류구번호 : '||A.DISCHARGE_NUM AS DISCHARGE_NUM /* 방류구번호 */                                                    ";
	sql += "      , DISCHARGE_AMT_PHYS AS AMT_PHYS   /* 방류량_물리적(㎥/일) */                            ";
	sql += "      , DISCHARGE_AMT_BIO AS AMT_BIO    /* 방류량_생물학적(㎥/일) */                          ";
	sql += "      , DISCHARGE_AMT_HIGHTEC AS AMT_HIGHTEC   /* 방류량_고도(㎥/일) */                        ";
	sql += "      , BOD AS ITEM_BOD   /* BOD(㎎/ℓ) */                                                     ";
	sql += "      , COD AS ITEM_COD   /* COD(㎎/ℓ) */                                                    ";
	sql += "      , SS AS ITEM_SS    /* SS(㎎/ℓ) */                                                     ";
	sql += "      , TN AS ITEM_TN    /* TN(㎎/ℓ) */                                                     ";
	sql += "      , TP AS ITEM_TP    /* TP(㎎/ℓ) */                                                     ";
	sql += "      , COLI AS ITEM_COLI     /* 대장균군수(총대장균군수) */                                      ";
	sql += "   FROM (                                                                                                                     ";
	sql += "         SELECT TT.ADM_CD,                                                                                                    ";
	sql += "                T.YYYY,                                                                                                       ";
	sql += "                FACI_NM,                                                                                                      ";
	sql += "                FACI_CD,                                                                                                      ";
	sql += "                WORK_DT,                                                                                                      ";
	sql += "                DISCHARGE_NUM,                                                                                                ";
	sql += "                DISCHARGE_AMT_PHYS,                                                                                           ";
	sql += "                DISCHARGE_AMT_BIO,                                                                                            ";
	sql += "                DISCHARGE_AMT_HIGHTEC,                                                                                        ";
	sql += "                BOD,                                                                                                          ";
	sql += "                COD,                                                                                                          ";
	sql += "                SS,                                                                                                           ";
	sql += "                TN,                                                                                                           ";
	sql += "                TP,                                                                                                           ";
	sql += "                COLI,                                                                                                         ";
	sql += "                DISCHARGE_DISINFECT,                                                                                          ";
	sql += "                DISCHARGE_FACI_NM,                                                                                            ";
	sql += "                DISCHARGE_FACI_CD,                                                                                            ";
	sql += "                DISCHARGE_ADM_CD,                                                                                             ";
	sql += "                DISCHARGE_RIVER_NM,                                                                                           ";
	sql += "                DISCHARGE_RIVER_CD,                                                                                           ";
	sql += "                DISCHARGE_AMT                                                                                                 ";
	sql += "           FROM VPLA_FACI_OUT_TOTAL T ,                                                                                       ";
	sql += "                COM_DISTRICT_RAW TT,                                                                                          ";
	sql += "                KESTI_WATER_ALL_MAP C                                                                                         ";
	sql += "          WHERE T.ADM_CD = C.ADM_CD                                                                                           ";
	sql += "            AND T.ADM_CD = TT.ADM_CD                                                                                          ";
	sql += "        ) A                                                                                                                   ";
	sql += "      , (                                                                                                                     ";
	sql += "         SELECT FACI_CD, WORK_DT, MAX(DISCHARGE_NUM) AS DISCHARGE_NUM                                                         ";
	sql += "           FROM VPLA_FACI_OUT_TOTAL                                                                                           ";
	sql += "          GROUP BY FACI_CD, WORK_DT                                                                                           ";
	sql += "        ) B                                                                                                                   ";
	sql += "  WHERE A.FACI_CD = B.FACI_CD                                                                                                 ";
	sql += "    AND A.WORK_DT = B.WORK_DT                                                                                                 ";
	sql += "    AND A.DISCHARGE_NUM = B.DISCHARGE_NUM                                                                                     ";
	sql += "    AND A.FACI_CD = '"+recordId+"'                                                                                               ";
	if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '201301' AND '201312'                          ";
	}else{
		sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '"+ac+"' AND '"+bd+"'                                        ";	
	}
sql += " ) ";
sql += " where rn <= 10 ";
	sql += "  ORDER BY FACI_NM, DISCHARGE_NUM, WORK_DT ASC)                                                                              ";
	sql += " SELECT *                                                                                                                     ";
	if(defaultChart.equals("1")){
		sql += "   FROM (SELECT *                                                                                                             ";
		sql += "           FROM TMP_TBL                                                                                                       ";
		//sql += "          WHERE RN <= 10                                                                                                      ";
		sql += "          ORDER BY WORK_DT                                                                                                    ";
		sql += "        )                                                                                                                     ";
	}else{
		sql += "           FROM TMP_TBL                                                                                                       ";
	}
	sql += " UNION ALL                                                                                                        ";
	sql += " SELECT 999 AS RN, '','','','',      ";                                                
	sql += "   NVL(MAX(AMT_PHYS), 0) + NVL(MAX(AMT_PHYS), 0) / 10,				";
	sql += "   NVL(MAX(AMT_BIO), 0) + NVL(MAX(AMT_BIO), 0) / 10,        ";
	sql += "   NVL(MAX(AMT_HIGHTEC), 0) + NVL(MAX(AMT_HIGHTEC), 0) / 10,";
	sql += "   NVL(MAX(ITEM_BOD), 0) + NVL(MAX(ITEM_BOD), 0) / 10,      ";
	sql += "   NVL(MAX(ITEM_COD), 0) + NVL(MAX(ITEM_COD), 0) / 10,      ";
	sql += "   NVL(MAX(ITEM_SS), 0) + NVL(MAX(ITEM_SS), 0) / 10,        ";
	sql += "   NVL(MAX(ITEM_TN), 0) + NVL(MAX(ITEM_TN), 0) / 10,        ";
	sql += "   NVL(MAX(ITEM_TP), 0) + NVL(MAX(ITEM_TP), 0) / 10,        ";
	sql += "   NVL(MAX(ITEM_COLI), 0) + NVL(MAX(ITEM_COLI), 0) / 10     ";
	sql += "   FROM TMP_TBL                                                                                                   ";                                                                                                                                                          
                             


		
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

  		jsonRecord.put("FACI_CD"	, rs.getString("FACI_CD"));
  		jsonRecord.put("FACI_NM"	, rs.getString("FACI_NM"));
  		jsonRecord.put("WORK_DT"	, rs.getString("WORK_DT"));
  		jsonRecord.put("DISCHARGE_NUM"	, rs.getString("DISCHARGE_NUM"));
  		jsonRecord.put("AMT_PHYS"	, rs.getString("AMT_PHYS"));
  		jsonRecord.put("AMT_BIO"	, rs.getString("AMT_BIO"));
  		jsonRecord.put("AMT_HIGHTEC"	, rs.getString("AMT_HIGHTEC"));
  		jsonRecord.put("ITEM_BOD" 	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_COLI" 	, rs.getString("ITEM_COLI"));
  		
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