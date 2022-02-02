/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

/* <article class="tweet">
<header>
  <div class="user">
    <img src="https://i.imgur.com/73hZDYK.png">
    <h5>Carl Sagan</h5>
  </div>
  <h6>@Cosmos</h6>
</header>
<p>Look again at that dot. That's here. That's home. That's us.</p>
<footer>
  <h6>7 Days Ago</h6>
  <div>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>
</article> */

$(() => {
  const createTweetElement = function(data) {
    return `
    <article class="tweet">
    <header>
      <div class="user">
        <img src="${data.user.avatars}">
        <h5>${data.user.name}</h5>
      </div>
      <h6>${data.user.handle}</h6>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <h6>${timeago.format(data.created_at)}</h6>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `;
  };
  
  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
  $('#tweets-container').append($tweet);
});