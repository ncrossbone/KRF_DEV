<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="./loginCheck.jsp" %>
<form style="float:left; padding-top:20px;" action="index.jsp" method="post">
	<div class="control-group">
		<input type="hidden" name="ClipID" value="A02">
		<input type="hidden" name="page" value="<%=request.getQueryString()%>" />
		<a class="btn btn-primary" href="index.jsp?ClipID=A02"><i class="icon-off icon-white"></i> Logout</a>
	</div>
</form>