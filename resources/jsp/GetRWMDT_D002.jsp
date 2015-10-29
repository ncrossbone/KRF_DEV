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
	
	sql = " WITH TMP_TBL AS       															";                                                                                                                                                                                                                                                  
			sql += "  ( SELECT * FROM (SELECT RANK() OVER(PARTITION BY RFOBSCD ORDER BY RFOBSCD, YMD DESC) AS RN /* 순번 참고용 */        ";
			sql += "      , RFOBSCD AS PT_NO /* 관측소코드 */                                                             ";
			sql += "      , OBSNM AS PT_NM /* 관측소명 */                                                                 ";
			sql += "      , YMD AS WMCYMD /* 관측일자*/                                                                   ";
			sql += "      , RF /* 우량자료(mm) */                                                                         ";
			sql += "   FROM (SELECT SUBSTR(YMD, 1, 4)||'.'||SUBSTR(YMD, 5, 2)||'.'||SUBSTR(YMD, 7, 2) AS YMD,             ";
			sql += "                A.RFOBSCD,                                                                            ";
			sql += "                OBSNM,                                                                                ";
			sql += "                MAX(ADM_CD) ADM_CD,                                                                   ";
			sql += "                ROUND(SUM(RF)/1, 3) RF                                                                ";
			sql += "         FROM   RFDY A,                                                                               ";
			sql += "                RFOBSIF D                                                                             ";
			sql += "         WHERE  A.RFOBSCD = D.RFOBSCD                                                                 ";
			sql += "           AND SUBSTR(YMD,1,6) BETWEEN '"+ac+"' AND '"+bd+"'                                          ";
			sql += "           AND A.RFOBSCD = '"+recordId+"'                                                                 ";
			sql += "         GROUP BY YMD, A.RFOBSCD , D.OBSNM                                                            ";
			sql += "         ORDER BY YMD, A.RFOBSCD , D.OBSNM ) A,                                                       ";
			sql += "        KESTI_WATER_ALL_MAP B,                                                                        ";
			sql += "        COM_DISTRICT_RAW C                                                                            ";
			sql += "  WHERE A.ADM_CD = B.ADM_CD                                                                           ";
			sql += "    AND A.ADM_CD = C.ADM_CD                                                                           ";
			sql += "   )  WHERE RN <= 10                                                                      ";
			sql += "  ORDER BY PT_NO, WMCYMD DESC )                                                                       ";
			sql += " SELECT *                                                                                             ";
			if(defaultChart.equals("1")){
				sql += " FROM   (SELECT *                                                                                     ";
				sql += "         FROM   TMP_TBL                                                                               ";
				//sql += "         WHERE  ROWNUM <= 10                                                                          ";
				sql += "         ORDER BY WMCYMD                                                                              ";
				sql += "      )                                                                                               ";
			}else{
				sql += "    FROM TMP_TBL  ";
			}
			sql += "  UNION ALL                                                                                           ";
			sql += "  SELECT 999 AS RN, '','','', MAX(RF) + MAX(RF) / 10                                                                 ";                                
			sql += "    FROM TMP_TBL                                                                                     ";                                                                                                                                                       
                             


		
  // out.print(sql);
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
  		jsonRecord.put("RF" 	, rs.getString("RF"));
  		
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