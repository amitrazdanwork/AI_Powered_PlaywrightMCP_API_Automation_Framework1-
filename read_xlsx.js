const XLSX = require('xlsx');

const filePath = 'C:\\AUTOMATION_PROJECTS\\AI BASED\\PLAYWRIGHT\\API AUTOMATION - In progress\\PLAYWRIGHT_MCP_AI\\TEST SCENARIOS.xlsx';

const workbook = XLSX.readFile(filePath);

console.log('Sheet names:', workbook.SheetNames);

// Find STORE_MODULE sheet
const storeSheet = workbook.Sheets['STORE_MODULE'];
if (!storeSheet) {
    console.log('STORE_MODULE sheet not found');
    process.exit(1);
}

const data = XLSX.utils.sheet_to_json(storeSheet, { header: 1 });
console.log('\nSTORE_MODULE Sheet Data:');
console.log(JSON.stringify(data, null, 2));