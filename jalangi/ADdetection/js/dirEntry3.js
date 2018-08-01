/**
 * Created by user on 2016/10/3.
 */
var fs=require("fs"),
    esprima=require("esprima"),
    escodegen=require("escodegen"),
    hashtable=require("../lib/hashtable"),
    processAST=require("../lib/testProcessAST3");



//var outputFile="../output/result.txt";
var outputFile="../../ADdetection/output/result.txt";
var BFS=processAST.BFS;

var finalOutput="";
//var type=["badjs1"];
var adResult,otherResult;
//var tp= 0,fp= 0,fn= 0,tn=0;
//type.forEach(function(item){
    //var path="../data/"+item;
    //var path="../server/js";

   /* if(item=="badjs1"){
        adResult=main(path,1);

    }else{
        otherResult=main(path,0);
    }*/
//});
var path="../../ADdetection/server/js";
finalOutput=main(path);
//console.log(finalOutput);
//fs.writeFileSync(outputFile,finalOutput,"utf-8");
console.log(finalOutput);
var log = fs.createWriteStream(outputFile, {'flags': 'a'});
log.write(finalOutput);
/*
console.log(tp);
console.log(fn);
console.log(tn);
console.log(fp);
console.log("accuricy:",(tp+tn)/(tp+tn+fp+fn));
console.log("p:",tp/(tp+fp));
console.log("rr:",tp/(tp+fn));
*/




function storageData(){

    var recordTables=new hashtable.HashTable();

    var evalNum= 0,writeNum= 0,writelnNum= 0,escapeNum= 0,unescapeNum= 0,fromCharCodeNum=0;
    var splitNum= 0,subStringNum= 0,charAtNum=0;
    recordTables.put("eval",evalNum);
    recordTables.put("write",writeNum);
    recordTables.put("writeln",writelnNum);
    recordTables.put("escape",escapeNum);
    recordTables.put("unescape",unescapeNum);
    recordTables.put("fromCharCode",fromCharCodeNum);
    recordTables.put("split",splitNum);
    recordTables.put("subString",subStringNum);
    recordTables.put("charAt",charAtNum);

    var ActiveXObjectNum= 0,createElementNum=0;
    recordTables.put("ActiveXObject",ActiveXObjectNum);
    recordTables.put("createElement",createElementNum);

    var locationNum= 0,URLNum= 0,referrerNum= 0,replaceNum= 0,setTimeoutNum= 0,reloadNum=0;
    recordTables.put("location",locationNum);
    recordTables.put("URL",URLNum);
    recordTables.put("referrer",referrerNum);
    recordTables.put("replace",replaceNum);
    recordTables.put("setTimeout",setTimeoutNum);
    recordTables.put("reload",reloadNum);

    var strAllNum= 0,idenAllNum=0;
    recordTables.put("strAll",strAllNum);
    recordTables.put("idenAll",idenAllNum);

    var StringMaxLen=0;
    var SpecialCodeNum=0;
    var FunctionCallNum=0;
    recordTables.put("StringMaxLen",StringMaxLen);
    recordTables.put("SpecialCode",SpecialCodeNum);
    recordTables.put("FunctionCall",FunctionCallNum);

    return recordTables;
}



function main(inputFile){
    var files=fs.readdirSync(inputFile);
    var finalOutput="";
    for(var i=0;i<files.length;i++){
        var file=files[i];
        var fullFilePath=inputFile+"/"+file;
        var states = fs.statSync(fullFilePath);
        var jsScript=fs.readFileSync(fullFilePath,"utf-8");
        //console.log(fullFilePath);
        var ast=esprima.parse(jsScript);
        var recordTables=storageData();
        BFS(ast,recordTables);
        var individualOutput=compositeResult(recordTables);
        finalOutput+=individualOutput+"\n";

    }
    return finalOutput;
}



function compositeResult(recordTables){
    var output="";

    var evalNum=parseInt(recordTables.get("eval"));
    var writeNum=parseInt(recordTables.get("write"));
    var writelnNum=parseInt(recordTables.get("writeln"));
    var escapeNum=parseInt(recordTables.get("escape"));
    var unescapeNum=parseInt(recordTables.get("unescape"));
    var fromCharCodeNum=parseInt(recordTables.get("fromCharCode"));
    var splitNum=parseInt(recordTables.get("split"));
    var subStringNum=parseInt(recordTables.get("subString"));
    var charAtNum=parseInt(recordTables.get("charAt"));

    var ActiveXObjectNum=parseInt(recordTables.get("ActiveXObject"));
    var createElementNum=parseInt(recordTables.get("createElement"));

    var locationNum=parseInt(recordTables.get("location"));
    var URLNum=parseInt(recordTables.get("URL"));
    var referrerNum=parseInt(recordTables.get("referrer"));
    var replaceNum=parseInt(recordTables.get("replace"));
    var setTimeoutNum=parseInt(recordTables.get("setTimeout"));
    var reloadNum=parseInt(recordTables.get("reload"));

    var strAllNum=parseInt(recordTables.get("strAll"));
    var idenAllNum=parseInt(recordTables.get("idenAll"));

    var StringMaxLen=parseInt(recordTables.get("StringMaxLen"));
    var SpecialCodeNum=parseInt(recordTables.get("SpecialCode"));
    var FunctionCallNum=parseInt(recordTables.get("FunctionCall"));

    output+=evalNum+","+writeNum+","+writelnNum+","+escapeNum+","+unescapeNum+","+fromCharCodeNum;
    output+=","+ splitNum+","+subStringNum+","+charAtNum+","+ActiveXObjectNum+","+createElementNum;
    output+=","+locationNum+","+URLNum+","+referrerNum+","+replaceNum+","+setTimeoutNum+","+reloadNum;
    output+=","+strAllNum+","+idenAllNum+","+StringMaxLen+","+SpecialCodeNum+","+FunctionCallNum;



//5,9,11,14,20
/*
    if(flag==1){
        output+="1";
    }else{
        output+="0";
    }
*/
 //   console.log(output);
    return output;
}


//var result=main(inputFile);
//console.log(result);
//var result=main(inputFile);
//fs.writeFileSync("../result/result.txt",result,"utf-8");


//printInfo(recordHtmlTables);


