<!-- 通用函数 -->
	//同时将值保存到parameters和localStorage
	function dualSetItem(keyname,newValue) { 
		localStorage.setItem(keyname,newValue);
		parameters[keyname].value = newValue;
	};
	
	//判断值是否是数字或者空值
	function numberValidate(name){ 
		if (isNaN(name)){
			alert("\""+name+"\"不是数字！将导致计算错误，请更正");
		} else return name;
	};
	//与函数（由于Mediawiki不能识别&&操作符）
	function and(){
		"use strict";
		var tmp = true;
		for (var i in arguments) {
			tmp *= arguments[i];
		}

		if (tmp == 1) {
			return true;
		} else {
			return false;
		}
	};
	//用alert检查多个内容
	function check(){
		var a = "";
		for (var i in arguments) {
			a += arguments[i] + "\n";
		}
		alert(a);
	};
	
	//给出特定长度的自动补零的整数字符串
	function formatInt(org_int, length){
		var formattedString = '';
		var i = 0;
		while (i < length){
			formattedString += '0'
			i++;
		}
		formattedString += org_int;
		return formattedString.slice(-length);
	};
	
	// 首字母大写
	function firstLetter2Upper(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);
	
	};
	
	function updateIntValue(varName){
		alert(varName);
		return parseInt($("input#"+varName).val());
	};
	
	//Textarea鼠标移至时自动清零
	function textAreaRefresh(name){
		var m = "textarea#" + name;
		if ( $(m).val() == "请将所有的待处理数据由Excel中粘贴至此处" )
		{
			$(m).text("");
		}
	};		

	//LNG换算
	function LNGConvert(id, value){
		var e4MTperMMBtu = 0.0000020301312457499;
        var cbmperMMBtu = 28.021135208008;
        var MMSCFperMMBtu = 0.0009699623725849;
        var MTperLNGVolume = 0.45;
        var price_per_MMBtu = $("input#price_per_MMBtu").val();
        var MMBtu = $("input#MMBtu").val();
        var cbm = $("input#cbm").val();
        var e4cbm = $("input#e4cbm").val();
        var e4MT = $("input#e4MT").val();
        var MMSCF = $("input#MMSCF").val();
        
        switch(id){
            case "price_per_MMBtu": 
                price_per_MMBtu = value;
                break;
            case "MMBtu":
                MMBtu = value;
                cbm = (MMBtu * cbmperMMBtu).toFixed(4);
                e4cbm = (cbm / 1e4).toFixed(8);
                e4MT = (MMBtu * e4MTperMMBtu).toFixed(2);
                MMSCF = (MMBtu * MMSCFperMMBtu).toFixed(2);
                break;
            case "cbm":
                cbm = value;
                MMBtu = (cbm / cbmperMMBtu).toFixed(2);
                e4cbm = (cbm / 1e4).toFixed(8);
                e4MT = (MMBtu * e4MTperMMBtu).toFixed(2);
                MMSCF = (MMBtu * MMSCFperMMBtu).toFixed(2);
                break;
            case "e4cbm":
                e4cbm = value;
                cbm = e4cbm * 1e4;
                MMBtu = (cbm / cbmperMMBtu).toFixed(2);
                e4MT = (MMBtu * e4MTperMMBtu).toFixed(2);
                MMSCF = (MMBtu * MMSCFperMMBtu).toFixed(2);
                break;
            case "e4MT":
                e4MT = value;
                MMBtu = (e4MT / e4MTperMMBtu).toFixed(2);
                cbm = (MMBtu * cbmperMMBtu).toFixed(4);
                e4cbm = (cbm / 1e4).toFixed(8);
                MMSCF = (MMBtu * MMSCFperMMBtu).toFixed(2);
                break;             
            case "MMSCF":
                MMSCF = value;
                MMBtu = (MMSCF / MMSCFperMMBtu).toFixed(2);
                cbm = (MMBtu * cbmperMMBtu).toFixed(4);
                e4cbm = (cbm / 1e4).toFixed(8);
                e4MT = (MMBtu * e4MTperMMBtu).toFixed(2);
                break; 
        }
        
        total_price = (price_per_MMBtu * MMBtu).toFixed(2);
        lng_volume = (e4MT / MTperLNGVolume).toFixed(2);
        $("input#price_per_MMBtu").prop("value", price_per_MMBtu);
        $("input#MMBtu").prop("value", MMBtu);
        $("input#cbm").prop("value", cbm);
        $("input#e4cbm").prop("value", e4cbm);
        $("input#e4MT").prop("value", e4MT);
		$("input#MMSCF").prop("value", MMSCF);
        $("span#lng_volume").text(lng_volume);
        $("span#total_price").text(total_price);
	};		
	
	//判断元素是否在列表中
	function isInArray(value,arr){
		for(var i = 0; i < arr.length; i++){
			if(value === arr[i]){
				return true;
			}
		}
		return false;
	}

    // 将颜色输入器的值转换成HEX
    function color2HEX(id_name){
        $("span#"+id_name).html($("input#"+id_name).val()); 
    }
    
	
	<!-- var point = new Object(); -->
	
<!-- 页面加载完毕后操作 -->
$(document).ready(function(){
	//convert2Table按钮赋值
	$("button#convert2Table").click(function(){
		var content = $("textarea#convert2Table").val();
		var rows = content.split('\n');
		var titles = rows[0].split('\t'); //拆分并保存标题	
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 1; i < rows.length; i++){
			var tmpSplit = rows[i].split('\t');
			if (tmpSplit != "") values[i-1] = tmpSplit; //忽略结尾空行
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{
			result += "\"data" + i + "\":	{";
			for (j in titles) {
				var k;
				if (j == titles.length - 1) k = "}"; else k = ",\t";
				result += "\"" + titles[j] + "\":\"" + values[i][j] + "\"" + k;
			}
			
			if (i != values.length - 1) {
				result += ",<br>";					
			}	else {
				result += "<br>";
			}
		}
		result += "</p>"
		$("span#convert2Table").html(result);
	});				
	
	//表单大师字段列表转JSON
	$("button#jsformFields2Table").click(function(){
		var content = $("textarea#jsformFields2Table").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length; i++){
			var tmpSplit = rows[i].split('\t');
			if (tmpSplit != "") values[i] = tmpSplit; //忽略结尾空行
		}
		
		//转换为JSON格式（仅保留字段名称和字段名）
		var result = "<p>{";
		for (i in values) 
		{	
			result += "'" + values[i][0].replace(" ","") + "':'" + values[i][2].replace(" ","") + "',<br>";
		}

		result = result.slice(0,result.length-5);
		result += "}</p>"
		$("span#jsformFields2Table_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
	});		
	
	//单列表格转元素
	$("button#convert2JSONElements").click(function(){
		var content = $("textarea#convert2JSONElements").val();
		var rows = content.split('\n');
		var separator = "";
		var totalNum = 0;
		for (i  in rows) {
			if (isNaN(rows[i])) separator = "\"";
		} //对于非数字元素加上引号分隔符
		for (i in rows) {
			if (rows[i]!="") totalNum++;
		} //获取非空单元总数
		
		//转换为JSON格式
		var result = "<p>[";
		var countElement = 0;
		for (i in rows) 
		{
			if (rows[i]!="") {
				result += separator + rows[i] + separator;
				countElement++;
				if (countElement < totalNum) result+= ",";
			}
		}
		result += "]</p>"
		$("span#convert2JSONElements").html(result);
	});		
			
	//单列表格转特定分隔
	$("button#convert2SlightPause").click(function(){
		var content = $("textarea#convert2SlightPause").val();
		var rows = content.split('\n');
		var separator = $("input#convert2SlightPause").val();
		var totalNum = 0;
		for (i in rows) {
			if (rows[i]!="") totalNum++;
		} //获取非空单元总数
		
		//转换为JSON格式
		var result = "<p>";
		var countElement = 0;
		for (i in rows) 
		{
			if (rows[i]!="") {
				result += rows[i];
				countElement++;
				if (countElement < totalNum) result+= separator;
			}
		}
		result += "</p>"
		$("span#convert2SlightPause").html(result);
	});		
	
	//双列表格转元素
	$("button#convertDoubleCols2JSONElements").click(function(){
		var content = $("textarea#convertDoubleCols2JSONElements").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{
			for (j in values[i]) {
				var separator = "";
				if (isNaN(values[i][j])) separator = "\"";
				result += separator + values[i][j] + separator;
				if (j == 0) result += ":";
				if (j == 1) {
					if (i == values.length - 1) result += "<br>";
					else result += ",<br>";
				}
			}
		}
		result += "</p>"
		$("span#convertDoubleCols2JSONElements_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
	});
	
	//多列表格转双列列表
	$("button#convert2DoubleCols").click(function(){
		var content = $("textarea#convert2DoubleCols").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{
			for (j in values[i]) {
				var separator = "";
				if (isNaN(values[i][j])) separator = "\"";
				if (j == 1) result += "[";
				result += separator + values[i][j] + separator;
				if (j == 0) result += ":";
					else if (j == values[i].length - 1) 
						if(i == values.length - 1) result += "]<br>"; else result += "],<br>";
					else result += ",";
			}
		}
		result += "</p>"
		$("span#convert2DoubleCols").html(result);
	});
	
	//多行多列薪酬级别转JSON
	$("button#convertSalaryTable").click(function(){
		var content = $("textarea#convertSalaryTable").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{	
			if(i > 0){
				for (j in values[i]) {
					var separatorV0j = "";
					var separatorVij = "";
					if (isNaN(values[0][j])) separatorV0j = "\"";
					if (isNaN(values[i][j])) separatorVij = "\"";
					
					if (j == 1) result += "{";
					
					if (j == 0) result += separatorVij + values[i][j] + separatorVij + ":";
					else {
						result += separatorV0j + values[0][j] + separatorV0j + ":" + separatorVij + values[i][j] + separatorVij;
						
						if (j == values[i].length - 1) 
							if(i == values.length - 1) result += "}<br>"; 
							else result += "},<br>";
						else result += ",";
					}
				}
			}
		}
		result += "</p>"
		$("span#convertSalaryTable_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
	});
	
	//序列、职位及相应职别转JSON（5列）
	$("button#doubleIndexConversion").click(function(){
		var content = $("textarea#doubleIndexConversion").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (var i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为JSON格式
		var 序列 = new Array();
		var 职位 = new Array();
		var 序列计数 = 0, 职位计数 = 0;
		var 中转数组 = new Array();
			//读取序列并存入
			for (var i in values) {
				if (i == 0) { 序列[序列计数] = values[i][0]; }
				if(序列[序列计数] == values[i][0]) {
					中转数组[职位计数] = values[i][1];
					职位计数++;
				} else {
					职位[序列计数] = 中转数组; //将中转数组存入职位相应行
					中转数组 = [];				//清空中转数组
					序列计数++;
					序列[序列计数] = values[i][0];
					职位计数 = 0;
					
					中转数组[职位计数] = values[i][1];
					职位计数++;
				}
				职位[序列计数] = 中转数组;
				
			}
		
		check(序列,职位[1]);

		var result = "<p>";
		var tmpCount = 0;
		for (var m = 0; m < 序列.length; m++){
			result += "\"" + 序列[m] + "\":{<br>";
			for (var n = 0; n < 职位[m].length; n++){
				result += "\"" + values[tmpCount][1] + "\":[\"" + values[tmpCount][2] + "\",\"" + values[tmpCount][3] + "\",\"" + values[tmpCount][4] + "\",\"" + values[tmpCount][5];
				tmpCount++;
				if(n == 职位[m].length - 1) result += "\"]<br>";
				else result += "\"],<br>";	
			}
			
			if(m == 序列.length - 1) result += "}<br>";
			else result += "},<br>";
		}
		
		result += "</p>";
		$("span#doubleIndexConversion").html(result);
	});
	
	
	//标题首字母大写
	$("button#capitalizeTitles").click(function(){
		var content = $("textarea#capitalizeTitles").val();
		var rows = content.split('\n');
		var values = new Array();
		
		var not2beCapitalized = ["de","la","du","le","les","la","en","in","a","an","of","and","the","am","is","are"];
		
		//拆分并将数值存入数组
		for (i = 0; i < rows.length; i++){//拆分成单词
				values[i] = rows[i].split(' ');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{
			for (j in values[i]) {
				var tailLetter = " ";
				if (j == values[i].length - 1) tailLetter = "<br>";
				var processedWord = firstLetter2Upper(values[i][j]);
				
				for (k in not2beCapitalized){
					if(not2beCapitalized[k] == values[i][j])
						if(j != 0)
							processedWord = values[i][j];
				}
				result += processedWord + tailLetter;
			}
		}
		result += "</p>"
		$("span#capitalizeTitles").html(result);
	});
			
	
	//图片组重整编号
	$("button#reAllocateImages").click(function(){
		var content = $("textarea#reAllocateImages").val();
		var rows = content.split('> <a');
		var values = new Array();
		
		
		//拆分并将数值存入数组
		for (i = 0; i < rows.length; i++){//拆分成单词
				values[i] = rows[i].split(' ');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{
			for (j in values[i]) {
				var tailLetter = " ";
				if (j == values[i].length - 1) tailLetter = "<br>";
				var processedWord = firstLetter2Upper(values[i][j]);
				
				for (k in not2beCapitalized){
					if(not2beCapitalized[k] == values[i][j])
						if(j != 0)
							processedWord = values[i][j];
				}
				result += processedWord + tailLetter;
			}
		}
		result += "</p>"
		$("span#reAllocateImages").html(result);
	});
	
	//RGB颜色转换为HEX
	$("button#RGB2HEX").click(function(){
	
		function rgbColor(R_value, G_value, B_value){
			this.r = R_value;
			this.g = G_value;
			this.b = B_value;
			this.verify = verify;
			this.toHex = toHex;

			function verify(){
				var status = '';
				if (this.r < 0 || this.r > 255) status += ' R值有误 ';
				if (this.g < 0 || this.g > 255) status += ' G值有误 ';
				if (this.b < 0 || this.b > 255) status += ' B值有误 ';
				<!-- check(status); -->
				if (status == '') {
					return 'OK';
				}	else {
					return status;
				}
			}
			
			function toHex(){
				if (this.verify() == 'OK') {
					var result = "#" + formatInt(this.r.toString(16),2) + formatInt(this.g.toString(16),2) + formatInt(this.b.toString(16),2);
					return result;
				}
				else return this.verify();
			}
		};
		
		var RGBcolor = new rgbColor(parseInt($("input#R_color").val()),parseInt($("input#G_color").val()),parseInt($("input#B_color").val()));
		
		var aNum = 0;
		$("span#RGB2HEX").html(RGBcolor.toHex());
	});
	
	//汇率表转JSON
	$("button#convertXRateTable").click(function(){
		var content = $("textarea#convertXRateTable").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//将日期转换为Python的datetime类
		function toDatetime(date){
			var tmp = date.replace(/\//g,',');
			return "datetime.datetime(" + tmp + ")"
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{	
			if(i > 0){
				for (j in values[i]) {
					var separatorV0j = "";
					var separatorVij = "";
					if (isNaN(values[0][j])) separatorV0j = "\"";
					if (isNaN(values[i][j])) separatorVij = "\"";
					
					if (j == 1) result += "{";
					
					if (j == 0) result += toDatetime(values[i][j]) + ":";
					else {
						result += separatorV0j + values[0][j] + separatorV0j + ":" + separatorVij + values[i][j] + separatorVij;
						
						if (j == values[i].length - 1) 
							if(i == values.length - 1) result += "}<br>"; 
							else result += "},<br>";
						else result += ",";
					}
				}
			}
		}
		result += "</p>"
		$("span#convertXRateTable").html(result);
	});		
	
	//国家城市补贴表转JSON
	$("button#convertCountryCityAllowanceTable").click(function(){
		var content = $("textarea#convertCountryCityAllowanceTable").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为JSON格式
		var result = "<p>";
		for (i in values) 
		{	
			if(i > 0) //跳过首行
			{
				if(values[i][0] != values[i-1][0])
				{
					for (j in values[i]) {
						var separatorV0j = "\"";
						var separatorVij = "";
						if (isNaN(values[i][j])) separatorVij = "\"";
						
						if (j == 1||j == 2) result += "{";
						if (j == 0||j == 1) result += separatorV0j + values[i][j] + separatorV0j + ":";
						else {
							result += separatorV0j + values[0][j] + separatorV0j + ":" + separatorVij + values[i][j] + separatorVij;
							
							if (j == values[i].length - 1) 
								if(i == values.length - 1) result += "}}<br>"; 
								else result += "}},<br>";
							else result += ",";
						}
					}
				} else {
					result = result.slice(0,result.lastIndexOf("}")) + ",";
					for (j in values[i]) {
						var separatorV0j = "\"";
						var separatorVij = "";
						if (isNaN(values[i][j])) separatorVij = "\"";
						if (j != 0){
							if (j == 2) result += "{";
							if (j == 1) result += separatorV0j + values[i][j] + separatorV0j + ":";
							else {
								result += separatorV0j + values[0][j] + separatorV0j + ":" + separatorVij + values[i][j] + separatorVij;
								
								if (j == values[i].length - 1) 
									if(i == values.length - 1) result += "}}<br>"; 
									else result += "}},<br>";
								else result += ",";
							}
						}
					}
				}
			}
		}
		result += "</p>"
		$("span#convertCountryCityAllowanceTable").html(result);
	});
	
	//PDF拷贝文字拼接成行
	$("button#pdfTextJoin").click(function(){
		var content = $("textarea#pdfTextJoin").val();
        content = content.replace(/\n/g,'');
		$("span#pdfTextJoin_span").html(content);
        
        var clipboard = new ClipboardJS('.copy-button');
	});		
	
    //单列数据删重
	$("button#duplicatedDataRemover").click(function(){
		var content = $("textarea#duplicatedDataRemover").val();
		var rows = content.split('\n');
		var totalNum = 0;
		for (i in rows) {
			if (rows[i]!="") totalNum++;
		} //获取非空单元总数
		
		//转换为JSON格式
		var result = "<p>";
		var resultTable = [];
		var countElement = 0;
		for (i in rows) 
		{
			if (rows[i]!="" && !isInArray(rows[i],resultTable)) {
				resultTable.push(rows[i]);
				result += rows[i];
				countElement++;
				if (countElement < totalNum) result+= "<br>";
			}
		}
		result += "</p>"
		$("span#duplicatedDataRemover").html(result);
	});	
    
    //多列数据删重
	$("button#multiColsDuplicatedDataRemover").click(function(){
		var content = $("textarea#multiColsDuplicatedDataRemover").val();
		var rows = content.split('\n');
		// var totalNum = 0;
		// for (i in rows) {
		// 	if (rows[i]!="") totalNum++;
		// } //获取非空单元总数
		
		//转换为JSON格式
		var result = "<p>";
		var resultTable = [];
		var countElement = 0;
		for (i in rows) 
		{
            if (rows[i]!=""){
                elements = rows[i].split('\t');            
                
                for (j in elements){
                    if (elements[j]!="" && !isInArray(elements[j],resultTable)) {
                        resultTable.push(elements[j]);
                        result += elements[j] + "<br>";
                    }
                }
            }
		}
		result += "</p>"
		$("span#multiColsDuplicatedDataRemover").html(result);
	});	
    
    //多列表格转二维数组
	$("button#convert22DArray").click(function(){
		var content = $("textarea#convert22DArray").val();
		var rows = content.split('\n');
		var values = new Array();

		//拆分并将数值存入数组
		for (i = 0; i < rows.length - 1; i++){//忽略结尾空行
				values[i] = rows[i].split('\t');	
		}
		
		//转换为2D数组格式
		var result = "<p>[";
		for (i in values) 
		{
			for (j in values[i]) {
				var separator = "";
				if (isNaN(values[i][j])) separator = "\"";				
				if (j == 0) result += "[" + separator + values[i][j] + separator + ",";
					else if (j == values[i].length - 1) 
						if(i == values.length - 1) result += separator + values[i][j] + separator + "]]"; else result += separator + values[i][j] + separator + "],<br>";
					else result += separator + values[i][j] + separator + ",";
			}
		}
		result += "</p>"
		$("span#convert22DArray_result_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
	});
    
    //Excel转Wiki表格
	$("button#excel2wiki").click(function(){
		var content = $("textarea#excel2wiki").val();
		var rows = content.split('\n');
		
		//转换为JSON格式
		var result = "<p>{| class='wikitable'<br>|+" + $("input#excel2wiki_caption").val() + "<br>";
		for (i in rows) {
            words = rows[i].split('\t');
            
            if (i == 0){
                for (j in words){
                    result += "!" + words[j] + "<br>";                   
                }
            } else if (words != "") {
                result += "|-<br>";
                for (j in words){
                    result += "|" + words[j] + "<br>";                      
                }              
            }
		}
		result += "|}</p>"
		$("span#excel2wiki_result_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
    
	});		
    
     //表格旋转
	$("button#table_rotate").click(function(){
		var content = $("textarea#table_rotate").val();
		var rows = content.split('\n');
        var direction = $("select#table_rotate_direction").val();
        var num_rows = rows.length;
        var num_cols = rows[0].split('\t').length;
		var result_array = new Array();
        for (var i = 0; i < num_cols; i++) {
            result_array[i] = new Array();
            for (var j = 0; j < num_rows; j++){
                result_array[i][j] = "";
            }
        }

		var result = "<p>";
		for (i in rows) {
            words = rows[i].split('\t');
            
            if (direction == 'left'){
                for (j in words){
                    result_array[num_cols - j - 1][i] = words[j];                   
                }
            } else {
                for (j in words){
                    result_array[j][num_rows - i - 1] = words[j];                   
                }
            }
		}
        
        for (i = 0; i < num_cols; i++){
            for (j = 0; j < num_rows; j++){
                result += result_array[i][j] + "|";
            }
            result += "<br>";
        }
        
		result += "</p>"
		$("span#table_rotate_result_span").html(result);
        var clipboard = new ClipboardJS('.copy-button');
    
	});		
    
	//Word自定义文档部件及属性
	$("button#customProperties").click(function(){
		var content = $("input#customProperties").val();
		var values = content.split(',');
		
		var section_properties = "";
		for (i = 0; i < values.length; i++){//忽略结尾空行
			section_properties = section_properties + '<' + values[i] +' xmlns="custom_property"/>';
		}
		
		var propertiesResult = '<?xml version="1.0" encoding="utf-8"?><p:properties xmlns:p="http://schemas.microsoft.com/office/2006/metadata/properties"><documentManagement>' + section_properties + '</documentManagement></p:properties>';

		//保存到文件
		var blob = new Blob([propertiesResult], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "Custom_Properties.xml");
	});		
	
	$("button#customContentType").click(function(){
		var content = $("input#customProperties").val();
		var values = content.split(',');
		
		var section_1 = "";
		var section_2 = "";
		for (i = 0; i < values.length; i++){//忽略结尾空行
			section_1 = section_1 + '<xsd:element ref="ns3:' + values[i] +'" minOccurs="0"/>';
			section_2 = section_2 + '<xsd:element name="' + values[i] +'" nillable="true" ma:displayName="' + values[i] +'" ma:internalName="' + values[i] +'"><xsd:simpleType><xsd:restriction base="dms:Text"></xsd:restriction></xsd:simpleType></xsd:element>';
		}
		
		var contentTypeResult = '<?xml version="1.0" encoding="utf-8"?><ct:contentTypeSchema ct:_="" ma:_="" ma:contentTypeName="Document" ma:contentTypeID="0x010100AA3F7D94069FF64A86F7DFF56D60E3BE" ma:contentTypeVersion="6" ma:contentTypeDescription="Create a new document." ma:contentTypeScope="" ma:versionID="c32302c77d4085ecf495bdddb7f5e889" xmlns:ct="http://schemas.microsoft.com/office/2006/metadata/contentType" xmlns:ma="http://schemas.microsoft.com/office/2006/metadata/properties/metaAttributes"><xsd:schema targetNamespace="http://schemas.microsoft.com/office/2006/metadata/properties" ma:root="true" ma:fieldsID="4ab5ae46be95f9d0be6107e8200be7a2" ns3:_="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns3="custom_property"><xsd:import namespace="custom_property"/><xsd:element name="properties"><xsd:complexType><xsd:sequence><xsd:element name="documentManagement"><xsd:complexType><xsd:all>' + section_1 + '</xsd:all></xsd:complexType></xsd:element></xsd:sequence></xsd:complexType></xsd:element></xsd:schema> <xsd:schema targetNamespace="custom_property" elementFormDefault="qualified" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2006/documentManagement/types">' + section_2 + '</xsd:schema></ct:contentTypeSchema>';
		
		//保存到文件
		var blob = new Blob([contentTypeResult], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "Custom_ContentType.xml");
	});
    
    // 自定义
    $("button#import_calculation").click(function(){
        var original_price = parseFloat($("input#original_price").val());
        var custom_duty_rate = parseFloat($("input#custom_duty_rate").val())/100;
        var consumption_tax_rate = parseFloat($("input#consumption_tax_rate").val())/100;
        var VAT_rate = parseFloat($("input#VAT_rate").val())/100;
        
        var custom_duty = original_price * custom_duty_rate;
        var consumption_tax = (original_price + custom_duty) / (1 - consumption_tax_rate) * consumption_tax_rate;
        var VAT = (original_price + custom_duty + consumption_tax) * VAT_rate;
        var overall_price = original_price + custom_duty + consumption_tax + VAT;
        var overall_rate = (overall_price - original_price) / (original_price) * 100
        
        //alert(consumption_tax_rate + "|" + $("input#consumption_tax_rate").val());
        $("span#custom_duty").html(custom_duty.toFixed(2));
        $("span#consumption_tax").html(consumption_tax.toFixed(2));
        $("span#VAT").html(VAT.toFixed(2));
        $("span#overall_price").html(overall_price.toFixed(2));
        $("span#overall_rate").html(overall_rate.toFixed(2) + "%");
    });
});
