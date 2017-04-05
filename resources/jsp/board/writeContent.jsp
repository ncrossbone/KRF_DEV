<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<title>KRF-공지사항</title>
<link href="./css/BasicSet.css" rel="stylesheet" type="text/css" />
<link href="./css/board.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./js/board.js"></script>
<script type="text/javascript">
	
	function cancelWriting(){
		if(confirm('게시글 작성을 취소하시겠습니까?')){
			//location.href='./GetBoard.jsp';
			history.back();
		}
	}
	function submitWriting(){
		
		var title = document.getElementById("title").value;
		var contents = document.getElementById("contents").value;
		var type = document.getElementById("boardType").value;
		var seq = document.getElementById("seq").value;
		var uploadFile = document.getElementById("uploadFile").value;
		
		var fileNameSplit = uploadFile.split("\\");
		var fileName = fileNameSplit[fileNameSplit.length - 1];
		
		if(title == '' || title == null){
			alert('제목을 입력하여주십시오.');
			return;
		}
		
		if(contents == '' || contents == null){
			alert('내용을 입력하여주십시오.');
			return;
		}
		contents = checkCharater(contents);

		title = encodeURIComponent(title);
		contents = encodeURIComponent(contents);
		
		var url = 'title='+title+'&contents='+contents+'&boardType='+type+'&seq='+seq+'&fileName='+fileName;
		
		if(confirm('게시글을 등록하시겠습니까?')){
			
			//location.href = './writeBoard.jsp?'+url;
			document.getElementById('fileForm').submit();
			
		}
		
		
	}
	
	function selectChange(val){
		document.getElementById("boardType").value = val ;
	}
	
</script>

<form name="fileForm" id="fileForm" method="post" action="writeBoard.jsp" enctype="multipart/form-data">
<div class="boardArea" style='margin-top:20px; margin-left:10px;'>
    <table class="fullFrame MgT15" summary="공지사항 혹은 Q&A ">
        <colgroup>
            <col width="120" />
            <col />
        </colgroup>
        <thead>
        	<tr>
                <th>제목</th>
                <td class="AL PdL15"><input type="text" name="title" id="title" value="" size="69" maxlength="200" /></td>
            </tr>
            <tr>
                <th>게시글 종류</th>
                <td class="AL PdL15">
                	<select class="W100 fl" onchange="selectChange(this.value);">
			            <option value="1" >Q & A</option>
			            <option value="2" >공지사항</option>
			        </select>
                </td>
            </tr>
            <tr>
                <th>첨부파일</th>
                <td class="AL PdL15"><input type="file" name="uploadFile" id="uploadFile" /></td>
            </tr>
        </thead>
        <tbody>
        	<tr>
            	<td class="AL Pd20"colspan="2">
                	<textarea name="contents" cols="" rows="" class="contsWrite H250" id="contents"></textarea>
                </td>
            </tr>
        </tbody>
    </table>
    <input type="hidden" id="seq" value="" readonly="readonly"/>
    <input type="hidden" name="boardType" id="boardType" value="1" readonly="readonly"/>

<%@ include file="dbConn.jsp" %>
<%
try{
	
	String seq = request.getParameter("seq");
	
	StringBuffer sb = new StringBuffer();
	
	if(seq != null && !"".equals(seq)){
		
		sb.append("\n SELECT SEQ                                   ");
		sb.append("\n       ,TITLE                                 ");
		sb.append("\n       ,TO_CHAR(REGDT,'YYYY-MM-DD') AS REGDT  ");
		sb.append("\n       ,BOARD_CONTENTS                        ");
		sb.append("\n   FROM KRF_BOARD ");
		sb.append("\n  WHERE SEQ = ").append(seq);	
		
		stmt = con.createStatement();   
		sql = sb.toString();
		rs = stmt.executeQuery(sql);
		
		//System.out.println(sql);
		
		while(rs.next()){
%>
<script type="text/javascript">
	var boardContents = '<%= rs.getString("BOARD_CONTENTS") %>';
	
	boardContents = boardContents.replace(/<br>/g, "\r\n");
	
	document.getElementById("title").value = '<%= rs.getString("TITLE") %>';
	document.getElementById("contents").value = boardContents;
	document.getElementById("seq").value = '<%= rs.getString("SEQ") %>';
</script>
<%		
		}
	}
	

%>

     <div class="btnArea2 fr MgT20" id="btnArea">
     <%if(seq != null && !"".equals(seq)){ %>
    	<a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="modifyBtn" onclick="javascript:submitWriting();">수정</a>
     <%} %>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="removeBtn" onclick="javascript:cancelWriting();">취소</a>
        <!-- <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="listBtn"   onclick="location.href='./GetBoard.jsp'">목록</a> -->
     <%if(seq == null || "".equals(seq)){ %>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="newBtn"    onclick="javascript:submitWriting();">등록</a>
     <%} %>
    </div>
</div>
</form>
<%

//out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>

