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
	String WS_CD = request.getParameter("WS_CD");
	String AM_CD = request.getParameter("AM_CD");
	String AS_CD = request.getParameter("AS_CD");
	
	String ADM_CD = request.getParameter("ADM_CD");
	
	String startYear = request.getParameter("startYear");
	String startMonth = request.getParameter("startMonth");
	String endYear = request.getParameter("endYear");
	String endMonth = request.getParameter("endMonth");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	
	//out.print(withSql);
	
	sql = " WITH TMP AS ( " +
			"SELECT RANK() OVER(PARTITION BY A.PT_NO ORDER BY C.WMCYMD DESC, C.WMWK DESC) RN /* ���� */ " +
		     ", A.PT_NO /* �����ڵ� */, A.PT_NM /* ������ */, C.WMCYMD /* �������� */ " +
			 ", B.WMYR /* �� */, B.WMOD /* �� */ " +
		     ", C.WMWK /* ȸ�� */ " +
		     ", B.ITEM_BOD /* BOD */ " +
		     ", B.ITEM_DOC /* DO */ " +
		     ", B.ITEM_COD /* COD */ " +
		     ", B.ITEM_TN /* T-N */ " +
		     ", B.ITEM_TP /* T-P */ " +
		     ", B.ITEM_TEMP /* ���� */ " +
		     ", B.ITEM_PH /* pH */ " +
		     ", B.ITEM_SS /* SS */ " +
		     ", B.ITEM_CLOA /* Ŭ�η���a */ " +
		     ", A.ADMCODE /* �������ڵ� */ " +
		  "FROM RWMPT A " +
		     ", RWMDTI B " +
		     ", RWMDTD C " +
		 "WHERE A.PT_NO = B.PT_NO " +
		   "AND A.PT_NO = C.PT_NO " +
		   "AND B.WMYR  = C.WMYR " +
		   "AND B.WMOD  = C.WMOD " +
		   "AND B.WMWK  = C.WMWK " +
		   "AND C.WMCYMD IS NOT NULL " +
		") " +

		"SELECT A.RN, A.PT_NO, A.PT_NM, A.WMCYMD, A.WMYR, A.WMOD, A.WMWK " +
		     ", A.ITEM_BOD AS CURR_BOD, B.ITEM_BOD AS CHART_BOD " +
		     ", A.ITEM_DOC AS CURR_DO, B.ITEM_DOC AS CHART_DO " +
		     ", A.ITEM_COD AS CURR_COD, B.ITEM_COD AS CHART_COD " +
		     ", A.ITEM_TN AS CURR_TN, B.ITEM_TN AS CHART_TN " +
		     ", A.ITEM_TP AS CURR_TP, B.ITEM_TP AS CHART_TP " +
		     ", A.ITEM_TEMP AS CURR_TEMP, B.ITEM_TEMP AS CHART_TEMP " +
		     ", A.ITEM_PH AS CURR_PH, B.ITEM_PH AS CHART_PH " +
		     ", A.ITEM_SS AS CURR_SS, B.ITEM_SS AS CHART_SS " +
		     ", A.ITEM_CLOA AS CURR_CLOA, B.ITEM_CLOA AS CHART_CLOA " +
		  "FROM TMP A " +
		     ", TMP B " +
		     ", KESTI_WATER_ALL_MAP C " +
		 "WHERE A.PT_NO = B.PT_NO " +
		   "AND A.ADMCODE = B.ADMCODE " +
		   "AND B.RN BETWEEN A.RN + 1 AND A.RN + 5 " +
		   "AND SUBSTR(A.ADMCODE, 1, 10) = C.ADM_CD(+) ";
		   
	if(startYYYYMM != ""){
		sql += "AND A.WMYR || A.WMOD >= '" + startYYYYMM + "' ";
	}
	if(endYYYYMM != ""){
		sql += "AND A.WMYR || A.WMOD <= '" + endYYYYMM + "' ";
	}
	if(WS_CD != ""){
		sql += "AND C.WS_CD = '" + WS_CD + "' /* ��ǿ� */ ";
	}
	if(AM_CD != ""){
		sql += "AND C.AM_CD = '" + AM_CD + "' /* �߱ǿ� */ ";
	}
	if(AS_CD != ""){
		sql += "AND C.AS_CD = '" + AS_CD + "' /* �ұǿ� */ ";
	}
	if(ADM_CD != ""){
		sql += "AND C.ADM_CD LIKE '" + ADM_CD + "%' ";
	}
		//sql += "AND C.ADM_CD LIKE '42%' /* ������ */ " +
		   //"AND C.ADM_CD LIKE '42110%' /* ��õ�� */ " +
		   //"AND C.ADM_CD LIKE '42110124%' /* ���絿 */ " +
		   //"AND A.PT_NM LIKE '����%' " +
		 sql += " ORDER BY A.PT_NO, A.RN, B.RN DESC ";
		
   //out.print(sql);
   
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	
	String PT_NO = "";
	String PT_NM = "";
	String WMCYMD = "";
	String WMYR = "";
	String WMOD = "";
	String WMWK = "";
	String CURR_BOD = "";
	JSONArray CHART_BOD = new JSONArray();
	String CURR_DO = "";
	JSONArray CHART_DO = new JSONArray();
	String CURR_COD = "";
	JSONArray CHART_COD = new JSONArray();
	String CURR_TN = "";
	JSONArray CHART_TN = new JSONArray();
	String CURR_TP = "";
	JSONArray CHART_TP = new JSONArray();
	String CURR_TEMP = "";
	JSONArray CHART_TEMP = new JSONArray();
	String CURR_PH = "";
	JSONArray CHART_PH = new JSONArray();
	String CURR_SS = "";
	JSONArray CHART_SS = new JSONArray();
	String CURR_CLOA = "";
	JSONArray CHART_CLOA = new JSONArray();
	
	while(rs.next()) {
		
		if(!preSeq.equals("") && !preSeq.equals(rs.getString("RN"))){
			
			//System.out.println(preSite + preDate);
			jsonRecord = new JSONObject();
	
			jsonRecord.put("PT_NO", PT_NO);
	  		jsonRecord.put("PT_NM", PT_NM);
	  		jsonRecord.put("WMCYMD", WMCYMD);
	  		jsonRecord.put("WMYR", WMYR);
	  		jsonRecord.put("WMOD", WMOD);
	  		jsonRecord.put("WMWK", WMWK);
	  		jsonRecord.put("CURR_BOD", CURR_BOD);
	  		jsonRecord.put("CHART_BOD", CHART_BOD);
	  		jsonRecord.put("CURR_DO", CURR_DO);
	  		jsonRecord.put("CHART_DO", CHART_DO);
	  		jsonRecord.put("CURR_COD", CURR_COD);
	  		jsonRecord.put("CHART_COD", CHART_COD);
	  		jsonRecord.put("CURR_TN", CURR_TN);
	  		jsonRecord.put("CHART_TN", CHART_TN);
	  		jsonRecord.put("CURR_TP", CURR_TP);
	  		jsonRecord.put("CHART_TP", CHART_TP);
	  		jsonRecord.put("CURR_TEMP", CURR_TEMP);
	  		jsonRecord.put("CHART_TEMP", CHART_TEMP);
	  		jsonRecord.put("CURR_PH", CURR_PH);
	  		jsonRecord.put("CHART_PH", CHART_PH); 
	  		jsonRecord.put("CURR_SS", CURR_SS);
	  		jsonRecord.put("CHART_SS", CHART_SS);
	  		jsonRecord.put("CURR_CLOA", CURR_CLOA);
	  		jsonRecord.put("CHART_CLOA", CHART_CLOA);
	  	
	  		jsonArr.add(jsonRecord);
	  		
	  		CHART_BOD = new JSONArray();
	  		CHART_DO = new JSONArray();
	  		CHART_COD = new JSONArray();
	  		CHART_TN = new JSONArray();
	  		CHART_TP = new JSONArray();
	  		CHART_TEMP = new JSONArray();
	  		CHART_PH = new JSONArray();
	  		CHART_SS = new JSONArray();
	  		CHART_CLOA = new JSONArray();
		}
		else{
			PT_NO = rs.getString("PT_NO");
			PT_NM = rs.getString("PT_NM");
			WMCYMD = rs.getString("WMCYMD");
			WMYR = rs.getString("WMYR");
			WMOD = rs.getString("WMOD");
			WMWK = rs.getString("WMWK");
			CURR_BOD = rs.getString("CURR_BOD");
			CHART_BOD.add(rs.getString("CHART_BOD"));
			CURR_DO = rs.getString("CURR_DO");
	  		CHART_DO.add(rs.getString("CHART_DO"));
	  		CURR_COD = rs.getString("CURR_COD");
	  		CHART_COD.add(rs.getString("CHART_COD"));
	  		CURR_TN = rs.getString("CURR_TN");
	  		CHART_TN.add(rs.getString("CHART_TN"));
	  		CURR_TP = rs.getString("CURR_TP");
	  		CHART_TP.add(rs.getString("CHART_TP"));
	  		CURR_TEMP = rs.getString("CURR_TEMP");
	  		CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		CURR_PH = rs.getString("CURR_PH");
	  		CHART_PH.add(rs.getString("CHART_PH")); 
	  		CURR_SS = rs.getString("CURR_SS");
	  		CHART_SS.add(rs.getString("CHART_SS"));
	  		CURR_CLOA = rs.getString("CURR_CLOA");
	  		CHART_CLOA.add(rs.getString("CHART_CLOA"));
			
			//System.out.println(String.format("%04.2f", 0.40));
		}
		
		if(!preSeq.equals(rs.getString("RN")))
			preSeq = rs.getString("RN");
  		
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