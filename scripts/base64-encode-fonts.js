const base64 = require('base-64');
const fs = require('fs');
const path = require('path');
const utf8 = require('utf8');

const directoryPath = path.join(__dirname, '../fonts');
const targetFile = path.join(__dirname, '../styles') + '/_fonts-base64.scss'; 

var content = '';

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (fileName) {
    const filePath = path.join(directoryPath, fileName);
    const fileType = path.extname(filePath);
    const data = fs.readFileSync(filePath, 'utf8');
    const bytes = utf8.encode(data);
    const encoded = base64.encode(bytes);

    content += '@font-face {\n';
    content += '\tfont-family: \'' + path.basename(filePath, fileType) + '\';\n';
    content += '\tsrc: url(\'data:application/x-font-woff;charset=utf-8;base64,';
    content += encoded + '\') format(\'opentype\');\n}\n\n';
  });

  fs.writeFile(targetFile, content, err => {
    if (err) {
      console.error(err)
      return
    }
  });

  console.log('Wrote to ' + targetFile);

});
