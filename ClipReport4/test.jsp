<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.oof.connection.*"%>
<%@page import="java.io.File"%>
<%@page import="com.clipsoft.clipreport.server.service.ReportUtil"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
//이전 페이지 키값
String param = request.getParameter("value");

OOFDocument oof = OOFDocument.newOOF();

//넘어갈 파라미터 값
oof.addField("TEST",param);

OOFFile file = oof.addFile("crf.root", "%root%/crf/chart_CLIP.crf");
alert("2");

//파라미터로 검색하기 위해 필수
oof.addConnectionData("*","oracle1");

%><%@include file="Property.jsp"%><%
//세션을 활용하여 리포트키들을 관리하지 않는 옵션
//request.getSession().setAttribute("ClipReport-SessionList-Allow", false);
String resultKey =  ReportUtil.createReport(request, oof, "false", "false", request.getRemoteAddr(), propertyPath);

//oof 문서가 xml 일 경우 (oof.toString())
//String resultKey =  ReportUtil.createReport(request, oof.toString(), "false", "false", "localhost", propertyPath);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Report</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css" href="./css/clipreport.css">
<link rel="stylesheet" type="text/css" href="./css/UserConfig.css">
<link rel="stylesheet" type="text/css" href="./css/font.css">
<script type='text/javascript' src='./js/clipreport.js'></script>
<script type='text/javascript' src='./js/jquery-1.11.1.js'></script>
<script type='text/javascript' src='./js/UserConfig.js'></script>
<script type='text/javascript'>
var urlPath = document.location.protocol + "//" + document.location.host;
alert("3s");
function html2xml(divPath){	
    var reportkey = "<%=resultKey%>";
	var report = createImportJSPReport(urlPath + "/KRF_DEV/ClipReport4/Clip.jsp", reportkey, document.getElementById(divPath));
    //실행
    //report.setSlidePage(true);
    report.view();
}
</script>
</head>
<button onclick="html2xml('targetDiv1')">리포트</button>
<div id='targetDiv1' style='position:absolute;top:50px;left:5px;right:5px;bottom:5px;'></div>
</html>
