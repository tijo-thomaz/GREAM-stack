$(".toggle").click(function () {
    console.log("toggling sidebar");
      $(".sidebar2").toggleClass('active');
  
  });
  $(".cancel").click(function () {
    console.log("toggling visibility");
      $(this).parent().toggleClass('gone');
  
  });
  