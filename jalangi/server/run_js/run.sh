for file in `find ~/jalangi/server/js ! -name '*.*~' -type f`
do
#echo ${file}
#echo ~/jalangi/ADdetection/server/js/${file##*/}
#echo ~/jalani/ADdetection/js/dirEntry3.js
cp ${file} ~/jalangi/ADdetection/server/js/${file##*/}
startTime=`date +"%s.%N"`
node ../../ADdetection/js/dirEntry3.js 
endTime=`date +"%s.%N"` 
echo `awk -v x1="$(echo $endTime | cut -d '.' -f 1)" -v x2="$(echo $startTime | cut -d '.' -f 1)" -v y1="$[$(echo $endTime | cut -d '.' -f 2) / 1000]" -v y2="$[$(echo $startTime | cut -d '.' -f 2) /1000]" 'BEGIN{printf "RunTIme:%.6f s",(x1-x2)+(y1-y2)/1000000}'`
rm ~/jalangi/ADdetection/server/js/${file##*/}
cp ${file} ~/jalangi/jalangi2/server/js/${file##*/}
startTime=`date +"%s.%N"`
node ../../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../../jalangi2/src/js/sample_analyses/ChainedAnalyses.js --analysis ../../jalangi2/src/js/runtime/SMemory.js --analysis ../../jalangi2/src/js/sample_analyses/pldi16/myTrace.js ~/jalangi/jalangi2/server/js/${file##*/}
endTime=`date +"%s.%N"`
echo `awk -v x1="$(echo $endTime | cut -d '.' -f 1)" -v x2="$(echo $startTime | cut -d '.' -f 1)" -v y1="$[$(echo $endTime | cut -d '.' -f 2) / 1000]" -v y2="$[$(echo $startTime | cut -d '.' -f 2) /1000]" 'BEGIN{printf "RunTIme:%.6f s",(x1-x2)+(y1-y2)/1000000}'`
rm ~/jalangi/jalangi2/server/js/${file##*/}

done

