$(document).ready(function(){

  //==================== banner ====================

  // 宣告變數
  var $circles = $('.idx>.circle')
  var $carousel = $('.carousel')
  var $imgs = $carousel.children('li')
  var $picWidth = $(".pic").width()
  var current = 0



  // 初始的function(複製圖片、連結圖片和索引圓點)，圖片滑動

  cloneImgs()
  bindEvents()
  $carousel.css({"transform":"translateX(-"+$picWidth+"px)"});
  // console.log($imgs[current]);
  // console.log($($imgs[current]).index("img"));

  // 動態刷新 $picWidth
  $(window).resize(function(){
    $picWidth = $(".pic").width()
  });

  // 關於左右箭頭
  $('.banner .arrow-l').on('click', function () {
      slideTo(current-1)
  })

  $('.banner .arrow-r').on('click', function () {
      slideTo(current+1)
  })

  // 關於計時器
  var timer = setInterval(function () {
      slideTo(current+1)
  },2000)

  $('.banner').on('mouseenter', function () {
      window.clearInterval(timer)
  })

  $('.banner').on('mouseleave', function () {
      timer =setInterval(function () {
          slideTo(current+1)
      },2000)
  })

  // === function們 ===

  // 複製第一張和最後一張圖，分別在最後和最前(4>1234>1)
  function cloneImgs(){
      var $firstCopy = $imgs.eq(0).clone(true)
      var $lastCopy = $imgs.eq($imgs.length-1).clone(true)

      $carousel.append($firstCopy)
      $carousel.prepend($lastCopy)
  }

  // 將索引圓點與 slideTo(index) function 連結
  function bindEvents(){
      $('.idx').on('click', '.circle', function (e) {
          var $circle = $(e.currentTarget)
          var index = $circle.index()
          slideTo(index)
      })
  }

  // 滑到哪一張圖
  function slideTo(index) {
      if(index> $circles.length-1){
          index = 0
      }else if(index<0){
          index = $circles.length-1
      }

      if (current === $circles.length-1 && index ===0) {
          //最后一张到第一张
          $carousel.css({transform:`translateX(${-($circles.length +1) * $picWidth}px)`})
              .one('transitionend', function () {
                  $carousel.hide()
                      .offset()
                  $carousel.css({transform: `translateX(${-(index+1) * $picWidth}px)`})
                      .show()
              })

      }else if (current === 0 && index === $circles.length-1) {
          //第一张到最后一张
          $carousel.css({transform:`translateX(0px)`})
              .one('transitionend', function () {
                  $carousel.hide()
                      .offset()
                  $carousel.css({transform: `translateX(${-(index+1) * $picWidth}px)`})
                      .show()
              })

      }else {
          $carousel.css({transform:`translateX(${- (index+1) * $picWidth}px)`})
      }
      current = index
      $($circles).removeClass("circle-active");
      $($circles[current]).addClass("circle-active");

  }


  // ================= broardcast =================

  function slideLine(box,stf,delay,speed,h){
    //取得id
    var slideBox = document.getElementById(box);
    //預設值 delay:幾毫秒滾動一次(1000毫秒=1秒)
    //       speed:數字越小越快，h:高度
    var delay = delay||1000,speed = speed||20,h = h||20;
    var tid = null,pause = false;
    //setInterval跟setTimeout的用法可以咕狗研究一下~
    var s = function(){tid=setInterval(slide, speed);}
    //主要動作的地方
    var slide = function(){
    //當滑鼠移到上面的時候就會暫停
      if(pause) return;
    //滾動條往下滾動 數字越大會越快但是看起來越不連貫，所以這邊用1
      slideBox.scrollTop += 1;
    //滾動到一個高度(h)的時候就停止
      if(slideBox.scrollTop%h == 0){
    //跟setInterval搭配使用的
        clearInterval(tid);
    //將剛剛滾動上去的前一項加回到整列的最後一項
        slideBox.appendChild(slideBox.getElementsByTagName(stf)[0]);
    //再重設滾動條到最上面
        slideBox.scrollTop = 0;
    //延遲多久再執行一次
        setTimeout(s, delay);
      }
    }
    //滑鼠移上去會暫停 移走會繼續動
    slideBox.onmouseover=function(){pause=true;}
    slideBox.onmouseout=function(){pause=false;}
    //起始的地方，沒有這個就不會動囉
    setTimeout(s, delay);
  }
  //網頁load完會執行一次
  //五個屬性各別是：外面div的id名稱、包在裡面的標籤類型
  //延遲毫秒數、速度、高度
  slideLine('broad_box','div',2000,25,20);

  // ================= mousemove =================

  const rotates = document.querySelectorAll(".content-li");
  const rotates2 = document.querySelectorAll(".products>li");
  const followimgs = document.querySelectorAll(".content .cyberphunk-box");
  const followimgs2 = document.querySelectorAll(".category .cyberphunk-box");

  const range = 40;

  // const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
  const calcValue = (a, b) => (a/b*range-range/2).toFixed(1)

  let timeout;
  document.addEventListener('mousemove', ({x, y}) => {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      const yValue = calcValue(y, window.innerHeight);
      const xValue = calcValue(x, window.innerWidth);

      // content部分
      [].forEach.call(rotates, (rotate) => {
        rotate.style.transform = `rotateX(${-yValue}deg) rotateY(${xValue}deg) translatez(50px)`;
      });

      [].forEach.call(followimgs, (followimg) => {
        followimg.style.transform = `translateX(${-xValue*2}px) translateY(${-yValue*2}px)`;
      });

      // category部分
      [].forEach.call(rotates2, (rotate) => {
        rotate.style.transform = `rotateX(${-yValue}deg) rotateY(${xValue}deg) translatez(50px)`;
      });

      [].forEach.call(followimgs2, (followimg) => {
        followimg.style.transform = `translateX(${-xValue*2}px) translateY(${-yValue*2}px)`;
      });

    })
  }, false);


  });
