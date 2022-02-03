/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
      method: "post",
      data: $(this).serialize()
    }).then((tweet) => {
      console.log("Tweet submission successful.");
      $(".tweet-text").val("");
    }).catch((err) => {
      console.log("An error has occured:", err);
    });
  });
  renderTweets(data);
});