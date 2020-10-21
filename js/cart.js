// checkbox
function check_all(obj,cName){
    var checkboxs = document.getElementsByName(cName);
    for(var i=0;i<checkboxs.length;i++){checkboxs[i].checked = obj.checked;}
}

$(function () {

  // toggle active
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

  // count

  count();

  function count(){

    // console.log($(".shopping .count").eq(0).text());
    // console.log($(".shopping .tbody .li-3 input").eq(0).val());

    var total = 0;
    $(".shopping .count").each(function(){
       total += parseInt($(this).text());
    });
    // console.log(total);
    $(".all-count").text(total);


    var amount = 0;
    $(".shopping .tbody .li-3 input").each(function(){
      amount += parseInt($(this).val());
    });
    // console.log(amount);
    $(".prod").text(amount);

  }





});
