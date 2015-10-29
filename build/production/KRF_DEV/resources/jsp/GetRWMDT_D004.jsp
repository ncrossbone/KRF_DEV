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
	
	sql = " WITH TMP_TBL AS      																																				";                                                                                                                                                                                                                                                   
	sql += "  (SELECT * FROM ( SELECT RANK() OVER(PARTITION BY DMOBSCD ORDER BY DMOBSCD, WMCYMD DESC) AS RN, /* ���� */   ";
	sql += "        DMOBSCD AS PT_NO, /* �������ڵ� */                                                    ";
	sql += "        OBSNM AS PT_NM, /* �����Ҹ� */                                                        ";
	sql += "        WMCYMD, /* �������� */                                                                ";
	sql += "        SWL, /* ������(cm) */                                                                 ";
	sql += "        INF, /* ���Է�(cms) */                                                                ";
	sql += "        OTF, /* �����(cms) */                                                                ";
	sql += "        SFW, /* ������(����) */                                                               ";
	sql += "        ECPC /* ���뷮(�鸸��) */                                                             ";
	sql += " FROM   (SELECT SUBSTR(YMD,1,4)||'.'||SUBSTR(YMD,5,2)||'.'||SUBSTR(YMD,7,2) AS WMCYMD,        ";
	sql += "                A.DMOBSCD,                                                                    ";
	sql += "                OBSNM,                                                                        ";
	sql += "                MAX(ADM_CD) ADM_CD,                                                           ";
	sql += "                ROUND(AVG(A.SWL)/1, 3) SWL,                                                   ";
	sql += "                ROUND(AVG(INF)/1, 3) INF,                                                     ";
	sql += "                ROUND(AVG(OTF)/1, 3) OTF,                                                     ";
	sql += "                ROUND(AVG(SFW)/1, 3) SFW ,                                                    ";
	sql += "                ROUND(AVG(ECPC)/1, 3) ECPC                                                    ";
	sql += "         FROM   DMDY A,                                                                       ";
	sql += "                DMOBSIF D                                                                     ";
	sql += "         WHERE  A.DMOBSCD = D.DMOBSCD                                                         ";
	sql += "         AND    SUBSTR(A.YMD, 1, 6) >='"+ac+"'                                     ";
	sql += "         AND    SUBSTR(A.YMD, 1, 6) <='"+bd+"'                                     ";
	sql += "         AND    A.DMOBSCD = '"+recordId+"'                                              ";
	sql += "         GROUP BY YMD, A.DMOBSCD , OBSNM ) A,                                                 ";
	sql += "        KESTI_WATER_ALL_MAP B,                                                                ";
	sql += "        COM_DISTRICT_RAW C                                                                    ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                   ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                   ";
	sql += " ) WHERE RN <=  10                                                               ";
	sql += " ORDER BY PT_NO, WMCYMD DESC)                                                               ";
	sql += " SELECT *                                                                                     ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                             ";
		sql += "         FROM   TMP_TBL                                                                       ";
		sql += "         WHERE  ROWNUM <= 10                                                                  ";
		sql += "         ORDER BY WMCYMD                                                                      ";
		sql += "      )                                                                                       ";
	}else{
		sql += "     FROM TMP_TBL   ";
	}
	sql += "  UNION ALL                                                                                   ";
	sql += "  SELECT 999 AS RN, '','','', MAX(SWL) + MAX(SWL) / 10, MAX(INF) + MAX(INF) / 10, MAX(OTF) + MAX(OTF) / 10,                                   ";                   
	sql += "  MAX(SFW) + MAX(SFW) / 10, MAX(ECPC) + MAX(ECPC) / 10                                                                         ";                           
	sql += "    FROM TMP_TBL                                                                              ";                                                                                                                                                
                             


		
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
  		jsonRecord.put("INF" 	, rs.getString("INF"));
  		jsonRecord.put("OTF" 	, rs.getString("OTF"));
  		jsonRecord.put("SFW" 	, rs.getString("SFW"));
  		jsonRecord.put("ECPC" 	, rs.getString("ECPC"));
  		
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