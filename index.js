//Replace the deployId of your apps script project in the below string

var deployId = 'Your Deploy ID here';

//A proxy is used to avoid the CORS errors
var proxy = 'https://cors.bridged.cc/';

let url = `${proxy}https://script.google.com/macros/s/${deployId}/exec`;

let data = '';
//===========================================Add a video by url==================================================

async function addVideo(){
    var videoUrl = document.getElementById('url').value;
    urlAddVideo = `${url}?action=addPublicVideo&type=public&url=${videoUrl}`;
    var res = await fetch(urlAddVideo);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        console.log(response[1])
        
    };
    getResponse();
}

//===================================== Retrieve a list of all Public videos ======================================================


async function getPublicVideos(){
    var div = document.getElementById('thumb');
    urlGetVideos = `${url}?action=getPublicVideos`;
    var res = await fetch(urlGetVideos);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        console.log(response);
        console.log(response[1].title);
        console.log(response[1].channel);
        
    };
    getResponse();
    
}

//============================= Get the statistics for a given video ====================================

async function getVideoStats(){
    var videoId = document.getElementById('id').value;
    urlFinal = `${url}?action=getVideoStats&id=${videoId}`;
    var res = await fetch(urlFinal);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        data = response;
        console.log(data);
        
    };
    getResponse();
    
}

//===============================Add a channel to monitor================================================

//The link inserted to add the channel should be in the folliwing format
//https://www.youtube.com/channel/<channel ID Here>

async function addChannel(){
    var channelUrl = document.getElementById('channelUrl').value;
    let urlFinal = `${url}?action=addNewChannel&channelUrl=${channelUrl}`;
    var res = await fetch(urlFinal);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        console.log(response);
    };
    getResponse();
}

//============================= Retrieve a list of all channels currently monitored ======================================================

async function getAllChannels(){
    let urlFinal = `${url}?action=getAllChannels`;
    var res = await fetch(urlFinal);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        console.log(response)
    };
    getResponse();
}
 
//=========================================== Get a channel videos by Channel ID ======================================================

async function getChannelVideos(){
    var channelId = '';
    let urlFinal = `${url}?action=getChannel&channelId=`;
    var res = await fetch(urlFinal);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        console.log(response);
        
    };
    getResponse();
}
  
//======================================= Get user channel videos ================================================================

async function getUserVideos(){
    var channelId = '';
    let urlFinal = `${url}?action=getUserVideos`;
    var res = await fetch(urlFinal);
    res = await res.json();
    getResponse = async () => {
        var response = res;
        //handle the response here
        // console.log(response);
        console.log(response);
        
    };
    getResponse();
}
  
// var link = `https://img.youtube.com/vi/${res[i].id}/hqdefault.jpg`;








