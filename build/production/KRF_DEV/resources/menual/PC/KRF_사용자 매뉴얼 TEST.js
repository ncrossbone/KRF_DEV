document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" id="KRF_����� �Ŵ��� TEST" width="100%" height="100%">')
document.write('<param name="allowScriptAccess" value="always" />')
document.write('<param name="movie" value="KRF_����� �Ŵ��� TEST.swf" />')
document.write('<param name="quality" value="high" />')
document.write('<param name="allowFullScreen" value="true"/>')
document.write('<embed src="KRF_����� �Ŵ��� TEST.swf"  allowFullScreen="true" quality="high" bgColor="#ffffff" width="100%" Height="100%" name="KRF_����� �Ŵ��� TEST" align="middle" swLiveConnect=true	allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>')
function firstPageSet(){
	var htmlUrl = document.location.toString();
	var inx1 = htmlUrl.indexOf("?");
	var inx2 = htmlUrl.indexOf("=");
	
	if(htmlUrl.substring(inx1+1,inx2)=="page"){
		var firstPage=htmlUrl.substring(inx2+1,htmlUrl.length);
		callExternalInterface("firstPageSetting",Number(firstPage));
	}	
}
function callExternalInterface() {		
	thisMovie("KRF_����� �Ŵ��� TEST").SDF_Actionscript(arguments[0],arguments[1]);
}
function thisMovie(movieName) {
	obj = document.getElementsByName(movieName);
	return obj[0];
}