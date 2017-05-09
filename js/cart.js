var cart = [];

$(document).ready(function(){

	//Check local Storage and if there is something called item then create the list
	if (localStorage.getItem("items") === null) {
		$(".cartContainer").append($("<p class='empty'>Your cart is empty.</p>").html(item));
		$(".checkoutButton").addClass("disableButton");
	} else {
		$(".checkoutButton").removeClass("disableButton");
		var storedItems = JSON.parse(localStorage.getItem("items"));
		for(var i=0; i<storedItems.length;i++){
			var item = storedItems[i];
			var ClassName = item['product'].replace(/\s/g, '');
			$(".cartContainer").append("<div class='cartItem "+ClassName+"'>"+
								"<img src='img/"+ClassName+".jpg' alt='"+ClassName+"' class='cartItemImage'>"+
									"<div class='cartText'>"+
										"<h3 class='cartItemHeader product-title'>"+item['product']+"</h3>"+
										"<p>$<span class='originalPrice'>"+item['originalPrice']+"</span> x <span class='product-quan'>"+item['quantity']+"</span></p>"+
										"<button class='buttonAR Add'><i class='fa fa-plus-square' aria-hidden='true'></i></button>"+
										"<button class='buttonAR Remove'><i class='fa fa-minus-square' aria-hidden='true'></i></button>"+
										"<p>Total: $<span class='product_price'>"+item['price']+"</span></p>"+
									"</div>"+
								"</div>"
								);
			cart.push(item);
		}
	}
	CartCount();
	PriceCount();
	console.log(cart);
	//Empty your entire cart and your Local Storage
	$('#Clear').click(function(){
		localStorage.clear();
		$(".cartContainer").empty();
		cart = [];
		$(".cartContainer").append($("<p class='empty'>Your cart is empty.</p>"));
		CartCount();
		PriceCount();
		$(".checkoutButton").addClass("disableButton");
	});

});

//Adding new Items into your Cart
//It will check to see if there is already something in your cart.
//If there isn't then it will create a new entry
//If there is it will add the new quantity
$(document).on('click', '.Add', function(e) {
	var value = $(this).parent().find('.product-title').text();
	var ClassName = value.replace(/\s/g, '');
	var price = parseFloat($(this).parent().find('.product_price').text()).toFixed(2);

	if($("div." + ClassName).length) {
		var originalPrice = parseFloat($(this).parent().find('.originalPrice').text()).toFixed(2);
	} else {
		var originalPrice = price;
	}
	var quantity = 1;

	var CartItemFound = false;
	var fullprice = parseFloat(price * quantity).toFixed(2);

	if(cart.length !== 0){
		for(var i=0; i<cart.length; i++){
			if(cart[i]['product'] === value){
				CartItemFound = true;
				break;
			}
		}
	}

	if(CartItemFound === true){
		//There is an exsisting entry in the array
		for(var i=0; i<cart.length; i++){
			if(cart[i]['product'] === value){
				var OldQuant = Number(cart[i]['quantity']);
				var OldPrice = parseFloat(cart[i]['price']).toFixed(2);
				var NewQuant = parseInt(OldQuant) + quantity;
				var NewPrice = Number(OldPrice) + Number(originalPrice);
				var NewPrice = parseFloat(NewPrice).toFixed(2);
				cart[i]['price'] = NewPrice;
				cart[i]['quantity'] = NewQuant;
				$('div.' + ClassName).find('.product-quan').text(NewQuant);
				$('div.' + ClassName).find('.product_price').text(NewPrice);
				break;
			}
		};
		localStorage.setItem("items", JSON.stringify(cart));
	} else {
		//There is a new entry in the array
		cart.push({
			"product" : value ,
			"quantity" : quantity,
			"price" : fullprice,
			"originalPrice" : originalPrice
		});
		localStorage.setItem("items", JSON.stringify(cart));
		$(".empty").remove();
		$(".cartContainer").append("<div class='cartItem "+ClassName+"'>"+
					"<img src='img/"+ClassName+".jpg' alt='"+ClassName+"' class='cartItemImage'>"+
						"<div class='cartText'>"+
							"<h3 class='cartItemHeader product-title'>"+value+"</h3>"+
							"<p>$<span class='originalPrice'>"+originalPrice+"</span> x <span class='product-quan'>"+quantity+"</span></p>"+
							"<button class='buttonAR Add'><i class='fa fa-plus-square' aria-hidden='true'></i></button>"+
							"<button class='buttonAR Remove'><i class='fa fa-minus-square' aria-hidden='true'></i></button>"+
							"<p>Total: $<span class='product_price'>"+fullprice+"</span></p>"+
						"</div>"+
					"</div>"
					);		
	}
	CartCount();
	PriceCount();
});

//When removing a item quantity from cart
$(document).on('click', '.Remove', function(e) {
	var value = $(this).parent().find('.product-title').text();
	var ClassName = value.replace(/\s/g, '');
	var price = parseFloat($(this).parent().find('.product_price').text()).toFixed(2);
	if($("div." + ClassName).length) {
		var originalPrice = parseFloat($(this).parent().find('.originalPrice').text()).toFixed(2);
	} else {
		var originalPrice = price;
	}
	var quantity = 1;

	var CartItemFound = false;

	//Check to see if there is an exsisting entry in localstorage
	if(cart.length !== 0){
		for(var i=0; i<cart.length; i++){
			if(cart[i]['product'] === value){
				CartItemFound = true;
				break;
			}
		}
	}

	if(CartItemFound === true){
		for(var i=0; i<cart.length; i++){
			if(cart[i]['product'] === value){
				var NewQuant = parseInt(cart[i]['quantity']) - quantity;
				var ClassName = cart[i]['product'].replace(/\s/g, '');
				var OldPrice = parseFloat(cart[i]['price']).toFixed(2);
				var NewPrice = Number(OldPrice) - Number(originalPrice);
				var NewPrice = parseFloat(NewPrice).toFixed(2);
				if(NewQuant > 0){
					cart[i]['quantity'] = NewQuant;
					cart[i]['price'] = NewPrice;
					$('div.' + ClassName).find('.product-quan').text(NewQuant);
					$('div.' + ClassName).find('.product_price').text(NewPrice);
				} else {
					cart.splice(i, 1);
					$('div.' + ClassName).remove();
				}
			}
		}
		localStorage.setItem("items", JSON.stringify(cart));
	}
	CartCount();
	PriceCount();

	if(cart.length == 0) {
		localStorage.clear();
		$(".cartContainer").empty();
		cart = [];
		$(".cartContainer").append($("<p class='empty'>Your cart is empty.</p>"));
		CartCount();
		PriceCount();
		$(".checkoutButton").addClass("disableButton");
	}
	
});

function CartCount(){
	$('.cartCount').empty();
	var Count = 0;
	var Quant;
	if(cart != null){
		for (var i = 0; i < cart.length; i++) {
			Quant = parseInt(cart[i]['quantity']);
			Count = Count += Quant;
		};
	} else {
		Count = 0;
	}
	$('.cartCount').text(Count);

}


function PriceCount(){
	$('.PriceCount').empty();
	var Count = 0;
	var price;
	if(cart != null){
		for (var i = 0; i < cart.length; i++) {
			var CartPrice = parseFloat(cart[i]['price']);
			var Count = Count += CartPrice;
		};
	} else {
		Count = 0;
	}
	$('.PriceCount').text(Count.toFixed(2));

}