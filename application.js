$(document).ready(function(){
    var $body = $('body');
    $body.html('');
	
	var index;	//stores number of tweets
	var tweetsPosted = 0;
	//updates index every second
	var checkNew = function() {
		index = streams.home.length - 1;
		var numNewTweets = index - tweetsPosted;
		if (numNewTweets > 0) {
			$('#readNew').remove(); //remove existing button
			var $newTweetsButton = $("<button id = readNew>" + numNewTweets + " new tweet(s). Click to read. </button>");
			$body.prepend($newTweetsButton);
			$("#readNew").on("click", function() {
				$(this).remove();
				update();
			});
		}
		setTimeout(checkNew, 1000);
	}
	//loads new tweets to page
	var update = function() {
		checkNew();
		var tweetsPostedAtCall = tweetsPosted;
		while(index >= tweetsPostedAtCall){
			var tweet = streams.home[index];
			var $tweet = $('<div class = center></div>');
			$tweet.append($("<div class = tweetHeader></div>"));
			$tweet.find(".tweetHeader").append('@' + tweet.user + ' - Tweeted at ' + tweet.created_at);
			$tweet.append($("<div class = tweetBody></div>"));
			$tweet.find(".tweetBody").append("<br/>&nbsp; " + tweet.message);
			$tweet.appendTo($body); //place new tweets at top of page
			index--;
			tweetsPosted++;
		}
	}
	update();
	/*
		TO DO:
		*Add time stamps (tweet.created_at)
		*Add button that adds new tweets to page
	*/

});