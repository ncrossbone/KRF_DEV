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
	
	
		
		sql  = " SELECT 								";
		sql  += " ORDER BY YYYY DESC                                                                                ";
		
	
	
		
   //out.print(sql);
   System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("ADM_CD",rs.getString("ADM_CD"));
		jsonRecord.put("DO_NM",rs.getString("DO_NM"));
		jsonRecord.put("CTY_NM",rs.getString("CTY_NM"));
		jsonRecord.put("DONG_NM",rs.getString("DONG_NM"));
		jsonRecord.put("RI_NM",rs.getString("RI_NM"));
		jsonRecord.put("GNR_FLOW_SUM",rs.getString("GNR_FLOW_SUM"));
		jsonRecord.put("GNR_FLOW_POP",rs.getString("GNR_FLOW_POP"));
		jsonRecord.put("GNR_FLOW_ANI",rs.getString("GNR_FLOW_ANI"));
		jsonRecord.put("GNR_FLOW_IND",rs.getString("GNR_FLOW_IND"));
		jsonRecord.put("GNR_FLOW_LAND",rs.getString("GNR_FLOW_LAND"));
		jsonRecord.put("GNR_FLOW_FISH",rs.getString("GNR_FLOW_FISH"));
		jsonRecord.put("GNR_FLOW_LANDFILL",rs.getString("GNR_FLOW_LANDFILL"));
		jsonRecord.put("GNR_BOD_POP",rs.getString("GNR_BOD_POP"));
		jsonRecord.put("GNR_BOD_ANI",rs.getString("GNR_BOD_ANI"));
		jsonRecord.put("GNR_BOD_IND",rs.getString("GNR_BOD_IND"));
		jsonRecord.put("GNR_BOD_LAND",rs.getString("GNR_BOD_LAND"));
		jsonRecord.put("GNR_BOD_FISH",rs.getString("GNR_BOD_FISH"));
		jsonRecord.put("GNR_BOD_LANDFILL",rs.getString("GNR_BOD_LANDFILL"));
		jsonRecord.put("GNR_TN_POP",rs.getString("GNR_TN_POP"));
		jsonRecord.put("GNR_TN_ANI",rs.getString("GNR_TN_ANI"));
		jsonRecord.put("GNR_TN_IND",rs.getString("GNR_TN_IND"));
		jsonRecord.put("GNR_TN_LAND",rs.getString("GNR_TN_LAND"));
		jsonRecord.put("GNR_TN_FISH",rs.getString("GNR_TN_FISH"));
		jsonRecord.put("GNR_TN_LANDFILL",rs.getString("GNR_TN_LANDFILL"));
		jsonRecord.put("GNR_TP_POP",rs.getString("GNR_TP_POP"));
		jsonRecord.put("GNR_TP_ANI",rs.getString("GNR_TP_ANI"));
		jsonRecord.put("GNR_TP_IND",rs.getString("GNR_TP_IND"));
		jsonRecord.put("GNR_TP_LAND",rs.getString("GNR_TP_LAND"));
		jsonRecord.put("GNR_TP_FISH",rs.getString("GNR_TP_FISH"));
		jsonRecord.put("GNR_TP_LANDFILL",rs.getString("GNR_TP_LANDFILL"));
		jsonRecord.put("DRT_FLOW_SUM",rs.getString("DRT_FLOW_SUM"));
		jsonRecord.put("DRT_FLOW_POP",rs.getString("DRT_FLOW_POP"));
		jsonRecord.put("DRT_FLOW_ANI",rs.getString("DRT_FLOW_ANI"));
		jsonRecord.put("DRT_FLOW_IND",rs.getString("DRT_FLOW_IND"));
		jsonRecord.put("DRT_FLOW_LAND",rs.getString("DRT_FLOW_LAND"));
		jsonRecord.put("DRT_FLOW_FISH",rs.getString("DRT_FLOW_FISH"));
		jsonRecord.put("DRT_FLOW_LANDFILL",rs.getString("DRT_FLOW_LANDFILL"));
		jsonRecord.put("DRT_BOD_SUM",rs.getString("DRT_BOD_SUM"));
		jsonRecord.put("DRT_BOD_POP",rs.getString("DRT_BOD_POP"));
		jsonRecord.put("DRT_BOD_ANI",rs.getString("DRT_BOD_ANI"));
		jsonRecord.put("DRT_BOD_IND",rs.getString("DRT_BOD_IND"));
		jsonRecord.put("DRT_BOD_LAND",rs.getString("DRT_BOD_LAND"));
		jsonRecord.put("DRT_BOD_FISH",rs.getString("DRT_BOD_FISH"));
		jsonRecord.put("DRT_BOD_LANDFILL",rs.getString("DRT_BOD_LANDFILL"));
		jsonRecord.put("DRT_TN_SUM",rs.getString("DRT_TN_SUM"));
		jsonRecord.put("DRT_TN_POP",rs.getString("DRT_TN_POP"));
		jsonRecord.put("DRT_TN_ANI",rs.getString("DRT_TN_ANI"));
		jsonRecord.put("DRT_TN_IND",rs.getString("DRT_TN_IND"));
		jsonRecord.put("DRT_TN_LAND",rs.getString("DRT_TN_LAND"));
		jsonRecord.put("DRT_TN_FISH",rs.getString("DRT_TN_FISH"));
		jsonRecord.put("DRT_TN_LANDFILL",rs.getString("DRT_TN_LANDFILL"));
		jsonRecord.put("DRT_TP_SUM",rs.getString("DRT_TP_SUM"));
		jsonRecord.put("DRT_TP_POP",rs.getString("DRT_TP_POP"));
		jsonRecord.put("DRT_TP_ANI",rs.getString("DRT_TP_ANI"));
		jsonRecord.put("DRT_TP_IND",rs.getString("DRT_TP_IND"));
		jsonRecord.put("DRT_TP_LAND",rs.getString("DRT_TP_LAND"));
		jsonRecord.put("DRT_TP_FISH",rs.getString("DRT_TP_FISH"));
		jsonRecord.put("DRT_TP_LANDFILL",rs.getString("DRT_TP_LANDFILL"));
		jsonRecord.put("IND_CUT_FLOW_SUM",rs.getString("IND_CUT_FLOW_SUM"));
		jsonRecord.put("IND_CUT_FLOW_POP",rs.getString("IND_CUT_FLOW_POP"));
		jsonRecord.put("IND_CUT_FLOW_ANI",rs.getString("IND_CUT_FLOW_ANI"));
		jsonRecord.put("IND_CUT_FLOW_IND",rs.getString("IND_CUT_FLOW_IND"));
		jsonRecord.put("IND_CUT_FLOW_LAND",rs.getString("IND_CUT_FLOW_LAND"));
		jsonRecord.put("IND_CUT_FLOW_FISH",rs.getString("IND_CUT_FLOW_FISH"));
		jsonRecord.put("IND_CUT_FLOW_LANDFILL",rs.getString("IND_CUT_FLOW_LANDFILL"));
		jsonRecord.put("IND_CUT_BOD_SUM",rs.getString("IND_CUT_BOD_SUM"));
		jsonRecord.put("IND_CUT_BOD_POP",rs.getString("IND_CUT_BOD_POP"));
		jsonRecord.put("IND_CUT_BOD_ANI",rs.getString("IND_CUT_BOD_ANI"));
		jsonRecord.put("IND_CUT_BOD_IND",rs.getString("IND_CUT_BOD_IND"));
		jsonRecord.put("IND_CUT_BOD_LAND",rs.getString("IND_CUT_BOD_LAND"));
		jsonRecord.put("IND_CUT_BOD_FISH",rs.getString("IND_CUT_BOD_FISH"));
		jsonRecord.put("IND_CUT_BOD_LANDFILL",rs.getString("IND_CUT_BOD_LANDFILL"));
		jsonRecord.put("IND_CUT_TN_SUM",rs.getString("IND_CUT_TN_SUM"));
		jsonRecord.put("IND_CUT_TN_POP",rs.getString("IND_CUT_TN_POP"));
		jsonRecord.put("IND_CUT_TN_ANI",rs.getString("IND_CUT_TN_ANI"));
		jsonRecord.put("IND_CUT_TN_IND",rs.getString("IND_CUT_TN_IND"));
		jsonRecord.put("IND_CUT_TN_LAND",rs.getString("IND_CUT_TN_LAND"));
		jsonRecord.put("IND_CUT_TN_FISH",rs.getString("IND_CUT_TN_FISH"));
		jsonRecord.put("IND_CUT_TN_LANDFILL",rs.getString("IND_CUT_TN_LANDFILL"));
		jsonRecord.put("IND_CUT_TP_SUM",rs.getString("IND_CUT_TP_SUM"));
		jsonRecord.put("IND_CUT_TP_POP",rs.getString("IND_CUT_TP_POP"));
		jsonRecord.put("IND_CUT_TP_ANI",rs.getString("IND_CUT_TP_ANI"));
		jsonRecord.put("IND_CUT_TP_IND",rs.getString("IND_CUT_TP_IND"));
		jsonRecord.put("IND_CUT_TP_LAND",rs.getString("IND_CUT_TP_LAND"));
		jsonRecord.put("IND_CUT_TP_FISH",rs.getString("IND_CUT_TP_FISH"));
		jsonRecord.put("IND_CUT_TP_LANDFILL",rs.getString("IND_CUT_TP_LANDFILL"));
		jsonRecord.put("PIT_IN_FLOW_SUM",rs.getString("PIT_IN_FLOW_SUM"));
		jsonRecord.put("PIT_IN_FLOW_POP",rs.getString("PIT_IN_FLOW_POP"));
		jsonRecord.put("PIT_IN_FLOW_ANI",rs.getString("PIT_IN_FLOW_ANI"));
		jsonRecord.put("PIT_IN_FLOW_IND",rs.getString("PIT_IN_FLOW_IND"));
		jsonRecord.put("PIT_IN_FLOW_LAND",rs.getString("PIT_IN_FLOW_LAND"));
		jsonRecord.put("PIT_IN_FLOW_FISH",rs.getString("PIT_IN_FLOW_FISH"));
		jsonRecord.put("PIT_IN_FLOW_LANDFILL",rs.getString("PIT_IN_FLOW_LANDFILL"));
		jsonRecord.put("PIT_IN_BOD_SUM",rs.getString("PIT_IN_BOD_SUM"));
		jsonRecord.put("PIT_IN_BOD_POP",rs.getString("PIT_IN_BOD_POP"));
		jsonRecord.put("PIT_IN_BOD_ANI",rs.getString("PIT_IN_BOD_ANI"));
		jsonRecord.put("PIT_IN_BOD_IND",rs.getString("PIT_IN_BOD_IND"));
		jsonRecord.put("PIT_IN_BOD_LAND",rs.getString("PIT_IN_BOD_LAND"));
		jsonRecord.put("PIT_IN_BOD_FISH",rs.getString("PIT_IN_BOD_FISH"));
		jsonRecord.put("PIT_IN_BOD_LANDFILL",rs.getString("PIT_IN_BOD_LANDFILL"));
		jsonRecord.put("PIT_IN_TN_SUM",rs.getString("PIT_IN_TN_SUM"));
		jsonRecord.put("PIT_IN_TN_POP",rs.getString("PIT_IN_TN_POP"));
		jsonRecord.put("PIT_IN_TN_ANI",rs.getString("PIT_IN_TN_ANI"));
		jsonRecord.put("PIT_IN_TN_IND",rs.getString("PIT_IN_TN_IND"));
		jsonRecord.put("PIT_IN_TN_LAND",rs.getString("PIT_IN_TN_LAND"));
		jsonRecord.put("PIT_IN_TN_FISH",rs.getString("PIT_IN_TN_FISH"));
		jsonRecord.put("PIT_IN_TN_LANDFILL",rs.getString("PIT_IN_TN_LANDFILL"));
		jsonRecord.put("PIT_IN_TP_SUM",rs.getString("PIT_IN_TP_SUM"));
		jsonRecord.put("PIT_IN_TP_POP",rs.getString("PIT_IN_TP_POP"));
		jsonRecord.put("PIT_IN_TP_ANI",rs.getString("PIT_IN_TP_ANI"));
		jsonRecord.put("PIT_IN_TP_IND",rs.getString("PIT_IN_TP_IND"));
		jsonRecord.put("PIT_IN_TP_LAND",rs.getString("PIT_IN_TP_LAND"));
		jsonRecord.put("PIT_IN_TP_FISH",rs.getString("PIT_IN_TP_FISH"));
		jsonRecord.put("PIT_IN_TP_LANDFILL",rs.getString("PIT_IN_TP_LANDFILL"));
		jsonRecord.put("IND_OUT_FLOW_POP",rs.getString("IND_OUT_FLOW_POP"));
		jsonRecord.put("IND_OUT_FLOW_ANI",rs.getString("IND_OUT_FLOW_ANI"));
		jsonRecord.put("IND_OUT_FLOW_IND",rs.getString("IND_OUT_FLOW_IND"));
		jsonRecord.put("IND_OUT_FLOW_LAND",rs.getString("IND_OUT_FLOW_LAND"));
		jsonRecord.put("IND_OUT_FLOW_FISH",rs.getString("IND_OUT_FLOW_FISH"));
		jsonRecord.put("IND_OUT_FLOW_LANDFILL",rs.getString("IND_OUT_FLOW_LANDFILL"));
		jsonRecord.put("IND_OUT_BOD_POP",rs.getString("IND_OUT_BOD_POP"));
		jsonRecord.put("IND_OUT_BOD_ANI",rs.getString("IND_OUT_BOD_ANI"));
		jsonRecord.put("IND_OUT_BOD_IND",rs.getString("IND_OUT_BOD_IND"));
		jsonRecord.put("IND_OUT_BOD_LAND",rs.getString("IND_OUT_BOD_LAND"));
		jsonRecord.put("IND_OUT_BOD_FISH",rs.getString("IND_OUT_BOD_FISH"));
		jsonRecord.put("IND_OUT_BOD_LANDFILL",rs.getString("IND_OUT_BOD_LANDFILL"));
		jsonRecord.put("IND_OUT_TN_POP",rs.getString("IND_OUT_TN_POP"));
		jsonRecord.put("IND_OUT_TN_ANI",rs.getString("IND_OUT_TN_ANI"));
		jsonRecord.put("IND_OUT_TN_IND",rs.getString("IND_OUT_TN_IND"));
		jsonRecord.put("IND_OUT_TN_LAND",rs.getString("IND_OUT_TN_LAND"));
		jsonRecord.put("IND_OUT_TN_FISH",rs.getString("IND_OUT_TN_FISH"));
		jsonRecord.put("IND_OUT_TN_LANDFILL",rs.getString("IND_OUT_TN_LANDFILL"));
		jsonRecord.put("IND_OUT_TP_POP",rs.getString("IND_OUT_TP_POP"));
		jsonRecord.put("IND_OUT_TP_ANI",rs.getString("IND_OUT_TP_ANI"));
		jsonRecord.put("IND_OUT_TP_IND",rs.getString("IND_OUT_TP_IND"));
		jsonRecord.put("IND_OUT_TP_LAND",rs.getString("IND_OUT_TP_LAND"));
		jsonRecord.put("IND_OUT_TP_FISH",rs.getString("IND_OUT_TP_FISH"));
		jsonRecord.put("IND_OUT_TP_LANDFILL",rs.getString("IND_OUT_TP_LANDFILL"));
		jsonRecord.put("PIT_OUT_FLOW_SUM",rs.getString("PIT_OUT_FLOW_SUM"));
		jsonRecord.put("PIT_OUT_FLOW_POP",rs.getString("PIT_OUT_FLOW_POP"));
		jsonRecord.put("PIT_OUT_FLOW_ANI",rs.getString("PIT_OUT_FLOW_ANI"));
		jsonRecord.put("PIT_OUT_FLOW_IND",rs.getString("PIT_OUT_FLOW_IND"));
		jsonRecord.put("PIT_OUT_FLOW_LAND",rs.getString("PIT_OUT_FLOW_LAND"));
		jsonRecord.put("PIT_OUT_FLOW_FISH",rs.getString("PIT_OUT_FLOW_FISH"));
		jsonRecord.put("PIT_OUT_FLOW_LANDFILL",rs.getString("PIT_OUT_FLOW_LANDFILL"));
		jsonRecord.put("PIT_OUT_BOD_SUM",rs.getString("PIT_OUT_BOD_SUM"));
		jsonRecord.put("PIT_OUT_BOD_POP",rs.getString("PIT_OUT_BOD_POP"));
		jsonRecord.put("PIT_OUT_BOD_ANI",rs.getString("PIT_OUT_BOD_ANI"));
		jsonRecord.put("PIT_OUT_BOD_IND",rs.getString("PIT_OUT_BOD_IND"));
		jsonRecord.put("PIT_OUT_BOD_LAND",rs.getString("PIT_OUT_BOD_LAND"));
		jsonRecord.put("PIT_OUT_BOD_FISH",rs.getString("PIT_OUT_BOD_FISH"));
		jsonRecord.put("PIT_OUT_BOD_LANDFILL",rs.getString("PIT_OUT_BOD_LANDFILL"));
		jsonRecord.put("PIT_OUT_TN_SUM",rs.getString("PIT_OUT_TN_SUM"));
		jsonRecord.put("PIT_OUT_TN_POP",rs.getString("PIT_OUT_TN_POP"));
		jsonRecord.put("PIT_OUT_TN_ANI",rs.getString("PIT_OUT_TN_ANI"));
		jsonRecord.put("PIT_OUT_TN_IND",rs.getString("PIT_OUT_TN_IND"));
		jsonRecord.put("PIT_OUT_TN_LAND",rs.getString("PIT_OUT_TN_LAND"));
		jsonRecord.put("PIT_OUT_TN_FISH",rs.getString("PIT_OUT_TN_FISH"));
		jsonRecord.put("PIT_OUT_TN_LANDFILL",rs.getString("PIT_OUT_TN_LANDFILL"));
		jsonRecord.put("PIT_OUT_TP_SUM",rs.getString("PIT_OUT_TP_SUM"));
		jsonRecord.put("PIT_OUT_TP_POP",rs.getString("PIT_OUT_TP_POP"));
		jsonRecord.put("PIT_OUT_TP_ANI",rs.getString("PIT_OUT_TP_ANI"));
		jsonRecord.put("PIT_OUT_TP_IND",rs.getString("PIT_OUT_TP_IND"));
		jsonRecord.put("PIT_OUT_TP_LAND",rs.getString("PIT_OUT_TP_LAND"));
		jsonRecord.put("PIT_OUT_TP_FISH",rs.getString("PIT_OUT_TP_FISH"));
		jsonRecord.put("PIT_OUT_TP_LANDFILL",rs.getString("PIT_OUT_TP_LANDFILL"));
		jsonRecord.put("DIS_FLOW_SUM",rs.getString("DIS_FLOW_SUM"));
		jsonRecord.put("DIS_FLOW_POP",rs.getString("DIS_FLOW_POP"));
		jsonRecord.put("DIS_FLOW_ANI",rs.getString("DIS_FLOW_ANI"));
		jsonRecord.put("DIS_FLOW_IND",rs.getString("DIS_FLOW_IND"));
		jsonRecord.put("DIS_FLOW_LAND",rs.getString("DIS_FLOW_LAND"));
		jsonRecord.put("DIS_FLOW_FISH",rs.getString("DIS_FLOW_FISH"));
		jsonRecord.put("DIS_FLOW_LANDFILL",rs.getString("DIS_FLOW_LANDFILL"));
		jsonRecord.put("DIS_BOD_SUM",rs.getString("DIS_BOD_SUM"));
		jsonRecord.put("DIS_BOD_POP",rs.getString("DIS_BOD_POP"));
		jsonRecord.put("DIS_BOD_ANI",rs.getString("DIS_BOD_ANI"));
		jsonRecord.put("DIS_BOD_IND",rs.getString("DIS_BOD_IND"));
		jsonRecord.put("DIS_BOD_LAND",rs.getString("DIS_BOD_LAND"));
		jsonRecord.put("DIS_BOD_FISH",rs.getString("DIS_BOD_FISH"));
		jsonRecord.put("DIS_BOD_LANDFILL",rs.getString("DIS_BOD_LANDFILL"));
		jsonRecord.put("DIS_TN_SUM",rs.getString("DIS_TN_SUM"));
		jsonRecord.put("DIS_TN_POP",rs.getString("DIS_TN_POP"));
		jsonRecord.put("DIS_TN_ANI",rs.getString("DIS_TN_ANI"));
		jsonRecord.put("DIS_TN_IND",rs.getString("DIS_TN_IND"));
		jsonRecord.put("DIS_TN_LAND",rs.getString("DIS_TN_LAND"));
		jsonRecord.put("DIS_TN_FISH",rs.getString("DIS_TN_FISH"));
		jsonRecord.put("DIS_TN_LANDFILL",rs.getString("DIS_TN_LANDFILL"));
		jsonRecord.put("DIS_TP_SUM",rs.getString("DIS_TP_SUM"));
		jsonRecord.put("DIS_TP_POP",rs.getString("DIS_TP_POP"));
		jsonRecord.put("DIS_TP_ANI",rs.getString("DIS_TP_ANI"));
		jsonRecord.put("DIS_TP_IND",rs.getString("DIS_TP_IND"));
		jsonRecord.put("DIS_TP_LAND",rs.getString("DIS_TP_LAND"));
		jsonRecord.put("DIS_TP_FISH",rs.getString("DIS_TP_FISH"));
		jsonRecord.put("DIS_TP_LANDFILL",rs.getString("DIS_TP_LANDFILL"));
		jsonRecord.put("OUT_FLOW_SUM",rs.getString("OUT_FLOW_SUM"));
		jsonRecord.put("OUT_FLOW_POP",rs.getString("OUT_FLOW_POP"));
		jsonRecord.put("OUT_FLOW_ANI",rs.getString("OUT_FLOW_ANI"));
		jsonRecord.put("OUT_FLOW_IND",rs.getString("OUT_FLOW_IND"));
		jsonRecord.put("OUT_FLOW_LAND",rs.getString("OUT_FLOW_LAND"));
		jsonRecord.put("OUT_FLOW_FISH",rs.getString("OUT_FLOW_FISH"));
		jsonRecord.put("OUT_FLOW_LANDFILL",rs.getString("OUT_FLOW_LANDFILL"));
		jsonRecord.put("OUT_BOD_SUM",rs.getString("OUT_BOD_SUM"));
		jsonRecord.put("OUT_BOD_POP",rs.getString("OUT_BOD_POP"));
		jsonRecord.put("OUT_BOD_ANI",rs.getString("OUT_BOD_ANI"));
		jsonRecord.put("OUT_BOD_IND",rs.getString("OUT_BOD_IND"));
		jsonRecord.put("OUT_BOD_LAND",rs.getString("OUT_BOD_LAND"));
		jsonRecord.put("OUT_BOD_FISH",rs.getString("OUT_BOD_FISH"));
		jsonRecord.put("OUT_BOD_LANDFILL",rs.getString("OUT_BOD_LANDFILL"));
		jsonRecord.put("OUT_TN_SUM",rs.getString("OUT_TN_SUM"));
		jsonRecord.put("OUT_TN_POP",rs.getString("OUT_TN_POP"));
		jsonRecord.put("OUT_TN_ANI",rs.getString("OUT_TN_ANI"));
		jsonRecord.put("OUT_TN_IND",rs.getString("OUT_TN_IND"));
		jsonRecord.put("OUT_TN_LAND",rs.getString("OUT_TN_LAND"));
		jsonRecord.put("OUT_TN_FISH",rs.getString("OUT_TN_FISH"));
		jsonRecord.put("OUT_TN_LANDFILL",rs.getString("OUT_TN_LANDFILL"));
		jsonRecord.put("OUT_TP_SUM",rs.getString("OUT_TP_SUM"));
		jsonRecord.put("OUT_TP_POP",rs.getString("OUT_TP_POP"));
		jsonRecord.put("OUT_TP_ANI",rs.getString("OUT_TP_ANI"));
		jsonRecord.put("OUT_TP_IND",rs.getString("OUT_TP_IND"));
		jsonRecord.put("OUT_TP_LAND",rs.getString("OUT_TP_LAND"));
		jsonRecord.put("OUT_TP_FISH",rs.getString("OUT_TP_FISH"));
		jsonRecord.put("OUT_TP_LANDFILL",rs.getString("OUT_TP_LANDFILL"));
		jsonRecord.put("WS_NM",rs.getString("WS_NM"));
		jsonRecord.put("BASIN",rs.getString("BASIN"));
  		
  		
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