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
	
	String division = request.getParameter("division");
	
	String adm1 = request.getParameter("adm1");
	String adm2 = request.getParameter("adm2");
	String adm3 = request.getParameter("adm3");
	
	//out.print(adm3);
	
	
		sql = "select '' AS YYYY, '' AS CAT_DID, sum(FINAL_AREA) AS FINAL_AREA , sum(GNR_FLOW_SUM) AS GNR_FLOW_SUM , sum(GNR_BOD_SUM) AS GNR_BOD_SUM ,sum( GNR_TN_SUM) AS GNR_TN_SUM ,				";
		sql += "   sum(GNR_TP_SUM) AS GNR_TP_SUM , sum(OUT_FLOW_SUM) AS OUT_FLOW_SUM ,   ";
		sql += "   sum(OUT_BOD_SUM) AS OUT_BOD_SUM, sum(OUT_TN_SUM) AS OUT_TN_SUM ,sum( OUT_TP_SUM) AS OUT_TP_SUM                                             ";
		sql += "   from POLLULANT_LOAD_FOR_CAT                                                                                                                ";
		sql += "   where CAT_DID IN('1006080500','1006090100','1006080600','1006090300',                                                                      ";
		sql += "   '1006090500','1006090200','1006090400','1006090400')                                                                                       ";
		sql += "  union                                                                                                                                       ";
		sql += "   select YYYY, CAT_DID,FINAL_AREA, GNR_FLOW_SUM , GNR_BOD_SUM , GNR_TN_SUM ,                                                                            ";
		sql += "   GNR_TP_SUM ,  OUT_FLOW_SUM ,                                                                                   ";
		sql += "   OUT_BOD_SUM , OUT_TN_SUM , OUT_TP_SUM                                                                                                      ";
		sql += "   from POLLULANT_LOAD_FOR_CAT                                                                                                                ";
		sql += "   where CAT_DID IN('1006080500','1006090100','1006080600','1006090300',                                                                      ";
		sql += "   '1006090500','1006090200','1006090400','1006090400')                                                                                       ";
		sql += " order by YYYY desc ";	
	
	
		
   //out.print(sql);
   System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("YYYY"	, rs.getString("YYYY"));
  		jsonRecord.put("CAT_DID"	, rs.getString("CAT_DID"));//FINAL_AREA
  		jsonRecord.put("FINAL_AREA"	, rs.getString("FINAL_AREA"));//FINAL_AREA
  		jsonRecord.put("GNR_FLOW_SUM"	, rs.getString("GNR_FLOW_SUM"));
  		jsonRecord.put("GNR_BOD_SUM" 	, rs.getString("GNR_BOD_SUM"));
  		jsonRecord.put("GNR_TN_SUM" 	, rs.getString("GNR_TN_SUM"));
  		jsonRecord.put("GNR_TP_SUM" 	, rs.getString("GNR_TP_SUM"));
  		jsonRecord.put("OUT_FLOW_SUM" 	, rs.getString("OUT_FLOW_SUM"));
  		jsonRecord.put("OUT_BOD_SUM" 	, rs.getString("OUT_BOD_SUM"));
  		jsonRecord.put("OUT_TP_SUM" 	, rs.getString("OUT_TP_SUM"));
  		
  		
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