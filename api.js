//Replace the deployId of your apps script project in the below string

var deployId = 'AKfycbyhmo_ySN9JvOKn9nivjVAAyyFGuODQ1JKEJVZlmX8heis2dHgVhwQpgQeG7SaBb06f0g';

//A proxy is used to avoid the CORS errors
var proxy = 'https://cors.bridged.cc/';

let url = `${proxy}https://script.google.com/macros/s/${deployId}/exec`;

let data = '';
//===========================================Add a video by url==================================================

async function addVideo(videoUrl){
    urlAddVideo = `${url}?action=addPublicVideo&type=public&url=${videoUrl}`;
    var res = await fetch(urlAddVideo);
    res = await res.json();
    return res;
}

//===================================== Retrieve a list of all Public videos ======================================================


async function getPublicVideos(){
    urlGetVideos = `${url}?action=getPublicVideos`;
    var res = await fetch(urlGetVideos);
    res = await res.json();
    return res;
    
}

//============================= Get the statistics for a given video ====================================

async function getVideoStats(id){
    var videoId = id;
    urlFinal = `${url}?action=getVideoStats&id=${videoId}`;
    var res = await fetch(urlFinal);
    res = await res.json();
    return res;
    
}

//===============================Add a channel to monitor================================================

//The link inserted to add the channel should be in the folliwing format
//https://www.youtube.com/channel/<channel ID Here>

async function addChannel(channelUrl){
    let urlFinal = `${url}?action=addNewChannel&channelUrl=${channelUrl}`;
    var res = await fetch(urlFinal);
    res = await res.json();
    return res;
}

//============================= Retrieve a list of all channels currently monitored ======================================================

async function getAllChannels(){
    let urlFinal = `${url}?action=getAllChannels`;
    var res = await fetch(urlFinal);
    res = await res.json();
    return res;
}
 
//=========================================== Get a channel videos by Channel ID ======================================================

async function getChannelVideos(channelId){
    
    let urlFinal = `${url}?action=getChannel&channelId=${channelId}`;
    var res = await fetch(urlFinal);
    res = await res.json();
    return res;
}
  
//======================================= Get user channel videos ================================================================

async function getUserVideos(){
    let urlFinal = `${url}?action=getUserVideos`;
    var res = await fetch(urlFinal);
    res = await res.json();
    return res;
    


}
  
// var link = `https://img.youtube.com/vi/${res[i].id}/hqdefault.jpg`;








