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
	

	sql = " WITH TMP_TBL AS                                                                       										 " ;                                                                                                                                                                                 
	sql += "  (SELECT RANK() OVER(PARTITION BY FACI_CD, PIPE_NUM ORDER BY FACI_CD, PIPE_NUM, WORK_DT DESC) AS RN       " ;
	sql += "      , FACI_NM   /* 처리시설명*/                                                                          " ;
	sql += "      , WORK_DT   /* 운영일자*/                                                                            " ;
	sql += "      , PIPE_NUM  /* 관거번호*/                                                                            " ;
	sql += "      , PIPE_TYPE /* 관거유형*/                                                                            " ;
	sql += "      , TO_CHAR(AMT, '999G999G999G990D00') AS ITEM_AMT      /* 유량(㎥/일)*/                               " ;
	sql += "      , TO_CHAR(BOD, '999G999G999G990D00') AS ITEM_BOD      /* BOD(㎎/ℓ)*/                                " ;
	sql += "      , TO_CHAR(COD, '999G999G999G990D00') AS ITEM_COD      /* COD(㎎/ℓ)*/                                " ;
	sql += "      , TO_CHAR(SS,  '999G999G999G990D00') AS ITEM_SS       /* SS(㎎/ℓ)*/                                 " ;
	sql += "      , TO_CHAR(TN,  '999G999G999G990D00') AS ITEM_TN       /* TN(㎎/ℓ)*/                                 " ;
	sql += "      , TO_CHAR(TP,  '999G999G999G990D00') AS ITEM_TP       /* TP(㎎/ℓ)*/                                 " ;
	sql += "      , TO_CHAR(COLI,'999G999G999G999') AS ITEM_COLI        /* 대장균군수(총대장균군수)*/                  " ;
	sql += "      , TO_CHAR(BYPASS_AMT,'999G999G999G990D00') AS ITEM_BYPASS_AMT   /* 미처리배제유량(㎥/일)*/           " ;
	sql += "   FROM (                                                                                                  " ;
	sql += "         SELECT FACI_CD                                                                                    " ;
	sql += "              , FACI_NM                                                                                    " ;
	sql += "              , WORK_DT                                                                                    " ;
	sql += "              , PIPE_NUM                                                                                   " ;
	sql += "              , PIPE_TYPE                                                                                  " ;
	sql += "              , AMT                                                                                        " ;
	sql += "              , BOD                                                                                        " ;
	sql += "              , COD                                                                                        " ;
	sql += "              , SS                                                                                         " ;
	sql += "              , TN                                                                                         " ;
	sql += "              , TP                                                                                         " ;
	sql += "              , COLI                                                                                       " ;
	sql += "              , BYPASS_AMT                                                                                 " ;
	sql += "              , CONNECT_FACI_NM                                                                            " ;
	sql += "              , T.ADM_CD                                                                                   " ;
	sql += "           FROM VPLA_FACI_PIPE_TRANSFER T                                                                  " ;
	sql += "              , COM_DISTRICT_RAW TT                                                                        " ;
	sql += "              , KESTI_WATER_ALL_MAP C                                                                      " ;
	sql += "          WHERE T.ADM_CD = C.ADM_CD                                                                        " ;
	sql += "            AND T.ADM_CD = TT.ADM_CD                                                                       " ;
	sql += "        )                                                                                                  " ;
	sql += "  WHERE FACI_CD = '467200W03'                                                                              " ;
	sql += "    AND SUBSTR(WORK_DT, 1, 4)||SUBSTR(WORK_DT, 6, 2) BETWEEN '201202' AND '201310'                         " ;
	sql += "  ORDER BY FACI_NM, PIPE_NUM, WORK_DT DESC)                                                                " ;
	sql += " SELECT *                                                                                                  " ;
	sql += "   FROM (SELECT *                                                                                          " ;
	sql += "           FROM TMP_TBL                                                                                    " ;
	sql += "          WHERE ROWNUM <= 10                                                                               " ;
	sql += "          ORDER BY WORK_DT                                                                                 " ;
	sql += "        )                                                                                                  " ;
	sql += "  UNION ALL                                                                                                " ;
	sql += "  SELECT 999 AS RN, '', '', TO_NUMBER(''), '', MAX(ITEM_AMT), MAX(ITEM_BOD),                               " ;
	sql += "  MAX(ITEM_COD), MAX(ITEM_SS), MAX(ITEM_TN), MAX(ITEM_TP), MAX(ITEM_COLI), MAX(ITEM_BYPASS_AMT)            " ;
	sql += "    FROM TMP_TBL                                                                                           " ;
	sql += "                                                                                                           " ;                                                                                                                                                      
                             


		
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

  		jsonRecord.put("FACI_NM"	, rs.getString("FACI_NM"));
  		jsonRecord.put("WORK_DT"	, rs.getString("WORK_DT"));
  		jsonRecord.put("ITEM_AMT"	, rs.getString("ITEM_AMT"));
  		jsonRecord.put("ITEM_BOD" 	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_COLI" 	, rs.getString("ITEM_COLI"));
  		jsonRecord.put("ITEM_BYPASS_AMT" 	, rs.getString("ITEM_BYPASS_AMT"));
  		
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