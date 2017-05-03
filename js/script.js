var cart = [];

$(document).ready(function(){
	

	//Check local Storage and if there is something called item then create the list
	if (localStorage.getItem("items") === null) {
		$("#Cart").append($("<li class='empty'>Your cart is empty</li>").html(item));
	} else {
		var storedItems = JSON.parse(localStorage.getItem("items"));
		for(var i=0; i<storedItems.length;i++){
			var item = storedItems[i];
			$("#Cart").append("<li class='"+ item['product'] + "'>"+ item['product'] + " - " + item['quantity'] +"</li>");
			cart.push(item);
		}
	}

	CartCount();
	//Adding new Items into your Cart
	//It will check to see if there is already something in your cart.
	//If there isn't then it will create a new entry
	//If there is it will add the new quantity
	$(".Add").click(function(){
		var value = $(this).parent().find('p').text();
		var quantity = 1;
		var CartItemFound = false;

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
					var NewQuant = parseInt(OldQuant) + quantity;
					cart[i]['quantity'] = NewQuant;
					$('li.' + value).text(value + " - " + NewQuant);
					break;
				}
			};
			localStorage.setItem("items", JSON.stringify(cart));
		} else {
			//There is a new entry in the array
			cart.push({
				"product" : value ,
				"quantity" : quantity
			});
			localStorage.setItem("items", JSON.stringify(cart));
			$(".empty").remove();
			$("#Cart").append("<li class='"+ value + "'>"+ value + " - " + quantity +"</li>");			
		}
		CartCount();
	});

	//When removing a item quantity from cart
	$(".Remove").click(function(){
		var value = $(this).parent().find('p').text();
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
					if(NewQuant > 0){
						cart[i]['quantity'] = NewQuant;
						$('li.' + value).text(value + " - " + NewQuant);
					} else {
						cart.splice(i, 1);
						$('li.' + value).remove();
					}
				}
			}
			localStorage.setItem("items", JSON.stringify(cart));
		}
		CartCount();
	})	

	//Empty your entire cart and your Local Storage
	$('#Clear').click(function(){
		localStorage.clear();
		$("#Cart").empty();
		cart = [];
		$("#Cart").append($("<li class='empty'>Your cart is empty</li>"));
		CartCount();
	});





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