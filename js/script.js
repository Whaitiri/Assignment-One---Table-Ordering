function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(timeleft + " seconds to go");
    if(timeleft > 0) {
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
};

progress(300, 300, $('#progressBar'));

$(document).ready(function(){


	//variables
	var brunchButton = $("#brunchButton");
	var brunchContainer = $("#brunchContainer");
	var sidesButton = $ ("#sidesButton");
	var sidesContainer = $("#sidesContainer");
	var drinksButton = $ ("#drinksButton");
	var drinksContainer = $("#drinksContainer");
	var addPopup = $("#addPopup");


	brunchButton.click(function(){
		brunchContainer.addClass("showContainer");
		brunchButton.addClass("menuButtonActive");
		if (sidesContainer.hasClass("showContainer")) {
			sidesContainer.removeClass("showContainer")
			sidesButton.removeClass("menuButtonActive")
		}
		else if (drinksContainer.hasClass("showContainer")) {
			drinksContainer.removeClass("showContainer")
			drinksButton.removeClass("menuButtonActive")
		}
	});

	sidesButton.click(function(){
		sidesContainer.addClass("showContainer");
		sidesButton.addClass("menuButtonActive");
		if (brunchContainer.hasClass("showContainer")) {
			brunchContainer.removeClass("showContainer")
			brunchButton.removeClass("menuButtonActive")
		}
		else if (drinksContainer.hasClass("showContainer")) {
			drinksContainer.removeClass("showContainer")
			drinksButton.removeClass("menuButtonActive")
		}
	});

	drinksButton.click(function(){
		drinksContainer.addClass("showContainer");
		drinksButton.addClass("menuButtonActive");
		if (sidesContainer.hasClass("showContainer")) {
			sidesContainer.removeClass("showContainer")
			sidesButton.removeClass("menuButtonActive")
		}
		else if (brunchContainer.hasClass("showContainer")) {
			brunchContainer.removeClass("showContainer")
			brunchButton.removeClass("menuButtonActive")
		}
	});

	//menu popups
		$(".Add").click(function(){
			var value = $(this).parent().find('h3').text();
			addPopup.html("<p>Added " + value + " to order!</p>");
			addPopup.show();
			setTimeout(function() { addPopup.fadeOut(); }, 1000);
		});

		$(".Remove").click(function(){
			var value = $(this).parent().find('h3').text();
			addPopup.html("<p>Removed " + value + " from order.</p>");
			addPopup.show();
			setTimeout(function() { addPopup.fadeOut(); }, 1000);
		});
});