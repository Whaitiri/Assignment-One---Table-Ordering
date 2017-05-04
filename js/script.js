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
			addPopup.stop(true, false).animate({});
			var value = $(this).parent().find('h3').text();
			addPopup.html("<p>Added " + value + "to order!</p>");
			addPopup.prependTo(this);
			addPopup.show();
			setTimeout(function() { addPopup.fadeOut(); }, 1000);
		});

		$(".Remove").click(function(){
			addPopup.stop(true, false).animate({});
			var value = $(this).parent().find('h3').text();
			addPopup.html("<p>Removed " + value + "from order.</p>");
			addPopup.prependTo(this);
			addPopup.show();
			setTimeout(function() { addPopup.fadeOut(); }, 1000);
		});

	//checkout popup
		$(function() {
	    //----- OPEN
	    $('[data-popup-open]').on('click', function(e)  {
	        var targeted_popup_class = jQuery(this).attr('data-popup-open');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
	 
	        e.preventDefault();
	    });
	 
	    //----- CLOSE
	    $('[data-popup-close]').on('click', function(e)  {
	        var targeted_popup_class = jQuery(this).attr('data-popup-close');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	 
	        e.preventDefault();
	    });
	});
});