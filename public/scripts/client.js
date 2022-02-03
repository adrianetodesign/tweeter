/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  let $htmlTweet = `
  <article class="tweet">
  <header>
    <div class="user">
      <img src="${tweet.user.avatars}">
      <h5>${tweet.user.name}</h5>
    </div>
    <h6>${tweet.user.handle}</h6>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <h6>${timeago.format(tweet.created_at)}</h6>
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
    $("#tweets-container").append(createTweetElement(tweet));
  }
};

$(() => {
  $("form.tweet-form").on("submit", (event) => {
    console.log("Tweet submitted, adding to database.");
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    }).then((tweet) => {
      console.log("Tweet submission successful.");
      $(".tweet-text").val("");
    }).catch((err) => {
      console.log("An error has occured:", err);
    });
  });

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET"
    }).then((tweets) => {
      renderTweets(tweets);
    }).catch((err) => {
      console.log("An error has occured:", err);
    });
  };

  loadTweets();
  
});