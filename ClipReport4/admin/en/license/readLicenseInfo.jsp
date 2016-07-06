<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%
	String licenseNo = (String) request.getAttribute("licenseNo");
	String customer = (String) request.getAttribute("customer");
	String issueDate = (String) request.getAttribute("issueDate");
	String expireDate = (String) request.getAttribute("expireDate");
	String project = (String) request.getAttribute("project");
	String ipAddress = (String) request.getAttribute("ipAddress");
	String cpu = (String) request.getAttribute("cpu");
%>

<div class="container">
	<div class="page-header">
		<h3>License Information Page</h3>
	</div>

	<div style="width: 60%; margin: 0px auto; padding-top:70px">
		<div class="table-responsive">

			<!-- Table Header -->
			<div>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th width="20%"
								style="text-align: center; vertical-align: text-bottom; background-color: #005ECC; color: white;">Key</th>
							<th width="80%"
								style="text-align: center; vertical-align: text-bottom; background-color: #005ECC; color: white;">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style="text-align:center; ">LicenseNo</td>
							<td style="text-align:center;"><%=licenseNo%></td>
						</tr>
						<tr>
							<td style="text-align:center;">Customer</td>
							<td style="text-align:center;"><%=customer%></td>
						</tr>

						<tr>
							<td style="text-align:center;">IssueDate</td>
							<td style="text-align:center;"><%=issueDate%></td>
						</tr>

						<tr>
							<td style="text-align:center;">ExpireDate</td>
							<td style="text-align:center;"><%=expireDate%></td>
						</tr>

						<tr>
							<td style="text-align:center;">Project</td>
							<td style="text-align:center;"><%=project%></td>
						</tr>

						<tr>
							<td style="text-align:center;">IP Address</td>
							<td style="text-align:center;"><%=ipAddress%></td>
						</tr>

						<tr>
							<td style="text-align:center;">Cpu</td>
							<td style="text-align:center;"><%= cpu%></td>
						</tr>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
