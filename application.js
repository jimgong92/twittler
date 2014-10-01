$(document).ready(function(){

    var $body = $('body');
    $body.html('');
	
	var index;	//stores number of tweets
	var tweetsPosted;
	var currentUser;
	
	//updates index every second
	var checkNew = function(instantCheck) {
		index = streams.home.length - 1;
		displayHomeButton();
		displayUpdateButton();

		//every second, refresh tweets to update time markers
		$('.tweetPool').remove();
		if (!instantCheck) {
			update(false);
			setTimeout(checkNew, 1000);
		}
	}
	//reloads tweets to page 
	var update = function(addAllTweets) {
		checkNew(true);
		if (addAllTweets) tweetsPosted = index;
		var toPost = tweetsPosted;
		
		while(toPost > 0){
			if (currentUser) displayTweet(toPost, currentUser);
			else displayTweet(toPost);
			toPost--;
		}
	}
	function getTimeDisplay (date) {
		if (moment().format('YYYYMMDD') !== date.format('YYYYMMDD')) {
			return date.format('MMMM Do YYYY');
		}
		else return moment(date).fromNow();
	}
	
	function displayTweet(tweetIndex, user) {
		var tweet = streams.home[tweetIndex];
		
		//if user argument passed and tweet not by user, exit function
		if (user && tweet.user !== user) return;
		
		var $tweet = $('<div class = tweetPool></div>');
		//tweet header - user and time
		$tweet.append($("<div class = tweetHeader></div>"));
		var $user = $("<p class = alignTextLeft> &nbsp;@" + tweet.user + tweetIndex +"</p>");
		
		//ENABLE USER FILTER
		$user.click(function() { 
			currentUser = tweet.user;
		});
		//user-friendly time display
		var $tweetTime = $("<p class = alignTextRight>" + getTimeDisplay(tweet.created_at) + "&nbsp;</p>");
		$tweet.find(".tweetHeader").append($user);
		$tweet.find(".tweetHeader").append($tweetTime);
		//Show full time stamp if user hovers mouse over time
		$tweetTime.on('mouseenter', function() {
			$(this).text(tweet.created_at.format() + " ")
		});
		//tweet body
		$tweet.append($("<div class = tweetBody></div>"));
		var $tweetText = $("<p class = tweetText> </br>&nbsp;" + tweet.message + "</p>");
		$tweet.find(".tweetBody").append($tweetText);	
		//Add tweets to body
		$tweet.appendTo($body); 
	}
	function displayUpdateButton() {
		var numNewTweets = index - tweetsPosted;
		if (numNewTweets > 0) {
			$('#readNew').remove(); //remove existing button
			var $newTweetsButton = $("<button id = readNew>" + numNewTweets + " new tweet(s). Click to read. </button>");
			$body.prepend($newTweetsButton);
			$("#readNew").on("click", function() {
				$(this).remove();
				update(true);
			});
		}
	}
	function displayHomeButton() {
		if (currentUser) {
			$('#home').remove(); //remove existing button
			var $homeButton = $("<button id = home> Return Home </button>");
			$body.prepend($homeButton);
			$("#home").on("click", function() {
				$(this).remove();
				currentUser = undefined;
				checkNew(true);
			});
		}
	}
	
	checkNew();
	update(true);
	
	/*
		TO DO:
		*Enable user tweet
	*/
	//$body.prepend($("<form method=post>Enter Twittler Handle: <input name=username type=text><input type=Submit value=Enter></form>");
	
});