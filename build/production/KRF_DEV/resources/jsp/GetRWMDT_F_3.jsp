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
	sql += "  (SELECT * FROM ( SELECT RN                                                                                                    ";
	sql += "      , FACI_NM  /* ó���ü��� */                                                                               ";
	sql += "      , A.WORK_DT  /* ����� */                                                                               ";
	sql += "      , '���Ա���ȣ : '||A.PIPE_NUM AS PIPE_NUM /* ���Ա���ȣ */ ,                                               ";
	sql += "  		TO_NUMBER(AMT ) AS ITEM_AMT /* ����(��/��) */ ,								";
	sql += "      TO_NUMBER(BOD ) AS ITEM_BOD /* BOD(��/��) */ ,                ";
	sql += "      TO_NUMBER(COD ) AS ITEM_COD /* COD(��/��) */ ,                ";
	sql += "      TO_NUMBER(SS  ) AS ITEM_SS /* SS(��/��) */ ,                  ";
	sql += "      TO_NUMBER(TN  ) AS ITEM_TN /* TN(��/��) */ ,                  ";
	sql += "      TO_NUMBER(TP  ) AS ITEM_TP /* TP(��/��) */ ,                  ";
	sql += "      TO_NUMBER(COLI) AS ITEM_COLI /* ����ձ���(�Ѵ���ձ���) */   ";
	sql += "   FROM (SELECT RANK() OVER(PARTITION BY FACI_CD, PIPE_NUM ORDER BY FACI_CD, PIPE_NUM, WORK_DT DESC) AS RN,     ";
	sql += "                TT.ADM_CD,                                                                                      ";
	sql += "                T.YYYY,                                                                                         ";
	sql += "                FACI_CD,                                                                                        ";
	sql += "                FACI_NM,                                                                                        ";
	sql += "                WORK_DT,                                                                                        ";
	sql += "                PIPE_NUM,                                                                                       ";
	sql += "                AMT,                                                                                            ";
	sql += "                BOD,                                                                                            ";
	sql += "                COD,                                                                                            ";
	sql += "                SS,                                                                                             ";
	sql += "                TN,                                                                                             ";
	sql += "                TP,                                                                                             ";
	sql += "                COLI                                                                                            ";
	sql += "           FROM VPLA_FACI_IN_TOTAL T ,                                                                          ";
	sql += "                COM_DISTRICT_RAW TT,                                                                            ";
	sql += "                KESTI_WATER_ALL_MAP C                                                                           ";
	sql += "          WHERE T.ADM_CD = C.ADM_CD                                                                             ";
	sql += "            AND T.ADM_CD = TT.ADM_CD                                                                            ";
	sql += "        ) A                                                                                                     ";
	sql += "      , (                                                                                                       ";
	sql += "         SELECT FACI_CD, WORK_DT, MIN(PIPE_NUM) AS PIPE_NUM                                                     ";
	sql += "           FROM VPLA_FACI_IN_TOTAL                                                                              ";
	sql += "          GROUP BY FACI_CD, WORK_DT                                                                             ";
	sql += "        ) B                                                                                                     ";
	sql += "  WHERE A.FACI_CD = B.FACI_CD                                                                                   ";
	sql += "    AND A.PIPE_NUM = B.PIPE_NUM                                                                                   ";
	sql += "    AND A.WORK_DT = B.WORK_DT                                                                                   ";
	sql += "    AND A.FACI_CD = '"+recordId+"'                                                                      ";
	if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '201301' AND '201312'              ";
	}else{
		sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '"+ac+"' AND '"+bd+"'              ";
	}
	sql += "  ) WHERE RN <= 10                                                                                                 ";
	sql += "  ORDER BY FACI_NM, PIPE_NUM, WORK_DT ASC)                                                                     ";
	sql += "     SELECT *                                                                                                   ";
	if(defaultChart.equals("1")){
		sql += " FROM (SELECT *                                                                                                 ";
		sql += "         FROM TMP_TBL                                                                                           ";
		sql += "        WHERE RN <= 10                                                                                          ";
		sql += "            ORDER BY WORK_DT                                                                                    ";
		sql += "      )                                                                                                         ";
	}else{
		sql += "         FROM TMP_TBL                                                                                           ";
	}

	sql += "  UNION ALL                                                                                                   ";
	sql += "  SELECT 9999999999 AS RN, '','','',                                    ";                 
	sql += " 	TO_NUMBER(MAX(ITEM_AMT)  + MAX(ITEM_AMT)  / 10),		";
	sql += "   TO_NUMBER(MAX(ITEM_BOD)  + MAX(ITEM_BOD)  / 10),   ";
	sql += "   TO_NUMBER(MAX(ITEM_COD)  + MAX(ITEM_COD)  / 10),   ";
	sql += "   TO_NUMBER(MAX(ITEM_SS)   + MAX(ITEM_SS)   / 10),   ";
	sql += "   TO_NUMBER(MAX(ITEM_TN)   + MAX(ITEM_TN)   / 10),   ";
	sql += "   TO_NUMBER(MAX(ITEM_TP)   + MAX(ITEM_TP)   / 10),   ";
	sql += "   TO_NUMBER(MAX(ITEM_COLI) + MAX(ITEM_COLI) / 10)    ";                                                
	sql += "    FROM TMP_TBL                                                                                              ";                                                                                                                                                       
                             


		
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
  		
  		if(rs.getString("RN").equals("9999999999"))
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