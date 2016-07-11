<%@page import="com.clipsoft.clipreport.ReportUtil"%>
<%@page import="com.clipsoft.clipreport.common.enums.FtpEnterMode"%>
<%@page import="com.clipsoft.clipreport.common.server.util.FtpParameter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%
/************************************
아래의 예제는 ftp를 통한 파일 전송 예제 입니다.
별도의  export (pdf, excel, ppt 등) 와 함께 사용하여 사용 하실 수 있습니다.
ftp에 대한 결과 메시지(message)를 통하여 정상적으로 전송이 되었는지 알 수 있습니다 
************************************/
FtpParameter ftpParameter = new FtpParameter();
ftpParameter.setFtpSync(true);
ftpParameter.setFtpEnterMode(FtpEnterMode.PASSIVE);
ftpParameter.setFtpServerIp("192.168.1.27"); //전송할 서버 IP
ftpParameter.setFtpServerPort("21");              //전송할 서버 FTP PORT
ftpParameter.setFtpAccount("test123");               //ID
ftpParameter.setFtpPassword("test123");              //PASSWORD
ftpParameter.setFilePaths("c:\\temp1\\");
ftpParameter.setFileNames("font.crf");
ftpParameter.setUploadFtpPaths("/ftpTest");     //전송할 위치
	 
String message = ReportUtil.sendFTP(ftpParameter);

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>FTP Sample</title>
</head>
<body>
<%=message%>
</body>
</html>