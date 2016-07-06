<%@page import="com.clipsoft.clipreport.server.service.ExportInfo"%>
<%@page import="com.clipsoft.clipreport.export.option.PPTOption"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
out.clear(); // where out is a JspWriter
out = pageContext.pushBody();

//리포트 키를 받아서 처리 합니다. (report_key 파라미터 이름은 변경하여도 상관 없습니다)
String report_key = request.getParameter("report_key");

if(null != report_key){
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

	ExportInfo exportInfo = ClipReportExport.createExportForPartPPT(request, report_key, fileStream, pptOption);
	int errorCode = exportInfo.getErrorCode();
	//errorCode == 0 정상
	//errorCode == 1 세션안에 리포트정보가 없을 때 오류 
	//errorCode == 2 리포트 서버가 설치가 안되어 있을 때 오류 
	//errorCode == 3 결과물(document) 파일을 찾지 못할 때 발생하는 오류
	//errorCode == 4 PPT 파일 생성 오류
}
%>