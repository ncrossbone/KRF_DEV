<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String update = request.getParameter("update");
%>
<script type="text/javascript">
function changePassword(form) {
	var newPassword = form.newPassword;
	var confirmPassword = form.confirmPassword;
	if (!newPassword.value) {
		alert("Please enter a new password");
		return;
	}
	
	if (!confirmPassword.value) {
		alert("Please enter your password to be newly applied");
		return;
	}
	
	if (newPassword.value == confirmPassword.value) {
		/* var obj = {
			newPassword : newPassword,
			currentPassword : currentPassword
		};
		
		$.ajax({
			type : "post",
			data : obj,
			url : "./index.jsp?ClipID=A151",
			success: function (param) {
				if (param.status) {
					location.href = "./index.jsp";	
				} else {
					alert("The current password and change the password does not match.");
				}
			},
			error : function (param) {
				alert("Ajax error : " + param);
			}
		}); */
		
		form.submit();	
	} else {
		alert("Please enter the password again incorrect to be newly applied");
	}
}
</script>
<div class="container">
	<div class="page-header">
		<h3>Changing the Administrator Password</h3>
	</div>
	<!-- <p>If you modify the password to the encryption Please remember the password , you have to stay </p> -->
	</br>
	
	<div style="width: 1200px; margin: 0px auto;">
		<form action="index.jsp" method="post">
			<input type="hidden" name="ClipID" value="A151">
			<div class="control-group">
			    <label class="control-label">Current Password</label>
			    <div class="controls">
					<input type="password" name="currentPassword"  maxlength="15" placeholder=""/>    
			    </div>
			</div>
	        
	        <div class="control-group">
			    <label class="control-label">New Password</label>
			    <div class="controls">
					<input type="password" name="newPassword" maxlength="15" placeholder=""/>    
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Confirmation of the new password</label>
				<input type="password" name="confirmPassword" maxlength="15" placeholder=""/>				
			</div>
		    
		    <div class="control-group">    
				<label class="checkbox inline"> <input type="checkbox" name="encrypt"> Encrypt </label>
			</div>				
	        
	        <div class="control-group">
		        <button type="button" class="btn btn-primary" onclick="changePassword(this.form)">OK</button>
		      	<a class="btn" type="button" href="index.jsp">Cancel</a>
	      	</div>
		 </form>
	</div>
</div>
<script type="text/javascript">
	<% if (update != null && update.equals("false")) { %>
			alert("Current password does not match .");'
	<% } else %>
</script>
