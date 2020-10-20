// 評等
$(function () {

  var wjx_k = "☆";
  var wjx_s = "★";
  $(".comment>li").on("mouseenter", function () {
    $(this).text(wjx_s).prevAll().text(wjx_s);
    $(this).nextAll().text(wjx_k);

  });

  $(".comment").on("mouseleave", function () {
    $(this).children().text(wjx_k);

    $("li.current").text(wjx_s).prevAll().text(wjx_s);
  });

  $(".comment>li").on("click", function () {
    $(this).addClass("current").siblings().removeClass("current");

  });

});
