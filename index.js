var deployId = 'AKfycbwBmihak4BVJYH3DF9SLcroxPyu6IVeGsuHFwOgoy2WX8QODspLLru7bp7HL4CR-VrupA';
let url = `https://script.google.com/macros/s/${deployId}/exec`;

// var videoUrl = 'https://www.youtube.com/watch?v=GPQJNGjN6Dk';



function test(videoUrl){
    url = `${url}?action=addPublicVideo&type=public&url=${videoUrl}`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => console.log(res));  
}



