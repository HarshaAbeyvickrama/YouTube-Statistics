function doGet(request){
  let response = '';
  switch(request.parameter.action){
    case 'addPublicVideo':
      var url = request.parameter.url;
      var type = request.parameter.type;
      response = addPublicVideo(url,type);
      break;

    case 'addUserVideos':
      response = addUserVideos();
      break;

    case 'addNewChannel':
      var channelUrl = request.parameter.channelUrl;
      response = addNewChannel(channelUrl);
      break;

    case 'getPublicVideos':
      response = getPublicVideos();
      break;

    case 'getUserVideos':
      response = getUserVideos();
      break;

    case 'getAllChannels':
      response = getAllChannels();
      break;
   
    case 'getChannel':
      if(request.parameter.channelId == ''){
        response = {'isSuccess':false , 'message': 'Inavlid Channel Id'};
      }else{
        response = getChannelVideos(request.parameter.channelId);
      }
      
      break;

    case 'getVideoStats':
      response = videoStats(request.parameter.id);
      // response = {'id': request.parameter.id , 'action': request.parameter.action };
      break;

    default:
      response = '55';
  }
  Logger.log(response);
  return ContentService.createTextOutput(
    JSON.stringify(response)
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

//Triggers

//Update the public channel list 
function updateChannelsTrigger(){
  try{
    let errorArray = [];
    let channelSheet = ss.getSheetByName('Channels');
    var range = channelSheet.getDataRange();
    var numRows = range.getNumRows();
    var rows = range.getValues();
    for(let i=1 ; i<numRows ; i++){
      var channelId = rows[i][0];
      var videoIdList = getVideoIds(channelId);
      for (let i =0 ; i<videoIdList.length ; i++){
        var result = addNewVideo(videoIdList[i],'channel',channelId);
        if(result.isSuccess == false){
          Logger.log(result);
          Logger.log('Failed ID : '+videoIdList[i]);
          errorArray.push(result);
        }else{
          Logger.log(result);
          Logger.log('Success ID : '+videoIdList[i]);
        }
      }
      if(errorArray.length == 0){
        Logger.log('Channel Update Successful !!');
      }else{
        Logger.log('Channel Update Failed !!');
      }
    }
  }catch(err){
    Logger.log(err);
  }
  
}

//Update the channel list of user uploads

function updateUserChannelTrigger(){
  try{
    Logger.log(addUserVideos());
  }catch(err){
    Logger.log(err);
  }
}

function updateVideoStatsTrigger(){
  let sheetNameList = ['UserChannelVideos','PublicVideos'];
  for(let i=0; i<sheetNameList.length ; i++){
    let channelSheet = '';
    let sheetName = sheetNameList[i];
    switch (sheetName){
      case 'UserChannelVideos':
        channelSheet = ss.getSheetByName('UserChannelVideos');
      break;
      case 'PublicVideos':
        channelSheet = ss.getSheetByName('PublicVideos');
      break;
    }
    var range = channelSheet.getDataRange();
    var numRows = range.getNumRows();
    var rows = range.getValues();
    for(var j=1;j<numRows;j++){
      var row = rows[j];
      var id = row[0];
      Logger.log(id);
      Logger.log(insertVideoStats(id));
      resizeAllColumns();
    }
  }
}

function updateChannelVideoStatsTrigger(){
   let channelListSheet = ss.getSheetByName('Channels');
   var range1 = channelListSheet.getDataRange();
    var numRows1 = range1.getNumRows();
    var rows1 = range1.getValues();
    for(var i=1;i<numRows1;i++){
      let row1 = rows1[i];
      let channelId = row1[0];
      console.log('channel Id ' + channelId);
      let channelSheet = ss.getSheetByName(channelId);
      var range2 = channelSheet.getDataRange();
      var numRows2 = range2.getNumRows();
      var rows2 = range2.getValues();
      for(var j=1;j<numRows2;j++){
        var row2 = rows2[j];
        var id = row2[0];
        Logger.log('video Id : ' +id);
        Logger.log(insertVideoStats(id));
        resizeAllColumns();
      }
    }

}




