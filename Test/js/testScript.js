$(document).ready(function(){
	var i,min,max,random,change,a1,a2,b1,b2,step,timeoutID,intervalID; //переменные
	var one = new Array(); //массив с числами

	function gen() {  //генерация чисел при открытии страницы
		$('.box1').html('');
		$('.sort').removeAttr('disabled').show();
		clearTimeout(timeoutID); 
		clearInterval(intervalID);

		for (i = 0; i < 10; i++) { //цикл генерации чисел в div элементах 
			min = 0; 
			max = 99;  
			random = Math.floor((Math.random() * (max - min) + min)); 
			one[i] = random; 
			$('.box1').append('<div class="visual">' + random + '</div>'); 
		}
	};
	gen();
        

  	$('.gen').click(function(){  //генерация чисел (кнопка) 
		gen();
	});


  	$('.sort').click(function(){ //сортировка чисел (кнопка)
		step = 1;
		$(this).attr('disabled','disabled'); 

		function sort() { //функции для сортировки чисел
			if( step < 10 ){
				i = 0; 
				step++; 
				
			(function() { //функция для того чтобы числа менялись местами
				if (i < 10) { 
					if( one[i] < one[i-1] ){ 
						a1 = i;  
						a2 = i-1; 
						b1 = $('.box1 .visual:eq('+a1+')'); 
						b2 = $('.box1 .visual:eq('+a2+')');
						b1.swap(b2);
						change = one[i];
						one[i] = one[i-1];
						one[i-1] = change;
						timeoutID = setTimeout(arguments.callee, 1000); //Повторяется через 1 секунду
					}else{
						timeoutID = setTimeout(arguments.callee, 0); 
					}
					i++;	
				}else{ 
					clearInterval(intervalID); 
					sort(); 
					intervalID = setInterval(sorting, 10000);

				}
			})();
		}else{	//после завершения процесса сортировки
			clearTimeout(timeoutID); 
			clearInterval(intervalID); 
			$('.visual').css('border','2px solid green'); 
		}
	}
	sort();
	});
});