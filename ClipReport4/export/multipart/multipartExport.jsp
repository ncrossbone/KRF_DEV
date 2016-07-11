<%@page import="com.clipsoft.clipreport.server.service.export.ExportStatusInfo"%>
<%@page import="com.clipsoft.clipreport.export.option.JPGOption"%>
<%@page import="com.clipsoft.clipreport.export.option.PDFOption"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../Property.jsp"%>
<%
out.clear(); // where out is a JspWriter
out = pageContext.pushBody();

OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIP.crf");


//리포트 엔진을 실행시킨다. 리포트 템프 파일을 생성한다.
ExportStatusInfo exportStatus = ClipReportExport.EngingeRun(request, propertyPath, oof);
//exportStatus.getErrorType()
//ErrorType == 0 정상적인 출력
//ErrorType == 1 인스톨 오류
//ErrorType == 2 oof 문서 오류
//ErrorType == 3 리포트 엔진 오류

//서버에 PDF파일로 저장 할 때
File localFileSave = new File("c:\\temp1\\aa\\test.pdf");
OutputStream fileStream = new FileOutputStream(localFileSave);

PDFOption option = null;
/*
option = new PDFOption();
option.setUserPassword("사용자(읽기) 암호");
option.setOwnerPassword("저자(쓰기) 암호");
option.setTextToImage(true); // 글자를 이미지로 처리 - unicode 처리시 사용
option.setNumCopies(1); // 프린팅 매수 미리 설정
option.setImportOriginImage(true); // 원본 이미지 삽입
*/
ClipReportExport.exportForPDF(exportStatus, fileStream, option);
fileStream.close();
//exportStatus.getErrorType()
//ErrorType == 0 정상적인 출력
//ErrorType == 4 리포트 엔진 오류

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
ClipReportExport.exportForJPG(exportStatus, jpgOption);
//exportStatus.getErrorType()
//ErrorType == 0 정상적인 출력
//ErrorType == 4 리포트 엔진 오류

//리포트 관련 템프 파일 삭제
ClipReportExport.deleteReportFile(exportStatus);
%>