getUserVideos().then(res => {
    let div = document.getElementById('userVideos');
    for(let i=0;i<res.length;i++){
      // console.log(res[i]);
      let channel = res[i].channel;
      let id = res[i].id;
      let published = res[i].published;
      let title = res[i].title;
      
      var video = `
      <div class="video anim " style="--delay: .4s" onclick="videoDetails('${id}','${title}','${published}','${channel}')">
        <div class="video-time">8 min</div>
        <div class="video-wrapper">
          <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="" >
        </div>
        <div class="video-by">${channel}</div>
        <div class="video-name">${title}</div>
        <div class="video-view">Published At ${published}</div>
      </div>
      `;
      div.innerHTML += video;
    }
  }
       
   ).catch(err => 
       console.log(err)
   );



getPublicVideos().then(res => {
  let div = document.getElementById('publicVideos');
  for(let i=0;i<res.length;i++){
    
    let channel = res[i].channel;
    let id = res[i].id;
    let published = res[i].published;
    let title = res[i].title;
    
    var video = `
    <div class="video anim " style="--delay: .4s; " onclick="videoDetails('${id}','${title}','${published}','${channel}')">
      
      <div class="video-wrapper">
        <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="" >
      </div>
      <div class="video-by">${channel}</div>
      <div class="video-name">${title}</div>
      <div class="video-view">Published At ${published}</div>
    </div>
    `;
    div.innerHTML += video;
  }
}
     
 ).catch(err => 
     console.log(err)
 );



function videoDetails(id,title,date,channel){
    location.href = `video.html?id=${id}&t=${title}&c=${channel}&d=${date}`;
}

getAllChannels().then(res => {
  let div = document.getElementById('sec2');
  for(let i=0;i<res.length;i++){
    let channelName = res[i].channelName;
    let subscriberCount = res[i].subscriberCount;
    let thumbnail = res[i].thumbnail;
    let channelId = res[i].channelId;
    var channel = `
    <div class="video anim videoCard" style="--delay: .4s" onclick="getChannel('${channelId}')">
      
      <div class="video-wrapper">
        <img height="240px" style="border-radius: 50%; padding: 10px;" width="240px" src="${thumbnail}" alt="" >
      </div>
      
      <div class="video-name">${channelName}</div>
      <div class="video-view">${subscriberCount} Subscribers</div>
    </div>
    `;
    div.innerHTML += channel;
  }
}
     
 ).catch(err => 
     console.log(err)
 );

 function getChannel(id){
   location.href = `channel.html?id=${id}`;
 }


 function channelLink(){
   var channelUrl = document.getElementById('channelLink').value;
   addChannel(channelUrl).then(res =>{
     if(res.isSuccess == tru){
       console.log('channel Added');
       location.reload();
     }
   })
 }
 function videoLink(){
   var videoUrl = document.getElementById('videoLink').value;
   addVideo(videoUrl).then(res =>{
     if(res.isSuccess == tru){
       console.log('Video Added');
       location.reload();
     }
   })
 }