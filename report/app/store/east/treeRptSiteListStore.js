Ext.define('Report.store.east.treeRptSiteListStore', {
	
	extend: 'Ext.data.TreeStore',
	
	searchType: '',
	remoteSort: true,
	
	listeners: {
		
		load: function(store) {
			
			var jsonStr = "{\n";
			jsonStr += "	root: 'root',\n";
			jsonStr += "	expanded: true,\n";
			jsonStr += "	children: [{\n";
			jsonStr += "		siteName: '하천수(10)',\n";
			jsonStr += "		checked: false,\n";
			jsonStr += "		expanded: false,\n";
			jsonStr += "		children: [{\n";
			jsonStr += "			siteName: '가평천1',\n";
			jsonStr += "			siteAddr: 'addr1',\n";
			jsonStr += "			siteOrg: '1013A70',\n";
			jsonStr += "			checked: false,\n";
			jsonStr += "			leaf: true\n";
			jsonStr += "		}, {\n";
			jsonStr += "			siteName: '가평천2',\n";
			jsonStr += "			siteAddr: 'addr2',\n";
			jsonStr += "			siteOrg: '1013A80',\n";
			jsonStr += "			checked: false,\n";
			jsonStr += "			leaf: true\n";
			jsonStr += "		}, {\n";
			jsonStr += "			siteName: '가평천3',\n";
			jsonStr += "			siteAddr: 'addr3',\n";
			jsonStr += "			siteOrg: '1013A90',\n";
			jsonStr += "			checked: false,\n";
			jsonStr += "			leaf: true\n";
			jsonStr += "		}]\n";
			jsonStr += "	}]\n";
			jsonStr += "}\n";
			
			var jsonData = "";
			jsonData = Ext.util.JSON.decode(jsonStr);
			store.setRootNode(jsonData);
	  	}
	},
});
