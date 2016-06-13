<%@page import="com.clipsoft.clipreport.server.service.drm.ClipReportDRM"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
out.clear();
out=pageContext.pushBody();
ClipReportDRM.verify(request, response);
%>