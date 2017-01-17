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
	String siteCodes = request.getParameter("siteCodes");
	//out.print(siteCodes);
	String measureDate = request.getParameter("measureDate");
	String layerDate = request.getParameter("layerDate");
	
	String[] arrSiteCodes = siteCodes.split(",");
	
	
	//out.print(withSql);
	sql = " SELECT AA. *																																															  " +
"     FROM (                                                                                                        " +
"         SELECT PT_NO, WMCYMD, ITEM_CLOA, ITEM_TEMP, ITEM_BLUE_GREEN_ALGAE                                         " +
"   FROM (                                                             " +
"         SELECT A.PT_NO \"PT_NO\"                                                                                    " +
"             , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                                " +
"             , ITEM_SURFACE_CLOA \"ITEM_CLOA\"                                                                       " +
"             , ITEM_TEMP_SURF \"ITEM_TEMP\"                                                                          " +
"             , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                       " +
"           FROM AG_RWMDTI_NEW A                                                                                    " +
"              , AG_RWMDTD B                                                                                        " +
"              , AG_RWMPT C                                                                                         " +
"          WHERE A.PT_NO = B.PT_NO                                                                                  " +
"            AND A.WMYR = B.WMYR                                                                                    " +
"            AND A.WMOD = B.WMOD                                                                                    " +
"            AND A.WMWK = B.WMWK                                                                                    " +
"            AND A.PT_NO = C.PT_NO                                                                                  " +
"            AND AG_GUBUN = 'L'                                                                                     " +
"            AND SUBSTR(A.PT_NO,5,1) = 'G'                                                                      " +
"            AND WMCYMD <= '2016.03.30'                                                                             " +
"            AND A.PT_NO NOT IN ('2011G26' ,'2011G56','2020G33',  '2011A26' ,'2011A56','2020A33')                   " +
"     UNION ALL                                                                                                     " +
"         SELECT  A.PT_NO \"PT_NO\"                                                                                   " +
"              , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                               " +
"              , ITEM_AVERAGE_CLOA \"ITEM_CLOA\"                                                                      " +
"              , ITEM_TEMP \"ITEM_TEMP\"                                                                              " +
"              , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                      " +
"           FROM AG_RWMDTI_NEW A                                                                                    " +
"               , AG_RWMDTD B                                                                                       " +
"               , AG_RWMPT C                                                                                        " +
"          WHERE A.PT_NO = B.PT_NO                                                                                  " +
"            AND A.PT_NO = C.PT_NO                                                                                  " +
"            AND A.WMYR = B.WMYR                                                                                    " +
"            AND A.WMOD = B.WMOD                                                                                    " +
"            AND A.WMWK = B.WMWK                                                                                    " +
"            AND AG_GUBUN = 'R'                                                                                     " +
"            AND SUBSTR(A.PT_NO,5,1) = 'A'                                                                    " +
"            AND WMCYMD <= '2016.03.30'                                                                             " +
"            AND A.PT_NO NOT IN ('2011G26' ,'2011G56','2020G33',  '2011A26' ,'2011A56','2020A33')                   " +
"      UNION ALL                                                " +
"        SELECT  A.PT_NO \"PT_NO\"                                                                                    " +
"              , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                               " +
"              , ITEM_AVERAGE_CLOA \"ITEM_CLOA\"                                                                      " +
"              , ITEM_TEMP \"ITEM_TEMP\"                                                                              " +
"              , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                      " +
"           FROM AG_RWMDTI_NEW A                                                                                    " +
"               , AG_RWMDTD B                                                                                       " +
"               , AG_RWMPT C                                                                                        " +
"          WHERE A.PT_NO = B.PT_NO                                                                                  " +
"            AND A.PT_NO = C.PT_NO                                                                                  " +
"            AND A.WMYR = B.WMYR                                                                                    " +
"            AND A.WMOD = B.WMOD                                                                                    " +
"            AND A.WMWK = B.WMWK                                                                                    " +
"            AND GUBUN IN ('B', 'S')                                                                            " +
"            AND WMCYMD >= '2016.03.30'                                                                             " +
"            AND A.PT_NO NOT IN ('2011G26' ,'2011G56','2020G33',  '2011A26' ,'2011A56','2020A33')                   " +
"      UNION ALL                                                                                                    " +
"         SELECT A.PT_NO \"PT_NO\"                                                                                    " +
"             , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                                " +
"             , ITEM_SURFACE_CLOA \"ITEM_CLOA\"                                                                       " +
"             , ITEM_TEMP_SURF \"ITEM_TEMP\"                                                                          " +
"             , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                       " +
"           FROM AG_RWMDTI_NEW A                                                                                    " +
"              , AG_RWMDTD B                                                                                        " +
"              , AG_RWMPT C                                                                                         " +
"          WHERE A.PT_NO = B.PT_NO                                                                                  " +
"            AND A.WMYR = B.WMYR                                                                                    " +
"            AND A.WMOD = B.WMOD                                                                                    " +
"            AND A.WMWK = B.WMWK                                                                                    " +
"            AND A.PT_NO = C.PT_NO                                                                                  " +
"            AND GUBUN = 'C'                                                                                    " +
"            AND WMCYMD >= '2016.03.30'                                                                             " +
"            AND A.PT_NO NOT IN ('2011G26' ,'2011G56','2020G33',  '2011A26' ,'2011A56','2020A33')                   " +
"      UNION ALL                                              " +
"      SELECT  A.PT_NO \"PT_NO\"                                                                                      " +
"                  , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                           " +
"                  , ITEM_SURFACE_CLOA \"ITEM_CLOA\"                                                                  " +
"                  , ITEM_TEMP_SURF \"ITEM_TEMP\"                                                                     " +
"                  , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                  " +
"               FROM AG_RWMDTI_NEW A                                                                                " +
"                   , AG_RWMDTD B                                                                                   " +
"                   , AG_RWMPT C                                                                                    " +
"              WHERE A.PT_NO = B.PT_NO                                                                              " +
"                AND A.PT_NO = C.PT_NO                                                                              " +
"                AND A.WMYR = B.WMYR                                                                                " +
"                AND A.WMOD = B.WMOD                                                                                " +
"                AND A.WMWK = B.WMWK                                                                                " +
"                AND SUBSTR(A.PT_NO,5,1) = 'A'                                                                  " +
"                AND WMCYMD <= '2016.01.01'                                                                         " +
"                AND A.PT_NO IN ( '2011A26' ,'2011A56','2020A33')                                                   " +
"      UNION ALL                                                                                                    " +
"      SELECT  A.PT_NO \"PT_NO\"                                                                                      " +
"                  , REPLACE(B.WMCYMD, '.', '') AS WMCYMD                                                           " +
"                  , ITEM_AVERAGE_CLOA \"ITEM_CLOA\"                                                                  " +
"                  , ITEM_TEMP \"ITEM_TEMP\"                                                                          " +
"                  , ITEM_BLUE_GREEN_ALGAE \"ITEM_BLUE_GREEN_ALGAE\"                                                  " +
"               FROM AG_RWMDTI_NEW A                                                                                " +
"                   , AG_RWMDTD B                                                                                   " +
"                   , AG_RWMPT C                                                                                    " +
"              WHERE A.PT_NO = B.PT_NO                                                                              " +
"                AND A.PT_NO = C.PT_NO                                                                              " +
"                AND A.WMYR = B.WMYR                                                                                " +
"                AND A.WMOD = B.WMOD                                                                                " +
"                AND A.WMWK = B.WMWK                                                                                " +
"                AND SUBSTR(A.PT_NO,5,1) = 'G'                                                                  " +
"                AND WMCYMD >= '2016.01.01'                                                                         " +
"                AND A.PT_NO IN ('2011G26' ,'2011G56','2020G33')                                                    " +
"                              )                                                                                    " +
"            ORDER BY 1                                                                                  " +
"                ) AA                                                                                               " +
"     WHERE AA.PT_NO IN (" + siteCodes + ")                                                                          " +
"       AND AA.WMCYMD >= (                                                                                          " +
"         select TO_CHAR(TRUNC(to_date(replace('" + layerDate + "', '-', ''), 'yyyymmdd'), 'IW'), 'YYYYMMDD') AS STARTDT   " +
"         from dual)                                                                                                " +
"       AND AA.WMCYMD<= (                                                                                           " +
"         select TO_CHAR(TRUNC(to_date(replace('" + layerDate + "', '-', ''), 'yyyymmdd'), 'IW') + 6, 'YYYYMMDD') AS ENDDT	" +
"         from dual)                                                                                              	" +
"         ORDER BY 1	";
	
	
		
		sql = sql;
		
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		if(rs.getString("WMCYMD").trim().equals("-")){
			//out.print("ddd");
			String sqlNew = " SELECT A.PT_NO, " +
					" NVL(TO_CHAR(TO_DATE(REPLACE(B.WMCYMD, '.', ''), 'YYYYMMDD'), 'YYYY-MM-DD'), '-') AS WMCYMD, " +
					" NVL(TO_CHAR(A.ITEM_SURFACE_CLOA), '-') AS ITEM_SURFACE_CLOA, " + 
					" NVL(TO_CHAR(A.ITEM_TEMP_SURF), '-') AS ITEM_TEMP_SURF, " + 
					" NVL(TO_CHAR(A.ITEM_BLUE_GREEN_ALGAE), '-') AS ITEM_BLUE_GREEN_ALGAE " + 
					" FROM AG_RWMDTI_NEW_DRONE A, " +
					" AG_RWMDTD_DRONE B " +
					" WHERE A.PT_NO = B.PT_NO " +
					" AND A.WMYR = B.WMYR " +
					" AND A.WMOD = B.WMOD " +
					" AND A.WMWK = B.WMWK  " +
					" and A.PT_NO = '" + rs.getString("PT_NO") + "' " +
					" AND B.WMCYMD = ( " +
					" SELECT MAX(WMCYMD) " +
					" FROM AG_RWMDTD_DRONE " +
					" WHERE PT_NO = '" + rs.getString("PT_NO") + "' " +
					" AND REPLACE(WMCYMD, '.', '') <= ( " +
					" select TO_CHAR(TRUNC(to_date(replace('" + layerDate + "', '-', ''), 'yyyymmdd'), 'IW') + 6, 'YYYYMMDD') AS ENDDT " +
					" from dual) " +
					" ) ";
			//out.print(sqlNew);
			stmtNew = con.createStatement();   
			rsNew = stmtNew.executeQuery(sqlNew);
			while(rsNew.next()) {
				jsonRecord.put("PT_NO" 				, rsNew.getString("PT_NO")); 
		  		jsonRecord.put("WMCYMD" 			, rsNew.getString("WMCYMD"));
		  		jsonRecord.put("ITEM_SURFACE_CLOA" 	, rsNew.getString("ITEM_SURFACE_CLOA"));
		  		jsonRecord.put("ITEM_TEMP_SURF" 			, rsNew.getString("ITEM_TEMP_SURF"));
		  		jsonRecord.put("ITEM_BLUE_GREEN_ALGAE" 		, rsNew.getString("ITEM_BLUE_GREEN_ALGAE"));
			}
		}
		else{
		// 데이터가 없을때 해당 주차 이전의 최근 데이터 가져오기
			
			jsonRecord.put("PT_NO" 				, rs.getString("PT_NO")); 
	  		jsonRecord.put("WMCYMD" 			, rs.getString("WMCYMD"));
	  		jsonRecord.put("ITEM_SURFACE_CLOA" 	, rs.getString("ITEM_SURFACE_CLOA"));
	  		jsonRecord.put("ITEM_TEMP_SURF" 			, rs.getString("ITEM_TEMP_SURF"));
	  		jsonRecord.put("ITEM_BLUE_GREEN_ALGAE" 		, rs.getString("ITEM_BLUE_GREEN_ALGAE"));
		}
  		
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
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