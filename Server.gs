//get the spreadsheet
var ss = SpreadsheetApp.getActiveSpreadsheet();

var COLUMN_NAME = {
  VIDEO: 'video ID',
  TITLE: 'Video Title',
  PDATE: 'Publish Date',
  CHANNEL: 'Channel'
};

//Initialize a new sheet to monitor a video data


// Auto resize the columns
function resizeAllColumns () {
  var sheet = ss.getActiveSheet();
  var dataRange = sheet.getDataRange();
  var firstColumn = dataRange.getColumn();
  var lastColumn = dataRange.getLastColumn();
  sheet.autoResizeColumns(firstColumn, lastColumn);
}


function updateStats(){
  var publicChannelSheet = ss.getSheetByName('PublicVideos');
  var channelSheet = ss.getSheetByName('UserChannelVideos');

  var range = publicChannelSheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  var headerRow = rows[0];

  var videoIdColumnIndex = headerRow.indexOf('video ID');
  for(var i=1;i<numRows;i++){
    var row = rows[i];
    var id = row[videoIdColumnIndex];
    insertVideoStats(id);
    resizeAllColumns();
  }

}
function addChannel(channelId){
  var channelSheet = ss.getSheetByName('Channels');
  var range = channelSheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();

  //check if channel already exists
  for(var i=1;i<numRows;i++){
    if(rows[i][0]==channelId){
      return {'isSuccess' : false,'error' : 'Channel already exists !!'};
    }
  }
  //get Channel Details
  var response = getChannelDetails(channelId);
  
  //check the response
  if(response.isSuccess == false){
    return response;
  }
  //exract the details from the response 
  var name = response.snippet.title;
  var description = response.snippet.description;
  var publishedAt = response.snippet.publishedAt;
  var thumbnail = response.snippet.thumbnails.high.url;
  var viewCount = response.statistics.viewCount;
  
  var hiddenSubscriberCount = response.statistics.hiddenSubscriberCount;
  if(hiddenSubscriberCount == true){
    var subscriberCount = 0;
    hiddenSubscriberCount = 'y';
  }else{
    var subscriberCount = response.statistics.subscriberCount;
    hiddenSubscriberCount = 'n';
  }
  var videoCount = response.statistics.videoCount;

  var row = [channelId,name,description,publishedAt,thumbnail,viewCount,subscriberCount,hiddenSubscriberCount,videoCount];
  try{
    channelSheet.appendRow(row);
    return {'isSuccess' : true,'message' : 'Channel added succesfully'};
  }catch(err){
    return {'isSuccess' : false,'message' : 'Adding Channel Failed'};
  }


  
}


//Get channel stats for a given channel 
function getChannelDetails(channelId){
  var part = "snippet,statistics";
  var channelDetails = YouTube.Channels.list(part,{'id':channelId});

  //check if the channel exists
  if(channelDetails.pageInfo.totalResults == 0){
    return {'isSuccess' : false,'error' : 'No Channel found for the give ID'};
  }
  //return the json data if channel is found
  return channelDetails.items[0];


}



// add a new video to the database

 function addNewVideo(id,type,channelSheetId){
  switch(type){
    case 'user':
    var channelSheet = ss.getSheetByName('UserChannelVideos');
    break;
    case 'public':
    var channelSheet = ss.getSheetByName('PublicVideos');
    break;
    case 'channel':
    var channelSheet = ss.getSheetByName(channelSheetId);
    break;
  }
  
  var range = channelSheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  for(var i=1;i<numRows;i++){
    var row = rows[i];
    if(row[0]==id){
      var error = {'isSuccess' : false,'error' : 'Video already exists !!'};
      return error;
    }
  }

  //Retrieve basic details of the video

  var detailsResponse =  getBasicDetails(id);
  if(detailsResponse.isSuccess == false){
    Logger.log(detailsResponse.error);
    return detailsResponse;
  }else{
    if(typeof detailsResponse.items[0].snippet == 'undefined'){
      var error = {'isSuccess' : false,'error' : 'Video does not exists !!'};
      return error;
    }else{
      var videoTitle = detailsResponse.items[0].snippet.title;
      var publishedDate = detailsResponse.items[0].snippet.publishedAt;
      var publishDateFormatted = new Date(publishedDate);
      var channelName = detailsResponse.items[0].snippet.channelTitle;

      //add basic details of the video to the sheet

      var newRow = [id,videoTitle,publishDateFormatted,channelName];
      var result = channelSheet.appendRow(newRow);
      var response =  intializeSheet(id);
      return response;
    }
    
  }
  

}

function createChannelSheet(channelID){
    var sheet = ss.insertSheet(channelID);
    var headers = ['video ID','Video Title','Publish Date'];
    sheet.appendRow(headers);
    return sheet;
}
//Retrieve video title , channel and other basic details from the API

 function getBasicDetails(id){
  try{
      var part = "snippet";
      var response =  YouTube.Videos.list(part,
          {'id': id});
      return response;
  }catch(err){
      var error = {'isSuccess' : false,'error' : err};
      return error;
  }
}



function intializeSheet(id){
  try{
    var sheet = ss.insertSheet(id);
    var headers = [['Date','Time','views','Likes','Comments']];
    sheet.getRange(1,1,1,headers[0].length).setValues(headers);
    var result = insertVideoStats(id);
    if(result.isSuccess == false){
      return result;
    }else{
      resizeAllColumns();
      return {'isSuccess' : true,'message' : 'Video added successfully'};
    }
    
  }catch(err){
    var error = {'isSuccess' : false,'error' : err};
    return error;
  }
  
}


//Insert the video stats to the relavent sheet

 function insertVideoStats(id){
  //initialize stats
    var sheet = ss.getSheetByName(id);
    var detailsResponse =  getVideoStats(id);
    if(detailsResponse.isSuccess == false){
      var error = {'isSuccess' : false,'error' : 'Failed to retrieve stats'};
      return error;
    }else{
      if(typeof detailsResponse.items.length == 0){
        var error = {'isSuccess' : false,'error' : 'Video does not exists !!'};
        Logger.log(error);
        return error;
      }else{
        var views = detailsResponse.items[0].statistics.viewCount;
        var likes = detailsResponse.items[0].statistics.likeCount;
        var comments = detailsResponse.items[0].statistics.commentCount;
        var date = Utilities.formatDate(new Date(), "GMT+05:30", "dd/MM/yyyy");
        var time = Utilities.formatDate(new Date(), "GMT+05:30", "HH:mm:ss");
      
        //append stats
        var stats = [date,time,views,likes,comments];
        try{
           sheet.appendRow(stats);
          var response = {'isSuccess' : true,'message' : 'Row appended successfully'};
          return response;
        }catch(err){
          var error = {'isSuccess' : false,'error' : err};
          return error;
        }
      }

    }
    
}

//Get video likes,comments and views from the API

function getVideoStats(id){
  try{
    var part = "statistics";
    var response =  YouTube.Videos.list(part,
        {'id': id});
    return response;
  }catch(err){
    var error = {'isSuccess' : false,'error' : err};
    Logger.log(err);
    return error;
  }  
}

//Retrieve all public videos

function getVideos(sheetName){
  var channelSheet = ss.getSheetByName(sheetName);
  var range = channelSheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  var headerRow = rows[0];
  var videos = [];
  for(let i=1;i<numRows;i++){
    var video = {
      id: rows[i][0],
      title: rows[i][1],
      published: rows[i][2],
      channel: rows[i][3]
    }
    videos.push(video);
  }
  return videos;
}

function getStats(id){
  var channelSheet = ss.getSheetByName(id);
  var range = channelSheet.getDataRange();
  var numRows = range.getNumRows();
  var rows = range.getValues();
  var stats = [];
  for(let i=1;i<numRows;i++){
    var stat = {
      id: id,
      date: rows[i][0],
      statTime: rows[i][1],
      views: rows[i][2],
      likes: rows[i][3],
      comments: rows[i][4]
    }
    stats.push(stat);
  }
  return stats;
}

// get videos IDS for a given channel
   function getVideoIds (channelId) {
    
    var res =[], pageToken;
    do {
      // get all the videos for this channel
      var videos =  YouTube.Search.list('id', {
        channelId:channelId,
        maxResults: 50,
        pageToken: pageToken
      });
      //push cahnnel ids to the array
      for(var i =1;i<videos.items.length;i++){
        res.push(videos.items[i].id.videoId);
      }
      
      // set up for the next one
      pageToken = videos.nextPageToken;
      
  
      
    } while (pageToken && videos.items.length);

    if(res.length == 0){
      var err =  {'isSuccess': false ,'message' : 'No Videos Found on this channel'};
      console.log(err);
      return err;
    }else{
      return res;
    }
    
	}

//get channelID from url
//https://gist.github.com/mikeflynn/5887186

function getChannelFromUrl(url) {
  var pattern = new RegExp('^(https?:\/\/)?(www\.)?youtube\.com/(channel/)?([a-z\-_0-9]+)/?([\?#]?.*)', 'i');
  var matches = url.match(pattern);
  if(matches) {
    return matches[4];
  }

  return url;
}