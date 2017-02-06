<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.UUID"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.google.gson.Gson"%>

<%@page import="java.awt.Color"%>
<%@page import="java.awt.Graphics2D"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="java.io.*"%>
<%@page import="java.net.URL"%>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.awt.*"%>

<%
	/* url로 받아서 이미지 변환/저장하는 로직.. */

	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
	try{
		Gson gson = new Gson();
		String fileName = request.getParameter("fileName");
		String arcServiceUrl = request.getParameter("arcServiceUrl");
		String mode = request.getParameter("mode");
		String imgSaveUrl = request.getParameter("imgSaveUrl");
		
		// 맵 이미지 저장 폴더
		String imgSavePath = request.getSession().getServletContext().getRealPath(imgSaveUrl);
		
		if(fileName==null){
			
			int width = Integer.parseInt(request.getParameter("width"));
			int height = Integer.parseInt(request.getParameter("height"));
			ImageInfo[] imageInfos = gson.fromJson(request.getParameter("imageInfos"), ImageInfo[].class);
			
			String randomId =  UUID.randomUUID().toString();
			String resultPngFileName = "result_" + randomId + ".png";
			
			File desti = new File(imgSavePath);
			if(!desti.exists()){
				desti.mkdirs(); 
			}
		    
		    BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		    Graphics2D graphic = newImage.createGraphics();
		    Color color = graphic.getColor();
		    graphic.setPaint(Color.WHITE);
		    graphic.fillRect(0, 0, width, height);
		    graphic.setColor(color);
		    
		    for(int i=0; i<imageInfos.length; i++){
		    	
		    	String imgSrc = imageInfos[i].src;
		    	
		    	URL imgURL = new URL(imgSrc);
		    	
	            BufferedImage baseImage = ImageIO.read(imgURL);
	            
	            // 투명도 설정
	            AlphaComposite alpha = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, imageInfos[i].opacity);
	            graphic.setComposite(alpha);
	            
	            // 그래픽 그리기
	            graphic.drawImage(baseImage, imageInfos[i].translateX, imageInfos[i].translateY, null);
		    }
		    
		    graphic.dispose();
		    
		    File outputfile = new File(imgSavePath + "\\" + resultPngFileName);
		    ImageIO.write(newImage, "png", outputfile);
		    
		    HashMap hashMap = new HashMap();
		    
		    if(mode.equals("print")){
		    	hashMap.put("url", arcServiceUrl + "/rest/directories/arcgisoutput/customPrintTask/" + resultPngFileName);
		    }else if(mode.equals("capture")){
		    	hashMap.put("url", "http://" + request.getServerName()+ ":" + request.getServerPort() + request.getContextPath() + request.getServletPath() + "?fileName=" + resultPngFileName + "&imgSaveUrl=" + imgSaveUrl);
		    }
		    else if(mode.equals("report")){
		    	hashMap.put("url", imgSaveUrl + "/" + resultPngFileName);
		    	hashMap.put("path", imgSavePath + "\\" + resultPngFileName);
		    }
		    
	 		out.println(gson.toJson(hashMap));
		}else{
			
			//File file = new File("C:\\arcgisserver\\directories\\arcgisoutput\\customPrintTask\\" + fileName);
			File file = new File(imgSavePath + "\\" + fileName);
			FileInputStream fin = new FileInputStream(file);
			int ifilesize = (int)file.length();
			byte b[] = new byte[ifilesize];
			response.setContentLength(ifilesize);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment; filename="+fileName+";");
			ServletOutputStream oout = response.getOutputStream();
			fin.read(b);
			oout.write(b,0,ifilesize);
			oout.flush();
			oout.close();
			fin.close();
			fin = null;
			oout = null;
			Runtime.getRuntime().gc();	
			
		}
	}catch(Exception e){
		System.out.println(e);
		//e.printStackTrace();
	}
%>

<%!
	class ImageInfo{
		public String src;
		public String base64;
		public int translateX;
		public int translateY;
		public float opacity;
	}
%>