<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String update = (String) request.getParameter("Update");
	String isLoadBalancing = (String) request.getAttribute("isLoadBalancing");
	String isAlwaysPng = (String) request.getAttribute("isAlwaysPng");
	String isEachReport = (String) request.getAttribute("isEachReport");
	String reportFolderPath = (String) request.getAttribute("reportFolderPath");
	String fontFolderPath = (String) request.getAttribute("fontFolderPath");
	String defaultFontFile = (String) request.getAttribute("defaultFontFile");
	String isSystemFont = (String) request.getAttribute("isSystemFont");
	String isConsoleLog = (String) request.getAttribute("isConsoleLog");
	String isFileLog = (String) request.getAttribute("isFileLog");
	String isDBLog = (String) request.getAttribute("isDBLog");
	String logDBFilePath = (String) request.getAttribute("logDBFilePath");
	String logFolderPath = (String) request.getAttribute("logFolderPath");
	String isLogInfo = (String) request.getAttribute("isLogInfo");
	String isLogWarning = (String) request.getAttribute("isLogWarning");
	String isLogError = (String) request.getAttribute("isLogError");
	String isLogDebug = (String) request.getAttribute("isLogDebug");
	
	if (isDBLog.equals("false")) {
		logDBFilePath = "";
	}
	
	if (logFolderPath.equals("false")) {
		logFolderPath = "";
	}
%>
<div class="container">
	<div class="page-header">
		<h3>엔진 기본설정 페이지</h3>
	</div>
	<div style="width:100%; height:90%; margin:0px auto;">
		<div class="row">
			<div class="span12">
				<form class="form" action="index.jsp" method="post">
					<input type="hidden" name="ClipID" value="L152">
					
					<table class="table table-bordered table-condensed ">
						<tbody>
							<tr>
								<td colspan="4" style="vertical-align: middle; text-align:center; background-color: #005ECC; color: white;">Report Engine Configuration</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">LoadBalancing</td> 
								<td colspan="3">
									<div class="control-group">
									<% if (isLoadBalancing.equals("true")) { %>
										<label class="checkbox"> <input type="checkbox" name="isLoadBalancing" checked> LoadBalancing   </label>
									<% } else { %>
										<label class="checkbox"> <input type="checkbox" name="isLoadBalancing" > LoadBalancing </label>
									<% } %>
									<p>리포트 생성 서버가 2대이상 있을경우 설정하는 옵션입니다.</p>
									</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">Always PNG</td> 
								<td colspan="3">
									<div class="control-group">
									<% if (isAlwaysPng.equals("true")) { %>
										<label class="checkbox"> <input type="checkbox" name="isAlwaysPng" checked> Always PNG </label>
									<% } else { %>
										<label class="checkbox"> <input type="checkbox" name="isAlwaysPng" > Always PNG </label>
									<% } %>
									<p>OpenJDK 환경에서 이미지를 항상 PNG로 저장을 하기 위한 옵션입니다.</p>
									</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">EachReport</td>
								<td colspan="3">
									<div class="control-group">
									<% if (isEachReport.equals("true")) { %>
										<label class="checkbox"> <input type="checkbox" name="isEachReport" checked> EachReport </label>
									<% } else { %>
										<label class="checkbox"> <input type="checkbox" name="isEachReport" > EachReport </label>
									<% } %>
									<p>리포트를 개별적으로 폴더를 생성하여 만들것인지를 결정합니다.</p>
									</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">ReportFolderPath</td> 
								<td colspan="3">
									<div class="controls">
									<input type="text" class="input-xxlarge" id="reportFolderPath" name="reportFolderPath" placeholder="ReportFolderPath" disabled value="<%=reportFolderPath%>">
									</div>
									<div>
										리포트 Temporary 파일들이 저장될 경로를 뜻합니다.
									</div>	
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">FontFolderPath</td> 
								<td colspan="3">
									<div class="controls">
										<input type="text" class="input-xxlarge" id="fontFolderPath" name="fontFolderPath" placeholder="FontFolderPath" disabled value="<%=fontFolderPath%>">
									</div>	
									<div>
										폰트들을 관리할 폴더경로를 뜻합니다.
								</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">DefaultFontFile</td>
								<td colspan="3">
									<div class="controls">
										<input type="text" class="input-xxlarge" id="defaultFontFile" name="defaultFontFile" placeholder="DefaultFontFile" disabled value="<%=defaultFontFile%>">
									</div>	
									<div>
										디자이너에서 사용된 폰트가 현재 서버에 없을경우 대체되는 기본폰트입니다.
									</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">SystemFont</td> 
								<td colspan="3">
									<div class="control-group">
									<% if (isSystemFont.equals("true")) { %>
										<label class="checkbox"> <input type="checkbox" name="isSystemFont" checked> SystemFont </label>
									<% } else { %>
										<label class="checkbox"> <input type="checkbox" name="isSystemFont" >  SystemFont  </label>
									<% } %>
									<p>시스템환경에 설정되어있는 Font들을 사용할것인지를 결정합니다.</p>
									</div>
								</td>
							</tr>
							
							<tr>
								<td colspan="4" style="text-align:center; background-color: #005ECC; color: white;" >Report Log Configuration</td>
							</tr>
							<tr>
								<!-- <td>Log Write Type</td> <td>Console : Was Console환경 로그출력, File : 파일에 로그저장, Database : Database파일에 로그 저장</td> -->
								<td style="vertical-align: middle;">Log Write Type</td> 
								<td>
									<div class="control-group" >
							         	 <% if (isConsoleLog.equals("true")) { %>
											<label class="checkbox inline"> <input type="checkbox" name="isConsoleLog" checked> Console </label>
										<% } else { %>
											<label class="checkbox inline"> <input type="checkbox" name="isConsoleLog" > Console </label>
										<% } %>
										
										<% if (isFileLog.equals("true")) { %>
											<label class="checkbox inline"> <input type="checkbox" name="isFileLog" checked> File </label>
										<% } else { %>
											<label class="checkbox inline"> <input type="checkbox" name="isFileLog" >  File  </label>
										<% } %> 
										
										<% if (isDBLog.equals("true")) { %>
											<label class="checkbox inline"> <input type="checkbox" name="isDBLog" checked> Database </label>
										<% } else { %>
											<label class="checkbox inline"> <input type="checkbox" name="isDBLog" >  Database  </label>
										<% } %> 
								    </div>
								</td>
								<td style="vertical-align: middle;">Log Level</td>
								<td>
									<div class="control-group" >
							          <% if (isLogInfo.equals("true")) { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogInfo" checked> Info </label>
									<% } else { %>
									 	<label class="checkbox inline"> <input type="checkbox" name="isLogInfo" > Info </label>
									<% } %>
										
									<% if (isLogWarning.equals("true")) { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogWarning" checked> Warning </label>
									<% } else { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogWarning" > Warning </label>
									<% } %>
									
									<% if (isLogError.equals("true")) { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogError" checked> Error </label>
									<% } else { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogError" > Error </label>
									<% } %>
										
									<% if (isLogDebug.equals("true")) { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogDebug" checked> Debug </label>
									<% } else { %>
										<label class="checkbox inline"> <input type="checkbox" name="isLogDebug" > Debug </label>
									<% } %>
								    </div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">Log Database FilePath</td> 
								<td>
									<div class="controls">
										<input type="text" class="input-xlarge" id="logFilePath" name="logDBFilePath" placeholder="Log Database FilePath" value="<%=logDBFilePath%>">
									</div>
								</td>
								<td style="vertical-align: middle;">Log FolderPath</td> 
								<td>
									<div class="controls">
										<input type="text" class="input-xlarge" id="logFolderPath" name="logFolderPath" placeholder="LogFolderPath" value="<%=logFolderPath%>">
									</div>
								</td>
							</tr>
							<tr>
								<%-- <td>Log FolderPath</td> 
								<td>
									<div class="controls">
										<input type="text" class="input-xxlarge" id="logFolderPath" name="logFolderPath" placeholder="LogFolderPath" value="<%=logFolderPath%>">
									</div>
								</td> --%>
							</tr>
							<tr>
								<!-- <td>Log Level</td>
								<td>
									<div class="btn-group" data-toggle="buttons-radio">
							          <button class="btn" id="isLogInfo">Info</button>
							          <button class="btn" id="isLogWaring">Warning</button>
							          <button class="btn" id="isLogError">Error</button>
							          <button class="btn" id="isLogDebug">Debug</button>
								    </div>
								</td> -->
							</tr>
						</tbody>
					</table>					
					<div class="control-group" style="padding-top: 10px;">
						<button type="submit" class="btn btn-primary"><i class="icon-edit icon-white"></i> 설정</button>
					</div>
				</form>
			</div>
		</div> 
	</div>
</div>

<script type="text/javascript">
	<% if (update != null && update.equals("false")) { %>
			alert("로그파일 경로가 잘못되었습니다. 다시 설정해주세요.")
	<% } else %>
</script>

