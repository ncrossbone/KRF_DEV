<%@page import="com.clipsoft.clipreport.export.option.PDFOption"%>
<%@page import="com.clipsoft.clipreport.oof.connection.OOFConnectionHTTP"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@ page import="java.util.*,java.io.*, java.text.*,  java.lang.Integer, java.net.*" %>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="com.clipsoft.clipreport.server.service.ResultValue"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportPDFForMark"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="Property.jsp"%>
<%
OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIPtoDRM.crf");


//pdf 생성할 때 옵션
PDFOption option = new PDFOption();
//텍스트를 이미지로 표현할지 여부
//option.setTextToImage(true);

ResultValue result = ClipReportPDFForMark.create(request, propertyPath, oof.toString(), option);
int errorCode = result.getErrorCode();
//errorCode == 0 정상
//errorCode == 1 리포트 서버  오류
//errorCode == 2 oof 문서 오류
//errorCode == 3 리포트 엔진 오류
//errorCode == 4 결과물(document) 파일을 찾을 수 없을 때 오류
//errorCode == 5 pdf, dat 생성시 오류

//이전 방식도 사용가능
//ResultValue result = ClipReportPDFForMark.create(request, propertyPath, oof.toString());

//바코드로 만든 데이터 파일 위치
//result.getDataFilePath();

//생성된 pdf 파일 위치
//result.getPdfFilePath();

//바코드가 들어갈 좌표
//result.getLeft();
//result.getTop();

//문서의 세로, 가로
//세로 0
//가로 1
//int paperOrientation = result.getPaperOrientation();


//임시 저장 삭제
ClipReportPDFForMark.delete(result);

%>
