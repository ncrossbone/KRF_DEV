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

//파라미터
//String param1 = request.getParameter("param1");
//String param2 = request.getParameter("param2");


//위에서 받은 파라미터로 OOF를 구성
OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIP.crf");


response.setContentType("text/html");
OutputStream fileStream = response.getOutputStream();

ClipReportExport.createExportForEngine(request, fileStream, propertyPath, oof.toString());
%>