<%@page import="com.clipsoft.clipreport.export.option.ExcelXOption"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../Property.jsp"%>
<%
OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIP.crf");

out.clear(); // where out is a JspWriter
out = pageContext.pushBody();

//서버에 파일로 저장 할 때
//File localFileSave = new File("c:\\test.xlsx");
//OutputStream fileStream = new FileOutputStream(localFileSave);

//클라이언트로 파일을 내릴 때
String fileName = "report.xlsx";
response.setContentType("application/octet-stream; charset=UTF-8");
response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ";");
OutputStream fileStream = response.getOutputStream();

//클라이언트 브라우져에서 바로 보는 방법(헤더 변경)
//response.setContentType("application/excel");
//OutputStream fileStream = response.getOutputStream();


//엑셀저장에 대한 옵션을 설정합니다.
ExcelXOption excelOption = new ExcelXOption();
/*  exportMethod {Integer} 
0 = 페이지마다
1 = 하나의 시트 
2 = 하나의 시트(페이지 영역 무시) 
3 = 리포트마다 
4 = 리포트마다 (페이지 영역 무시)
*/
 excelOption.setExportMethod(0);  
/* mergeCell {Boolean} 셀 합치기*/
excelOption.setMergeCell(true);
/* mergeEmptyCell {Boolean} 공백 셀일 경우 합치기*/
excelOption.setMergeEmptyCell(false);
/* splitCellAtPageSize {Boolean} 페이지 크기로 셀 분리*/
excelOption.setSplitCellAtPageSize(true);
/* rightToLeft {Boolean} 열이 오른쪽에서 왼쪽으로 진행*/
excelOption.setRightToLeft(false);
/* widthRate {Integer} 가로 비율*/
excelOption.setWidthRate(100);
/* heightRate {Integer} 세로 비율*/
excelOption.setHeightRate(100);
/* coordinateErrorLimit {Integer} 좌표 오차 범위*/
excelOption.setCoordinateErrorLimit(10);
/* processGerenalFormat {Integer}
  0 = 텍스트
  1 = 일반*/
excelOption.setProcessGeneralFormat(0);
/*  printingMagnification {Integer} 인쇄 확대/축소 비율*/
excelOption.setPrintingMagnification(100);

int statusType = ClipReportExport.createExportForExcelX(request, fileStream, propertyPath, oof, excelOption);
//statusType == 0 정상적인 출력
//statusType == 1 인스톨 오류
//statusType == 2 oof 문서 오류
//statusType == 3 리포트 엔진 오류
//statusType == 4 Excel 출력 오류
%>