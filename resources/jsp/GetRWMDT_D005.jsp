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
	
	sql = " WITH TMP_TBL AS																																					";
	sql += "  (SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN, /* ���� */   ";
	sql += "        STNID AS PT_NO, /* �������ڵ� */                                                  ";
	sql += "        OBSNM AS PT_NM, /* �����Ҹ� */                                                    ";
	sql += "        WMCYMD, /* �������� */                                                            ";
	sql += "        WD, /* ǳ��(m/s) */                                                               ";
	sql += "        WS, /* ǳ��(m/s) */                                                               ";
	sql += "        TA, /* ��� */                                                                    ";
	sql += "        HM, /* ���� */                                                                    ";
	sql += "        PA, /* ������� */                                                                ";
	sql += "        PS, /* �ظ��� */                                                                ";
	sql += "        RNYN, /* �������� */                                                              ";
	sql += "        RN1HR, /* ������(mm) */                                                           ";
	sql += "        RNDAY /* ����������(mm) */                                                        ";
	sql += " FROM   (SELECT STNID,                                                                    ";
	sql += "                OBSNM,                                                                    ";
	sql += "                SUBSTR(TM, 1, 8) AS WMCYMD,                                               ";
	sql += "                ROUND(AVG(WD/10),2) WD,                                                   ";
	sql += "                ROUND(AVG(WS/10),2) WS,                                                   ";
	sql += "                ROUND(AVG(TA/10),2) TA,                                                   ";
	sql += "                ROUND(AVG(HM),2) HM,                                                      ";
	sql += "                ROUND(AVG(PA),2) PA,                                                      ";
	sql += "                ROUND(AVG(PS),2) PS,                                                      ";
	sql += "                ROUND(AVG(RNYN),2) RNYN,                                                  ";
	sql += "                ROUND(AVG(RN1HR/10),2) RN1HR,                                             ";
	sql += "                ROUND(AVG(RNDAY/10),2) RNDAY,                                             ";
	sql += "                ROUND(AVG(RN15M),2) RN15M,                                                ";
	sql += "                ROUND(AVG(RN60M),2) RN60M,                                                ";
	sql += "                ROUND(AVG(WDINS),2) WDINS,                                                ";
	sql += "                ROUND(AVG(WSINS),2) WSINS,                                                ";
	sql += "                MAX(ADM_CD) ADM_CD                                                        ";
	sql += "         FROM   WTAWSMST A,                                                               ";
	sql += "                WTOBSIF B                                                                 ";
	sql += "         WHERE  A.STNID = B.WTOBSCD                                                       ";
	sql += "         AND    A.STNID = '"+recordId+"'                                                      ";
	sql += "         AND    SUBSTR(TM, 1, 6) BETWEEN '"+ac+"' AND '"+bd+"'                            ";
	sql += "         and    B.OBSTCD = '2'                                                            ";
	sql += "         GROUP BY STNID, OBSNM, SUBSTR(TM, 1, 8) ) A,                                     ";
	sql += "        KESTI_WATER_ALL_MAP C ,                                                           ";
	sql += "        COM_DISTRICT_RAW D                                                                ";
	sql += " WHERE  A.ADM_CD = C.ADM_CD                                                               ";
	sql += " AND    A.ADM_CD = D.ADM_CD)                                                              ";
	sql += " SELECT *                                                                                 ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                         ";
		sql += "         FROM   TMP_TBL                                                                   ";
		sql += "         WHERE  ROWNUM <= 10                                                              ";
		sql += "         ORDER BY WMCYMD                                                                  ";
		sql += "      )                                                                                   ";
	}else{
		sql += "    FROM TMP_TBL    ";
	}
	sql += "  UNION ALL                                                                               ";
	sql += "  SELECT 999 AS RN, '','','', MAX(WD), MAX(WS), MAX(TA),                                  ";
	sql += "  MAX(HM), MAX(PA), MAX(PS),                                                              ";
	sql += "  MAX(RNYN), MAX(RN1HR), MAX(RNDAY)                                                       ";
	sql += "    FROM TMP_TBL                                                                          ";                                                                                                                                             
                             


		
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
  		jsonRecord.put("WD" 	, rs.getString("WD"));
  		jsonRecord.put("WS" 	, rs.getString("WS"));
  		jsonRecord.put("TA" 	, rs.getString("TA"));
  		jsonRecord.put("HM" 	, rs.getString("HM"));
  		jsonRecord.put("PA" 	, rs.getString("PA"));
  		jsonRecord.put("PS" 	, rs.getString("PS"));
  		jsonRecord.put("RNYN" 	, rs.getString("RNYN"));
  		jsonRecord.put("RN1HR" 	, rs.getString("RN1HR"));
  		jsonRecord.put("RNDAY" 	, rs.getString("RNDAY"));
  		
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