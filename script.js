$(function () {
 $(".sidebar-link").click(function () {
  $(".sidebar-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(window)
 .resize(function () {
  if ($(window).width() > 1090) {
   $(".sidebar").removeClass("collapse");
  } else {
   $(".sidebar").addClass("collapse");
  }
 })
 .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
 v.addEventListener("mouseover", () => {
  const video = v.querySelector("video");
  video.play();
 });
 v.addEventListener("mouseleave", () => {
  const video = v.querySelector("video");
  video.pause();
 });
});

$(function () {
 $(".logo, .logo-expand, .discover").on("click", function (e) {
    
//   $(".main-container").removeClass("show");
//   $(".main-container").scrollTop(0)
  $(".sec3").hide('slow')
    $(".sec2").hide('slow') 
    $(".sec1").show('slow') ;
 });

 $(".trending , .video").on("click", function (e) {
//   $(".main-container").addClass("show");
//   $(".main-container").scrollTop(0);
//   $(".sidebar-link").removeClass("is-active");
//   $(".trending").addClass("is-active")
  $(".sec1").hide('slow')
  $(".sec3").hide('slow')
    $(".sec2").show('slow') ;
 });

//  $(".userChannels").on("click", function (e) {
//   $(".main-container").addClass("show");
//   $(".main-container").scrollTop(0);
//   $(".sidebar-link").removeClass("is-active");
//   $(".userChannels").addClass("is-active");
//  });

 $(".userChannels").on("click", function (e){
   //  $(".main-container").addClass("show");
   //  $(".main-container").scrollTop(0);
    $(".sidebar-link").removeClass("is-active");
    $(".userChannels").addClass("is-active")
    $(".sec1").hide('slow')
    $(".sec2").hide('slow')
    $(".sec3").show('slow');
   //  document.getElementById('sec3').style.display = "block";

 })

 $(".video").click(function () {
  var source = $(this).find("source").attr("src");
  var title = $(this).find(".video-name").text();
  var person = $(this).find(".video-by").text();
  var img = $(this).find(".author-img").attr("src");
  $(".video-stream video").stop();
  $(".video-stream source").attr("src", source);
  $(".video-stream video").load();
  $(".video-p-title").text(title);
  $(".video-p-name").text(person);
  $(".video-detail .author-img").attr("src", img);
 });
});