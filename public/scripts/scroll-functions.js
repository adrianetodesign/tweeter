//--------- Scroll Functions ----------

$(() => {
  //--- Scrolls back to #new-tweet form
  $("#scroll-new-tweet").click(function() {
    $("html, body").animate({
      scrollTop: $("#new-tweet").offset().top
    },500, function() {
      $(".tweet-text").focus();
    });
  });

  //--- Navigation bg added on scroll
  $(window).scroll(function() {
    if($(this).scrollTop() >= 280) {
      $("nav").addClass("nav-scroll-bg");
    } else {
      $("nav").removeClass("nav-scroll-bg");
    }
  })

  //--- Return to top of page button
  $(window).scroll(function() {
    // Fade button in if user scrolls past 400 pixels. Else, fade out.
    if ($(this).scrollTop() >= 400) {
        $("#return-to-top").fadeIn(200);
    } else {
        $("#return-to-top").fadeOut(200);
    }
  });
  $("#return-to-top").click(function() {
      $("html, body").animate({
          scrollTop: 0
      }, 500);
  });
});