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
	
	sql = " WITH TMP_TBL AS																																				";
	sql += "  (SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN, /* 순번 */ ";
	sql += "        STNID AS PT_NO, /* 관측소코드 */                                                ";
	sql += "        OBSNM AS PT_NM, /* 관측소명 */                                                  ";
	sql += "        WMCYMD, /* 관측일자 */                                                          ";
	sql += "        RND, /* 강수량자료(mm) */                                                       ";
	sql += "        TA, /* 기온(℃) */                                                              ";
	sql += "        SIDAY /* 일사(MJ/㎡) */                                                         ";
	sql += " FROM   (SELECT TM AS WMCYMD,                                                           ";
	sql += "                E.OBSNMENG AS STNID,                                                    ";
	sql += "                STN_NM AS OBSNM,                                                        ";
	sql += "                MAX(D.ADM_CD) ADM_CD,                                                   ";
	sql += "                MAX(RN_DAY) AS RND,                                                     ";
	sql += "                A.TA AS TA,                                                             ";
	sql += "                A.SI_DAY AS SIDAY                                                       ";
	sql += "         FROM   RNDY A,                                                                 ";
	sql += "                KESTI_RNDY_ST D,                                                        ";
	sql += "                WTOBSIF E                                                               ";
	sql += "         WHERE  A.STN_ID = D.STN_ID                                                     ";
	sql += "         AND    A.STN_ID= E.OBSNMENG                                                    ";
	sql += "         AND    SUBSTR(A.TM, 1, 6) >='"+ac+"'                                           ";
	sql += "         AND    SUBSTR(A.TM, 1, 6) <='"+bd+"'                                           ";
	sql += "         AND    D.STN_ID = '"+recordId+"'                                                        ";
	sql += "         GROUP BY TM, E.OBSNMENG, STN_NM, TA, SI_DAY)A,                                 ";
	sql += "        KESTI_WATER_ALL_MAP B,                                                          ";
	sql += "        COM_DISTRICT_RAW C                                                              ";
	sql += " WHERE  A.ADM_CD = B.ADM_CD                                                             ";
	sql += " AND    A.ADM_CD = C.ADM_CD                                                             ";
	sql += " ORDER BY PT_NO, A.WMCYMD DESC                                                          ";
	sql += "  )                                                                                     ";
	sql += " SELECT *                                                                               ";
	if(defaultChart.equals("1")){
		sql += " FROM   (SELECT *                                                                       ";
		sql += "         FROM   TMP_TBL                                                                 ";
		sql += "         WHERE  ROWNUM <= 10                                                            ";
		sql += "         ORDER BY WMCYMD                                                                ";
		sql += "      )                                                                                 ";
	}else{
		sql += "    FROM TMP_TBL    ";
	}
	sql += "  UNION ALL                                                                             ";
	sql += "  SELECT 999 AS RN, '','','',MAX(RND) + MAX(RND) / 10, MAX(TA) + MAX(TA) / 10, MAX(SIDAY) + MAX(SIDAY) / 10                              ";
	sql += "    FROM TMP_TBL                                                                        ";                                                                                                                                             
                             


		
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
  		jsonRecord.put("RND" 	, rs.getString("RND"));
  		jsonRecord.put("TA" 	, rs.getString("TA"));
  		jsonRecord.put("SIDAY" 	, rs.getString("SIDAY"));
  		
  		
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