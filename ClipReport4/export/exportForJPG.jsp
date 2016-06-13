<%@page import="com.clipsoft.clipreport.export.option.JPGOption"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../Property.jsp"%>
<%

out.clear(); // where out is a JspWriter
out = pageContext.pushBody();


OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIP.crf");

//서버에 지정 폴더 저장 할 때
String fileName = "c:\\report.jpg";

JPGOption jpgOption = new JPGOption();
//저장파일 
jpgOption.setOutputFilename(fileName);
//X DPI 설정
jpgOption.setDpiX(96);
//Y DPI 설정
jpgOption.setDpiY(96);
//품질(1~100)
jpgOption.setQuality(100);
//회전
jpgOption.setRotate90(false);

int statusType = ClipReportExport.createExportForJPG(request, propertyPath, oof, jpgOption);
//statusType == 0 정상적인 출력
//statusType == 1 인스톨 오류
//statusType == 2 oof 문서 오류
//statusType == 3 리포트 엔진 오류
//statusType == 4 img 출력 오류
%>