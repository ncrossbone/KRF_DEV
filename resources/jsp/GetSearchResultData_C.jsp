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
	
sql = " SELECT							" +
"        A.PT_NO                                                                                                    " +
"      , A.NO    /* 순번 참고용 */                                                                                  " +
"      , A.PT_NM /* 측정소명 */                                                                                     " +
"      , A.WMYR  /* 년도 */                                                                                         " +
"      , A.WMOM  /* 월 */                                                                                           " +
"      , A.WMCYMD AS WMCYMD_VAL   /* 측정일자 */                                                                    " +
"      , A.WMCYMD AS CHART_DATE                                                                                     " +
"      , B.WMCYMD AS WMCYMD_GRAPH /* 측정일자 */                                                                    " +
"      , A.MCNT     /* 회차 */                                                                                      " +
"      , A.JOSANAME /* 조사기관 */                                                                                  " +
"      , A.ITEM_DOW  AS ITEM_DOW_VAL    /* 수심(m) */                                                               " +
"      , B.ITEM_DOW  AS ITEM_DOW_GRAPH  /* 수심(m) */                                                               " +
"      , A.ITEM_TEMP AS ITEM_TEMP_VAL   /* 수온(℃) */                                                              " +
"      , B.ITEM_TEMP AS ITEM_TEMP_GRAPH /* 수온(℃) */                                                              " +
"      , A.ITEM_DO   AS ITEM_DO_VAL     /* DO(㎎/L) */                                                              " +
"      , B.ITEM_DO   AS ITEM_DO_GRAPH   /* DO(㎎/L) */                                                              " +
"      , A.ITEM_PH   AS ITEM_PH_VAL     /* pH */                                                                    " +
"      , B.ITEM_PH   AS ITEM_PH_GRAPH   /* pH */                                                                    " +
"      , A.ITEM_EC   AS ITEM_EC_VAL     /* 전기전도도(SC)(25℃ μS/㎝) */                                           " +
"      , B.ITEM_EC   AS ITEM_EC_GRAPH   /* 전기전도도(SC)(25℃ μS/㎝) */                                           " +
"      , A.ITEM_FSD  AS ITEM_FSD_VAL    /* 입도-모래(%) */                                                          " +
"      , B.ITEM_FSD  AS ITEM_FSD_GRAPH  /* 입도-모래(%) */                                                          " +
"      , A.ITEM_FST  AS ITEM_FST_VAL    /* 입도-실트(%) */                                                          " +
"      , B.ITEM_FST  AS ITEM_FST_GRAPH  /* 입도-실트(%) */                                                          " +
"      , A.ITEM_FCL  AS ITEM_FCL_VAL    /* 입도-점토(%) */                                                          " +
"      , B.ITEM_FCL  AS ITEM_FCL_GRAPH  /* 입도-점토(%) */                                                          " +
"      , A.ITEM_WTC  AS ITEM_WTC_VAL    /* 함수율(%) */                                                             " +
"      , B.ITEM_WTC  AS ITEM_WTC_GRAPH  /* 함수율(%) */                                                             " +
"      , A.ITEM_PCA  AS ITEM_PCA_VAL    /* 완전연소가능량(%) */                                                     " +
"      , B.ITEM_PCA  AS ITEM_PCA_GRAPH  /* 완전연소가능량(%) */                                                     " +
"      , A.ITEM_COD  AS ITEM_COD_VAL    /* COD(%) */                                                                " +
"      , B.ITEM_COD  AS ITEM_COD_GRAPH  /* COD(%) */                                                                " +
"      , A.ITEM_TOC  AS ITEM_TOC_VAL    /* TOC(%) */                                                                " +
"      , B.ITEM_TOC  AS ITEM_TOC_GRAPH  /* TOC(%) */                                                                " +
"      , A.ITEM_TN   AS ITEM_TN_VAL     /* T-N(㎎/㎏) */                                                            " +
"      , B.ITEM_TN   AS ITEM_TN_GRAPH   /* T-N(㎎/㎏) */                                                            " +
"      , A.ITEM_TP   AS ITEM_TP_VAL     /* T-P(㎎/㎏) */                                                            " +
"      , B.ITEM_TP   AS ITEM_TP_GRAPH   /* T-P(㎎/㎏) */                                                            " +
"      , A.ITEM_SRP  AS ITEM_SRP_VAL    /* SRP(㎎/㎏) */                                                            " +
"      , B.ITEM_SRP  AS ITEM_SRP_GRAPH  /* SRP(㎎/㎏) */                                                            " +
"      , A.ITEM_PB   AS ITEM_PB_VAL     /* Pb(㎎/㎏) */                                                             " +
"      , B.ITEM_PB   AS ITEM_PB_GRAPH   /* Pb(㎎/㎏) */                                                             " +
"      , A.ITEM_ZN   AS ITEM_ZN_VAL     /* Zn(㎎/㎏) */                                                             " +
"      , B.ITEM_ZN   AS ITEM_ZN_GRAPH   /* Zn(㎎/㎏) */                                                             " +
"      , A.ITEM_CU   AS ITEM_CU_VAL     /* Cu(㎎/㎏) */                                                             " +
"      , B.ITEM_CU   AS ITEM_CU_GRAPH   /* Cu(㎎/㎏) */                                                             " +
"      , A.ITEM_CR   AS ITEM_CR_VAL     /* Cr(㎎/㎏) */                                                             " +
"      , B.ITEM_CR   AS ITEM_CR_GRAPH   /* Cr(㎎/㎏) */                                                             " +
"      , A.ITEM_NI   AS ITEM_NI_VAL     /* Ni(㎎/㎏) */                                                             " +
"      , B.ITEM_NI   AS ITEM_NI_GRAPH   /* Ni(㎎/㎏) */                                                             " +
"      , A.ITEM_AS   AS ITEM_AS_VAL     /* As(㎎/㎏) */                                                             " +
"      , B.ITEM_AS   AS ITEM_AS_GRAPH   /* As(㎎/㎏) */                                                             " +
"      , A.ITEM_CD   AS ITEM_CD_VAL     /* Cd(㎎/㎏) */                                                             " +
"      , B.ITEM_CD   AS ITEM_CD_GRAPH   /* Cd(㎎/㎏) */                                                             " +
"      , A.ITEM_HG   AS ITEM_HG_VAL     /* Hg(㎎/㎏) */                                                             " +
"      , B.ITEM_HG   AS ITEM_HG_GRAPH   /* Hg(㎎/㎏) */                                                             " +
"      , A.ITEM_AL   AS ITEM_AL_VAL     /* Al(%) */                                                                 " +
"      , B.ITEM_AL   AS ITEM_AL_GRAPH   /* Al(%) */                                                                 " +
"      , A.ITEM_LI   AS ITEM_LI_VAL     /* Li(㎎/㎏) */                                                             " +
"      , B.ITEM_LI   AS ITEM_LI_GRAPH   /* Li(㎎/㎏) */                                                             " +
" FROM   (SELECT RANK() OVER(PARTITION BY PT_NO                                                                     " +
"                 ORDER BY PT_NO, WMYR DESC, WMOM DESC, WMOD DESC) AS NO,                                           " +
"                PT_NO,                                                                                             " +
"                PT_NM ,                                                                                            " +
"                WMYR ,                                                                                             " +
"                WMOM ,                                                                                             " +
"                WMYR||'.'||WMOM||'.'||WMOD AS WMCYMD ,                                                             " +
"                MCNT ,                                                                                             " +
"                ORD_PT_NM ,                                                                                        " +
"                ORD_GBN ,                                                                                          " +
"                JOSANAME ,                                                                                         " +
"                DECODE(ITEM_DOW , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW, 'FM999,999,990.0' ) ) ITEM_DOW ,  " +
"                DECODE(ITEM_TEMP , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP, 'FM999,999,990' ) ) ITEM_TEMP , " +
"                DECODE(ITEM_DO , '999999999', '정량한계미만', TO_CHAR(ITEM_DO, 'FM999,999,990.0' ) ) ITEM_DO ,     " +
"                DECODE(ITEM_PH , '999999999', '정량한계미만', TO_CHAR(ITEM_PH, 'FM999,999,990.0' ) ) ITEM_PH ,     " +
"                DECODE(ITEM_EC , '999999999', '정량한계미만', TO_CHAR(ITEM_EC, 'FM999,999,990' ) ) ITEM_EC ,       " +
"                DECODE(ITEM_FSD , '999999999', '정량한계미만', TO_CHAR(ITEM_FSD, 'FM999,999,990.0' ) ) ITEM_FSD ,  " +
"                DECODE(ITEM_FST , '999999999', '정량한계미만', TO_CHAR(ITEM_FST, 'FM999,999,990.0' ) ) ITEM_FST ,  " +
"                DECODE(ITEM_FCL , '999999999', '정량한계미만', TO_CHAR(ITEM_FCL, 'FM999,999,990.0' ) ) ITEM_FCL ,  " +
"                DECODE(ITEM_WTC , '999999999', '정량한계미만', TO_CHAR(ITEM_WTC, 'FM999,999,990.0' ) ) ITEM_WTC ,  " +
"                DECODE(ITEM_PCA , '999999999', '정량한계미만', TO_CHAR(ITEM_PCA, 'FM999,999,990.00' ) ) ITEM_PCA , " +
"                DECODE(ITEM_COD , '999999999', '정량한계미만', TO_CHAR(ITEM_COD, 'FM999,999,990.00' ) ) ITEM_COD , " +
"                DECODE(ITEM_TOC , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC, 'FM999,999,990.00' ) ) ITEM_TOC , " +
"                DECODE(ITEM_TN , '999999999', '정량한계미만', TO_CHAR(ITEM_TN, 'FM999,999,990' ) ) ITEM_TN ,       " +
"                DECODE(ITEM_TP , '999999999', '정량한계미만', TO_CHAR(ITEM_TP, 'FM999,999,990' ) ) ITEM_TP ,       " +
"                DECODE(ITEM_SRP , '999999999', '정량한계미만', TO_CHAR(ITEM_SRP, 'FM999,999,990.0' ) ) ITEM_SRP ,  " +
"                DECODE(ITEM_PB , '999999999', '정량한계미만', TO_CHAR(ITEM_PB, 'FM999,999,990.0' ) ) ITEM_PB ,     " +
"                DECODE(ITEM_ZN , '999999999', '정량한계미만', TO_CHAR(ITEM_ZN, 'FM999,999,990.0' ) ) ITEM_ZN ,     " +
"                DECODE(ITEM_CU , '999999999', '정량한계미만', TO_CHAR(ITEM_CU, 'FM999,999,990.0' ) ) ITEM_CU ,     " +
"                DECODE(ITEM_CR , '999999999', '정량한계미만', TO_CHAR(ITEM_CR, 'FM999,999,990.0' ) ) ITEM_CR ,     " +
"                DECODE(ITEM_NI , '999999999', '정량한계미만', TO_CHAR(ITEM_NI, 'FM999,999,990.0' ) ) ITEM_NI ,     " +
"                DECODE(ITEM_AS , '999999999', '정량한계미만', TO_CHAR(ITEM_AS, 'FM999,999,990.0' ) ) ITEM_AS ,     " +
"                DECODE(ITEM_CD , '999999999', '정량한계미만', TO_CHAR(ITEM_CD, 'FM999,999,990.00' ) ) ITEM_CD ,    " +
"                DECODE(ITEM_HG , '999999999', '정량한계미만', TO_CHAR(ITEM_HG, 'FM999,999,990.000' ) ) ITEM_HG ,   " +
"                DECODE(ITEM_AL , '999999999', '정량한계미만', TO_CHAR(ITEM_AL, 'FM999,999,990.00' ) ) ITEM_AL ,    " +
"                DECODE(ITEM_LI , '999999999', '정량한계미만', TO_CHAR(ITEM_LI, 'FM999,999,990.0' ) ) ITEM_LI       " +
"         FROM   (SELECT A.PT_NO ,                                                                                  " +
"                        A.WMYR ,                                                                                   " +
"                        A.WMWK ,                                                                                   " +
"                        A.WMYR || A.WMWK WMYRWK ,                                                                  " +
"                        A.WMOM ,                                                                                   " +
"                        A.WMOD ,                                                                                   " +
"                        A.WMCTM ,                                                                                  " +
"                        A.WMSD ,                                                                                   " +
"                        A.WMED ,                                                                                   " +
"                        SUBSTR(B.PT_NO, 5, 1) VGBN ,                                                               " +
"                        CD.CODE_CTN RAGBN ,                                                                        " +
"                        B.PT_NM ,                                                                                  " +
"                        DECODE(SUBSTR(UPPER(B.PT_NM), LENGTH(TRIM(B.PT_NM)), 1), 'U', REPLACE(UPPER(B.PT_NM), 'U'), 'D', REPLACE(UPPER(B.PT_NM), 'D'), B.PT_NM) ORD_PT_NM ,  " +
"                        B.ORD_GBN ,																																																" +
"                        B.JOSACODE ,                                                                                               " +
"                        CD2.CODE_CTN JOSANAME ,                                                                                    " +
"                                        CASE                                                                                       " +
"                                          WHEN A.RGDT=A.UPDT THEN 'Y'                                                              " +
"                                          ELSE ''                                                                                  " +
"                                        END UPOK ,                                                                                 " +
"                        A.UPDT ,                                                                                                   " +
"                        CD3.CODE_CTN MCNT ,                                                                                        " +
"                        ROUND(ITEM_DOW , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1001'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_DOW ,                                                                      " +
"                        ROUND(ITEM_TEMP , (SELECT PRECISON                                                                         " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1002'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_TEMP ,                                                                     " +
"                        ROUND(ITEM_DO , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1003'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_DO ,                                                                       " +
"                        ROUND(ITEM_PH , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1004'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_PH ,                                                                       " +
"                        ROUND(ITEM_EC , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1005'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_EC ,                                                                       " +
"                        ROUND(ITEM_FSD , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1006'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_FSD ,                                                                      " +
"                        ROUND(ITEM_FST , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1007'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_FST ,                                                                      " +
"                        ROUND(ITEM_FCL , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1008'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_FCL ,                                                                      " +
"                        ROUND(ITEM_WTC , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1009'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_WTC ,                                                                      " +
"                        ROUND(ITEM_PCA , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1010'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_PCA ,                                                                      " +
"                        ROUND(ITEM_COD , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1011'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_COD ,                                                                      " +
"                        ROUND(ITEM_TOC , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1012'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_TOC ,                                                                      " +
"                        ROUND(ITEM_TN , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1013'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_TN ,                                                                       " +
"                        ROUND(ITEM_TP , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1014'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_TP ,                                                                       " +
"                        ROUND(ITEM_SRP , (SELECT PRECISON                                                                          " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1015'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_SRP ,                                                                      " +
"                        ROUND(ITEM_PB , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1016'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_PB ,                                                                       " +
"                        ROUND(ITEM_ZN , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1017'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_ZN ,                                                                       " +
"                        ROUND(ITEM_CU , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1018'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_CU ,                                                                       " +
"                        ROUND(ITEM_CR , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1019'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_CR ,                                                                       " +
"                        ROUND(ITEM_NI , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1020'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_NI ,                                                                       " +
"                        ROUND(ITEM_AS , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1021'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_AS ,                                                                       " +
"                        ROUND(ITEM_CD , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1022'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_CD ,                                                                       " +
"                        ROUND(ITEM_HG , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1023'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_HG ,                                                                       " +
"                        ROUND(ITEM_AL , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1024'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_AL ,                                                                       " +
"                        ROUND(ITEM_LI , (SELECT PRECISON                                                                           " +
"                                 FROM   SDM_WMIT SW                                                                                " +
"                                 WHERE  SW.ITCD='1025'                                                                             " +
"                                 AND    ROWNUM=1)) ITEM_LI ,                                                                       " +
"                        (SELECT COUNT(*)                                                                                           " +
"                         FROM   SDM_FILE_INFO FI                                                                                   " +
"                         WHERE  FI.UM_GBN = 'B'                                                                                    " +
"                         AND    FI.PT_NO = A.PT_NO                                                                                 " +
"                         AND    FI.WMYR = A.WMYR                                                                                   " +
"                         AND    FI.WMWK = A.WMWK) IMG_CNT ,                                                                        " +
"                        (SELECT COUNT(*)                                                                                           " +
"                         FROM   SDM_FILE_INFO FI                                                                                   " +
"                         WHERE  FI.UM_GBN = 'C'                                                                                    " +
"                         AND    FI.WMYR = A.WMYR                                                                                   " +
"                         AND    FI.WMWK = A.WMWK) IMG_CNT2                                                                         " +
"                 FROM   SDM_RWMDTI A ,                                                                                             " +
"                        SDM_RWMPT B ,                                                                                              " +
"                        (SELECT CODE,                                                                                              " +
"                                CODE_CTN                                                                                           " +
"                         FROM   CODE                                                                                               " +
"                         WHERE  CODE_ID = 'SDM001') CD ,                                                                           " +
"                        (SELECT CODE,                                                                                              " +
"                                CODE_CTN                                                                                           " +
"                         FROM   CODE                                                                                               " +
"                         WHERE  CODE_ID = 'ORG001') CD2 ,                                                                          " +
"                        (SELECT SUBSTR(CODE, 2, 1) CODE,                                                                           " +
"                                CODE_CTN                                                                                           " +
"                         FROM   CODE                                                                                               " +
"                         WHERE  CODE_ID = 'ETS955'                                                                                 " +
"                         AND    SUBSTR(CODE, 0, 1) = 'H') CD3                                                                      " +
"                 WHERE  A.PT_NO = B.PT_NO                                                                                          " +
"                 AND    SUBSTR(A.PT_NO, 5, 1) = CD.CODE(+)                                                                         " +
"                 AND    B.JOSACODE = CD2.CODE(+)                                                                                   " +
"                 AND    A.WMWK = CD3.CODE(+) )) A                                                                                  " +
"              , (SELECT RANK() OVER(PARTITION BY PT_NO                                                                             " +
"                         ORDER BY PT_NO, WMYR DESC, WMOM DESC, WMOD DESC) AS NO,                                                   " +
"                        PT_NO,                                                                                                     " +
"                        PT_NM ,                                                                                                    " +
"                        WMYR ,                                                                                                     " +
"                        WMOM ,                                                                                                     " +
"                        WMYR||'.'||WMOM||'.'||WMOD AS WMCYMD ,                                                                     " +
"                        MCNT ,                                                                                                     " +
"                        ORD_PT_NM ,                                                                                                " +
"                        ORD_GBN ,                                                                                                  " +
"                        JOSANAME ,                                                                                                 " +
"                        DECODE(ITEM_DOW , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW, 'FM999,999,990.0' ) ) ITEM_DOW ,          " +
"                        DECODE(ITEM_TEMP , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP, 'FM999,999,990' ) ) ITEM_TEMP ,         " +
"                        DECODE(ITEM_DO , '999999999', '정량한계미만', TO_CHAR(ITEM_DO, 'FM999,999,990.0' ) ) ITEM_DO ,             " +
"                        DECODE(ITEM_PH , '999999999', '정량한계미만', TO_CHAR(ITEM_PH, 'FM999,999,990.0' ) ) ITEM_PH ,             " +
"                        DECODE(ITEM_EC , '999999999', '정량한계미만', TO_CHAR(ITEM_EC, 'FM999,999,990' ) ) ITEM_EC ,               " +
"                        DECODE(ITEM_FSD , '999999999', '정량한계미만', TO_CHAR(ITEM_FSD, 'FM999,999,990.0' ) ) ITEM_FSD ,          " +
"                        DECODE(ITEM_FST , '999999999', '정량한계미만', TO_CHAR(ITEM_FST, 'FM999,999,990.0' ) ) ITEM_FST ,          " +
"                        DECODE(ITEM_FCL , '999999999', '정량한계미만', TO_CHAR(ITEM_FCL, 'FM999,999,990.0' ) ) ITEM_FCL ,          " +
"                        DECODE(ITEM_WTC , '999999999', '정량한계미만', TO_CHAR(ITEM_WTC, 'FM999,999,990.0' ) ) ITEM_WTC ,          " +
"                        DECODE(ITEM_PCA , '999999999', '정량한계미만', TO_CHAR(ITEM_PCA, 'FM999,999,990.00' ) ) ITEM_PCA ,         " +
"                        DECODE(ITEM_COD , '999999999', '정량한계미만', TO_CHAR(ITEM_COD, 'FM999,999,990.00' ) ) ITEM_COD ,         " +
"                        DECODE(ITEM_TOC , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC, 'FM999,999,990.00' ) ) ITEM_TOC ,         " +
"                        DECODE(ITEM_TN , '999999999', '정량한계미만', TO_CHAR(ITEM_TN, 'FM999,999,990' ) ) ITEM_TN ,               " +
"                        DECODE(ITEM_TP , '999999999', '정량한계미만', TO_CHAR(ITEM_TP, 'FM999,999,990' ) ) ITEM_TP ,               " +
"                        DECODE(ITEM_SRP , '999999999', '정량한계미만', TO_CHAR(ITEM_SRP, 'FM999,999,990.0' ) ) ITEM_SRP ,          " +
"                        DECODE(ITEM_PB , '999999999', '정량한계미만', TO_CHAR(ITEM_PB, 'FM999,999,990.0' ) ) ITEM_PB ,             " +
"                        DECODE(ITEM_ZN , '999999999', '정량한계미만', TO_CHAR(ITEM_ZN, 'FM999,999,990.0' ) ) ITEM_ZN ,             " +
"                        DECODE(ITEM_CU , '999999999', '정량한계미만', TO_CHAR(ITEM_CU, 'FM999,999,990.0' ) ) ITEM_CU ,             " +
"                        DECODE(ITEM_CR , '999999999', '정량한계미만', TO_CHAR(ITEM_CR, 'FM999,999,990.0' ) ) ITEM_CR ,             " +
"                        DECODE(ITEM_NI , '999999999', '정량한계미만', TO_CHAR(ITEM_NI, 'FM999,999,990.0' ) ) ITEM_NI ,             " +
"                        DECODE(ITEM_AS , '999999999', '정량한계미만', TO_CHAR(ITEM_AS, 'FM999,999,990.0' ) ) ITEM_AS ,             " +
"                        DECODE(ITEM_CD , '999999999', '정량한계미만', TO_CHAR(ITEM_CD, 'FM999,999,990.00' ) ) ITEM_CD ,            " +
"                        DECODE(ITEM_HG , '999999999', '정량한계미만', TO_CHAR(ITEM_HG, 'FM999,999,990.000' ) ) ITEM_HG ,           " +
"                        DECODE(ITEM_AL , '999999999', '정량한계미만', TO_CHAR(ITEM_AL, 'FM999,999,990.00' ) ) ITEM_AL ,            " +
"                        DECODE(ITEM_LI , '999999999', '정량한계미만', TO_CHAR(ITEM_LI, 'FM999,999,990.0' ) ) ITEM_LI               " +
"                 FROM   (SELECT A.PT_NO ,                                                                                          " +
"                                A.WMYR ,                                                                                           " +
"                                A.WMWK ,                                                                                           " +
"                                A.WMYR || A.WMWK WMYRWK ,                                                                          " +
"                                A.WMOM ,                                                                                           " +
"                                A.WMOD ,                                                                                           " +
"                                A.WMCTM ,                                                                                          " +
"                                A.WMSD ,                                                                                           " +
"                                A.WMED ,                                                                                           " +
"                                SUBSTR(B.PT_NO, 5, 1) VGBN ,                                                                       " +
"                                CD.CODE_CTN RAGBN ,                                                                                " +
"                                B.PT_NM ,                                                                                          " +
"                                DECODE(SUBSTR(UPPER(B.PT_NM), LENGTH(TRIM(B.PT_NM)), 1), 'U', REPLACE(UPPER(B.PT_NM), 'U'), 'D', REPLACE(UPPER(B.PT_NM), 'D'), B.PT_NM) ORD_PT_NM ,	" +
"                                B.ORD_GBN ,																													" +
"                                B.JOSACODE ,                                                         " +
"                                CD2.CODE_CTN JOSANAME ,                                              " +
"                                                        CASE                                         " +
"                                                          WHEN A.RGDT=A.UPDT THEN 'Y'                " +
"                                                          ELSE ''                                    " +
"                                                        END UPOK ,                                   " +
"                                A.UPDT ,                                                             " +
"                                CD3.CODE_CTN MCNT ,                                                  " +
"                                ROUND(ITEM_DOW , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1001'                                       " +
"                                         AND    ROWNUM=1)) ITEM_DOW ,                                " +
"                                ROUND(ITEM_TEMP , (SELECT PRECISON                                   " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1002'                                       " +
"                                         AND    ROWNUM=1)) ITEM_TEMP ,                               " +
"                                ROUND(ITEM_DO , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1003'                                       " +
"                                         AND    ROWNUM=1)) ITEM_DO ,                                 " +
"                                ROUND(ITEM_PH , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1004'                                       " +
"                                         AND    ROWNUM=1)) ITEM_PH ,                                 " +
"                                ROUND(ITEM_EC , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1005'                                       " +
"                                         AND    ROWNUM=1)) ITEM_EC ,                                 " +
"                                ROUND(ITEM_FSD , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1006'                                       " +
"                                         AND    ROWNUM=1)) ITEM_FSD ,                                " +
"                                ROUND(ITEM_FST , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1007'                                       " +
"                                         AND    ROWNUM=1)) ITEM_FST ,                                " +
"                                ROUND(ITEM_FCL , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1008'                                       " +
"                                         AND    ROWNUM=1)) ITEM_FCL ,                                " +
"                                ROUND(ITEM_WTC , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1009'                                       " +
"                                         AND    ROWNUM=1)) ITEM_WTC ,                                " +
"                                ROUND(ITEM_PCA , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1010'                                       " +
"                                         AND    ROWNUM=1)) ITEM_PCA ,                                " +
"                                ROUND(ITEM_COD , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1011'                                       " +
"                                         AND    ROWNUM=1)) ITEM_COD ,                                " +
"                                ROUND(ITEM_TOC , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1012'                                       " +
"                                         AND    ROWNUM=1)) ITEM_TOC ,                                " +
"                                ROUND(ITEM_TN , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1013'                                       " +
"                                         AND    ROWNUM=1)) ITEM_TN ,                                 " +
"                                ROUND(ITEM_TP , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1014'                                       " +
"                                         AND    ROWNUM=1)) ITEM_TP ,                                 " +
"                                ROUND(ITEM_SRP , (SELECT PRECISON                                    " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1015'                                       " +
"                                         AND    ROWNUM=1)) ITEM_SRP ,                                " +
"                                ROUND(ITEM_PB , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1016'                                       " +
"                                         AND    ROWNUM=1)) ITEM_PB ,                                 " +
"                                ROUND(ITEM_ZN , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1017'                                       " +
"                                         AND    ROWNUM=1)) ITEM_ZN ,                                 " +
"                                ROUND(ITEM_CU , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1018'                                       " +
"                                         AND    ROWNUM=1)) ITEM_CU ,                                 " +
"                                ROUND(ITEM_CR , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1019'                                       " +
"                                         AND    ROWNUM=1)) ITEM_CR ,                                 " +
"                                ROUND(ITEM_NI , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1020'                                       " +
"                                         AND    ROWNUM=1)) ITEM_NI ,                                 " +
"                                ROUND(ITEM_AS , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1021'                                       " +
"                                         AND    ROWNUM=1)) ITEM_AS ,                                 " +
"                                ROUND(ITEM_CD , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1022'                                       " +
"                                         AND    ROWNUM=1)) ITEM_CD ,                                 " +
"                                ROUND(ITEM_HG , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1023'                                       " +
"                                         AND    ROWNUM=1)) ITEM_HG ,                                 " +
"                                ROUND(ITEM_AL , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1024'                                       " +
"                                         AND    ROWNUM=1)) ITEM_AL ,                                 " +
"                                ROUND(ITEM_LI , (SELECT PRECISON                                     " +
"                                         FROM   SDM_WMIT SW                                          " +
"                                         WHERE  SW.ITCD='1025'                                       " +
"                                         AND    ROWNUM=1)) ITEM_LI ,                                 " +
"                                (SELECT COUNT(*)                                                     " +
"                                 FROM   SDM_FILE_INFO FI                                             " +
"                                 WHERE  FI.UM_GBN = 'B'                                              " +
"                                 AND    FI.PT_NO = A.PT_NO                                           " +
"                                 AND    FI.WMYR = A.WMYR                                             " +
"                                 AND    FI.WMWK = A.WMWK) IMG_CNT ,                                  " +
"                                (SELECT COUNT(*)                                                     " +
"                                 FROM   SDM_FILE_INFO FI                                             " +
"                                 WHERE  FI.UM_GBN = 'C'                                              " +
"                                 AND    FI.WMYR = A.WMYR                                             " +
"                                 AND    FI.WMWK = A.WMWK) IMG_CNT2                                   " +
"                         FROM   SDM_RWMDTI A ,                                                       " +
"                                SDM_RWMPT B ,                                                        " +
"                                (SELECT CODE,                                                        " +
"                                        CODE_CTN                                                     " +
"                                 FROM   CODE                                                         " +
"                                 WHERE  CODE_ID = 'SDM001') CD ,                                     " +
"                                (SELECT CODE,                                                        " +
"                                        CODE_CTN                                                     " +
"                                 FROM   CODE                                                         " +
"                                 WHERE  CODE_ID = 'ORG001') CD2 ,                                    " +
"                                (SELECT SUBSTR(CODE, 2, 1) CODE,                                     " +
"                                        CODE_CTN                                                     " +
"                                 FROM   CODE                                                         " +
"                                 WHERE  CODE_ID = 'ETS955'                                           " +
"                                 AND    SUBSTR(CODE, 0, 1) = 'H') CD3                                " +
"                         WHERE  A.PT_NO = B.PT_NO                                                    " +
"                         AND    SUBSTR(A.PT_NO, 5, 1) = CD.CODE(+)                                   " +
"                         AND    B.JOSACODE = CD2.CODE(+)                                             " +
"                         AND    A.WMWK = CD3.CODE(+)                                                 " +
"                 )                                                                                   " +
"        ) B                                                                                          " +
"  WHERE A.PT_NO   =  B.PT_NO                                                                         " +
"    AND A.NO BETWEEN B.NO -4 AND B.NO                                                                " +
"    AND A.PT_NO IN (" + siteIds + ")                                                                                  " +
"   ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                                         " ;
		
   //out.print(sql);    sql += "AND A.PT_NO IN (" + siteIds + ") ";
   
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	String PT_NO = "";
	String PT_NM = "";
	String WMYR = "";
	String WMOM = "";
	
	String WMCYMD_VAL = "";
	JSONArray WMCYMD_GRAPH = new JSONArray();
	
	String MCNT = "";
	String JOSANAME = "";
	
	String ITEM_DOW_VAL = "";
	JSONArray ITEM_DOW_GRAPH = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String ITEM_TEMP_VAL = "";
	JSONArray ITEM_TEMP_GRAPH = new JSONArray();
	
	String ITEM_DO_VAL = "";
	JSONArray ITEM_DO_GRAPH = new JSONArray();
	
	String ITEM_PH_VAL = "";
	JSONArray ITEM_PH_GRAPH = new JSONArray();
	
	String ITEM_EC_VAL = "";
	JSONArray ITEM_EC_GRAPH = new JSONArray();
	
	String ITEM_FSD_VAL = "";
	JSONArray ITEM_FSD_GRAPH = new JSONArray();
	
	String ITEM_FST_VAL = "";
	JSONArray ITEM_FST_GRAPH = new JSONArray();
	
	String ITEM_FCL_VAL = "";
	JSONArray ITEM_FCL_GRAPH = new JSONArray();
	
	String ITEM_WTC_VAL = "";
	JSONArray ITEM_WTC_GRAPH = new JSONArray();
	
	String ITEM_PCA_VAL = "";
	JSONArray ITEM_PCA_GRAPH = new JSONArray();
	
	String ITEM_COD_VAL = "";
	JSONArray ITEM_COD_GRAPH = new JSONArray();
	
	String ITEM_TOC_VAL = "";
	JSONArray ITEM_TOC_GRAPH = new JSONArray();
	
	String ITEM_TN_VAL = "";
	JSONArray ITEM_TN_GRAPH = new JSONArray();
	
	String ITEM_TP_VAL = "";
	JSONArray ITEM_TP_GRAPH = new JSONArray();
	
	String ITEM_SRP_VAL = "";
	JSONArray ITEM_SRP_GRAPH = new JSONArray();
	
	String ITEM_PB_VAL = "";
	JSONArray ITEM_PB_GRAPH = new JSONArray();
	
	String ITEM_ZN_VAL = "";
	JSONArray ITEM_ZN_GRAPH = new JSONArray();
	
	String ITEM_CU_VAL = "";
	JSONArray ITEM_CU_GRAPH = new JSONArray();
	
	String ITEM_CR_VAL = "";
	JSONArray ITEM_CR_GRAPH = new JSONArray();
	
	String ITEM_NI_VAL = "";
	JSONArray ITEM_NI_GRAPH = new JSONArray();
	
	String ITEM_AS_VAL = "";
	JSONArray ITEM_AS_GRAPH = new JSONArray();
	
	String ITEM_CD_VAL = "";
	JSONArray ITEM_CD_GRAPH = new JSONArray();
	
	String ITEM_HG_VAL = "";
	JSONArray ITEM_HG_GRAPH = new JSONArray();
	
	String ITEM_AL_VAL = "";
	JSONArray ITEM_AL_GRAPH = new JSONArray();
	
	String ITEM_LI_VAL = "";
	JSONArray ITEM_LI_GRAPH = new JSONArray();
	
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		
		cnt++;
		if(!preSeq.equals("") && !preSeq.equals(rs.getString("NO"))){
			
			cnt = 1;
			
			//System.out.println(preSite + preDate);
			jsonRecord = new JSONObject();
	
			//jsonRecord.put("parentId", parentId);
			jsonRecord.put("PT_NO",PT_NO);
			jsonRecord.put("PT_NM",PT_NM);
			jsonRecord.put("WMYR",WMYR);
			jsonRecord.put("WMOM",WMOM);
			jsonRecord.put("WMCYMD_VAL",WMCYMD_VAL);
			jsonRecord.put("WMCYMD_GRAPH",WMCYMD_GRAPH);
			jsonRecord.put("MCNT",MCNT);
			jsonRecord.put("JOSANAME",JOSANAME);
			jsonRecord.put("ITEM_DOW_VAL",ITEM_DOW_VAL);
			jsonRecord.put("ITEM_DOW_GRAPH",ITEM_DOW_GRAPH);
			jsonRecord.put("ITEM_TEMP_VAL",ITEM_TEMP_VAL);
			jsonRecord.put("ITEM_TEMP_GRAPH",ITEM_TEMP_GRAPH);
			jsonRecord.put("ITEM_DO_VAL",ITEM_DO_VAL);
			jsonRecord.put("ITEM_DO_GRAPH",ITEM_DO_GRAPH);
			jsonRecord.put("ITEM_PH_VAL",ITEM_PH_VAL);
			jsonRecord.put("ITEM_PH_GRAPH",ITEM_PH_GRAPH);
			jsonRecord.put("ITEM_EC_VAL",ITEM_EC_VAL);
			jsonRecord.put("ITEM_EC_GRAPH",ITEM_EC_GRAPH);
			jsonRecord.put("ITEM_FSD_VAL",ITEM_FSD_VAL);
			jsonRecord.put("ITEM_FSD_GRAPH",ITEM_FSD_GRAPH);
			jsonRecord.put("ITEM_FST_VAL",ITEM_FST_VAL);
			jsonRecord.put("ITEM_FST_GRAPH",ITEM_FST_GRAPH);
			jsonRecord.put("ITEM_FCL_VAL",ITEM_FCL_VAL);
			jsonRecord.put("ITEM_FCL_GRAPH",ITEM_FCL_GRAPH);
			jsonRecord.put("ITEM_WTC_VAL",ITEM_WTC_VAL);
			jsonRecord.put("ITEM_WTC_GRAPH",ITEM_WTC_GRAPH);
			jsonRecord.put("ITEM_PCA_VAL",ITEM_PCA_VAL);
			jsonRecord.put("ITEM_PCA_GRAPH",ITEM_PCA_GRAPH);
			jsonRecord.put("ITEM_COD_VAL",ITEM_COD_VAL);
			jsonRecord.put("ITEM_COD_GRAPH",ITEM_COD_GRAPH);
			jsonRecord.put("ITEM_TOC_VAL",ITEM_TOC_VAL);
			jsonRecord.put("ITEM_TOC_GRAPH",ITEM_TOC_GRAPH);
			jsonRecord.put("ITEM_TN_VAL",ITEM_TN_VAL);
			jsonRecord.put("ITEM_TN_GRAPH",ITEM_TN_GRAPH);
			jsonRecord.put("ITEM_TP_VAL",ITEM_TP_VAL);
			jsonRecord.put("ITEM_TP_GRAPH",ITEM_TP_GRAPH);
			jsonRecord.put("ITEM_SRP_VAL",ITEM_SRP_VAL);
			jsonRecord.put("ITEM_SRP_GRAPH",ITEM_SRP_GRAPH);
			jsonRecord.put("ITEM_PB_VAL",ITEM_PB_VAL);
			jsonRecord.put("ITEM_PB_GRAPH",ITEM_PB_GRAPH);
			jsonRecord.put("ITEM_ZN_VAL",ITEM_ZN_VAL);
			jsonRecord.put("ITEM_ZN_GRAPH",ITEM_ZN_GRAPH);
			jsonRecord.put("ITEM_CU_VAL",ITEM_CU_VAL);
			jsonRecord.put("ITEM_CU_GRAPH",ITEM_CU_GRAPH);
			jsonRecord.put("ITEM_CR_VAL",ITEM_CR_VAL);
			jsonRecord.put("ITEM_CR_GRAPH",ITEM_CR_GRAPH);
			jsonRecord.put("ITEM_NI_VAL",ITEM_NI_VAL);
			jsonRecord.put("ITEM_NI_GRAPH",ITEM_NI_GRAPH);
			jsonRecord.put("ITEM_AS_VAL",ITEM_AS_VAL);
			jsonRecord.put("ITEM_AS_GRAPH",ITEM_AS_GRAPH);
			jsonRecord.put("ITEM_CD_VAL",ITEM_CD_VAL);
			jsonRecord.put("ITEM_CD_GRAPH",ITEM_CD_GRAPH);
			jsonRecord.put("ITEM_HG_VAL",ITEM_HG_VAL);
			jsonRecord.put("ITEM_HG_GRAPH",ITEM_HG_GRAPH);
			jsonRecord.put("ITEM_AL_VAL",ITEM_AL_VAL);
			jsonRecord.put("ITEM_AL_GRAPH",ITEM_AL_GRAPH);
			jsonRecord.put("ITEM_LI_VAL",ITEM_LI_VAL);
			jsonRecord.put("ITEM_LI_GRAPH",ITEM_LI_GRAPH);
	  		
	  		jsonArr.add(jsonRecord);
	  		
	  		WMCYMD_GRAPH = new JSONArray();
	  		ITEM_DOW_GRAPH = new JSONArray();
	  		ITEM_TEMP_GRAPH = new JSONArray();
	  		ITEM_DO_GRAPH  = new JSONArray();
	  		ITEM_PH_GRAPH  = new JSONArray();
	  		ITEM_EC_GRAPH  = new JSONArray();
	  		ITEM_FSD_GRAPH  = new JSONArray();
	  		ITEM_FST_GRAPH  = new JSONArray();
	  		ITEM_FCL_GRAPH  = new JSONArray();
	  		ITEM_WTC_GRAPH = new JSONArray();
	  		ITEM_PCA_GRAPH = new JSONArray();
	  		ITEM_COD_GRAPH = new JSONArray();
	  		ITEM_TOC_GRAPH = new JSONArray();
	  		ITEM_TN_GRAPH = new JSONArray();
	  		ITEM_TP_GRAPH = new JSONArray();
	  		ITEM_SRP_GRAPH = new JSONArray();
	  		ITEM_PB_GRAPH = new JSONArray();
	  		ITEM_ZN_GRAPH = new JSONArray();
	  		ITEM_CU_GRAPH = new JSONArray();
	  		ITEM_CR_GRAPH = new JSONArray();
	  		ITEM_NI_GRAPH = new JSONArray();
	  		ITEM_AS_GRAPH = new JSONArray();
	  		ITEM_CD_GRAPH = new JSONArray();
	  		ITEM_HG_GRAPH = new JSONArray();
	  		ITEM_AL_GRAPH = new JSONArray();
	  		ITEM_LI_GRAPH = new JSONArray();
		}
		//else{
			//parentId = rs.getString("parentId");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WMYR  = rs.getString("WMYR");
			WMOM  = rs.getString("WMOM");
			
			WMCYMD_VAL  = rs.getString("WMCYMD_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("WMCYMD_GRAPH"));
			WMCYMD_GRAPH.add(Chart_Data_tmp);
			
			MCNT  = rs.getString("MCNT");
			JOSANAME  = rs.getString("JOSANAME");
			
			ITEM_DOW_VAL = rs.getString("ITEM_DOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DOW_GRAPH"));
			ITEM_DOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TEMP_VAL = rs.getString("ITEM_TEMP_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TEMP_GRAPH"));
			ITEM_TEMP_GRAPH.add(Chart_Data_tmp);
			
						
			ITEM_DO_VAL  = rs.getString("ITEM_DO_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DO_GRAPH"));
			ITEM_DO_GRAPH.add(Chart_Data_tmp);
			
			
			ITEM_PH_VAL = rs.getString("ITEM_PH_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PH_GRAPH"));
			ITEM_PH_GRAPH.add(Chart_Data_tmp);
			
			
			ITEM_EC_VAL = rs.getString("ITEM_EC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_EC_GRAPH"));
			ITEM_EC_GRAPH.add(Chart_Data_tmp);
			
			
			ITEM_FSD_VAL = rs.getString("ITEM_FSD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FSD_GRAPH"));
			ITEM_FSD_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TN.add(rs.getString("CHART_TN"));
	  		
	  		
	  		ITEM_FST_VAL = rs.getString("ITEM_FST_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FST_GRAPH"));
			ITEM_FST_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TP.add(rs.getString("CHART_TP"));
	  		
	  		
	  		ITEM_FCL_VAL = rs.getString("ITEM_FCL_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FCL_GRAPH"));
			ITEM_FCL_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		
	  		
	  		ITEM_WTC_VAL = rs.getString("ITEM_WTC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_WTC_GRAPH"));
			ITEM_WTC_GRAPH.add(Chart_Data_tmp);
	  		//CHART_PH.add(rs.getString("CHART_PH")); 
	  		
			ITEM_PCA_VAL = rs.getString("ITEM_PCA_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PCA_GRAPH"));
			ITEM_PCA_GRAPH.add(Chart_Data_tmp);
			
			ITEM_COD_VAL = rs.getString("ITEM_COD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_COD_GRAPH"));
			ITEM_COD_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TOC_VAL = rs.getString("ITEM_TOC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TOC_GRAPH"));
			ITEM_TOC_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TN_VAL = rs.getString("ITEM_TN_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TN_GRAPH"));
			ITEM_TN_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TP_VAL = rs.getString("ITEM_TP_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TP_GRAPH"));
			ITEM_TP_GRAPH.add(Chart_Data_tmp);
			
			ITEM_SRP_VAL = rs.getString("ITEM_SRP_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_SRP_GRAPH"));
			ITEM_SRP_GRAPH.add(Chart_Data_tmp);
			
			ITEM_PB_VAL = rs.getString("ITEM_PB_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PB_GRAPH"));
			ITEM_PB_GRAPH.add(Chart_Data_tmp);
			
			ITEM_ZN_VAL = rs.getString("ITEM_ZN_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_ZN_GRAPH"));
			ITEM_ZN_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CU_VAL = rs.getString("ITEM_CU_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CU_GRAPH"));
			ITEM_CU_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CR_VAL = rs.getString("ITEM_CR_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CR_GRAPH"));
			ITEM_CR_GRAPH.add(Chart_Data_tmp);
			
			ITEM_NI_VAL = rs.getString("ITEM_NI_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_NI_GRAPH"));
			ITEM_NI_GRAPH.add(Chart_Data_tmp);
			
			ITEM_AS_VAL = rs.getString("ITEM_AS_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_AS_GRAPH"));
			ITEM_AS_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CD_VAL = rs.getString("ITEM_CD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CD_GRAPH"));
			ITEM_CD_GRAPH.add(Chart_Data_tmp);
			
			ITEM_HG_VAL = rs.getString("ITEM_HG_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_HG_GRAPH"));
			ITEM_HG_GRAPH.add(Chart_Data_tmp);
			
			ITEM_AL_VAL = rs.getString("ITEM_AL_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_AL_GRAPH"));
			ITEM_AL_GRAPH.add(Chart_Data_tmp);
			
			ITEM_LI_VAL = rs.getString("ITEM_LI_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_LI_GRAPH"));
			ITEM_LI_GRAPH.add(Chart_Data_tmp);
			
			
	  		
	  		
		 if(!preSeq.equals(rs.getString("NO")))
			preSeq = rs.getString("NO"); 
  		
	}
	
	jsonRecord = new JSONObject();
	
	jsonRecord.put("PT_NO",PT_NO);
	jsonRecord.put("PT_NM",PT_NM);
	jsonRecord.put("WMYR",WMYR);
	jsonRecord.put("WMOM",WMOM);
	jsonRecord.put("WMCYMD_VAL",WMCYMD_VAL);
	jsonRecord.put("WMCYMD_GRAPH",WMCYMD_GRAPH);
	jsonRecord.put("MCNT",MCNT);
	jsonRecord.put("JOSANAME",JOSANAME);
	jsonRecord.put("ITEM_DOW_VAL",ITEM_DOW_VAL);
	jsonRecord.put("ITEM_DOW_GRAPH",ITEM_DOW_GRAPH);
	jsonRecord.put("ITEM_TEMP_VAL",ITEM_TEMP_VAL);
	jsonRecord.put("ITEM_TEMP_GRAPH",ITEM_TEMP_GRAPH);
	jsonRecord.put("ITEM_DO_VAL",ITEM_DO_VAL);
	jsonRecord.put("ITEM_DO_GRAPH",ITEM_DO_GRAPH);
	jsonRecord.put("ITEM_PH_VAL",ITEM_PH_VAL);
	jsonRecord.put("ITEM_PH_GRAPH",ITEM_PH_GRAPH);
	jsonRecord.put("ITEM_EC_VAL",ITEM_EC_VAL);
	jsonRecord.put("ITEM_EC_GRAPH",ITEM_EC_GRAPH);
	jsonRecord.put("ITEM_FSD_VAL",ITEM_FSD_VAL);
	jsonRecord.put("ITEM_FSD_GRAPH",ITEM_FSD_GRAPH);
	jsonRecord.put("ITEM_FST_VAL",ITEM_FST_VAL);
	jsonRecord.put("ITEM_FST_GRAPH",ITEM_FST_GRAPH);
	jsonRecord.put("ITEM_FCL_VAL",ITEM_FCL_VAL);
	jsonRecord.put("ITEM_FCL_GRAPH",ITEM_FCL_GRAPH);
	jsonRecord.put("ITEM_WTC_VAL",ITEM_WTC_VAL);
	jsonRecord.put("ITEM_WTC_GRAPH",ITEM_WTC_GRAPH);
	jsonRecord.put("ITEM_PCA_VAL",ITEM_PCA_VAL);
	jsonRecord.put("ITEM_PCA_GRAPH",ITEM_PCA_GRAPH);
	jsonRecord.put("ITEM_COD_VAL",ITEM_COD_VAL);
	jsonRecord.put("ITEM_COD_GRAPH",ITEM_COD_GRAPH);
	jsonRecord.put("ITEM_TOC_VAL",ITEM_TOC_VAL);
	jsonRecord.put("ITEM_TOC_GRAPH",ITEM_TOC_GRAPH);
	jsonRecord.put("ITEM_TN_VAL",ITEM_TN_VAL);
	jsonRecord.put("ITEM_TN_GRAPH",ITEM_TN_GRAPH);
	jsonRecord.put("ITEM_TP_VAL",ITEM_TP_VAL);
	jsonRecord.put("ITEM_TP_GRAPH",ITEM_TP_GRAPH);
	jsonRecord.put("ITEM_SRP_VAL",ITEM_SRP_VAL);
	jsonRecord.put("ITEM_SRP_GRAPH",ITEM_SRP_GRAPH);
	jsonRecord.put("ITEM_PB_VAL",ITEM_PB_VAL);
	jsonRecord.put("ITEM_PB_GRAPH",ITEM_PB_GRAPH);
	jsonRecord.put("ITEM_ZN_VAL",ITEM_ZN_VAL);
	jsonRecord.put("ITEM_ZN_GRAPH",ITEM_ZN_GRAPH);
	jsonRecord.put("ITEM_CU_VAL",ITEM_CU_VAL);
	jsonRecord.put("ITEM_CU_GRAPH",ITEM_CU_GRAPH);
	jsonRecord.put("ITEM_CR_VAL",ITEM_CR_VAL);
	jsonRecord.put("ITEM_CR_GRAPH",ITEM_CR_GRAPH);
	jsonRecord.put("ITEM_NI_VAL",ITEM_NI_VAL);
	jsonRecord.put("ITEM_NI_GRAPH",ITEM_NI_GRAPH);
	jsonRecord.put("ITEM_AS_VAL",ITEM_AS_VAL);
	jsonRecord.put("ITEM_AS_GRAPH",ITEM_AS_GRAPH);
	jsonRecord.put("ITEM_CD_VAL",ITEM_CD_VAL);
	jsonRecord.put("ITEM_CD_GRAPH",ITEM_CD_GRAPH);
	jsonRecord.put("ITEM_HG_VAL",ITEM_HG_VAL);
	jsonRecord.put("ITEM_HG_GRAPH",ITEM_HG_GRAPH);
	jsonRecord.put("ITEM_AL_VAL",ITEM_AL_VAL);
	jsonRecord.put("ITEM_HG_GRAPH",ITEM_AL_GRAPH);
	
	jsonArr.add(jsonRecord);
	
	jsonObj.put("data", jsonArr);
	
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	//System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>