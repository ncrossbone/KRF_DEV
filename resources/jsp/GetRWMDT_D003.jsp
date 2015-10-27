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
	
	sql = " WITH TMP_TBL AS           																																					";                                                                                                                                                                                                                                              
	sql += "  (SELECT RANK() OVER(PARTITION BY WLOBSCD ORDER BY WLOBSCD, WMCYMD DESC) AS RN , /* ���� */        ";
	sql += "        WLOBSCD AS PT_NO, /* �������ڵ� */                                                          ";
	sql += "        OBSNM AS PT_NM, /* �����Ҹ� */                                                              ";
	sql += "        WMCYMD, /* �������� */                                                                      ";
	sql += "        FW /* ����(CMS) */                                                                          ";
	sql += " FROM   (SELECT TO_CHAR(YMDH, 'YYYY.MM.DD') WMCYMD,                                                 ";
	sql += "                A.WLOBSCD,                                                                          ";
	sql += "                OBSNM,                                                                              ";
	sql += "                MAX(ADM_CD) ADM_CD,                                                                 ";
	sql += "                ROUND(AVG(FW)/1, 4) FW                                                              ";
	sql += "         FROM   FWDY A,                                                                             ";
	sql += "                FWOBSIF D                                                                           ";
	sql += "         WHERE  A.WLOBSCD = D.FWOBSCD                                                               ";
	sql += "         AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) >='"+ac+"'                       ";
	sql += "         AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) <='"+bd+"'                       ";
	sql += "         AND    A.WLOBSCD = '"+recordId+"'                                                     ";
	sql += "         GROUP BY TO_CHAR(YMDH, 'YYYY.MM.DD'), A.WLOBSCD , OBSNM ) A,                               ";
	sql += "        KESTI_WATER_ALL_MAP B,                                                                      ";
	sql += "        COM_DISTRICT_RAW C                                                                          ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                         ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                         ";
	sql += "  ORDER BY PT_NO, A.WMCYMD DESC                                                                     ";
	sql += "  )                                                                                                 ";
	sql += " SELECT *                                                                                           ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                                   ";
		sql += "         FROM   TMP_TBL                                                                             ";
		sql += "         WHERE  ROWNUM <= 10                                                                        ";
		sql += "         ORDER BY WMCYMD                                                                            ";
		sql += "      )                                                                                             ";
	}else{
		sql += "   FROM TMP_TBL    ";
	}
	sql += "  UNION ALL                                                                                         ";
	sql += "  SELECT 999 AS RN, '','','', MAX(FW)                                                               ";                              
	sql += "    FROM TMP_TBL                                                                                    ";                                                                                                                                                  
                             


		
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
  		jsonRecord.put("FW" 	, rs.getString("FW"));
  		
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