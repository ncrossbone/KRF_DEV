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
	
	Object[] catDid = request.getParameterValues("catDid");
	
	sql = " WITH TBL_PLA_POP_TOTAL AS (																																	                    ";
	sql += "     SELECT YYYY                                                                               ";
	sql += "          , WS_NM                                                                              ";
	sql += "          , MB_NM                                                                              ";
	sql += "          , SB_ID                                                                              ";
	sql += "          , SB_NM                                                                              ";
	sql += "          , CAT_DID                                                                            ";
	sql += "          , ADM_CD                                                                             ";
	sql += "          , DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR                                    ";
	sql += "          , FINAL_PERCENTAGE                                     ";
	sql += "          , AREA_A1                                              ";
	sql += "          , AREA_A2                                              ";
	sql += "          , AREA_SUM                                             ";
	sql += "          , REGION                                               ";
	sql += "          , REGION_DATE                                          ";
	sql += "          , U_A1_TP_CODE                                         ";
	sql += "          , U_A1_TP_DATE                                         ";
	sql += "          , U_A1_TP_NAME                                         ";
	sql += "          , U_A3_TP_CODE                                         ";
	sql += "          , U_A3_TP_DATE                                         ";
	sql += "          , U_A3_TP_NAME                                         ";
	sql += "          , POP_SUM                                              ";
	sql += "          , UPOP_SUM                                             ";
	sql += "          , UPOP_A1_SUM                                          ";
	sql += "          , UPOP_A1_SEPARATE_WT_SUM                              ";
	sql += "          , UPOP_A1_SEPARATE_IT_SUM                              ";
	sql += "          , UPOP_A1_COMBINED_WT_SUM                              ";
	sql += "          , UPOP_A1_COMBINED_IT_SUM                              ";
	sql += "          , UPOP_A2_SUM                                          ";
	sql += "          , UPOP_A2_SANITARY                                     ";
	sql += "          , UPOP_A2_SEPTIC                                       ";
	sql += "          , UPOP_A2_REMOVAL                                      ";
	sql += "          , SPOP_SUM                                             ";
	sql += "          , SPOP_A1_SUM                                          ";
	sql += "          , SPOP_A1_SEPARATE_WT_SUM                              ";
	sql += "          , SPOP_A1_SEPARATE_IT_SUM                              ";
	sql += "          , SPOP_A1_COMBINED_WT_SUM                              ";
	sql += "          , SPOP_A1_COMBINED_IT_SUM                              ";
	sql += "          , SPOP_A2_SUM                                          ";
	sql += "          , SPOP_A2_SANITARY                                     ";
	sql += "          , SPOP_A2_SEPTIC                                       ";
	sql += "          , SPOP_A2_REMOVAL                                      ";
	sql += "       FROM PLA_POP_TOTAL_FOR_CAT                                                                                 ";
	sql += "       WHERE CAT_DID IN (                            ";
	if(catDid.length != 0){
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "     )                                                                                                            ";
	sql += " select YYYY                                                                                          ";
	sql += "      , WS_NM                                                                                           ";
	sql += "      , MB_NM                                                                                           ";
	sql += "      , SB_NM                                                                                         ";
	sql += "      , CAT_DID                                                                                       ";
	sql += "      , AREA_A1                                            ";
	sql += "      , AREA_A2                                            ";
	sql += "      , AREA_SUM                                           ";
	sql += "      , REGION                                             ";
	sql += "      , REGION_DATE                                        ";
	sql += "      , U_A1_TP_CODE                                       ";
	sql += "      , U_A1_TP_DATE                                       ";
	sql += "      , U_A1_TP_NAME                                       ";
	sql += "      , U_A3_TP_CODE                                       ";
	sql += "      , U_A3_TP_DATE                                       ";
	sql += "      , U_A3_TP_NAME                                       ";
	sql += "      , POP_SUM                                            ";
	sql += "      , UPOP_SUM                                           ";
	sql += "      , UPOP_A1_SUM                                        ";
	sql += "      , UPOP_A1_SEPARATE_WT_SUM                            ";
	sql += "      , UPOP_A1_SEPARATE_IT_SUM                            ";
	sql += "      , UPOP_A1_COMBINED_WT_SUM                            ";
	sql += "      , UPOP_A1_COMBINED_IT_SUM                            ";
	sql += "      , UPOP_A2_SUM                                        ";
	sql += "      , UPOP_A2_SANITARY                                   ";
	sql += "      , UPOP_A2_SEPTIC                                     ";
	sql += "      , UPOP_A2_REMOVAL                                    ";
	sql += "      , SPOP_SUM                                           ";
	sql += "      , SPOP_A1_SUM                                        ";
	sql += "      , SPOP_A1_SEPARATE_WT_SUM                            ";
	sql += "      , SPOP_A1_SEPARATE_IT_SUM                            ";
	sql += "      , SPOP_A1_COMBINED_WT_SUM                            ";
	sql += "      , SPOP_A1_COMBINED_IT_SUM                            ";
	sql += "      , SPOP_A2_SUM                                        ";
	sql += "      , SPOP_A2_SANITARY                                   ";
	sql += "      , SPOP_A2_SEPTIC                                     ";
	sql += "      , SPOP_A2_REMOVAL                                    ";
	sql += "   from (                                                                                                         ";
	sql += "         select YYYY                                                                                 ";
	sql += "              , WS_NM                                                                                ";
	sql += "              , MB_NM                                                                                ";
	sql += "              , SB_NM                                                                                ";
	sql += "              , CAT_DID                                                                              ";
	sql += "              , SB_ID                                                                                             ";
	sql += "              , SUM(AREA_A1) AS AREA_A1                                                                           ";
	sql += "              , SUM(AREA_A2) AS AREA_A2                                                                           ";
	sql += "              , SUM(AREA_SUM) AS AREA_SUM                                                                         ";
	sql += "              , '' AS REGION                                                                                      ";
	sql += "              , '' AS REGION_DATE                                                                                 ";
	sql += "              , '' AS U_A1_TP_CODE                                                                                ";
	sql += "              , '' AS U_A1_TP_DATE                                                                                ";
	sql += "              , '' AS U_A1_TP_NAME                                                                                ";
	sql += "              , '' AS U_A3_TP_CODE                                                                                ";
	sql += "              , '' AS U_A3_TP_DATE                                                                                ";
	sql += "              , '' AS U_A3_TP_NAME                                                                                ";
	sql += "              , SUM(POP_SUM) AS POP_SUM                                                                           ";
	sql += "              , SUM(UPOP_SUM) AS UPOP_SUM                                                                         ";
	sql += "              , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                                   ";
	sql += "              , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                                   ";
	sql += "              , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                           ";
	sql += "              , SUM(SPOP_SUM) AS SPOP_SUM                                                                         ";
	sql += "              , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                                   ";
	sql += "              , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                                   ";
	sql += "              , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                           ";
	sql += "           from (                                                                                                 ";
	sql += "                 SELECT YYYY                                                                         ";
	sql += "                      , WS_NM                                                                        ";
	sql += "                      , MB_NM                                                                        ";
	sql += "                      , SB_NM                                                                        ";
	sql += "                      , CAT_DID                                                                      ";
	sql += "                      , ADDR                                                                         ";
	sql += "                      , FINAL_PERCENTAGE                       ";
	sql += "                      , ADM_CD                                 ";
	sql += "                      , SB_ID                                  ";
	sql += "                      , AREA_A1                                ";
	sql += "                      , AREA_A2                                ";
	sql += "                      , AREA_SUM                               ";
	sql += "                      , REGION                                 ";
	sql += "                      , REGION_DATE                            ";
	sql += "                      , U_A1_TP_CODE                           ";
	sql += "                      , U_A1_TP_DATE                           ";
	sql += "                      , U_A1_TP_NAME                           ";
	sql += "                      , U_A3_TP_CODE                           ";
	sql += "                      , U_A3_TP_DATE                           ";
	sql += "                      , U_A3_TP_NAME                           ";
	sql += "                      , POP_SUM                                ";
	sql += "                      , UPOP_SUM                               ";
	sql += "                      , UPOP_A1_SUM                            ";
	sql += "                      , UPOP_A1_SEPARATE_WT_SUM                ";
	sql += "                      , UPOP_A1_SEPARATE_IT_SUM                ";
	sql += "                      , UPOP_A1_COMBINED_WT_SUM                ";
	sql += "                      , UPOP_A1_COMBINED_IT_SUM                ";
	sql += "                      , UPOP_A2_SUM                            ";
	sql += "                      , UPOP_A2_SANITARY                       ";
	sql += "                      , UPOP_A2_SEPTIC                         ";
	sql += "                      , UPOP_A2_REMOVAL                        ";
	sql += "                      , SPOP_SUM                               ";
	sql += "                      , SPOP_A1_SUM                            ";
	sql += "                      , SPOP_A1_SEPARATE_WT_SUM                ";
	sql += "                      , SPOP_A1_SEPARATE_IT_SUM                ";
	sql += "                      , SPOP_A1_COMBINED_WT_SUM                ";
	sql += "                      , SPOP_A1_COMBINED_IT_SUM                ";
	sql += "                      , SPOP_A2_SUM                            ";
	sql += "                      , SPOP_A2_SANITARY                       ";
	sql += "                      , SPOP_A2_SEPTIC                         ";
	sql += "                      , SPOP_A2_REMOVAL                        ";
	sql += "                   FROM TBL_PLA_POP_TOTAL                                                                         ";
	sql += "                )                                                                                                 ";
	sql += "         GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                                                       ";
	sql += "         union                                                                                                    ";
	sql += "         select YYYY                                                                                 ";
	sql += "              , WS_NM                                                                                ";
	sql += "              , MB_NM                                                                                ";
	sql += "              , SB_NM                                                                                ";
	sql += "              , '소계' as CAT_DID                                                                    ";
	sql += "              , SB_ID                                                                                             ";
	sql += "              , SUM(AREA_A1) AS AREA_A1                                                                           ";
	sql += "              , SUM(AREA_A2) AS AREA_A2                                                                           ";
	sql += "              , SUM(AREA_SUM) AS AREA_SUM                                                                         ";
	sql += "              , '' AS REGION                                                                                      ";
	sql += "              , '' AS REGION_DATE                                                                                 ";
	sql += "              , '' AS U_A1_TP_CODE                                                                                ";
	sql += "              , '' AS U_A1_TP_DATE                                                                                ";
	sql += "              , '' AS U_A1_TP_NAME                                                                                ";
	sql += "              , '' AS U_A3_TP_CODE                                                                                ";
	sql += "              , '' AS U_A3_TP_DATE                                                                                ";
	sql += "              , '' AS U_A3_TP_NAME                                                                                ";
	sql += "              , SUM(POP_SUM) AS POP_SUM                                                                           ";
	sql += "              , SUM(UPOP_SUM) AS UPOP_SUM                                                                         ";
	sql += "              , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                                   ";
	sql += "              , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                                   ";
	sql += "              , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                           ";
	sql += "              , SUM(SPOP_SUM) AS SPOP_SUM                                                                         ";
	sql += "              , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                                   ";
	sql += "              , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                                   ";
	sql += "              , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                           ";
	sql += "           from (                                                                                                 ";
	sql += "                 SELECT YYYY                                                                          ";
	sql += "                      , WS_NM                                                                         ";
	sql += "                      , MB_NM                                                                         ";
	sql += "                      , SB_NM                                                                         ";
	sql += "                      , CAT_DID                                                                       ";
	sql += "                      , ADDR                                                                          ";
	sql += "                      , FINAL_PERCENTAGE                       ";
	sql += "                      , ADM_CD                                 ";
	sql += "                      , SB_ID                                  ";
	sql += "                      , AREA_A1                                ";
	sql += "                      , AREA_A2                                ";
	sql += "                      , AREA_SUM                               ";
	sql += "                      , REGION                                 ";
	sql += "                      , REGION_DATE                            ";
	sql += "                      , U_A1_TP_CODE                           ";
	sql += "                      , U_A1_TP_DATE                           ";
	sql += "                      , U_A1_TP_NAME                           ";
	sql += "                      , U_A3_TP_CODE                           ";
	sql += "                      , U_A3_TP_DATE                           ";
	sql += "                      , U_A3_TP_NAME                           ";
	sql += "                      , POP_SUM                                ";
	sql += "                      , UPOP_SUM                               ";
	sql += "                      , UPOP_A1_SUM                            ";
	sql += "                      , UPOP_A1_SEPARATE_WT_SUM                ";
	sql += "                      , UPOP_A1_SEPARATE_IT_SUM                ";
	sql += "                      , UPOP_A1_COMBINED_WT_SUM                ";
	sql += "                      , UPOP_A1_COMBINED_IT_SUM                ";
	sql += "                      , UPOP_A2_SUM                            ";
	sql += "                      , UPOP_A2_SANITARY                       ";
	sql += "                      , UPOP_A2_SEPTIC                         ";
	sql += "                      , UPOP_A2_REMOVAL                        ";
	sql += "                      , SPOP_SUM                               ";
	sql += "                      , SPOP_A1_SUM                            ";
	sql += "                      , SPOP_A1_SEPARATE_WT_SUM                ";
	sql += "                      , SPOP_A1_SEPARATE_IT_SUM                ";
	sql += "                      , SPOP_A1_COMBINED_WT_SUM                ";
	sql += "                      , SPOP_A1_COMBINED_IT_SUM                ";
	sql += "                      , SPOP_A2_SUM                            ";
	sql += "                      , SPOP_A2_SANITARY                       ";
	sql += "                      , SPOP_A2_SEPTIC                         ";
	sql += "                      , SPOP_A2_REMOVAL                        ";
	sql += "                   FROM TBL_PLA_POP_TOTAL                                                                         ";
	sql += "                )                                                                                                 ";
	sql += "         GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID                                                                ";
	sql += "         union                                                                                                    ";
	sql += "         SELECT '' AS YYYY                                                                                        ";
	sql += "              , '' AS WS_NM                                                                                       ";
	sql += "              , '' AS MB_NM                                                                                       ";
	sql += "              , '총계' AS SB_NM                                                                                   ";
	sql += "              , '' AS CAT_DID                                                                                     ";
	sql += "              , '' AS SB_ID                                                                                       ";
	sql += "              , SUM(AREA_A1) AS AREA_A1                                                                           ";
	sql += "              , SUM(AREA_A2) AS AREA_A2                                                                           ";
	sql += "              , SUM(AREA_SUM) AS AREA_SUM                                                                         ";
	sql += "              , '' AS REGION                                                                                      ";
	sql += "              , '' AS REGION_DATE                                                                                 ";
	sql += "              , '' AS U_A1_TP_CODE                                                                                ";
	sql += "              , '' AS U_A1_TP_DATE                                                                                ";
	sql += "              , '' AS U_A1_TP_NAME                                                                                ";
	sql += "              , '' AS U_A3_TP_CODE                                                                                ";
	sql += "              , '' AS U_A3_TP_DATE                                                                                ";
	sql += "              , '' AS U_A3_TP_NAME                                                                                ";
	sql += "              , SUM(POP_SUM) AS POP_SUM                                                                           ";
	sql += "              , SUM(UPOP_SUM) AS UPOP_SUM                                                                         ";
	sql += "              , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                                   ";
	sql += "              , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                                   ";
	sql += "              , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                           ";
	sql += "              , SUM(SPOP_SUM) AS SPOP_SUM                                                                         ";
	sql += "              , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                                   ";
	sql += "              , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                           ";
	sql += "              , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                           ";
	sql += "              , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                                   ";
	sql += "              , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                                         ";
	sql += "              , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                             ";
	sql += "              , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                           ";
	sql += "           FROM TBL_PLA_POP_TOTAL                                                                                 ";
	sql += "        )                                                                                                         ";
	sql += "        where CAT_DID IN (                                ";
	
	sql += "  ORDER BY DECODE(SB_NM,'총계',1,2), SB_ID, DECODE(CAT_DID,'소계',1,2), CAT_DID                                  ";

    
System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("WS_NM",rs.getString("WS_NM"));
		jsonRecord.put("MB_NM",rs.getString("MB_NM"));
		jsonRecord.put("SB_NM",rs.getString("SB_NM"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("AREA_A1",rs.getString("AREA_A1"));
		jsonRecord.put("AREA_A2",rs.getString("AREA_A2"));
		jsonRecord.put("AREA_SUM",rs.getString("AREA_SUM"));
		jsonRecord.put("REGION",rs.getString("REGION"));
		jsonRecord.put("REGION_DATE",rs.getString("REGION_DATE"));
		jsonRecord.put("U_A1_TP_CODE",rs.getString("U_A1_TP_CODE"));
		jsonRecord.put("U_A1_TP_DATE",rs.getString("U_A1_TP_DATE"));
		jsonRecord.put("U_A1_TP_NAME",rs.getString("U_A1_TP_NAME"));
		jsonRecord.put("U_A3_TP_CODE",rs.getString("U_A3_TP_CODE"));
		jsonRecord.put("U_A3_TP_DATE",rs.getString("U_A3_TP_DATE"));
		jsonRecord.put("U_A3_TP_NAME",rs.getString("U_A3_TP_NAME"));
		jsonRecord.put("POP_SUM",rs.getString("POP_SUM"));
		jsonRecord.put("UPOP_SUM",rs.getString("UPOP_SUM"));
		jsonRecord.put("UPOP_A1_SUM",rs.getString("UPOP_A1_SUM"));
		jsonRecord.put("UPOP_A1_SEPARATE_WT_SUM",rs.getString("UPOP_A1_SEPARATE_WT_SUM"));
		jsonRecord.put("UPOP_A1_SEPARATE_IT_SUM",rs.getString("UPOP_A1_SEPARATE_IT_SUM"));
		jsonRecord.put("UPOP_A1_COMBINED_WT_SUM",rs.getString("UPOP_A1_COMBINED_WT_SUM"));
		jsonRecord.put("UPOP_A1_COMBINED_IT_SUM",rs.getString("UPOP_A1_COMBINED_IT_SUM"));
		jsonRecord.put("UPOP_A2_SUM",rs.getString("UPOP_A2_SUM"));
		jsonRecord.put("UPOP_A2_SANITARY",rs.getString("UPOP_A2_SANITARY"));
		jsonRecord.put("UPOP_A2_SEPTIC",rs.getString("UPOP_A2_SEPTIC"));
		jsonRecord.put("UPOP_A2_REMOVAL",rs.getString("UPOP_A2_REMOVAL"));
		jsonRecord.put("SPOP_SUM",rs.getString("SPOP_SUM"));
		jsonRecord.put("SPOP_A1_SUM",rs.getString("SPOP_A1_SUM"));
		jsonRecord.put("SPOP_A1_SEPARATE_WT_SUM",rs.getString("SPOP_A1_SEPARATE_WT_SUM"));
		jsonRecord.put("SPOP_A1_SEPARATE_IT_SUM",rs.getString("SPOP_A1_SEPARATE_IT_SUM"));
		jsonRecord.put("SPOP_A1_COMBINED_WT_SUM",rs.getString("SPOP_A1_COMBINED_WT_SUM"));
		jsonRecord.put("SPOP_A1_COMBINED_IT_SUM",rs.getString("SPOP_A1_COMBINED_IT_SUM"));
		jsonRecord.put("SPOP_A2_SUM",rs.getString("SPOP_A2_SUM"));
		jsonRecord.put("SPOP_A2_SANITARY",rs.getString("SPOP_A2_SANITARY"));
		jsonRecord.put("SPOP_A2_SEPTIC",rs.getString("SPOP_A2_SEPTIC"));
		jsonRecord.put("SPOP_A2_REMOVAL",rs.getString("SPOP_A2_REMOVAL"));
		
		
		jsonArr.add(jsonRecord);
		
	}
	
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