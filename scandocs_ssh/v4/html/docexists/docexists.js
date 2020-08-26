'use strict';   

    let GetQueryStringParams = (sParam) =>
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
			if(sParameterName[0] =='')			
				return 0;
			
			else if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	};       
    let archivecode = GetQueryStringParams("archivecode");
    alert(archivecode);
     
    let text; 
        
let CheckExists = () => {
      // alert('LF');     
    // Создаем экземпляр класса XMLHttpRequest
    const request = new XMLHttpRequest();

// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
    
    
 let fondnum = document.querySelector('.fondnum').value;
 let opisnum = document.querySelector('.opisnum').value;
 let delonum = document.querySelector('.delonum').value;
 let delolit = document.querySelector('.delolit').value;
 if (fondnum == `` ||  opisnum == `` || delonum == ``) {
     alert(`Введены не все условия поиска!!!`);
     return;
 }

// Так же как и в GET составляем строку с данными, но уже без пути к файлу 
//const url = "http://localhost:3333/scan2/get-fonds?archivecode=" + archivecode+ "&fond=" + fond1 + "&fondname=" + fondname;
const url = NodePath + `scan2/get-exists`;      
const params = "fondnum=" + fondnum + "&archivecode=" + archivecode + "&opisnum=" + opisnum + "&delonum=" + delonum + "&delolit=" + delolit;
 //alert(fond1)
/* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
	параметр тоже необязателен.*/ 
    request.open("POST", url, true);
// alert('LF1');
//В заголовке говорим что тип передаваемых данных закодирован. 
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 
    request.addEventListener("readystatechange", () => {
            
        //alert('LF2');
        if(request.readyState === 4 && request.status === 200) {       
		//console.log(request.responseText);
        //alert(request.responseText);
            if(request.responseText == 0 )
						{
                            alert('Данные не найдены');
                            CreateExists(`0`);
                            
							//$("#err").empty();
							//$( "#err" ).append( "Неверный логин или пароль" );
							//$("div.#err").append("Неверный логин или пароль");
						}
						else
						{
                            
                            //console.log(request.responseText);
                            //var text1 =request.responseText;
                            //text =JSON.parse(request.responseText);
                            // let totrows = document.querySelector(`.resu`);
                            // totrows.textContent = `Количество записей: ` + text.recordset.length;
                            //console.log(text.recordset);
                            //let n =text[0][FondName];
                            alert('OK');
                            CreateExists(`1`);
    
                   
						}
    }
});
 
//	Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос. 
request.send(params);
        }


let CreateExists = (exist) => {
    ClearTable();
    let res1 = document.querySelector('.result');
   
    //console.log(Fondrow); 
    let ulItem1 = document.createElement('ul'); 
    //console.log(Fondrow);
    ulItem1.classList.add('baseresult');
    res1.appendChild(ulItem1);
        
    let liItem1 = document.createElement('li');
    ulItem1.appendChild(liItem1);
        //liItem1.textContent= Fondrow[i].FondNum;
     if (exist == `1`) {liItem1.textContent=`Дело отсканированно`;}  

    else {liItem1.textContent=`Дело не отсканированно`;}
    

}

let ClearTable = () => {
    
    let res2 = document.querySelector('.result');
    let ulelem = document.querySelectorAll('.baseresult');

    for (let i=0; i < ulelem.length;i++){
        ulelem[i].remove();
       // alert(i);
    }
    return res2;
}
    