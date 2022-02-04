(function($) {

$(() => {
  $(".tweet-text").on("input", function() {
    let charTyped = this.value.length;
    let charAvail = 140 - charTyped;

    // Grab counter element in the next div.
    let counter = $(this).parent().next().children(".counter");

    counter.text(charAvail);

    if (charAvail < 0) {
      counter.addClass("red-text");
    } else {
      counter.removeClass("red-text");
    }
  })
});

})(jQuery);