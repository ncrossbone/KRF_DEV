<%@page import="com.clipsoft.clipreport.export.option.PPTOption"%>
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
File localFileSave = new File("c:\\test.ppt");
OutputStream fileStream = new FileOutputStream(localFileSave);

//클라이언트로 파일을 내릴 때
//String fileName = "report.ppt";
//response.setContentType("application/octet-stream; charset=UTF-8");
//response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ";");
//OutputStream fileStream = response.getOutputStream();

//클라이언트 브라우져에서 바로 보는 방법(헤더 변경)
//response.setContentType("application/ppt");
//OutputStream fileStream = response.getOutputStream();

PPTOption pptOption = new PPTOption();

//이웃한 테이블과 병합할 것인지 여부
pptOption.setMergeTable(false);
//행간에 라인 영역 무시
pptOption.setIgnoreLineSpace(true);

int statusType = ClipReportExport.createExportForPPT(request, fileStream, propertyPath, oof, pptOption);
//statusType == 0 정상적인 출력
//statusType == 1 인스톨 오류
//statusType == 2 oof 문서 오류
//statusType == 3 리포트 엔진 오류
//statusType == 4 PPT 출력 오류
%>