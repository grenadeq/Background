if(typeof define!=="function"){
    var define=require("amdefine")(module);
}


define(function(require,exports){
    var fs=require("fs"),
        esprima=require("esprima"),
        escodegen=require("escodegen"),
        hashtable=require("../lib/hashtable");

    //var inputFile="../File/js/assignObject.js";
    //var jsScript=fs.readFileSync(inputFile,"utf-8");
    //var ast=esprima.parse(jsScript);

    /*
     * 判断字符串中是否包含html标签的正则表达式
     * /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/
     */
    var pattern=/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;
    /*
     * 判断字符串是否包含js关键字
     * */
    var arr=["break","delete","function","return","typeof","case",
        "do","if","switch","var","catch","else","in","this","void","continue",
        "false","instanceof","throw","while","debugger","finally","new","true",
        "with","default","for","null","try","arguments","encodeURI","Infinity",
        "Number","RegExp","Array","encodeURIComponent","isFinite","Object",
        "String","Boolean","Error","isNaN","parseFloat","SyntaxError","Date","eval",
        "JSON","parseInt","TypeError","decodeURI","EvalError","Math","RangeError",
        "undefined","decodeURI","EvalError","Math","RangeError","undefined","decodeURIComponent",
        "Function","NaN","ReferenceError","URIError"];

    function judgeIncludeJSkw(str){
        for(var i=0;i<arr.length;i++){
            if(str.indexOf(arr[i])>=0){
                return true;
            }
        }
        return false;
    }


    //判断某个字符串中包含ad的数量
    /*
     * param str要判断的字符串
     * return 子符串中包含的ad数量
     * */

    function judgeStrIncludeAdNum(str){
        var num=0;
        var index=str.indexOf("ad");
        while(index>0){
            index=str.indexOf("ad",index+2);
            num++;
        }
        return num;
    }

    function JudeIncludeSC(str){
        var s=str;
        var num=0;
        var index1=s.indexOf("%");
        while(index1>0){
            index1=s.indexOf("%",index1+1);
            num++;
        }
        var s2=str;
        var index2=s2.indexOf("$");
        while(index2>0){
            index2=s2.indexOf("$",index2+1);
            num++;
        }
       // console.log(num);
        return num;
    }

    function BFS(tmpAst,recordTables){
        if(tmpAst){
            switch (tmpAst.type){
                case "Program":
                    tmpAst.body.forEach(function(partialAst){
                        BFS(partialAst,recordTables);
                    });
                    break;
                case"VariableDeclaration":
                    if(tmpAst.declarations.length!=0){
                        tmpAst.declarations.forEach(function(tmpDeclation){
                            BFS(tmpDeclation,recordTables);
                        });
                    }
                    break;
                case"VariableDeclarator":
                    if(tmpAst.init){
                        BFS(tmpAst.init,recordTables);
                    }
                    break;
                case"FunctionExpression":
                    if(tmpAst.params.length!=0){
                        tmpAst.params.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case"BlockStatement":
                    if(tmpAst.body.length!=0){
                        tmpAst.body.forEach(function(tmpBlock){
                            BFS(tmpBlock,recordTables);
                        });
                    }
                    break;
                case"ObjectExpression":
                    if(tmpAst.properties.length!=0){
                        tmpAst.properties.forEach(function(tmpProperty){
                            BFS(tmpProperty,recordTables);
                        });
                    }
                    break;
                case"Property":
                    if(tmpAst.key){
                        BFS(tmpAst.key,recordTables);
                    }
                    if(tmpAst.value){
                        BFS(tmpAst.value,recordTables);
                    }
                    break;
                case"ExpressionStatement":
                    if(tmpAst.expression){
                        BFS(tmpAst.expression,recordTables);
                    }
                    break;
                case"AssignmentExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }

                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case"MemberExpression":
                    if(tmpAst.object){
                        BFS(tmpAst.object,recordTables);
                    }
                    if(tmpAst.property){
                        BFS(tmpAst.property,recordTables);
                    }
                    break;
                case"BinaryExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case"Literal":
                    //文本，用引号引用起来的单位
                    var strAllNumTmp=recordTables.get("strAll");
                    recordTables.put("strAll",strAllNumTmp+=1);
                    if(tmpAst.value){
                        var lite=tmpAst.value.toString().toLocaleLowerCase();
                        var len=lite.length;
                        var max=recordTables.get("StringMaxLen");
                        if(len>max) {
                            recordTables.put("StringMaxLen",len);
                        }
                        var tmp=JudeIncludeSC(lite);
                        var SpecialCodeNum=recordTables.get("SpecialCode");
                        //console.log(SpecialCodeNum);
                        recordTables.put("SpecialCode",SpecialCodeNum+tmp);
                        //var returnAdNum=judgeStrIncludeAdNum(lite);
                        //var liteAdNumTmp=recordTables.get("strAd");
                        //recordTables.put("idenAd",liteAdNumTmp+=returnAdNum);

                        if(tmpAst.value=="eval"){
                            var evalNumTmp=recordTables.get("eval");
                            recordTables.put("eval",evalNumTmp+=1);
                        }else if(tmpAst.value=="write"){
                            var writeNum=recordTables.get("write");
                            recordTables.put("write",writeNum+=1);
                        }else if(tmpAst.value=="writeln"){
                            var writelnNum=recordTables.get("writeln");
                            recordTables.put("writeln",writelnNum+=1);
                        }else if(tmpAst.value=="escape"){
                            var escapeNum=recordTables.get("escape");
                            recordTables.put("escape",escapeNum+=1);
                        }else if(tmpAst.value=="unescape"){
                            var unescapeNum=recordTables.get("unescape");
                            recordTables.put("unescape",unescapeNum);
                        }else if(tmpAst.value=="fromCharCode"){
                            var fromCharCodeNum=recordTables.get("fromCharCode");
                            recordTables.put("fromCharCode",fromCharCodeNum+=1);
                        }else if(tmpAst.value=="split"){
                            var splitNum=recordTables.get("split");
                            recordTables.put("split",splitNum+=1);
                        }else if(tmpAst.value=="subString"){
                            var subStringNum=recordTables.get("subString");
                            recordTables.put("subString",subStringNum+=1);
                        }else if(tmpAst.value=="charAt"){
                            var charAtNum=recordTables.get("charAt");
                            recordTables.put("charAt",charAtNum+=1);
                        }else if(tmpAst.value=="ActiveXObject"){
                            var ActiveXObjectNum=recordTables.get("ActiveXObject");
                            recordTables.put("ActiveXObject",ActiveXObjectNum+=1);
                        }else if(tmpAst.value=="createElement"){
                            var createElementNum=recordTables.get("createElement");
                            recordTables.put("createElement",createElementNum+=1);
                        }else if(tmpAst.value=="location"){
                            var locationNum=recordTables.get("location");
                            recordTables.put("location",locationNum+=1);
                        }else if(tmpAst.value=="URL"){
                            var URLNum=recordTables.get("URL");
                            recordTables.put("URL",URLNum+=1);
                        }else if(tmpAst.value=="replace"){
                            var replaceNum=recordTables.get("replace");
                            recordTables.put("replace",replaceNum+=1);
                        }else if(tmpAst.value=="writeln"){
                            var writelnNum=recordTables.get("writeln");
                            recordTables.put("writeln",writelnNum+=1);
                        }else if(tmpAst.value=="referrer"){
                            var referrerNum=recordTables.get("referrer");
                            recordTables.put("referrer",referrerNum+=1);
                        }else  if(tmpAst.value=="setTimeout"){
                            var setTimeoutNum=recordTables.get("setTimeout");
                            recordTables.put("setTimeout",setTimeoutNum+=1);
                        }else if(tmpAst.value=="reload"){
                            var reloadNum=recordTables.get("reload");
                            recordTables.put("reload",reloadNum+=1);
                        }
                    }
                    break;
                case"ConditionalExpression":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent){
                        BFS(tmpAst.consequent,recordTables);
                    }
                    if(tmpAst.alternate){
                        BFS(tmpAst.alternate,recordTables);
                    }
                    break;
                case"Identifier":
                    var idenAllNumTmp=recordTables.get("idenAll");
                    recordTables.put("idenAll",idenAllNumTmp+=1);

                    if(tmpAst.name){
                        var lite=tmpAst.name.toString().toLocaleLowerCase();
                        var len=lite.length;
                        var max=recordTables.get("StringMaxLen");
                        if(len>max) {
                            recordTables.put("StringMaxLen",len);
                        }
                        var tmp=JudeIncludeSC(lite);
                        var SpecialCodeNum=recordTables.get("SpecialCode");
                        //console.log(SpecialCodeNum);
                        recordTables.put("SpecialCode",SpecialCodeNum+tmp);
                        //var returnAdNum=judgeStrIncludeAdNum(lite);
                        //var liteAdNumTmp=recordTables.get("strAd");
                        //recordTables.put("idenAd",liteAdNumTmp+=returnAdNum);

                        if(tmpAst.name=="eval"){
                            var evalNumTmp=recordTables.get("eval");
                            recordTables.put("eval",evalNumTmp+=1);
                        }else if(tmpAst.name=="write"){
                            var writeNum=recordTables.get("write");
                            recordTables.put("write",writeNum+=1);
                        }else if(tmpAst.name=="writeln"){
                            var writelnNum=recordTables.get("writeln");
                            recordTables.put("writeln",writelnNum+=1);
                        }else if(tmpAst.name=="escape"){
                            var escapeNum=recordTables.get("escape");
                            recordTables.put("escape",escapeNum+=1);
                        }else if(tmpAst.name=="unescape"){
                            var unescapeNum=recordTables.get("unescape");
                            recordTables.put("unescape",unescapeNum);
                        }else if(tmpAst.name=="fromCharCode"){
                            var fromCharCodeNum=recordTables.get("fromCharCode");
                            recordTables.put("fromCharCode",fromCharCodeNum+=1);
                        }else if(tmpAst.name=="split"){
                            var splitNum=recordTables.get("split");
                            recordTables.put("split",splitNum+=1);
                        }else if(tmpAst.name=="subString"){
                            var subStringNum=recordTables.get("subString");
                            recordTables.put("subString",subStringNum+=1);
                        }else if(tmpAst.name=="charAt"){
                            var charAtNum=recordTables.get("charAt");
                            recordTables.put("charAt",charAtNum+=1);
                        }else if(tmpAst.name=="ActiveXObject"){
                            var ActiveXObjectNum=recordTables.get("ActiveXObject");
                            recordTables.put("ActiveXObject",ActiveXObjectNum+=1);
                        }else if(tmpAst.name=="createElement"){
                            var createElementNum=recordTables.get("createElement");
                            recordTables.put("createElement",createElementNum+=1);
                        }else if(tmpAst.name=="location"){
                            var locationNum=recordTables.get("location");
                            recordTables.put("location",locationNum+=1);
                        }else if(tmpAst.name=="URL"){
                            var URLNum=recordTables.get("URL");
                            recordTables.put("URL",URLNum+=1);
                        }else if(tmpAst.name=="replace"){
                            var replaceNum=recordTables.get("replace");
                            recordTables.put("replace",replaceNum+=1);
                        }else if(tmpAst.name=="writeln"){
                            var writelnNum=recordTables.get("writeln");
                            recordTables.put("writeln",writelnNum+=1);
                        }else if(tmpAst.name=="referrer"){
                            var referrerNum=recordTables.get("referrer");
                            recordTables.put("referrer",referrerNum+=1);
                        }else  if(tmpAst.name=="setTimeout"){
                            var setTimeoutNum=recordTables.get("setTimeout");
                            recordTables.put("setTimeout",setTimeoutNum+=1);
                        }else if(tmpAst.name=="reload"){
                            var reloadNum=recordTables.get("reload");
                            recordTables.put("reload",reloadNum+=1);
                        }
                    }
                    break;
                //这里得到了调用函数的整个语句，如果只是想得到调用的函数，可以进一步拆分得到想要的
                case"CallExpression":
                    var FunctionCallNum=recordTables.get("FunctionCall");
                    recordTables.put("FunctionCall",FunctionCallNum+=1);
                    if(tmpAst.callee){
                        BFS(tmpAst.callee,recordTables);
                    }
                    if(tmpAst.arguments.length!=0){
                        tmpAst.arguments.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"IfStatement":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent){
                        BFS(tmpAst.consequent,recordTables);
                    }
                    if(tmpAst.alternate){
                        BFS(tmpAst.alternate,recordTables);
                    }
                    break;
                case"ReturnStatement":
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case"TryStatement":
                    //var tryNumTmp=recordTables.get("try");
                    //recordTables.put("try",tryNumTmp+=1);
                    if(tmpAst.block){
                        BFS(tmpAst.block,recordTables);
                    }
                    if(tmpAst.handlers.length!=0){
                        tmpAst.handlers.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"CatchClause":
                    if(tmpAst.param){
                        BFS(tmpAst.param,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case"UnaryExpression":
                    if(tmpAst.argument!=null){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case"ForStatement":
                    if(tmpAst.init){
                        BFS(tmpAst.init,recordTables);
                    }
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.update){
                        BFS(tmpAst.update,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "FunctionDeclaration":
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    if(tmpAst.params.length!==0){
                        tmpAst.params.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "UpdateExpression":
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case "NewExpression":
                    if(tmpAst.arguments.length!=0){
                        BFS(tmpAst.arguments.forEach(function(item){
                            BFS(item,recordTables);
                        }));
                    }
                    break;
                case "WhileStatement":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "SequenceExpression":
                    if(tmpAst.expressions.length!=0){
                        tmpAst.expressions.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "ArrayExpression":
                    if(tmpAst.elements.length!=0){
                        tmpAst.elements.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "LogicalExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case "ThrowStatement":
                    // var throwNumTmp=recordTables.get("throw");
                    // recordTables.put("throw",throwNumTmp+=1);
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case "EmptyStatement":
                    break;
                case "DoWhileStatement":
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    break;
                case "WithStatement":
                    if(tmpAst.object){
                        BFS(tmpAst.object,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "ForInStatement":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "BreakStatement":
                    break;
                case "SwitchStatement":
                    if(tmpAst.discriminant){
                        BFS(tmpAst.discriminant,recordTables);
                    }
                    if(tmpAst.cases.length!=0){
                        tmpAst.cases.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "SwitchCase":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent.length!=0){
                        tmpAst.consequent.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"ContinueStatement":
                    break;
                case "ThisExpression":
                    break;
                case "LabeledStatement":
                    if(tmpAst.label){
                        BFS(tmpAst.label,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                default :
                    throw new Error(tmpAst.type);

            }
        }
    }

    //BFS(ast);
    exports.BFS=BFS;
});