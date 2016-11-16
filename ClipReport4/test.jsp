<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.oof.connection.*"%>
<%@page import="java.io.File"%>
<%@page import="com.clipsoft.clipreport.server.service.ReportUtil"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String paramCode = request.getParameter("paramCode");
String startYear = request.getParameter("startYear");
String endYear = request.getParameter("endYear");
String imgPath = request.getParameter("imgPath");

//경로 "\\" javascript에서 출력불가 "," 로 대체 ph
String replaceImgPath;
replaceImgPath = imgPath.replace("\\",",");

OOFDocument oof = OOFDocument.newOOF();

//넘어갈 파라미터 값
oof.addField("PARAM_CODE",paramCode);
oof.addField("START_YR",startYear);
oof.addField("END_YR",endYear);
oof.addField("IMG_PATH",imgPath);

OOFFile file = oof.addFile("crf.root", "%root%/crf/Report_year.crf");

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
<script>

var _imgPath = "<%=replaceImgPath%>";

	//이미지 경로 "," -> "//"로 대체
	//UserConfig.js 에서 호출
	//2016.10.18 ph
	function imgPathReplace() {

		var replaceImgPath;
		replaceImgPath = _imgPath.replace(/,/g, "\\");

		return replaceImgPath;
	}

	//이미지 제거
	//UserConfig.js 에서 호출
	//2016.10.18 ph
	function imgDelete(replaceImgPath) {

		var svgPath = getSvgPngPath(replaceImgPath, "svg");
		var pngPath = getSvgPngPath(replaceImgPath, "png");
		
		$.ajax({
			type : "POST",
			url : "../resources/jsp/ImgDelete.jsp",
			data : {
				resultParam : replaceImgPath,
				svgParam : svgPath,
				pngParam : pngPath
			}
		}).done(function(response) {
		});

	}
	
	// svg,png 경로 가져오기
	// 2016.10.19 ph
	function getSvgPngPath(replaceImgPath, condition) {

		var splitReplaceImgPath = replaceImgPath.split("\\");
		var splitName = splitReplaceImgPath[splitReplaceImgPath.length - 1].split("_");
		var splitExt = splitName[1].split(".");
		var path = "";

		for (var i = 0; i < splitReplaceImgPath.length - 1; i++) {
			path += splitReplaceImgPath[i] + "\\";
		}

		var result = path + "svg_" + splitExt[0];

		if (condition == "svg") {
			result += ".svg";
		} else if (condition == "png") {
			result += ".png";
		}

		return result;
	}
</script>
<script type='text/javascript' src='./js/clipreport.js'></script>
<script type='text/javascript' src='./js/jquery-1.11.1.js'></script>
<script type='text/javascript' src='./js/UserConfig.js'></script>
<script type='text/javascript'>
var urlPath = document.location.protocol + "//" + document.location.host;
function html2xml(divPath){
    var reportkey = "<%=resultKey%>";
    // 리포트 상대경로 path
    // 2016.11.01 - ph
    var locationPathName = document.location.pathname;
    var splitLocation = locationPathName.split("/");
    var localUrl = "/";

    for(var i = 1; i < splitLocation.length - 1; i++){
    	localUrl += splitLocation[i] + "/";
    }
    
	var report = createImportJSPReport(urlPath + localUrl + "Clip.jsp", reportkey, document.getElementById(divPath));
    //실행
    //report.setSlidePage(true);
    report.view();
}

function noEvent() {
    if (event.keyCode == 116) {
        event.keyCode= 2;
        return false;
    }
    else if(event.ctrlKey && (event.keyCode==78 || event.keyCode == 82))
    {
        return false;
    }
}
document.onkeydown = noEvent;

</script>
</head>
<body onload="html2xml('targetDiv1')"  oncontextmenu="return false">
<div id='targetDiv1' style='position:absolute;top:0px;left:0px;right:0px;bottom:0px;'></div>
</body>
</html>
