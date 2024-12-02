
/*
* カスタムディメンションの一覧を読み込む
*/
const FILEKEY ="abcdefghijklmno"; // GoogleSheetのキー（URLの一部分） 例：https://docs.google.com/spreadsheets/d/abcdefghijklmno/edit#gid=0

function getCustomDimensionsFromSheet(){
  var sheetName = "customdimensions";
  var spreadsheet = SpreadsheetApp.openById(FILEKEY);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow(); 
  var ar = sheet.getRange(2,1,lastRow,2).getValues();
  var ret = [];
  for(var i =0; i < ar.length; i++){
    if(ar[i][0] == null || ar[i][0] ==""){
      break;
    }
    var a = {
    "displayName": ar[i][0], 
    "parameterName": ar[i][0],
    "scope": ar[i][1] //"EVENT"
    }
    ret.push(a);
  }
  return ret;
}

/*
* GA4プロパティにカスタムディメンションを作成
*/
function createCustomDimension(propertyId, customDimensionData){
/* 
propertyId = 3234568;
customDimensionData= {
  "displayName": "customer_status",
  "parameterName": "customer_status",
  "scope": "USER" //"EVENT"
}
*/
  var ret = AnalyticsAdmin.Properties.CustomDimensions.create(customDimensionData, 'properties/' + property);
  return ret;
}

/*
* GA4プロパティ個数×カスタムディメンション個数分繰り返す
*/
function main(){
// 今回はGAプロパティIDの読み込み箇所の部分は省略してGA4プロパティIDを直接配列に入れています
  var properties = [
    1234567,
    2345678,
    3456789,
    4567890
  ]; 
  for(const property of properties){
    var cds = getCustomDimensionsFromSheet(property);
    for(const cd of cds) {
      try{
        console.log(createCustomDimension(property, cd));
      }catch(e){
        console.log(e);
      }
    }
  }
}
