const ExcelJs=require('exceljs');
const{test,expect}=require('@playwright/test');

async function writeExcelTest(searchText,replaceText,change,filepath){
const workbook=new ExcelJs.Workbook();

await workbook.xlsx.readFile(filepath);
const worksheet=workbook.getWorksheet('Sheet1');
const output= await readExcel(worksheet,searchText,replaceText);
 const cell=worksheet.getCell(output.row,output.col+change.colChange)
 cell.value=replaceText;
 await workbook.xlsx.writeFile('D:/TestExcel.xlsx');
}
async function readExcel(worksheet,searchText){
    let output={row:-1,col:-1};
    worksheet.eachRow((row,rowNumber) =>
 {
     row.eachCell((cell,colNumber) =>
     {
        if(cell.value === searchText){
            output.row=rowNumber;
            output.col=colNumber;
        }
     })
     
 });
 return output;
}


test('Upload download Excel',async({page})=>
{
      const textSearch = 'Banana';
    const updateValue = '333';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadpromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"D:/TestExcel.xlsx");
    await downloadpromise;
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("D:/TestExcel.xlsx")
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
   
}
)