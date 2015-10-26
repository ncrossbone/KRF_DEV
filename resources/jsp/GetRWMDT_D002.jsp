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
	
	sql = " WITH TMP_TBL AS             																																	";                                                                                                                                                                                                                                            
	sql += "  (SELECT RANK() OVER(PARTITION BY WLOBSCD ORDER BY WLOBSCD, WMCYMD DESC) AS RN /* ���� */    ";
	sql += "      , WLOBSCD AS PT_NO /* �������ڵ� */                                                     ";
	sql += "      , OBSNM AS PT_NM /* �����Ҹ� */                                                         ";
	sql += "      , WMCYMD /* �������� */                                                                 ";
	sql += "      , TO_CHAR(WL, '999G999G999G990D00') AS WL /* ����(cm) */                                ";
	sql += "      , TO_CHAR(MXWL, '999G999G999G990D00') AS MXWL /* �ְ�����(cm) */                        ";
	sql += "      , TO_CHAR(MNWL, '999G999G999G990D00') AS MNWL /* ��������(cm) */                        ";
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
	sql += "           AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) >='201502'                  ";
	sql += "           AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) <='201502'                 ";
	sql += "           AND A.WLOBSCD = '1016650'                                              ";
	sql += "         GROUP BY TO_CHAR(A.YMDH , 'YYYY.MM.DD') , A.WLOBSCD , OBSNM                          ";
	sql += "        ) A,                                                                                  ";
	sql += "        KESTI_WATER_ALL_MAP B,                                                                ";
	sql += "        COM_DISTRICT_RAW C                                                                    ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                                   ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                                   ";
	sql += " ORDER BY PT_NO, A.WMCYMD DESC)                                                               ";
	sql += " SELECT *                                                                                     ";
	sql += " FROM   (SELECT *                                                                             ";
	sql += "         FROM   TMP_TBL                                                                       ";
	sql += "         WHERE  ROWNUM <= 10                                                                  ";
	sql += "         ORDER BY WMCYMD                                                                      ";
	sql += "      )                                                                                       ";
	sql += "  UNION ALL                                                                                   ";
	sql += "  SELECT 999 AS RN, '','','', MAX(WL), MAX(MXWL), MAX(MNWL)                                   ";                                      
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
  		jsonRecord.put("WL" 	, rs.getString("WL"));
  		
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