Ext.define('KRF_DEV.view.krad.kradMetaInfo', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradMetaInfo',
	id: 'kradMetaInfo',
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	title: '메타상세정보',
	header: true,
    frame: true,
	width: 459,
	height: 400,
	closable: false,
	style:"padding-top:8px",
	header:{
		items:[{
			xtype:'image',
			src:'./resources/images/button/btn_close.png',
			style:'padding-right :13px; cursor:pointer;',
			listeners:{
				el:{
					click:function(){
						Ext.getCmp("kradMetaInfo").close();
					}
				}
			}
		}]
	},
	x: 692,
	y: 226,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	
	items:[{
		xtype : 'container',
		id : 'kradMetaInfoList',
		width: 459,
		height: 400,
		items:[{
			html: '<!doctype html>																																																						'+	
			'<html lang=\"ko\">                                                                                                           '+
			'<head>                                                                                                                     '+
			'<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                      '+
			'<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                          '+
			'<title>KRF-TOOLTIP</title>                                                                                                 '+
			'<!--[if lt ie 9]>                                                                                                          '+
			'<script src=\"js/html5shiv.js\"></script>                                                                                    '+
			'<![endif]-->                                                                                                               '+
			'<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                          '+
			'<style type=\"text/css\">                                                                                                    '+
			'table.meta { width: 450px; border-top: 2px solid gray; margin-top: 5px; }                                                 '+
			'table.meta> tbody> tr> th { font-weight: bold; background: #f3f3f2;}                                                     '+
			'table.meta> tbody> tr> td { padding: 7px 0px 7px 10px; border-bottom: 1px solid #d4d1cc; font-size: 12px!important; }                                                                                              '+
			'table.meta> tbody> tr> th, table.meta> tbody> tr> td { padding: 7px 0px 7px 10px; border-bottom: 1px solid #d4d1cc; font-size: 12px!important; }    '+
			'</style>                                                                                                                   '+
			'</head>                                                                                                                    '+
			'<body>                    																								'+
			'<p style=\"margin-top: 10px; letter-spacing: -1px; background: url(./resources/images/button/label_right.gif) no-repeat; padding-left: 20px; font-weight: bold; \">	기본정보  </p>'+
			'<table class=\"meta\" summary=\"\">                                                                                            '+
			'	<colgroup>                                                                                                                '+
			'    	<col width=\"110\" />                                                                                                   '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'    </colgroup>                                                                                                            '+
			'    <tbody>                                                                                                                '+
			'    	<tr>                                                                                                                  '+
			'        	<th>제목</th>                                                                                                      '+
			'            <td colspan=\"5\" id = "title"></td>                                                                            '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>최초등록일</th>                                                                                                      '+
			'            <td id=\"initDay\"></td>                                                                                                    '+
			'           <th>최종수정일</th>                                                                                                  '+
			'            <td id = \"updDay\"></td>                                                                                                 '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>최초등록자</th>                                                                                                  '+
			'            <td id = \"initOriginator\"></td>                                                                                  '+
			'        	<th>최종수정자</th>                                                                                                  '+
			'            <td id = \"updOriginator\"></td>                                                                                  '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>최초등록기관</th>                                                                                                  '+
			'            <td id = \"initOrganization\"></td>                                                                                  '+
			'        	<th>최중수정기관</th>                                                                                                  '+
			'            <td id = \"updOrganization\"></td>                                                                                  '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>최초등록연락처</th>                                                                                                  '+
			'            <td id = \"initContact\"></td>                                                                                  '+
			'        	<th>최종수정연락처</th>                                                                                                  '+
			'            <td id = \"updContact\"></td>                                                                                  '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>만료일</th>                                                                                                     '+
			'            <td colspan=\"5\" id = \"expireDay\"></td>                                                                      '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>요약설명</th>                                                                                                     '+
			'            <td colspan=\"5\" id =\"desc\"></td>                                                                     '+
			'        </tr>                                                                                                              '+
			'    </tbody>                                                                                                               '+
			'</table>                                                                                                                   '+
			'                                                                                                                           '+
			'<p style=\"margin-top: 10px; letter-spacing: -1px; background: url(./resources/images/button/label_right.gif) no-repeat; padding-left: 20px; font-weight: bold; \">	기준계/공간정보  </p>'+
			'                                                                                                                           '+
			'                                                                                                                           '+
			'<table class=\"meta\" summary=\"\">                                                                                            '+
			'	<colgroup>                                                                                                                '+
			'    	<col width=\"110\" />                                                                                                   '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'    </colgroup>                                                                                                            '+
			'    <tbody>                                                                                                                '+
			'    	<tr>                                                                                                                  '+
			'        	<th>기준계 명칭</th>                                                                                                    '+
			'            <td colspan=\"5\">GCS WGS84</td>                                                                         '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>기준 타원체</th>                                                                                                    '+
			'            <td>WGS84</td>                                                                                                '+
			'            <th>WKID</th>                                                                                                 '+
			'            <td>4326</td>                                                                                               '+
			'        </tr>                                                                                                              '+
			'</table>                                                                                                                   '+
			'</body>                                                                                                                    '+
			'</html>                                                                                                                    '	
		}]
	}]

});