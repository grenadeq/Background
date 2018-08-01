rm b.txt
for file in `find server/js ! -name '*.*~' -type f`
do
cp ${file} ADdetection/${file}
node ADdetection/js/dirEntry3.js 
rm ADdetection/${file}
cp ${file} jalangi2/${file}
node jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis jalangi2/src/js/sample_analyses/ChainedAnalyses.js --analysis jalangi2/src/js/runtime/SMemory.js --analysis jalangi2/src/js/sample_analyses/pldi16/myTrace.js jalangi2/${file} 
rm jalangi2/${file}
done
