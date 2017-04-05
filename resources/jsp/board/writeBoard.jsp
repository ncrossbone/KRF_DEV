<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@page import="java.io.File"%>
<%@page import="com.oreilly.servlet.MultipartRequest" %>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy" %>
<%@page import="java.io.*" %>
<%@page import="java.util.Date" %>
<%@page import="java.text.SimpleDateFormat" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>

<%
    request.setCharacterEncoding("UTF-8");
    
	int maxSize = 10*1024*1024;
    String realFolder = getServletContext().getRealPath("/resources/upload");
    // 다운받을 파일의 전체 경로를 filePath에 저장
    String savePath = realFolder + "\\";
    
    String format = "UTF-8";
    String uploadFile="";
    
    int read = 0;
    
    byte[] buf = new byte[1024];
    
    String code = "";
    try{
        MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, format, new DefaultFileRenamePolicy());
        
        String title = multi.getParameter("title");
        String type = multi.getParameter("boardType");
        String seq = multi.getParameter("seq");
        String contents = multi.getParameter("contents");
        
        uploadFile = multi.getFilesystemName("uploadFile");
        
        StringBuffer sb = new StringBuffer();
    	
    	if(seq != null && !"".equals(seq)){
    		sb.append("\n UPDATE KRF_BOARD        ");
    		sb.append("\n    SET TITLE = '").append(title).append("'");
    		sb.append("\n       ,BOARD_CONTENTS = '").append(contents).append("'");
    		sb.append("\n  WHERE SEQ = ").append(seq);
    		sb.append("\n    AND TYPE = '").append(seq).append("'");
    	} else {
    		sb.append("\n INSERT INTO KRF_BOARD VALUES ");
    		sb.append("\n (                            ");
    		sb.append("\n  KRF_BOARD_SEQ.NEXTVAL       ");
    		sb.append("\n ,'").append(title).append("'");
    		sb.append("\n ,'").append(contents).append("'");
    		sb.append("\n ,SYSDATE                     ");
    		sb.append("\n ,'").append(type).append("'");
    		sb.append("\n ,'").append(uploadFile).append("')");                            
    	}
    	
    	sql = sb.toString();
    	
    	//System.out.println(sql);
    	
    	stmt = con.createStatement();   
    	rs = stmt.executeQuery(sql);
    	
    	
    	request.setAttribute("code", "success");
    	
    	code = (String)request.getAttribute("code");




    }catch(Exception e){
    	System.out.println(e);
        e.printStackTrace();
        
        request.setAttribute("code", "error");
    	code = (String)request.getAttribute("code");
    }
    
%>

<%@ include file="dbClose.jsp" %>

<script type="text/javascript">
	
if('<%=code%>' == 'error'){
	alert('게시글 등록에 실패하였습니다.');	
	history.back();
} else {
	alert('게시글이 등록되었습니다.');		
	location.href="./GetBoard.jsp";
}
	
	
</script>
