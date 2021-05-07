//Add a public video to database by URL

function addPublicVideo(url,type){
  let videoId = extractVideoIdFromUrl(url);
  return addNewVideo(videoId,type,'');
}

//Return a list of all currenly monitored public videos

function getPublicVideos(){
  return getVideos('PublicVideos');
}

//Return stats for a given video id

function videoStats(id){
  return getStats(id);
}

//Add all user uploaded videos to the database

 function addUserVideos(){	
  try{
    var resultArray = [];
    var channelId = YouTube.Channels.list('id', {mine: true}).items[0].id;
    var videoIdList = getVideoIds(channelId);
    for (let i =0 ; i<videoIdList.length ; i++){
      var result = addNewVideo(videoIdList[i],'user','');
      resultArray.push(result);
    }
    return resultArray;
  }catch(err){
    console.log(err);
    var response = {'isSuccess': false ,'message' : err};
    return response;
  }

}
//Add a new channel to the database to monitor

function addNewChannel(channelUrl){
  var errorArray = [];
  try{
    var channelId = getChannelFromUrl(channelUrl);
    var response = addChannel(channelId);
    
    // check if channel added successfully
    if(response.isSuccess == false){
      return response;
    }
    var sheet = createChannelSheet(channelId);
    // get video list of the channel
    var videoIdList = getVideoIds(channelId);
    // console.log(videoIdList);
    for (let i =0 ; i<videoIdList.length ; i++){
      var result = addNewVideo(videoIdList[i],'channel',channelId);
      if(result.isSuccess == false){
        errorArray.push(result);
      }
    }
    if(errorArray.length == 0){
      return {'isSuccess': true ,'message' : 'Channel Addition success !!'};
    }else{
      return errorArray;
    }
  }catch(err){
    console.log(err);
    var response = {'isSuccess': false ,'message' : err};
    return response;
  }
}
//Return a list of all channels currenly monitored in the database

function getAllChannels(){
  var sheet = ss.getSheetByName('Channels');
  var range = sheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  let channelArray = [];
  for(let i =1;i<numRows;i++){
    let row = rows[i];
    let channelId = row[0];
    let channelName = row[1];
    let description = row[2];
    let publishedAt = row[3];
    let thumbnail = row[4];
    let viewCount = row[5];
    let subscriberCount = row[6];
    let hiddenSubscriberCount = row[7];
    let videoCount = row[8];
    let channel = {channelId,channelName,description,publishedAt,thumbnail,viewCount,subscriberCount,hiddenSubscriberCount,videoCount};
    channelArray.push(channel);
  }
  return channelArray;
}

//Retrieve all videos of a channel that is currenly in the database

function getChannelVideos(channelId){
  var sheet = ss.getSheetByName(channelId);
  var range = sheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  let videoArray = [];
  for(let i =1;i<numRows;i++){
    let row = rows[i];
    let videoId = row[0];
    let title = row[1];
    let publishedDate = row[2];
    let channelName = row[3];
    let video = {videoId,title,publishedDate,channelName};
    videoArray.push(video);
  }
  return videoArray;

}

//Extract the video ID from the URL

function extractVideoIdFromUrl(url) {
  var videoId = url.split('v=')[1];
  var ampersandPosition = videoId.indexOf('&');
  if (ampersandPosition != -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }   
 return videoId;
}

//Get all user uploaded videos currently in the database 
function getUserVideos(){
  return getVideos('UserChannelVideos');
}


