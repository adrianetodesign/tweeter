/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Constructs tweet html.
  const createTweetElement = function(tweet) {
    let $htmlTweet = `
    <article class="tweet">
    <header>
      <div class="user">
        <img src="${escape(tweet.user.avatars)}">
        <h5>${escape(tweet.user.name)}</h5>
      </div>
      <h6>${escape(tweet.user.handle)}</h6>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <span>${timeago.format(escape(tweet.created_at))}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `;
    return $htmlTweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET"
    }).then((tweets) => {
      $("#tweets-container").empty();
      renderTweets(tweets);
    }).catch((err) => {
      console.log("An error has occured:", err);
    });
  };

  loadTweets();


  //--- Tweet form submission ---
  $("form.tweet-form").on("submit", function(event) {
    event.preventDefault();
    //Form Validation
    if (!$(".tweet-text").val()) {
      $(".tweet-error").empty();
      return $(".tweet-error").append("<p class='red-text'>Tweet can not be empty.</p>").slideDown("slow");
    }
    if ($(".tweet-text").val().length > 140) {
      $(".tweet-error").empty();
      return $(".tweet-error").append("<p class='red-text'>Tweet can not exceed 140 characters.</p>").slideDown("slow");
    }
    else {
      $(".tweet-error").slideUp();
    }


    //POST method for submitting tweet form
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    }).then((tweet) => {
      console.log("Tweet submission successful.");
      $('form').trigger('reset');
      loadTweets();
    }).catch((err) => {
      console.log($(this));
      console.log("An error has occured:", err);
    });
  });

  $(window).scroll(function() {
    // Fade arrow in if user scrolls past 50 pixels. Else, fade out.
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);
    } else {
        $('#return-to-top').fadeOut(200);
    }
  });
  $('#return-to-top').click(function() {
      $('body,html').animate({
          scrollTop : 0
      }, 500);
  });

});