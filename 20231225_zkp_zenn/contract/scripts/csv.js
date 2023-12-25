const fs = require("fs");

function saveArrayAsCSV(filePath, dataArray) {
  const header = "index,value";
  const rows = dataArray.map(data => Object.values(data).join(',')).join('\n');
  const csv = `${header}\n${rows}`;

  fs.writeFileSync(filePath, csv);
  console.log(`-> Saved in ${filePath}`);
}

function getRowValueFromCsv(filePath, headerValue) {
  const valuesArray = [];
  const csvData = fs.readFileSync(filePath, 'utf-8');
  const [header, ...rows] = csvData.trim().split('\n');
  const valueIndex = header.split(',').indexOf(headerValue);
  rows.forEach(row => {
    const values = row.split(',');
    valuesArray.push(values[valueIndex]);
  });
  return valuesArray
}

module.exports = {
  saveArrayAsCSV,
  getRowValueFromCsv,
};