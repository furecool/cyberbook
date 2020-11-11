$(document).ready(function(){


  //=================== raining  ====================


  // 讓所有圖片讀完再運行，不然(ctrl + F5 會刪除快取)抓不到正確 $(document).height()
  window.onload=function(){

    $(window).resize(function(){
      RootHeight();
      raining();
      });

    // $(document).height()賦值給 :root的一個變數屬性"--height"，即下雨的高度
    RootHeight();
    function RootHeight(){
      let docHeight = $(document).height();
      document.documentElement.style.setProperty('--height', docHeight-200 + 'px');

      // console.log(document.documentElement.style.getPropertyValue('--height'));

    }

    raining();
    function raining(){
      // 有 .raining的話先刪掉，不然 $(window).resize時會重複呼叫，螢幕會爆
      $(".raining").detach();
      let rainElement;
      let counter = 50; // 雨下多大
      for (let i = 0; i < counter; i++) {
        rainElement = document.createElement("hr");
        rainElement.className = "raining";
        rainElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        rainElement.style.animationDuration = 0.2 + Math.random() * 0.2 + "s";
        rainElement.style.animationDelay = Math.random() * 1 + "s";
        document.body.appendChild(rainElement);
      }
    }

  };

  //=================== header  ====================

  // hamburger
  $(document).ready(function() {
     $('.hamburger').on('click',  function(e){
        e.preventDefault();
        $('.menu').toggleClass('show-menu');
    });
  });



});
