// checkbox
function check_all(obj,cName){
    var checkboxs = document.getElementsByName(cName);
    for(var i=0;i<checkboxs.length;i++){checkboxs[i].checked = obj.checked;}
}

$(function () {

  // toggle .active
  $(function(){
    $("h3").click(function(){
      var idx=$(this).index();
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
      $(".cart-zone").eq(idx).show().siblings().hide();
    });
  });

  // remove appendTo
  $(".tbody").on("click", ".remove", function () {
    $(this).parent().parent().parent().remove();
    count();
  });

  $(".tbody").on("click", ".to-wish", function () {
    $(this).parent().parent().parent().appendTo(".wish .tbody");
    $(this).text("放入購物車").removeClass("to-wish").addClass("to-shopping");
    count();
  });

  $(".tbody").on("click", ".to-shopping", function () {
    $(this).parent().parent().parent().appendTo(".shopping .tbody");
    $(this).text("放入願望清單").removeClass("to-shopping").addClass("to-wish");
    count();
  });

  $(".wish").on("click", ".all-to-shopping", function () {
    $(".wish .tbody ul").appendTo(".shopping .tbody");
    $(".to-shopping").text("放入願望清單").removeClass("to-shopping").addClass("to-wish");
    count();
  });


  // 當數量改變時
  $(".tbody ").bind("input propertychange", function () {
    count();
  });

  // count
  count();
  function count(){

    // === 單項的: 數量*價格 = 小計 ===
      for (var i = 0; i < $(".tbody ul").length; i++){
        // 第5行 = 第3行 * 第4行
        $(".tbody .li-5").eq(i).text($(".tbody .li-3 input").eq(i).val()*$(".tbody .li-4").eq(i).text());
      }

    // === 數量加總 ===
    var amount = 0;
    $(".shopping .tbody .li-3 input").each(function(){
      amount += parseInt($(this).val());
    });
    $(".c-amount").text(amount);

    // === 小計加總 ===
    var total = 0;
    $(".shopping .tbody .li-5").each(function(){
       total += parseInt($(this).text());
    });
    $(".c-total").text(total);

  }





});
