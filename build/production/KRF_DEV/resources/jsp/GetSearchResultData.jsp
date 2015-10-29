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
	sql = " WITH TMP AS (  																																																																																																								";      
	sql += "    SELECT RANK() OVER(PARTITION BY A.PT_NO||SUBSTR(C.WMWK, -1) ORDER BY A.PT_NO, C.WMCYMD DESC, C.WMWK DESC) RN /* 순번 */                                                                                                     ";
	sql += "        ,A.PT_NO||SUBSTR(C.WMWK, -1) AS PT_NO /* 지점코드 */, A.PT_NM /* 지점명 */, C.WMCYMD /* 측정일자 */                                                                                                                     ";
	sql += "     , B.WMYR /* 년 */, B.WMOD /* 월 */,                                                                                                                                                                                        ";
	sql += "   CASE WHEN LENGTH(C.WMWK) = '2' THEN                                                                                                                                                                                          ";
	sql += "             CASE WHEN SUBSTR(C.WMWK, -1) = '1' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'                                                                                                                                        ";
	sql += "                  WHEN SUBSTR(C.WMWK, -1) = '2' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중상층부'                                                                                                                                      ";
	sql += "                  WHEN SUBSTR(C.WMWK, -1) = '3' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중층부'                                                                                                                                        ";
	sql += "                  WHEN SUBSTR(C.WMWK, -1) = '4' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중하층부'                                                                                                                                      ";
	sql += "                  WHEN SUBSTR(C.WMWK, -1) = '5' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'                                                                                                                                        ";
	sql += "             END                                                                                                                                                                                                                ";
	sql += "        ELSE C.WMWK                                                                                                                                                                                                             ";
	sql += "        END AS WMWK/* 회차 -수정-*/                                                                                                                                                                                             ";
	sql += "         , C.WMDEP /*수심 -추가-*/                                                                                                                                                                                              ";
	sql += "         , B.ITEM_AMNT /* 유량 */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_BOD /* BOD */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_DOC /* DO */                                                                                                                                                                                                  ";
	sql += "         , B.ITEM_COD /* COD */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_EC /* EC */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_TN /* T-N */                                                                                                                                                                                                  ";
	sql += "         , B.ITEM_DTN /* DTN */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_NO3N /* NO3N */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_NH3N /* NH3N */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_TP /* T-P */                                                                                                                                                                                                  ";
	sql += "         , B.ITEM_TEMP /* 수온 */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_PH /* pH */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_SS /* SS */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_DTP /* DTP */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_POP /* POP */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_CLOA /* 클로로필a */                                                                                                                                                                                          ";
	sql += "         , B.ITEM_TOC /* TOC - 추가 - */                                                                                                                                                                                        ";
	sql += "         , B.ITEM_TRANS /* 투명도 */                                                                                                                                                                                            ";
	sql += "         , B.ITEM_ALGOL /* 조류 */                                                                                                                                                                                              ";
	sql += "         , B.ITEM_TCOLI /* 총대장균군수 */                                                                                                                                                                                      ";
	sql += "         , B.ITEM_ECOLI /* 분원성대장균군수 */                                                                                                                                                                                  ";
	sql += "         , B.ITEM_ANTIMON /* 안티몬 */                                                                                                                                                                                          ";
	sql += "         , B.ITEM_PHENOL /* PHENOL */                                                                                                                                                                                           ";
	sql += "         , B.ITEM_COL /* 색도 */                                                                                                                                                                                                ";
	sql += "         , B.ITEM_NHEX /* N.H */                                                                                                                                                                                                ";
	sql += "         , B.ITEM_MN /* Mn */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_FE /* Fe */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_CD /* Cd */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_CN /* Cn */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_PB /* Pb */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_CR6 /* Cr6 */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_CR /* Cr */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_AS /* As */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_HG /* Hg */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_CU /* Cu */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_ZN /* Zn */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_FL /* F */                                                                                                                                                                                                    ";
	sql += "         , B.ITEM_ABS /* ABS */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_CL /* CL */                                                                                                                                                                                                   ";
	sql += "         , B.ITEM_TCE /* TCE */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_PCE /* PCE */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_CCL4 /* 사염화탄소 */                                                                                                                                                                                         ";
	sql += "         , B.ITEM_DCETH /* 1.2디클로로에탄 */                                                                                                                                                                                   ";
	sql += "         , B.ITEM_DCM /* 디클로로메탄 */                                                                                                                                                                                        ";
	sql += "         , B.ITEM_BENZENE /* 벤젠 */                                                                                                                                                                                            ";
	sql += "         , B.ITEM_CHCL3 /* 클로로포름 */                                                                                                                                                                                        ";
	sql += "         , B.ITEM_OP /* 유기인 */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_PCB /* PCB */                                                                                                                                                                                                 ";
	sql += "         , B.ITEM_DEHP /* DEHP */                                                                                                                                                                                               ";
	sql += "         , B.ITEM_DIOX /* 1,4-다이옥세인 - 추가 -*/                                                                                                                                                                             ";
	sql += "         , B.ITEM_HCHO /* 포름알데히드 */                                                                                                                                                                                       ";
	sql += "         , B.ITEM_HCB /* HCB */                                                                                                                                                                                                 ";
	sql += "         , A.ADMCODE /* 법정동코드 */                                                                                                                                                                                           ";
	sql += "     FROM RWMPT A                                                                                                                                                                                                               ";
	sql += "        , RWMDTI B                                                                                                                                                                                                              ";
	sql += "        , RWMDTD C                                                                                                                                                                                                              ";
	sql += "    WHERE A.PT_NO = B.PT_NO                                                                                                                                                                                                     ";
	sql += "         AND A.PT_NO = C.PT_NO                                                                                                                                                                                                  ";
	sql += "            AND B.WMYR  = C.WMYR                                                                                                                                                                                                ";
	sql += "            AND B.WMOD  = C.WMOD                                                                                                                                                                                                ";
	sql += "            AND B.WMWK  = C.WMWK                                                                                                                                                                                                ";
	sql += "            AND C.WMCYMD IS NOT NULL                                                                                                                                                                                            ";
	sql += "         )                                                                                                                                                                                                                      ";
	sql += " SELECT A.RN, SUBSTR(A.PT_NO,1,7) AS PT_NO, A.PT_NM, A.WMCYMD, B.WMCYMD AS CHART_DATE, A.WMYR, A.WMOD, A.WMWK, B.WMWK AS SEQ , A.WMDEP                                                                                          ";
	sql += "     , CASE WHEN A.ITEM_BOD     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_BOD    ) END AS CURR_BOD      , CASE WHEN B.ITEM_BOD     = '999999999' THEN 0 ELSE B.ITEM_BOD     END AS CHART_BOD                        ";
	sql += "     , CASE WHEN A.ITEM_DOC     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DOC    ) END AS CURR_DO       , CASE WHEN B.ITEM_DOC     = '999999999' THEN 0 ELSE B.ITEM_DOC     END AS CHART_DO                         ";
	sql += "     , CASE WHEN A.ITEM_COD     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_COD    ) END AS CURR_COD      , CASE WHEN B.ITEM_COD     = '999999999' THEN 0 ELSE B.ITEM_COD     END AS CHART_COD                        ";
	sql += "     , CASE WHEN A.ITEM_TN      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TN     ) END AS CURR_TN       , CASE WHEN B.ITEM_TN      = '999999999' THEN 0 ELSE B.ITEM_TN      END AS CHART_TN                         ";
	sql += "     , CASE WHEN A.ITEM_TP      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TP     ) END AS CURR_TP       , CASE WHEN B.ITEM_TP      = '999999999' THEN 0 ELSE B.ITEM_TP      END AS CHART_TP                         ";
	sql += "     , CASE WHEN A.ITEM_TEMP    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TEMP   ) END AS CURR_TEMP     , CASE WHEN B.ITEM_TEMP    = '999999999' THEN 0 ELSE B.ITEM_TEMP    END AS CHART_TEMP                       ";
	sql += "     , CASE WHEN A.ITEM_PH      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_PH     ) END AS CURR_PH       , CASE WHEN B.ITEM_PH      = '999999999' THEN 0 ELSE B.ITEM_PH      END AS CHART_PH                         ";
	sql += "     , CASE WHEN A.ITEM_SS      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_SS     ) END AS CURR_SS       , CASE WHEN B.ITEM_SS      = '999999999' THEN 0 ELSE B.ITEM_SS      END AS CHART_SS                         ";
	sql += "     , CASE WHEN A.ITEM_CLOA    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CLOA   ) END AS CURR_CLOA     , CASE WHEN B.ITEM_CLOA    = '999999999' THEN 0 ELSE B.ITEM_CLOA    END AS CHART_CLOA                       ";
	sql += "     , CASE WHEN A.ITEM_TOC     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TOC    ) END AS CURR_TOC      , CASE WHEN B.ITEM_TOC     = '999999999' THEN 0 ELSE B.ITEM_TOC     END AS CHART_TOC                        ";
	sql += "     , CASE WHEN A.ITEM_AMNT    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_AMNT   ) END AS CURR_AMNT     , CASE WHEN B.ITEM_AMNT    = '999999999' THEN 0 ELSE B.ITEM_AMNT    END AS CHART_AMNT                       ";
	sql += "     , CASE WHEN A.ITEM_DTN     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DTN    ) END AS CURR_DTN      , CASE WHEN B.ITEM_DTN     = '999999999' THEN 0 ELSE B.ITEM_DTN     END AS CHART_DTN                        ";
	sql += "     , CASE WHEN A.ITEM_NO3N    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_NO3N   ) END AS CURR_NO3N     , CASE WHEN B.ITEM_NO3N    = '999999999' THEN 0 ELSE B.ITEM_NO3N    END AS CHART_NO3N                       ";
	sql += "     , CASE WHEN A.ITEM_NH3N    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_NH3N   ) END AS CURR_NH3N     , CASE WHEN B.ITEM_NH3N    = '999999999' THEN 0 ELSE B.ITEM_NH3N    END AS CHART_NH3N                       ";
	sql += "     , CASE WHEN A.ITEM_DTP     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DTP    ) END AS CURR_DTP      , CASE WHEN B.ITEM_DTP     = '999999999' THEN 0 ELSE B.ITEM_DTP     END AS CHART_DTP                        ";
	sql += "     , CASE WHEN A.ITEM_POP     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_POP    ) END AS CURR_POP      , CASE WHEN B.ITEM_POP     = '999999999' THEN 0 ELSE B.ITEM_POP     END AS CHART_POP                        ";
	sql += "     , CASE WHEN A.ITEM_TRANS   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TRANS  ) END AS CURR_TRANS    , CASE WHEN B.ITEM_TRANS   = '999999999' THEN 0 ELSE B.ITEM_TRANS   END AS CHART_TRANS                      ";
	sql += "     , CASE WHEN A.ITEM_ALGOL   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_ALGOL  ) END AS CURR_ALGOL    , CASE WHEN B.ITEM_ALGOL   = '999999999' THEN 0 ELSE B.ITEM_ALGOL   END AS CHART_ALGOL                      ";
	sql += "     , CASE WHEN A.ITEM_TCOLI   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TCOLI  ) END AS CURR_TCOLI    , CASE WHEN B.ITEM_TCOLI   = '999999999' THEN 0 ELSE B.ITEM_TCOLI   END AS CHART_TCOLI                      ";
	sql += "     , CASE WHEN A.ITEM_ECOLI   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_ECOLI  ) END AS CURR_ECOLI    , CASE WHEN B.ITEM_ECOLI   = '999999999' THEN 0 ELSE B.ITEM_ECOLI   END AS CHART_ECOLI                      ";
	sql += "     , CASE WHEN A.ITEM_ANTIMON = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_ANTIMON) END AS CURR_ANTIMON  , CASE WHEN B.ITEM_ANTIMON = '999999999' THEN 0 ELSE B.ITEM_ANTIMON END AS CHART_ANTIMON                    ";
	sql += "     , CASE WHEN A.ITEM_PHENOL  = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_PHENOL ) END AS CURR_PHENOL   , CASE WHEN B.ITEM_PHENOL  = '999999999' THEN 0 ELSE B.ITEM_PHENOL  END AS CHART_PHENOL                     ";
	sql += "     , CASE WHEN A.ITEM_COL     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_COL    ) END AS CURR_COL      , CASE WHEN B.ITEM_COL     = '999999999' THEN 0 ELSE B.ITEM_COL     END AS CHART_COL                        ";
	sql += "     , CASE WHEN A.ITEM_NHEX    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_NHEX   ) END AS CURR_NHEX     , CASE WHEN B.ITEM_NHEX    = '999999999' THEN 0 ELSE B.ITEM_NHEX    END AS CHART_NHEX                       ";
	sql += "     , CASE WHEN A.ITEM_MN      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_MN     ) END AS CURR_MN       , CASE WHEN B.ITEM_MN      = '999999999' THEN 0 ELSE B.ITEM_MN      END AS CHART_MN                         ";
	sql += "     , CASE WHEN A.ITEM_FE      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_FE     ) END AS CURR_FE       , CASE WHEN B.ITEM_FE      = '999999999' THEN 0 ELSE B.ITEM_FE      END AS CHART_FE                         ";
	sql += "     , CASE WHEN A.ITEM_CD      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CD     ) END AS CURR_CD       , CASE WHEN B.ITEM_CD      = '999999999' THEN 0 ELSE B.ITEM_CD      END AS CHART_CD                         ";
	sql += "     , CASE WHEN A.ITEM_CN      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CN     ) END AS CURR_CN       , CASE WHEN B.ITEM_CN      = '999999999' THEN 0 ELSE B.ITEM_CN      END AS CHART_CN                         ";
	sql += "     , CASE WHEN A.ITEM_PB      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_PB     ) END AS CURR_PB       , CASE WHEN B.ITEM_PB      = '999999999' THEN 0 ELSE B.ITEM_PB      END AS CHART_PB                         ";
	sql += "     , CASE WHEN A.ITEM_CR6     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CR6    ) END AS CURR_CR6      , CASE WHEN B.ITEM_CR6     = '999999999' THEN 0 ELSE B.ITEM_CR6     END AS CHART_CR6                        ";
	sql += "     , CASE WHEN A.ITEM_CR      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CR     ) END AS CURR_CR       , CASE WHEN B.ITEM_CR      = '999999999' THEN 0 ELSE B.ITEM_CR      END AS CHART_CR                         ";
	sql += "     , CASE WHEN A.ITEM_AS      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_AS     ) END AS CURR_AS       , CASE WHEN B.ITEM_AS      = '999999999' THEN 0 ELSE B.ITEM_AS      END AS CHART_AS                         ";
	sql += "     , CASE WHEN A.ITEM_HG      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_HG     ) END AS CURR_HG       , CASE WHEN B.ITEM_HG      = '999999999' THEN 0 ELSE B.ITEM_HG      END AS CHART_HG                         ";
	sql += "     , CASE WHEN A.ITEM_CU      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CU     ) END AS CURR_CU       , CASE WHEN B.ITEM_CU      = '999999999' THEN 0 ELSE B.ITEM_CU      END AS CHART_CU                         ";
	sql += "     , CASE WHEN A.ITEM_ZN      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_ZN     ) END AS CURR_ZN       , CASE WHEN B.ITEM_ZN      = '999999999' THEN 0 ELSE B.ITEM_ZN      END AS CHART_ZN                         ";
	sql += "     , CASE WHEN A.ITEM_FL      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_FL     ) END AS CURR_FL       , CASE WHEN B.ITEM_FL      = '999999999' THEN 0 ELSE B.ITEM_FL      END AS CHART_FL                         ";
	sql += "     , CASE WHEN A.ITEM_ABS     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_ABS    ) END AS CURR_ABS      , CASE WHEN B.ITEM_ABS     = '999999999' THEN 0 ELSE B.ITEM_ABS     END AS CHART_ABS                        ";
	sql += "     , CASE WHEN A.ITEM_CL      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CL     ) END AS CURR_CL       , CASE WHEN B.ITEM_CL      = '999999999' THEN 0 ELSE B.ITEM_CL      END AS CHART_CL                         ";
	sql += "     , CASE WHEN A.ITEM_TCE     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_TCE    ) END AS CURR_TCE      , CASE WHEN B.ITEM_TCE     = '999999999' THEN 0 ELSE B.ITEM_TCE     END AS CHART_TCE                        ";
	sql += "     , CASE WHEN A.ITEM_PCE     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_PCE    ) END AS CURR_PCE      , CASE WHEN B.ITEM_PCE     = '999999999' THEN 0 ELSE B.ITEM_PCE     END AS CHART_PCE                        ";
	sql += "     , CASE WHEN A.ITEM_CCL4    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CCL4   ) END AS CURR_CCL4     , CASE WHEN B.ITEM_CCL4    = '999999999' THEN 0 ELSE B.ITEM_CCL4    END AS CHART_CCL4                       ";
	sql += "     , CASE WHEN A.ITEM_DCETH   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DCETH  ) END AS CURR_DCETH    , CASE WHEN B.ITEM_DCETH   = '999999999' THEN 0 ELSE B.ITEM_DCETH   END AS CHART_DCETH                      ";
	sql += "     , CASE WHEN A.ITEM_DCM     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DCM    ) END AS CURR_DCM      , CASE WHEN B.ITEM_DCM     = '999999999' THEN 0 ELSE B.ITEM_DCM     END AS CHART_DCM                        ";
	sql += "     , CASE WHEN A.ITEM_BENZENE = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_BENZENE) END AS CURR_BENZENE  , CASE WHEN B.ITEM_BENZENE = '999999999' THEN 0 ELSE B.ITEM_BENZENE END AS CHART_BENZENE                    ";
	sql += "     , CASE WHEN A.ITEM_CHCL3   = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_CHCL3  ) END AS CURR_CHCL3    , CASE WHEN B.ITEM_CHCL3   = '999999999' THEN 0 ELSE B.ITEM_CHCL3   END AS CHART_CHCL3                      ";
	sql += "     , CASE WHEN A.ITEM_OP      = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_OP     ) END AS CURR_OP       , CASE WHEN B.ITEM_OP      = '999999999' THEN 0 ELSE B.ITEM_OP      END AS CHART_OP                         ";
	sql += "     , CASE WHEN A.ITEM_PCB     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_PCB    ) END AS CURR_PCB      , CASE WHEN B.ITEM_PCB     = '999999999' THEN 0 ELSE B.ITEM_PCB     END AS CHART_PCB                        ";
	sql += "     , CASE WHEN A.ITEM_DEHP    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_DEHP   ) END AS CURR_DEHP     , CASE WHEN B.ITEM_DEHP    = '999999999' THEN 0 ELSE B.ITEM_DEHP    END AS CHART_DEHP                       ";
	sql += "     , CASE WHEN A.ITEM_HCHO    = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_HCHO   ) END AS CURR_HCHO     , CASE WHEN B.ITEM_HCHO    = '999999999' THEN 0 ELSE B.ITEM_HCHO    END AS CHART_HCHO                       ";
	sql += "     , CASE WHEN A.ITEM_HCB     = '999999999' THEN '정량한계미만' ELSE TO_CHAR(A.ITEM_HCB    ) END AS CURR_HCB      , CASE WHEN B.ITEM_HCB     = '999999999' THEN 0 ELSE B.ITEM_HCB     END AS CHART_HCB                        ";
	sql += "  FROM TMP A                                                                                                                                                                                                                    ";
	sql += "     , TMP B                                                                                                                                                                                                                    ";
	sql += "     , KESTI_WATER_ALL_MAP C                                                                                                                                                                                                    ";
	sql += " WHERE A.PT_NO = B.PT_NO                                                                                                                                                                                                        ";
	sql += "   AND A.ADMCODE = B.ADMCODE                                                                                                                                                                                                    ";
	sql += "   AND B.RN BETWEEN A.RN AND A.RN + 4                                                                                                                                                                                           ";
sql += "   AND SUBSTR(A.ADMCODE, 1, 10) = C.ADM_CD(+)                                                                                                                                                                                   ";
		   
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
		sql += "AND SUBSTR(A.PT_NO,1,7) IN (" + siteIds + ") ";
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
	
	String 	CURR_AMNT	 = "";
	String 	CURR_DTN	 = "";
	String 	CURR_NO3N	 = "";
	String 	CURR_NH3N	 = "";
	String 	CURR_DTP	 = "";
	String 	CURR_POP	 = "";
	String 	CURR_TRANS	 = "";
	String 	CURR_ALGOL	 = "";
	String 	CURR_TCOLI	 = "";
	String 	CURR_ECOLI	 = "";
	String 	CURR_ANTIMON	 = "";
	String 	CURR_PHENOL	 = "";
	String 	CURR_COL	 = "";
	String 	CURR_NHEX	 = "";
	String 	CURR_MN	 = "";
	String 	CURR_FE	 = "";
	String 	CURR_CD	 = "";
	String 	CURR_CN	 = "";
	String 	CURR_PB	 = "";
	String 	CURR_CR6	 = "";
	String 	CURR_CR	 = "";
	String 	CURR_AS	 = "";
	String 	CURR_HG	 = "";
	String 	CURR_CU	 = "";
	String 	CURR_ZN	 = "";
	String 	CURR_FL	 = "";
	String 	CURR_ABS	 = "";
	String 	CURR_CL	 = "";
	String 	CURR_TCE	 = "";
	String 	CURR_PCE	 = "";
	String 	CURR_CCL4	 = "";
	String 	CURR_DCETH	 = "";
	String 	CURR_DCM	 = "";
	String 	CURR_BENZENE	 = "";
	String 	CURR_CHCL3	 = "";
	String 	CURR_OP	 = "";
	String 	CURR_PCB	 = "";
	String 	CURR_DEHP	 = "";
	String 	CURR_HCHO	 = "";
	String 	CURR_HCB	 = "";

	JSONArray 	CHART_AMNT	 = new JSONArray();
	JSONArray 	CHART_DTN	 = new JSONArray();
	JSONArray 	CHART_NO3N	 = new JSONArray();
	JSONArray 	CHART_NH3N	 = new JSONArray();
	JSONArray 	CHART_DTP	 = new JSONArray();
	JSONArray 	CHART_POP	 = new JSONArray();
	JSONArray 	CHART_TRANS	 = new JSONArray();
	JSONArray 	CHART_ALGOL	 = new JSONArray();
	JSONArray 	CHART_TCOLI	 = new JSONArray();
	JSONArray 	CHART_ECOLI	 = new JSONArray();
	JSONArray 	CHART_ANTIMON	 = new JSONArray();
	JSONArray 	CHART_PHENOL	 = new JSONArray();
	JSONArray 	CHART_COL	 = new JSONArray();
	JSONArray 	CHART_NHEX	 = new JSONArray();
	JSONArray 	CHART_MN	 = new JSONArray();
	JSONArray 	CHART_FE	 = new JSONArray();
	JSONArray 	CHART_CD	 = new JSONArray();
	JSONArray 	CHART_CN	 = new JSONArray();
	JSONArray 	CHART_PB	 = new JSONArray();
	JSONArray 	CHART_CR6	 = new JSONArray();
	JSONArray 	CHART_CR	 = new JSONArray();
	JSONArray 	CHART_AS	 = new JSONArray();
	JSONArray 	CHART_HG	 = new JSONArray();
	JSONArray 	CHART_CU	 = new JSONArray();
	JSONArray 	CHART_ZN	 = new JSONArray();
	JSONArray 	CHART_FL	 = new JSONArray();
	JSONArray 	CHART_ABS	 = new JSONArray();
	JSONArray 	CHART_CL	 = new JSONArray();
	JSONArray 	CHART_TCE	 = new JSONArray();
	JSONArray 	CHART_PCE	 = new JSONArray();
	JSONArray 	CHART_CCL4	 = new JSONArray();
	JSONArray 	CHART_DCETH	 = new JSONArray();
	JSONArray 	CHART_DCM	 = new JSONArray();
	JSONArray 	CHART_BENZENE	 = new JSONArray();
	JSONArray 	CHART_CHCL3	 = new JSONArray();
	JSONArray 	CHART_OP	 = new JSONArray();
	JSONArray 	CHART_PCB	 = new JSONArray();
	JSONArray 	CHART_DEHP	 = new JSONArray();
	JSONArray 	CHART_HCHO	 = new JSONArray();
	JSONArray 	CHART_HCB	 = new JSONArray();
	
	int cnt = 0;
	
	while(rs.next()) {
		
		cnt++;
		
		if((!preSeq.equals("") && !preSeq.equals(rs.getString("RN")))
				|| (!PT_NO.equals("") && !PT_NO.equals(rs.getString("PT_NO")))){
			
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
	  		
	  		jsonRecord.put("CURR_AMNT",CURR_AMNT);
	  		jsonRecord.put("CURR_DTN",CURR_DTN);
	  		jsonRecord.put("CURR_NO3N",CURR_NO3N);
	  		jsonRecord.put("CURR_NH3N",CURR_NH3N);
	  		jsonRecord.put("CURR_DTP",CURR_DTP);
	  		jsonRecord.put("CURR_POP",CURR_POP);
	  		jsonRecord.put("CURR_TRANS",CURR_TRANS);
	  		jsonRecord.put("CURR_ALGOL",CURR_ALGOL);
	  		jsonRecord.put("CURR_TCOLI",CURR_TCOLI);
	  		jsonRecord.put("CURR_ECOLI",CURR_ECOLI);
	  		jsonRecord.put("CURR_ANTIMON",CURR_ANTIMON);
	  		jsonRecord.put("CURR_PHENOL",CURR_PHENOL);
	  		jsonRecord.put("CURR_COL",CURR_COL);
	  		jsonRecord.put("CURR_NHEX",CURR_NHEX);
	  		jsonRecord.put("CURR_MN",CURR_MN);
	  		jsonRecord.put("CURR_FE",CURR_FE);
	  		jsonRecord.put("CURR_CD",CURR_CD);
	  		jsonRecord.put("CURR_CN",CURR_CN);
	  		jsonRecord.put("CURR_PB",CURR_PB);
	  		jsonRecord.put("CURR_CR6",CURR_CR6);
	  		jsonRecord.put("CURR_CR",CURR_CR);
	  		jsonRecord.put("CURR_AS",CURR_AS);
	  		jsonRecord.put("CURR_HG",CURR_HG);
	  		jsonRecord.put("CURR_CU",CURR_CU);
	  		jsonRecord.put("CURR_ZN",CURR_ZN);
	  		jsonRecord.put("CURR_FL",CURR_FL);
	  		jsonRecord.put("CURR_ABS",CURR_ABS);
	  		jsonRecord.put("CURR_CL",CURR_CL);
	  		jsonRecord.put("CURR_TCE",CURR_TCE);
	  		jsonRecord.put("CURR_PCE",CURR_PCE);
	  		jsonRecord.put("CURR_CCL4",CURR_CCL4);
	  		jsonRecord.put("CURR_DCETH",CURR_DCETH);
	  		jsonRecord.put("CURR_DCM",CURR_DCM);
	  		jsonRecord.put("CURR_BENZENE",CURR_BENZENE);
	  		jsonRecord.put("CURR_CHCL3",CURR_CHCL3);
	  		jsonRecord.put("CURR_OP",CURR_OP);
	  		jsonRecord.put("CURR_PCB",CURR_PCB);
	  		jsonRecord.put("CURR_DEHP",CURR_DEHP);
	  		jsonRecord.put("CURR_HCHO",CURR_HCHO);
	  		jsonRecord.put("CURR_HCB",CURR_HCB);
	  		jsonRecord.put("CHART_AMNT",CHART_AMNT);
	  		jsonRecord.put("CHART_DTN",CHART_DTN);
	  		jsonRecord.put("CHART_NO3N",CHART_NO3N);
	  		jsonRecord.put("CHART_NH3N",CHART_NH3N);
	  		jsonRecord.put("CHART_DTP",CHART_DTP);
	  		jsonRecord.put("CHART_POP",CHART_POP);
	  		jsonRecord.put("CHART_TRANS",CHART_TRANS);
	  		jsonRecord.put("CHART_ALGOL",CHART_ALGOL);
	  		jsonRecord.put("CHART_TCOLI",CHART_TCOLI);
	  		jsonRecord.put("CHART_ECOLI",CHART_ECOLI);
	  		jsonRecord.put("CHART_ANTIMON",CHART_ANTIMON);
	  		jsonRecord.put("CHART_PHENOL",CHART_PHENOL);
	  		jsonRecord.put("CHART_COL",CHART_COL);
	  		jsonRecord.put("CHART_NHEX",CHART_NHEX);
	  		jsonRecord.put("CHART_MN",CHART_MN);
	  		jsonRecord.put("CHART_FE",CHART_FE);
	  		jsonRecord.put("CHART_CD",CHART_CD);
	  		jsonRecord.put("CHART_CN",CHART_CN);
	  		jsonRecord.put("CHART_PB",CHART_PB);
	  		jsonRecord.put("CHART_CR6",CHART_CR6);
	  		jsonRecord.put("CHART_CR",CHART_CR);
	  		jsonRecord.put("CHART_AS",CHART_AS);
	  		jsonRecord.put("CHART_HG",CHART_HG);
	  		jsonRecord.put("CHART_CU",CHART_CU);
	  		jsonRecord.put("CHART_ZN",CHART_ZN);
	  		jsonRecord.put("CHART_FL",CHART_FL);
	  		jsonRecord.put("CHART_ABS",CHART_ABS);
	  		jsonRecord.put("CHART_CL",CHART_CL);
	  		jsonRecord.put("CHART_TCE",CHART_TCE);
	  		jsonRecord.put("CHART_PCE",CHART_PCE);
	  		jsonRecord.put("CHART_CCL4",CHART_CCL4);
	  		jsonRecord.put("CHART_DCETH",CHART_DCETH);
	  		jsonRecord.put("CHART_DCM",CHART_DCM);
	  		jsonRecord.put("CHART_BENZENE",CHART_BENZENE);
	  		jsonRecord.put("CHART_CHCL3",CHART_CHCL3);
	  		jsonRecord.put("CHART_OP",CHART_OP);
	  		jsonRecord.put("CHART_PCB",CHART_PCB);
	  		jsonRecord.put("CHART_DEHP",CHART_DEHP);
	  		jsonRecord.put("CHART_HCHO",CHART_HCHO);
	  		jsonRecord.put("CHART_HCB",CHART_HCB);
	  	
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
	  		
	  		
	  		
	  		CURR_AMNT = rs.getString("CURR_AMNT");
	  		Chart_Data_tmp = new JSONArray();
	  		Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_AMNT"));
			CHART_AMNT.add(Chart_Data_tmp);

	  		CURR_DTN = rs.getString("CURR_DTN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DTN"));
			CHART_DTN.add(Chart_Data_tmp);
			
			CURR_NO3N = rs.getString("CURR_NO3N");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NO3N"));
			CHART_NO3N.add(Chart_Data_tmp);
			
			CURR_NH3N = rs.getString("CURR_NH3N");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NH3N"));
			CHART_NH3N.add(Chart_Data_tmp);
			
			CURR_DTP = rs.getString("CURR_DTP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DTP"));
			CHART_DTP.add(Chart_Data_tmp);
			
			CURR_POP = rs.getString("CURR_POP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_POP"));
			CHART_POP.add(Chart_Data_tmp);
			
			CURR_TRANS = rs.getString("CURR_TRANS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TRANS"));
			CHART_TRANS.add(Chart_Data_tmp);
			
			CURR_ALGOL = rs.getString("CURR_ALGOL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ALGOL"));
			CHART_ALGOL.add(Chart_Data_tmp);
			
			CURR_TCOLI = rs.getString("CURR_TCOLI");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TCOLI"));
			CHART_TCOLI.add(Chart_Data_tmp);
			
			CURR_ECOLI = rs.getString("CURR_ECOLI");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ECOLI"));
			CHART_ECOLI.add(Chart_Data_tmp);
			
			CURR_ANTIMON = rs.getString("CURR_ANTIMON");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ANTIMON"));
			CHART_ANTIMON.add(Chart_Data_tmp);
			
			CURR_PHENOL = rs.getString("CURR_PHENOL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PHENOL"));
			CHART_PHENOL.add(Chart_Data_tmp);
			
			CURR_COL = rs.getString("CURR_COL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_COL"));
			CHART_COL.add(Chart_Data_tmp);
			
			CURR_NHEX = rs.getString("CURR_NHEX");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NHEX"));
			CHART_NHEX.add(Chart_Data_tmp);
			
			CURR_MN = rs.getString("CURR_MN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_MN"));
			CHART_MN.add(Chart_Data_tmp);
			
			CURR_FE = rs.getString("CURR_FE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FE"));
			
			CHART_DTP.add(Chart_Data_tmp);
			CURR_CD = rs.getString("CURR_CD");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CD"));
			CHART_CD.add(Chart_Data_tmp);
			
			CURR_CN = rs.getString("CURR_CN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CN"));
			CHART_CN.add(Chart_Data_tmp);
			
			CURR_PB = rs.getString("CURR_PB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PB"));
			CHART_PB.add(Chart_Data_tmp);
			
			CURR_CR6 = rs.getString("CURR_CR6");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CR6"));
			CHART_CR6.add(Chart_Data_tmp);
			
			CURR_CR = rs.getString("CURR_CR");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CR"));
			CHART_CR.add(Chart_Data_tmp);
			
			CURR_AS = rs.getString("CURR_AS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_AS"));
			CHART_DTP.add(Chart_Data_tmp);
			
			CURR_HG = rs.getString("CURR_HG");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HG"));
			CHART_HG.add(Chart_Data_tmp);
			
			CURR_CU = rs.getString("CURR_CU");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CU"));
			CHART_DTP.add(Chart_Data_tmp);
			
			CURR_ZN = rs.getString("CURR_ZN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ZN"));
			CHART_ZN.add(Chart_Data_tmp);
			
			CURR_FL = rs.getString("CURR_FL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FL"));
			CHART_FL.add(Chart_Data_tmp);
			
			CURR_ABS = rs.getString("CURR_ABS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ABS"));
			CHART_ABS.add(Chart_Data_tmp);
			
			CURR_CL = rs.getString("CURR_CL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CL"));
			CHART_CL.add(Chart_Data_tmp);
			
			CURR_TCE = rs.getString("CURR_TCE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TCE"));
			CHART_TCE.add(Chart_Data_tmp);
			
			CURR_PCE = rs.getString("CURR_PCE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PCE"));
			CHART_PCE.add(Chart_Data_tmp);
			
			CURR_CCL4 = rs.getString("CURR_CCL4");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CCL4"));
			CHART_CCL4.add(Chart_Data_tmp);
			
			CURR_DCETH = rs.getString("CURR_DCETH");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DCETH"));
			CHART_DCETH.add(Chart_Data_tmp);
			
			CURR_DCM = rs.getString("CURR_DCM");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DCM"));
			CHART_DCM.add(Chart_Data_tmp);
			
			CURR_BENZENE = rs.getString("CURR_BENZENE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_BENZENE"));
			CHART_BENZENE.add(Chart_Data_tmp);
			
			CURR_CHCL3 = rs.getString("CURR_CHCL3");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CHCL3"));
			CHART_CHCL3.add(Chart_Data_tmp);
			
			CURR_OP = rs.getString("CURR_OP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_OP"));
			CHART_OP.add(Chart_Data_tmp);
			
			CURR_PCB = rs.getString("CURR_PCB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PCB"));
			CHART_PCB.add(Chart_Data_tmp);
			
			CURR_DEHP = rs.getString("CURR_DEHP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DEHP"));
			CHART_DEHP.add(Chart_Data_tmp);
			
			CURR_HCHO = rs.getString("CURR_HCHO");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HCHO"));
			CHART_HCHO.add(Chart_Data_tmp);
			
			CURR_HCB = rs.getString("CURR_HCB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HCB"));
			CHART_HCB.add(Chart_Data_tmp);
	  		
	  		
	  		
	  		
	  		
	  		
			
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
	
	jsonRecord.put("CURR_AMNT",CURR_AMNT);
	jsonRecord.put("CURR_DTN",CURR_DTN);
	jsonRecord.put("CURR_NO3N",CURR_NO3N);
	jsonRecord.put("CURR_NH3N",CURR_NH3N);
	jsonRecord.put("CURR_DTP",CURR_DTP);
	jsonRecord.put("CURR_POP",CURR_POP);
	jsonRecord.put("CURR_TRANS",CURR_TRANS);
	jsonRecord.put("CURR_ALGOL",CURR_ALGOL);
	jsonRecord.put("CURR_TCOLI",CURR_TCOLI);
	jsonRecord.put("CURR_ECOLI",CURR_ECOLI);
	jsonRecord.put("CURR_ANTIMON",CURR_ANTIMON);
	jsonRecord.put("CURR_PHENOL",CURR_PHENOL);
	jsonRecord.put("CURR_COL",CURR_COL);
	jsonRecord.put("CURR_NHEX",CURR_NHEX);
	jsonRecord.put("CURR_MN",CURR_MN);
	jsonRecord.put("CURR_FE",CURR_FE);
	jsonRecord.put("CURR_CD",CURR_CD);
	jsonRecord.put("CURR_CN",CURR_CN);
	jsonRecord.put("CURR_PB",CURR_PB);
	jsonRecord.put("CURR_CR6",CURR_CR6);
	jsonRecord.put("CURR_CR",CURR_CR);
	jsonRecord.put("CURR_AS",CURR_AS);
	jsonRecord.put("CURR_HG",CURR_HG);
	jsonRecord.put("CURR_CU",CURR_CU);
	jsonRecord.put("CURR_ZN",CURR_ZN);
	jsonRecord.put("CURR_FL",CURR_FL);
	jsonRecord.put("CURR_ABS",CURR_ABS);
	jsonRecord.put("CURR_CL",CURR_CL);
	jsonRecord.put("CURR_TCE",CURR_TCE);
	jsonRecord.put("CURR_PCE",CURR_PCE);
	jsonRecord.put("CURR_CCL4",CURR_CCL4);
	jsonRecord.put("CURR_DCETH",CURR_DCETH);
	jsonRecord.put("CURR_DCM",CURR_DCM);
	jsonRecord.put("CURR_BENZENE",CURR_BENZENE);
	jsonRecord.put("CURR_CHCL3",CURR_CHCL3);
	jsonRecord.put("CURR_OP",CURR_OP);
	jsonRecord.put("CURR_PCB",CURR_PCB);
	jsonRecord.put("CURR_DEHP",CURR_DEHP);
	jsonRecord.put("CURR_HCHO",CURR_HCHO);
	jsonRecord.put("CURR_HCB",CURR_HCB);
	jsonRecord.put("CHART_AMNT",CHART_AMNT);
	jsonRecord.put("CHART_DTN",CHART_DTN);
	jsonRecord.put("CHART_NO3N",CHART_NO3N);
	jsonRecord.put("CHART_NH3N",CHART_NH3N);
	jsonRecord.put("CHART_DTP",CHART_DTP);
	jsonRecord.put("CHART_POP",CHART_POP);
	jsonRecord.put("CHART_TRANS",CHART_TRANS);
	jsonRecord.put("CHART_ALGOL",CHART_ALGOL);
	jsonRecord.put("CHART_TCOLI",CHART_TCOLI);
	jsonRecord.put("CHART_ECOLI",CHART_ECOLI);
	jsonRecord.put("CHART_ANTIMON",CHART_ANTIMON);
	jsonRecord.put("CHART_PHENOL",CHART_PHENOL);
	jsonRecord.put("CHART_COL",CHART_COL);
	jsonRecord.put("CHART_NHEX",CHART_NHEX);
	jsonRecord.put("CHART_MN",CHART_MN);
	jsonRecord.put("CHART_FE",CHART_FE);
	jsonRecord.put("CHART_CD",CHART_CD);
	jsonRecord.put("CHART_CN",CHART_CN);
	jsonRecord.put("CHART_PB",CHART_PB);
	jsonRecord.put("CHART_CR6",CHART_CR6);
	jsonRecord.put("CHART_CR",CHART_CR);
	jsonRecord.put("CHART_AS",CHART_AS);
	jsonRecord.put("CHART_HG",CHART_HG);
	jsonRecord.put("CHART_CU",CHART_CU);
	jsonRecord.put("CHART_ZN",CHART_ZN);
	jsonRecord.put("CHART_FL",CHART_FL);
	jsonRecord.put("CHART_ABS",CHART_ABS);
	jsonRecord.put("CHART_CL",CHART_CL);
	jsonRecord.put("CHART_TCE",CHART_TCE);
	jsonRecord.put("CHART_PCE",CHART_PCE);
	jsonRecord.put("CHART_CCL4",CHART_CCL4);
	jsonRecord.put("CHART_DCETH",CHART_DCETH);
	jsonRecord.put("CHART_DCM",CHART_DCM);
	jsonRecord.put("CHART_BENZENE",CHART_BENZENE);
	jsonRecord.put("CHART_CHCL3",CHART_CHCL3);
	jsonRecord.put("CHART_OP",CHART_OP);
	jsonRecord.put("CHART_PCB",CHART_PCB);
	jsonRecord.put("CHART_DEHP",CHART_DEHP);
	jsonRecord.put("CHART_HCHO",CHART_HCHO);
	jsonRecord.put("CHART_HCB",CHART_HCB);


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