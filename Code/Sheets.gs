function deleteSheets() {
  let sheets = ss.getSheets();  
  for(let i=0 ; i<sheets.length;i++){
    let name = sheets[i].getName();
    if(name != 'Channels' && name != 'UserChannelVideos' && name != 'PublicVideos'){
      ss.deleteSheet(ss.getSheetByName(name));
    }
  }
  
}

function clearSheets(){
  let sheetNames = ['UserChannelVideos','Channels','PublicVideos'];
  for(let i =0;i<sheetNames.length;i++){
    let sheet = ss.getSheetByName(sheetNames[i]);
    var range = sheet.getDataRange();
    var numRows = range.getNumRows();
    sheet.deleteRows(2,numRows-1);
  }
}

function resetDatabse(){
  deleteSheets();
  clearSheets();
}