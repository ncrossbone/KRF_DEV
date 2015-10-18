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
	String WS_CD = request.getParameter("WS_CD");
	String AM_CD = request.getParameter("AM_CD");
	String AS_CD = request.getParameter("AS_CD");
	
	String ADM_CD = request.getParameter("ADM_CD");
	
	String siteIds = request.getParameter("siteIds");
	//JSONObject parentIds = request.getParameter("parentIds");
	
	String startYear = request.getParameter("startYear");
	String startMonth = request.getParameter("startMonth");
	String endYear = request.getParameter("endYear");
	String endMonth = request.getParameter("endMonth");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	//out.print(parentIds);
	sql = "  WITH TMP AS (  				" +	
		"	SELECT RANK() OVER(PARTITION BY A.PT_NO ORDER BY A.PT_NO, C.WMCYMD DESC, C.WMWK DESC) RN /* 순번 */     "+
		"     , A.PT_NO /* 지점코드 */, A.PT_NM /* 지점명 */, C.WMCYMD /* 측정일자 */                             "+
		"	 , B.WMYR /* 년 */, B.WMOD /* 월 */                                                                     "+
		//"     , C.WMWK /* 회차 */                                                                                 "+
	" CASE WHEN LENGTH(C.WMWK) = '2' THEN																													"+
	"           CASE WHEN SUBSTR(C.WMWK, -1) = '1' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'       "+
	"                WHEN SUBSTR(C.WMWK, -1) = '2' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중상층부'     "+
	"                WHEN SUBSTR(C.WMWK, -1) = '3' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중층부'       "+
	"                WHEN SUBSTR(C.WMWK, -1) = '4' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중하층부'     "+
	"                WHEN SUBSTR(C.WMWK, -1) = '5' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'       "+
	"           END                                                                               "+
	"      ELSE C.WMWK                                                                            "+
	"      END AS WMWK/* 회차 -수정-*/,                                                           "+
    "         , C.WMDEP /*수심 -추가-*/                                                                       "+
    "         , B.ITEM_AMNT  /* 유량  */                                                                      "+
		"     , B.ITEM_BOD /* BOD */                                                                              "+
		"     , B.ITEM_DOC /* DO */                                                                               "+
		"     , B.ITEM_COD /* COD */                                                                              "+
    "         , B.ITEM_EC /* EC */                                                                            "+
		"     , B.ITEM_TN /* T-N */                                                                               "+
    "         , B.ITEM_DTN /* DTN */                                                                          "+
    "         , B.ITEM_NO3N /* NO3N */                                                                        "+
    "         , B.ITEM_NH3N /* NH3N */                                                                        "+
		"     , B.ITEM_TP /* T-P */                                                                               "+
		"     , B.ITEM_TEMP /* 수온 */                                                                            "+
		"     , B.ITEM_PH /* pH */                                                                                "+
		"     , B.ITEM_SS /* SS */                                                                                "+
    "         , B.ITEM_DTP /* DTP */                                                                          "+
    "         , B.ITEM_POP /* POP */                                                                          "+
    "         , B.ITEM_CLOA /* 클로로필a */                                                                   "+
    "         , B.ITEM_TOC /* TOC - 추가 - */                                                                 "+
    "         , B.ITEM_TRANS /* 투명도 */                                                                     "+
    "         , B.ITEM_ALGOL /* 조류 */                                                                       "+
    "         , B.ITEM_TCOLI /* 총대장균군수 */                                                               "+
    "         , B.ITEM_ECOLI /* 분원성대장균군수 */                                                           "+
    "         , B.ITEM_ANTIMON /* 안티몬 */                                                                   "+
    "         , B.ITEM_PHENOL /* PHENOL */                                                                    "+
    "         , B.ITEM_COL /* 색도 */                                                                         "+
    "         , B.ITEM_NHEX /* N.H */		                                                                      "+
    "         , B.ITEM_MN /* Mn */                                                                            "+
    "         , B.ITEM_FE /* Fe */                                                                            "+
    "         , B.ITEM_CD /* Cd */                                                                            "+
    "         , B.ITEM_CN /* Cn */                                                                            "+
    "         , B.ITEM_PB /* Pb */                                                                            "+
    "         , B.ITEM_CR6 /* Cr6 */                                                                          "+
    "         , B.ITEM_CR /* Cr */                                                                            "+
    "         , B.ITEM_AS /* As */                                                                            "+
    "         , B.ITEM_HG /* Hg */                                                                            "+
    "         , B.ITEM_CU /* Cu */                                                                            "+
    "         , B.ITEM_ZN /* Zn */                                                                            "+
    "         , B.ITEM_FL /* F */                                                                             "+
    "         , B.ITEM_ABS /* ABS */                                                                          "+
    "         , B.ITEM_CL /* CL */                                                                            "+
    "         , B.ITEM_TCE /* TCE */                                                                          "+
    "         , B.ITEM_PCE /* PCE */                                                                          "+
    "         , B.ITEM_CCL4 /* 사염화탄소 */                                                                  "+
    "         , B.ITEM_DCETH /* 1.2디클로로에탄 */                                                            "+
    "         , B.ITEM_DCM /* 디클로로메탄 */                                                                 "+
    "         , B.ITEM_BENZENE /* 벤젠 */                                                                     "+
    "         , B.ITEM_CHCL3 /* 클로로포름 */                                                                 "+
    "         , B.ITEM_OP /* 유기인 */                                                                        "+
    "         , B.ITEM_PCB /* PCB */                                                                          "+
    "         , B.ITEM_DEHP /* DEHP */                                                                        "+  //
    "         , B.ITEM_DIOX /* 1,4-다이옥세인 - 추가 -*/                                                                        "+
    "         , B.ITEM_HCHO /* 포름알데히드 */                                                                "+
    "         , B.ITEM_HCB /* HCB */                                                                          "+
		"     , A.ADMCODE /* 법정동코드 */                                                                        "+
		"  FROM RWMPT A                                                                                           "+
		"     , RWMDTI B                                                                                          "+
		"     , RWMDTD C                                                                                          "+
		" WHERE A.PT_NO = B.PT_NO                                                                                 "+
	  "     AND A.PT_NO = C.PT_NO                                                                               "+
    "       AND B.WMYR  = C.WMYR                                                                              "+
    "       AND B.WMOD  = C.WMOD                                                                              "+
    "       AND B.WMWK  = C.WMWK                                                                              "+
    "       AND C.WMCYMD IS NOT NULL                                                                          "+
    "    )                                                                                                    "+
    
    "SELECT A.RN, A.PT_NO, A.PT_NM, A.WMCYMD, B.WMCYMD AS CHART_DATE, A.WMYR, A.WMOD, A.WMWK, B.WMWK AS SEQ , A.WMDEP" +
    ", A.ITEM_BOD AS CURR_BOD, B.ITEM_BOD AS CHART_BOD " +
    ", A.ITEM_DOC AS CURR_DO, B.ITEM_DOC AS CHART_DO " +
    ", A.ITEM_COD AS CURR_COD, B.ITEM_COD AS CHART_COD " +
    ", A.ITEM_TN AS CURR_TN, B.ITEM_TN AS CHART_TN " +
    ", A.ITEM_TP AS CURR_TP, B.ITEM_TP AS CHART_TP " +
    ", A.ITEM_TEMP AS CURR_TEMP, B.ITEM_TEMP AS CHART_TEMP " +
    ", A.ITEM_PH AS CURR_PH, B.ITEM_PH AS CHART_PH " +
    ", A.ITEM_SS AS CURR_SS, B.ITEM_SS AS CHART_SS " +
    ", A.ITEM_CLOA AS CURR_CLOA, B.ITEM_CLOA AS CHART_CLOA " +
    ", A.ITEM_TOC AS CURR_TOC, B.ITEM_TOC AS CHART_TOC " +
 "FROM TMP A " +
    ", TMP B " +
    ", KESTI_WATER_ALL_MAP C " +
"WHERE A.PT_NO = B.PT_NO " +
  "AND A.ADMCODE = B.ADMCODE " +
  "AND B.RN BETWEEN A.RN AND A.RN + 4 " +
  "AND SUBSTR(A.ADMCODE, 1, 10) = C.ADM_CD(+) ";
		   
	if(startYYYYMM != ""){
		sql += "AND A.WMYR || A.WMOD >= '" + startYYYYMM + "' ";
	}
	if(endYYYYMM != ""){
		sql += "AND A.WMYR || A.WMOD <= '" + endYYYYMM + "' ";
	}
	if(WS_CD != ""){
		sql += "AND C.WS_CD = '" + WS_CD + "' /* 대권역 */ ";
	}
	if(AM_CD != ""){
		sql += "AND C.AM_CD = '" + AM_CD + "' /* 중권역 */ ";
	}
	if(AS_CD != ""){
		sql += "AND C.AS_CD = '" + AS_CD + "' /* 소권역 */ ";
	}
	if(ADM_CD != ""){
		sql += "AND C.ADM_CD LIKE '" + ADM_CD + "%' ";
	}
	
	if(siteIds != ""){
		sql += "AND A.PT_NO IN (" + siteIds + ") ";
	}
		//sql += "AND C.ADM_CD LIKE '42%' /* 강원도 */ " +
		   //"AND C.ADM_CD LIKE '42110%' /* 춘천시 */ " +
		   //"AND C.ADM_CD LIKE '42110124%' /* 석사동 */ " +
		   //"AND A.PT_NM LIKE '공지%' " +
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
	String WMDEP = "";
	String CURR_BOD = "";
	JSONArray CHART_BOD = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
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
	String CURR_TOC = "";
	JSONArray CHART_TOC = new JSONArray();
	
	int cnt = 0;
	
	while(rs.next()) {
		
		cnt++;
		
		if(!preSeq.equals("") && !preSeq.equals(rs.getString("RN"))){
			
			cnt = 1;
			
			//System.out.println(preSite + preDate);
			jsonRecord = new JSONObject();
	
			//jsonRecord.put("parentId", parentId);
			jsonRecord.put("PT_NO", PT_NO);
	  		jsonRecord.put("PT_NM", PT_NM);
	  		jsonRecord.put("WMCYMD", WMCYMD);
	  		jsonRecord.put("WMYR", WMYR);
	  		jsonRecord.put("WMOD", WMOD);
	  		jsonRecord.put("WMWK", WMWK);
	  		jsonRecord.put("WMDEP", WMDEP);
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
	  		jsonRecord.put("CURR_TOC", CURR_TOC);
	  		jsonRecord.put("CHART_TOC", CHART_TOC);
	  	
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
	  		CHART_TOC = new JSONArray();
		}
		//else{
			//parentId = rs.getString("parentId");
			PT_NO = rs.getString("PT_NO");
			PT_NM = rs.getString("PT_NM");
			WMCYMD = rs.getString("WMCYMD");
			WMYR = rs.getString("WMYR");
			WMOD = rs.getString("WMOD");
			WMWK = rs.getString("WMWK");
			WMDEP = rs.getString("WMDEP");
			CURR_BOD = rs.getString("CURR_BOD");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_BOD"));
			//CHART_BOD.add(rs.getString("CHART_BOD"));
			CHART_BOD.add(Chart_Data_tmp);
			
			CURR_DO = rs.getString("CURR_DO");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DO"));
	  		CHART_DO.add(Chart_Data_tmp);
	  		
	  		CURR_COD = rs.getString("CURR_COD");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_COD"));
	  		CHART_COD.add(Chart_Data_tmp);
	  		//CHART_COD.add(rs.getString("CHART_COD"));
	  		
	  		CURR_TN = rs.getString("CURR_TN");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TN"));
	  		CHART_TN.add(Chart_Data_tmp);
	  		//CHART_TN.add(rs.getString("CHART_TN"));
	  		
	  		CURR_TP = rs.getString("CURR_TP");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TP"));
	  		CHART_TP.add(Chart_Data_tmp);
	  		//CHART_TP.add(rs.getString("CHART_TP"));
	  		
	  		CURR_TEMP = rs.getString("CURR_TEMP");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TEMP"));
	  		CHART_TEMP.add(Chart_Data_tmp);
	  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		
	  		CURR_PH = rs.getString("CURR_PH");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PH"));
	  		CHART_PH.add(Chart_Data_tmp);
	  		//CHART_PH.add(rs.getString("CHART_PH")); 
	  		
	  		CURR_SS = rs.getString("CURR_SS");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_SS"));
	  		CHART_SS.add(Chart_Data_tmp);
	  		//CHART_SS.add(rs.getString("CHART_SS"));
	  		
	  		CURR_CLOA = rs.getString("CURR_CLOA");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CLOA"));
	  		CHART_CLOA.add(Chart_Data_tmp);
	  		
	  		CURR_TOC = rs.getString("CURR_TOC");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TOC"));
	  		CHART_TOC.add(Chart_Data_tmp);
	  		//CHART_CLOA.add(rs.getString("CHART_CLOA"));
			
			//System.out.println(String.format("%04.2f", 0.40));
		//}
		
		if(!preSeq.equals(rs.getString("RN")))
			preSeq = rs.getString("RN");
  		
	}
	
	jsonRecord = new JSONObject();
	
	//jsonRecord.put("parentId", parentId);
	jsonRecord.put("PT_NO", PT_NO);
	jsonRecord.put("PT_NM", PT_NM);
	jsonRecord.put("WMCYMD", WMCYMD);
	jsonRecord.put("WMYR", WMYR);
	jsonRecord.put("WMOD", WMOD);
	jsonRecord.put("WMWK", WMWK);
	jsonRecord.put("WMDEP", WMDEP);
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
	jsonRecord.put("CURR_TOC", CURR_TOC);
	jsonRecord.put("CHART_TOC", CHART_TOC);

	jsonArr.add(jsonRecord);
	
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