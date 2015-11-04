<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	�߿�!!!
	Json ���·� ����ϴ� jsp�������� ��� html ��ҵ� ������� �ʾƾ� �Ѵ�.
	<!DOCTYPE, <html ���
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
	
	sql = " WITH TMP_TBL AS																																																";
	sql += "  (SELECT RANK() OVER(PARTITION BY BOOBSCD ORDER BY BOOBSCD, WMCYMD DESC, WMCYMD_2 DESC) AS RN /* ���� */       ";
	sql += "      , BOOBSCD AS PT_NO /* �������ڵ� */                                                                       ";
	sql += "      , OBSNM AS PT_NM /* �����Ҹ� */                                                                           ";
	sql += "      , TO_CHAR(TO_DATE(WMCYMD||WMCYMD_2, 'YYYYMMDD HH24:MI'), 'YYYY.DD.MM HH24:MI') AS WMCYMD /* �������� */   ";
	sql += "      , A.SWL    /* �� �������(m) */                                                                           ";
	sql += "      , A.OWL    /* �� �Ϸ�����(m) */                                                                           ";
	sql += "      , A.SFW    /* ������(�鸸��) */                                                                           ";
	sql += "      , A.ECPC  /* ���뷮(�鸸��) */                                                                            ";
	sql += "      , A.INF    /* ���Է�(�鸸��) */                                                                           ";
	sql += "      , A.TOTOTF  /* �� �����(��/sec) */                                                                       ";
	sql += "      , A.EGOTF    /* ���� �����(��/sec) */                                                                    ";
	sql += "      , A.GTOTF    /* ������ �����(��/sec) */                                                                  ";
	sql += "      , A.CBOTF    /* ������ �����(��/sec) */                                                                  ";
	sql += "      , A.FWOTF    /* � �����(��/sec) */                                                                    ";
	sql += "      , A.ETCOTF  /* ��Ÿ �����(��/sec) */                                                                     ";
	sql += " FROM   (SELECT SUBSTR(A.YMDHM ,1,6) AS WMCYMD,                                                                 ";
	sql += "                SUBSTR(A.YMDHM ,7,6) AS WMCYMD_2 ,                                                              ";
	sql += "                A.BOOBSCD ,                                                                                     ";
	sql += "                OBSNM ,                                                                                         ";
	sql += "                MAX(ADM_CD) ADM_CD,                                                                             ";
	sql += "                ROUND(AVG(SWL)/1, 3) SWL ,                                                                      ";
	sql += "                ROUND(AVG(OWL)/1, 3) OWL ,                                                                      ";
	sql += "                ROUND(AVG(SFW)/1, 3) SFW ,                                                                      ";
	sql += "                ROUND(AVG(ECPC)/1, 3) ECPC ,                                                                    ";
	sql += "                ROUND(AVG(INF)/1, 3) INF ,                                                                      ";
	sql += "                ROUND(AVG(TOTOTF)/1, 3) TOTOTF ,                                                                ";
	sql += "                ROUND(AVG(EGOTF)/1, 3) EGOTF ,                                                                  ";
	sql += "                ROUND(AVG(GTOTF)/1, 3) GTOTF ,                                                                  ";
	sql += "                ROUND(AVG(CBOTF)/1, 3) CBOTF ,                                                                  ";
	sql += "                ROUND(AVG(FWOTF)/1, 3) FWOTF ,                                                                  ";
	sql += "                ROUND(AVG(ETCOTF)/1, 3) ETCOTF                                                                  ";
	sql += "         FROM   BOMST A ,                                                                                       ";
	sql += "                BOOBSIF D                                                                                       ";
	sql += "         WHERE  A.BOOBSCD = D.BOOBSCD                                                                           ";
	sql += "         AND    SUBSTR(A.YMDHM ,1,6) >='"+ac+"'                                                                 ";
	sql += "         AND    SUBSTR(A.YMDHM ,1,6) <='"+bd+"'                                                                 ";
	sql += "         AND    A.BOOBSCD = '"+recordId+"'                                                                           ";
	sql += "         GROUP BY SUBSTR(A.YMDHM ,1,6), SUBSTR(A.YMDHM ,7,6), A.BOOBSCD , OBSNM ) A ,                           ";
	sql += "        KESTI_WATER_ALL_MAP B ,                                                                                 ";
	sql += "        COM_DISTRICT_RAW C                                                                                      ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                                     ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                                     ";
	sql += " ORDER  BY PT_NO, A.WMCYMD DESC)                                                                                ";
	sql += " SELECT *                                                                                                       ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                                               ";
		sql += "         FROM   TMP_TBL                                                                                         ";
		sql += "         WHERE  ROWNUM <= 10                                                                                    ";
		sql += "         ORDER BY WMCYMD                                                                                        ";
		sql += "      )                                                                                                         ";
	}else{
		sql += "         FROM TMP_TBL     ";
	}
	sql += "  UNION ALL                                                                                                     ";
	sql += "  SELECT 999 AS RN, '','','',                                                                                   ";
	sql += "        MAX(SWL) + MAX(SWL) / 10, MAX(OWL) + MAX(OWL) / 10, MAX(SFW) + MAX(SFW) / 10,                                                                           ";
	sql += "        MAX(ECPC) + MAX(ECPC) / 10, MAX(INF) + MAX(INF) / 10, MAX(TOTOTF) + MAX(TOTOTF) / 10,                                                                       ";
	sql += "        MAX(EGOTF) + MAX(EGOTF) / 10, MAX(GTOTF) + MAX(GTOTF) / 10, MAX(CBOTF) + MAX(CBOTF) / 10,                                                                     ";
	sql += "        MAX(FWOTF) + MAX(FWOTF) / 10, MAX(ETCOTF) + MAX(ETCOTF) / 10                                                                                 ";
	sql += "    FROM TMP_TBL                                                                                                ";                                                                                                                                          
                             


		
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

  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("SWL" 	, rs.getString("SWL"));
  		jsonRecord.put("OWL" 	, rs.getString("OWL"));
  		jsonRecord.put("SFW" 	, rs.getString("SFW"));
  		jsonRecord.put("ECPC" 	, rs.getString("ECPC"));
  		jsonRecord.put("INF" 	, rs.getString("INF"));
  		jsonRecord.put("TOTOTF" 	, rs.getString("TOTOTF"));
  		jsonRecord.put("EGOTF" 	, rs.getString("EGOTF"));
  		jsonRecord.put("GTOTF" 	, rs.getString("GTOTF"));
  		jsonRecord.put("CBOTF" 	, rs.getString("CBOTF"));
  		jsonRecord.put("FWOTF" 	, rs.getString("FWOTF"));
  		jsonRecord.put("ETCOTF" 	, rs.getString("ETCOTF"));
  		
  		
  		
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