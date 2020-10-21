// toggle active
$(function () {

  $(function(){
    $("h3").click(function(){
      var idx=$(this).index();
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
      $(".cart-zone").eq(idx).show().siblings().hide();
    });
  });

});

// checkbox
function check_all(obj,cName)
{
    var checkboxs = document.getElementsByName(cName);
    for(var i=0;i<checkboxs.length;i++){checkboxs[i].checked = obj.checked;}
}
