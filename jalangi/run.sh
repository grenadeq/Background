for file in `find server/js ! -name '*.*~' -type f`
do
cp ${file} ADdetection/${file}
node ADdetection/js/dirEntry3.js 
rm ADdetection/${file}
done
