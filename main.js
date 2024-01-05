// Кнопка меню навігації
$(function(){


const menuBtn = $("#menuIcon");
const menuPopup = $(".popup-wrapper");
const closePopup = $(".popup-close");
const popupContent = document.querySelector(".popup");
const popupUL = document.querySelector(".nav-header-ul");
const catalogA = document.querySelector(".catalogparent a");
const catalogInside = document.querySelector(".catalogUL li a");




let ulNavLeft = $('ul.menu-option');
let catalogParent = ulNavLeft.children('li').eq(0);
let catalogSiblings = ulNavLeft.children('li').first().siblings();
let catalogUL = $('ul', catalogParent);


menuBtn.on('click', (e) =>{
   e.preventDefault();
    menuPopup.show();
});

closePopup.on('click', () =>{
    menuPopup.hide();
	catalogSiblings.removeClass('hidden');
	catalogUL.addClass('hidden');
	catalogParent.removeClass('catalogLI');
});


menuPopup.on('click', (e)=>{
	e.preventDefault();
		if(e.target ==catalogInside){
			window.location = 'http://127.0.0.1:5500/catalog.html';
		}
	
		if(e.target !== popupContent && e.target!==popupUL && e.target!==catalogA ){
			menuPopup.hide();
			catalogSiblings.removeClass('hidden');
			catalogUL.addClass('hidden');
			catalogParent.removeClass('catalogLI');
		}
	
	
});

// Вкладений список каталога



catalogParent.on('click', ()=> {
	catalogParent.addClass('catalogLI');
	
	catalogSiblings.addClass('hidden');
	catalogUL.removeClass('hidden');

});

console.log($('.catalogDesktop').children('a'))

$('.catalogDesktop').children('a').on('click', (e)=>{
	e.preventDefault();
	$('.catalogDesktop-ul').css('display', 'grid');
	
});

$('.catalogDesktop-ul').on('mouseleave', (e)=>{
	$('.catalogDesktop-ul').css('display', 'none');
});

// $('.catalogDesktop').on('mouseleave', (e)=>{
	
// 	setTimeout(()=>{
// 		if(e.target!==document.querySelector('.catalogDesktop-ul')){
// 		$('.catalogDesktop-ul').css('display', 'none');
		
// 		}
// 	}, 1000)
		
// });




// каталог зміна назви по кольору

let colorAtag = $('.cat-colors li a');

colorAtag.on('click', e =>{
	e.preventDefault();
	
	$(e.target).closest('ul').find('a.defined-color').removeClass('defined-color');

	let selectedTagName= e.target.nodeName;
	let etarget;

	 if(selectedTagName === 'A'){
		etarget = $(e.target); 		
	};	

	 if(selectedTagName === 'IMG' || selectedTagName === 'SPAN' ){
		etarget = $(e.target).closest('a'); 
	}
	
	etarget.addClass('defined-color');
		
	let itemColorTitleCatal = etarget.parents('ul.cat-colors').parent('div').prev('p.title-catalog').children('span');
	let itemColorTitleItem = etarget.parents('ul.cat-colors').parent('div').next('div.text-container').children('p.heading-title-item').children('span');
	
	function changeTitleColor(){

		let color = etarget.attr('data-color');
		
		
		itemColorTitleCatal.html(optionColor);
		itemColorTitleItem.html(optionColor);

		function optionColor(index, value){
			switch(color){
				case 'green': value = 'зелений';
				break;
				case 'brown': value = 'коричневий';
				break;
				case 'beige': value = 'бежевий';
				break;
				case 'yellow': value = 'жовтий';
				break;
				case 'number': window.location.href = 'http://127.0.0.1:5500/item.html'
				
				
			}
			return value;
		}

	};
	changeTitleColor();
});

// ПЕРЕХІД НА ITEM
$('.item-img').on('click', e =>{
	e.preventDefault();
	window.location.href = 'http://127.0.0.1:5500/item.html'
});


// очищщення local Storage, після закриття браузера, вкладок
window.onbeforeunload = function (e) {

	window.localStorage.unloadTime = JSON.stringify(new Date());
	
	};
	
	window.onload = function () {
	
	let loadTime = new Date();
	let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
	let refreshTime = loadTime.getTime() - unloadTime.getTime();
	
	if(refreshTime>3000)//3000 milliseconds
	{
	window.localStorage.clear();
	}
	
	};

// Збереження в localStorage виробу

function addEntry(title, img, price, number) {
    // Parse any JSON previously stored in allEntries
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
	
    if(existingEntries == null) existingEntries = [];
    
    let entry = {
        "title": title,
        "img": img,
		"price": price,
		"number": number
    };
	
    // localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    

	for( let i = 0; i< existingEntries.length; i++){
		
		if(entry.title === existingEntries[i].title){
			return  false;
		}
		
	}
	existingEntries.push(entry);	
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));

};

function deleteEntry(title){
	let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
	
    if(existingEntries == null) existingEntries = [];
    
    let entry = {
        "title": title,
    };
	for( let i = 0; i< existingEntries.length; i++){
		
		if(entry.title === existingEntries[i].title){
			existingEntries.splice(i, 1);
			
		}
		
	}
		
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}


function basketCount(items){

	if(items == null) items = [];

	if(items.length !== 0 ){
	$('div.num-item').html(function(ind, value){
		let html = `<p>${items.length}</p>`;
		return value = html;
	})
	.show();
	}
};


// зміна числа одиниць в корзині
$('.toBasket-catalog-btn').on('click', function(){
	let img = $(this).siblings('a.item-img').children('img').attr('src');
	let title = $(this).siblings('p.title-catalog').text();
	let price = $(this).siblings('div.priceTxt').children('p.oldPrice').children('span').text();
	let number = 1;
addEntry(title, img, price, number);
basketCount(JSON.parse(localStorage.getItem('allEntries')));


});


// Зміна числа одиниць в кнопці корзина

 

basketCount(JSON.parse(localStorage.getItem('allEntries')));



// ЗМІНА КІЛЬКОСТІ ТОВАРІВ

let endCount = $('span.minus').next('input.order-count').val() || 1;
function minusNum (e){
	let startCount = $(e.target).next('input.order-count').val();
	let num = Number(startCount) - 1;
	let currentCount;
	if(num <= 0){
		currentCount = 1;
	}else{ currentCount = num};
	endCount = Number($(e.target).next('input.order-count').val(currentCount).val()) ;
	if(e.target.parentNode.parentNode.parentNode.classList.value === 'it-ul'){
		let etargetPTag = Number($(e.target).parent('div').parent('li').children('p.it-price-basket').text());
		priceItem(endCount, etargetPTag, e.target);
		
	}
};

function plusNum(e){
	let startCount = $(e.target).prev('input.order-count').val();
	let num = Number(startCount) + 1;
	let currentCount = num;	
	endCount = Number($(e.target).prev('input.order-count').val(currentCount).val());
	if(e.target.parentNode.parentNode.parentNode.classList.value === 'it-ul'){
		let etargetPTag = Number($(e.target).parent('div').parent('li').children('p.it-price-basket').text());
		priceItem(endCount, etargetPTag, e.target);
		
	};
}

$('span.minus').on('click', minusNum);
$('span.plus').on('click', plusNum);

$('ul.it-ul').on('click', 'span.plus', plusNum);
$('ul.it-ul').on('click', 'span.minus', minusNum);

$('ul.it-ul').on('click', 'span.plus', countTotal);
$('ul.it-ul').on('click', 'span.minus', countTotal);




function priceItem(number, price, el){
	
	let totalPrice = number* price;
	$(el).parent('div').next('p.it-fullPrice-basket').text(totalPrice);
	
}

$('#item-toBasket').on('click', function(){
	let img = $('.itemIMG').attr('src');
	let title = $('.heading-title-item').text();
	let price = $('.startPrice').text();
	let number = $('.order-count').val();
	
	
addEntry(title, img, price, number);
basketCount(JSON.parse(localStorage.getItem('allEntries')));
})
// 	ВНЕСЕННЯ ITEM В КОРЗИНУ

function addItem(items){
	if(items == null)items = [];
		if(items.length !==0){
		for(let i = 0; i< items.length; i++ ){
			
			titleValue = items[i].title;
			
			let newItemRow;

			let price = items[i].number * items[i].price;
			newItemRow = 
		`<li>
			<a class="it-img-basket-cont" href=""><img  class="it-img-basket" src="${items[i].img}" alt=""></a>
			<a class="it-name-basket-cont" href=""><p class="it-name-basket">${items[i].title}</p></a>
			<p class="it-price-basket">${items[i].price}</p><span class="moneystart">₴</span>
			<div class="item-count it-count-basket">
				<span class="minus">-</span> 
				<input class="order-count" type="text" name="" id="" value="${items[i].number}" size="20" placeholder="1">
				<span class="plus" >+</span>
			</div>
			<p class="it-fullPrice-basket">${price}</p><span class="moneyend">₴</span>
			<button class="tresh-btn"><img src="/images/trash empty 1.svg" alt=""></button>
			<div class="basket-line-after"></div>

		</li>`;
		$('ul.it-ul').append(newItemRow);
		// if(!$('p.it-name-basket').is(`:contains(${items[i].title})`)){
			
		// }
	}
}
};


	addItem(JSON.parse(localStorage.getItem('allEntries')));

$('ul.it-ul').on('click', 'button.tresh-btn', (e)=>{
	e.preventDefault();
	$(e.target).parents('li').remove();
	deleteEntry($(e.target).parents('li').children('a.it-name-basket-cont').children('p').text());
	countTotal();
	$('p.countTotal').children('span').text('0');
	$('p.pr-endTxt').text('0');
	$('p.priceForItem').text('0');
	window.location.reload();
	
})

$('a.empty-basket').on('click', (e)=>{
	e.preventDefault();
	$('ul.it-ul').children('li').remove('li');
	localStorage.removeItem('allEntries');
	$('.num-item').hide();

});


function countTotal(){
	let count = $('ul.it-ul').children('li').length;
	$('p.countTotal').children('span').text(count);
	let totalPrice = 0;
		
	$('ul.it-ul').children('li').map((i, val)=>{
		let price = Number($(val).children('p.it-fullPrice-basket').text());
		return totalPrice+= price;		
	})

	$('p.pr-endTxt').text(totalPrice);
	$('p.priceForItem').text(totalPrice);
	
}
countTotal();

function order(entry){
	let existingEntries = [];	
    if(existingEntries == null) existingEntries = [];

	existingEntries.push(entry);
		
    localStorage.setItem("orderTotal", JSON.stringify(existingEntries));
	
};

$('#formOrder').on('click', (e)=>{
	e.preventDefault();
	let arrOfItems = [];
	$('ul.it-ul').children('li').map((i, val)=>{
	let item = {name:$(val).children('a').eq(1).children('p.it-name-basket').text(),
				numItem:$(val).children('div').eq(0).children('input').val(),
				priceOneItem: $(val).children('p.it-price-basket').text(),
				};
	return arrOfItems.push(item);
	});

	let entry ={
		number:$('p.countTotal').children('span').text() ,
		totalPrice: $('p.pr-endTxt').text(),
		items: arrOfItems
	}
	
	order(entry)
	window.location = 'http://127.0.0.1:5500/order.html';
})
// Зміна розташування відповідно ціні



$('div.pr-fromLow').on('click.LowPrice', changeRowOnPrice);
$('div.pr-fromHigh').on('click', changeRowOnPrice);

function changeRowOnPrice(e){

	$('.cat-items-ul').html(function(){
		let items = $('.cat-items-ul').children('li');
	
		let filteredItems = items.sort(function(a,b){
			let wayA = $(a).children('div.priceTxt').children('p:visible').children('span').text();
			let wayB = $(b).children('div.priceTxt').children('p:visible').children('span').text();

			if(e.currentTarget.classList.contains('pr-fromLow')){return wayA > wayB ? 1 : -1;};
			if(e.currentTarget.classList.contains('pr-fromHigh')){return wayA < wayB ? 1 : -1;};
			
		});
		
		
			return filteredItems;
	});

	
};

// Фільтр товарів катоалог показати, очистити
let itemCatalog = $('.cat-items-ul').children('li');


$('div.filter').children('a').on('click', (e)=>{
	e.preventDefault();
	let formFilter = $('form#filterItems');
	console.log(formFilter)
	if(!formFilter.is(':visible')){
		formFilter.css('display', 'grid')
	}

	setTimeout(()=>{
		formFilter.css('display', 'none')
	},5000)
})



$('input#filterItemsBtn').on('click', (e)=>{
	e.preventDefault();

	itemCatalog.show();

	let filterVal = [];
	$('input[type="checkbox"]:checked').map((ind, el)=>{
		return filterVal.push($(el).val());
	});

	itemCatalog.map(function(i, val){
		let titleOfItem = $(val).children('p.title-catalog').text();
		for(let i = 0; i< filterVal.length; i++){
			if(!titleOfItem.includes(filterVal[i])){return $(val).hide()};
		};
	});
	
	
	changeFilteredText()

	
});

$('input#resetFilter').on('click', (e)=>{
	e.preventDefault();
	itemCatalog.show();
	changeFilteredText()
	document.querySelector('#filterItems').reset();
	
})

function changeFilteredText(){
	$('span.numberOfFilteredItems').text(itemCatalog.has(':visible').length);
	$('span.numberOfFilteredItems').parent('p').children('span').eq(1).html(changeEnding(itemCatalog.has(':visible').length));
}

// Зміна закінчення відповідно до кількості
function changeEnding(number){
	let ending ="ів";
	console.log(number)
	if(number % 100 < 11 || number % 100 > 14){
		  switch(number % 10){
		    case 1: ending = "";
		    break;
		    case 2:
		    case 3:
		    case 4: ending = "и";
		    break;
		    default:ending;
			}
		
	}
	
	return ending	
};

// search input nav



let arrItems =[
	{title: 'Шпагат Macrametr 4мм, 100 ниток', src:'images/page catalog/image 11.png'},
	{title: 'Шпагат джгутовий 500м', src:'images/page catalog/1.3 2.png'},
	{title: 'Пряжа Arachna "Macrame MAXI" 100м', src:'/images/page catalog/1 13.png'},
	{title: 'Шнур "Gamma" 0.8 мм, 50м', src:'/images/page catalog/image 12.png'},
	{title: 'Пряжа Arachna "Macrame MINI"', src:'/images/page catalog/1.1 1.png'},
]

let listOfItems = $('div.searchOptions');

arrItems.map((el) =>{
	let html =  `<a href=\"http://127.0.0.1:5500/item.html\">${el.title}</a>`;
	return listOfItems.append(html);
});


$('a.search-atag-nav').on('click', (e)=>{
	e.preventDefault();
	$('.search-wrapper').show();
});

$('.search-popup-close').on('click', (e)=>{
	$('#search-field-small').val('');
	listOfItems.css('display', 'none')
	$('.search-wrapper').hide();
});


$('.search-wrapper').on('click', (e)=>{
	e.preventDefault();
	console.log(e.target === document.querySelector('.search-popup'))
	if(e.target !== document.querySelector('.search-popup') && 
		e.target!== document.querySelector('#search-nav-small') &&
		e.target!== document.querySelector('#search-field-small') &&
		e.target!== document.querySelector('.searchOptions')){
		listOfItems.css('display', 'none');
		$('.search-wrapper').hide();
	}
	
})



$('.search-field').on('keyup', (e)=>{
	
	e.preventDefault();
	
	if(e.target.value.trim().length>0){
		listOfItems.css('display', 'flex')
   }else{listOfItems.css('display', 'none')}

	listOfItems.children('a').each((i, value)=>{
		let visible = $(value).text().toLowerCase().includes(e.target.value.toLowerCase());
		
		$(value).toggleClass('itemHide', !visible)
		 
	});
	
	// setTimeout(()=>{e.target.value = ''; listOfItems.css('display', 'none')
	// },6000);
	

});

$('.search-field').on('blur', (e)=>{
	e.preventDefault();
	setTimeout(()=>{e.target.value = ''; listOfItems.css('display', 'none')
	},3000)
});


$('#search-field-small').on('keyup', (e)=>{
	e.preventDefault();
	if(e.target.value.trim().length>0){
		listOfItems.css('display', 'flex')
   }else{listOfItems.css('display', 'none')}

	listOfItems.children('a').each((i, value)=>{
		let visible = $(value).text().toLowerCase().includes(e.target.value.toLowerCase());
		
		$(value).toggleClass('itemHide', !visible)
		 
	});

});

$('#search-field-small').on('blur', (e)=>{
	e.preventDefault();
	setTimeout(()=>{e.target.value = ''; listOfItems.css('display', 'none')
	},3000)
});


// ADD HEART HOVER

$('.heart-icon').on('click',(e)=>{
	e.preventDefault();
	console.log($(e.target).first('img'))

	
	if($(e.target).first('img').attr('src') === '/images/page catalog/Vector (1).png'){
		
		
		return $(e.target).first('img').attr('src', '/images/clarity_heart-solid.png' ), 
		// showHeartNum($('.heart-icon'));
		addHeart(1),
		showHeartNum(JSON.parse(localStorage.getItem("hearts")));
		
	} else { return $(e.target).first('img').attr('src', '/images/page catalog/Vector (1).png'), 
	// showHeartNum($('.heart-icon'))
	addHeart(-1),
	showHeartNum(JSON.parse(localStorage.getItem("hearts")));
}
	
	
} )



function addHeart(number) {
   
    let existingHearts = JSON.parse(localStorage.getItem("hearts"));
	
    if(existingHearts == null) existingHearts = [];
    
    let num = number;
	
	existingHearts.push(num);	
    localStorage.setItem("hearts", JSON.stringify(existingHearts));

};

function showHeartNum (arr){

	if (arr === null){return};
	
	let total = arr.reduce(function(a, b) {
		return a + b;
	});
	$('.num-item-heart').children('p').text(total);
	$('.num-item-heart').show();
}
showHeartNum(JSON.parse(localStorage.getItem("hearts")))

// function showHeartNum (arr){

// let count = 0;
// 	let newarr = arr.children('img').map(function(ind, val){
// 		if($(val).attr('src') === '/images/clarity_heart-solid.png'){
// 			return count ++;
// 		}
// 	})

// 	$('.num-item-heart').children('p').text(count);
// 	$('.num-item-heart').show();
// }

// ВАЛІДАЦІЯ ФОРМИ

function showOrder(order){
 if (order === null) return;
 let or = order[0];
 let totalPrice = or.totalPrice;
 let count = or.number;

 $('.order-count').text(count);
 $('.order-priceFull').text(totalPrice)
 $('.orderPriceTotal').text(totalPrice);


}	  
showOrder(JSON.parse(localStorage.getItem("orderTotal")));

const regText = /^[a-zA-Z]{1,}[a-zA-Z']{0,}[a-zA-Z]{1,}$/;
const regNum = /^\d{1,}$/;
const rePhone = /^\d{10}|\+\d{12}$/;
const regeMail = /^[a-zA-Z]{1,}@{1}[a-zA-Z]{1,}$/;


let inputs = $('.order-form').find('[required]');

inputs.on('keydown', (e)=>{
	$(e.target).css('border-color', '#bdbdbd');
	$(e.target).removeAttr('data-valid');
})

function orderValidation(e){
	
	e.preventDefault()

	let country = $('input[name="country"]');
	let city = $('input[name="city"]');
	let name = $('input[name="name"]');
	let surname = $('input[name="surname"]');
	let afterfather = $('input[name="afterfather"]');
	let phoneNum = $('input[name="phone"]');
	let TXT = [country, city, name, surname, afterfather];
	let numbers = [$('input[name="house"'), $('input[name="flat"'), $('input[name="index"')]
	let value=true;

	for(let i = 0; i< TXT.length; i++){
		 res = regText.test($(TXT[i]).val());
		 
		if(res===false){ 
			value = false;
			
			$(TXT[i]).attr('data-valid', 'invalid');
			
		};
	}

	for(let i = 0; i< numbers.length; i++){
		res = regNum.test($(numbers[i]).val());
		
	   if(res===false){ 
		   value = false;
		   
		   $(numbers[i]).attr('data-valid', 'invalid');
		   
	   };
   }
	
	let phoneRes = rePhone.test(phoneNum.val());
	if(phoneRes === false){value= false; phoneNum.attr('data-valid', 'invalid')};
	
	let emailRes =regeMail.test($('input[type="email"]').val());
	if(emailRes === false){value= false; $('input[type="email"]').attr('data-valid', 'invalid')};
	
	
	
	inputs.each((i, el)=>{

		if($(el).val() ===''|| $(el).attr('data-valid') === 'invalid'){
			 $(el).css('border-color', 'red');
		};
	})

	if($('input[type="radio"]').is(':checked') == false ){
		$('input[type="radio"]').css('border-color', 'red');
	}

	let order = JSON.parse(localStorage.getItem("orderTotal"));
	console.log(order);

	if(value === false ){
		alert('Форма не заповнена');
		return false;

		
	}
	else{$('#form1').submit()}
	
	
}

$('#orderBtn').on('click', orderValidation);



let email = $('input.email-footer');
email.on('keydown', (e)=>{
	$(e.target).css('border-color', '#bdbdbd');
})

function emailSub (e){
	e.preventDefault();
	let value = true;
	let emailRes =regeMail.test(email.val());	
	console.log(emailRes)
	if(emailRes === false || email.val() == ''){ 
		email.css('border-color', 'red');
		value = false;
	}
	
	if(value==false){return false}
	else{$('#form-email').submit()}
}
$('.btn-footer').on('click', emailSub);


// слайдер




$('.comments-ul').slick({
	arrows:true,
	dots: true,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 4,
	responsive: [
	  {
		breakpoint: 1024,
		settings: {
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  infinite: true,
		  dots: true
		}
	  },
	  {
		breakpoint: 800,
		settings: {
		  slidesToShow: 2,
		  slidesToScroll: 2
		}
	  },
	  
	  {
		breakpoint: 480,
		settings: {
		  slidesToShow: 1,
		  slidesToScroll: 1
		}
	  }
	
	]
  });

  console.log( $('ul.catalog-img-ul'))
  $('.catalog-img-ul').slick({
	arrows:true,
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 5,
	slidesToScroll: 4,
	responsive: [
		

	  {
		breakpoint: 1024,
		settings: {
		  slidesToShow: 4,
		  slidesToScroll: 3,
		  infinite: true,
		  dots: false
		}
	  },
	  {
		breakpoint: 960,
		settings: {
		  slidesToShow: 4,
		  slidesToScroll: 3,
		  dots: true
		}
	  },
	  
	  {
		breakpoint: 880,
		settings: {
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  dots: true
		}
	  },
	  {
		breakpoint: 630,
		settings: {
		  slidesToShow: 2,
		  slidesToScroll: 2,
		  dots: true
		}
	  }
	
	]
  });

});
