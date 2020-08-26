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
//alert(archivecode);
let pageSize=15000;
let curPage=1;   
let text; 
    
let LoadFonds = () => {
  // alert('LF');     
// Создаем экземпляр класса XMLHttpRequest
const request = new XMLHttpRequest();

// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 


let fond1 = document.querySelector('.numer1').value;
let fondname = document.querySelector('.fondname').value;
// Так же как и в GET составляем строку с данными, но уже без пути к файлу 
//const url = "http://localhost:3333/scan2/get-fonds?archivecode=" + archivecode+ "&fond=" + fond1 + "&fondname=" + fondname;
const url = NodePath + `scan2/get-fonds1`;      
const params = "fond=" + fond1 + "&archivecode=" + archivecode + "&fondname=" + fondname;
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
                        
                        //$("#err").empty();
                        //$( "#err" ).append( "Неверный логин или пароль" );
                        //$("div.#err").append("Неверный логин или пароль");
                    }
                    else
                    {
                        
                        //console.log(request.responseText);
                        //var text1 =request.responseText;
                        text =JSON.parse(request.responseText);
                        let totrows = document.querySelector(`.resu`);
                        totrows.textContent = `Количество записей: ` + text.recordset.length;
                        //console.log(text.recordset);
                        //let n =text[0][FondName];
                        alert('OK');
                        CreateFondLine(text.recordset);

               
                    }
}
});

//	Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос. 
request.send(params);
    }


let CreateFondLine = (Fondrow) => {
ClearTable();
let res1 = document.querySelector('.result');

// if (Fondrow.length < pageSize) {
//     pageSize = Fondrow.length;
// };
// let start = pageSize*(curPage-1);
// let stop = start + pageSize;
//alert(Fondrow.length);
console.log(Fondrow); 
for (let i=0; i< Fondrow.length; i++){
    
    let ulItem1 = document.createElement('ul'); 
  //console.log(Fondrow);
    ulItem1.classList.add('baseresult');
    res1.appendChild(ulItem1);
    
    let liItem1 = document.createElement('li');
    ulItem1.appendChild(liItem1);
    //liItem1.textContent= Fondrow[i].FondNum;
    let aItem = document.createElement('a');
    aItem.classList.add('alink');
   // alert(Fondrow[i].FondNum);
    aItem.setAttribute('href', 'opises2.html?FondNum='+Fondrow[i].FondNum+'&archivecode='+archivecode);
     liItem1.appendChild(aItem);
    aItem.textContent=Fondrow[i].FondNum;
    
     let liItem2 = document.createElement('li');
    ulItem1.appendChild(liItem2);
    liItem2.textContent= Fondrow[i].FondName;
    
     let liItem3 = document.createElement('li');
    ulItem1.appendChild(liItem3);
    liItem3.textContent= Fondrow[i].bYear;
    
     let liItem4 = document.createElement('li');
    ulItem1.appendChild(liItem4);
    liItem4.textContent= Fondrow[i].fYear;
    
    let liItem5 = document.createElement('li');
    ulItem1.appendChild(liItem5);
    
    let btnItem = document.createElement('button');
     
    liItem5.appendChild(btnItem);
    btnItem.setAttribute('type', 'button');
    btnItem.setAttribute('onclick', 'loadAnnot(' + Fondrow[i].FondNum + ' ) ');
    btnItem.textContent= 'ссылка';
    btnItem.classList.add('btnAn');
    //btnItem.onclick = showAnnot(Fondrow[i].FondNum);
   // btnItem.onclick = showAnnot();
   // console.log(btnItem);

    
}


}
    
// let prev = () => {
//     if (curPage > 0)
//         curPage --;
//     ClearTable();
//     CreateFondLine(text);
//     let numlabel = document.querySelectorAll('.numpage');
//     numlabel[0].innerHTML = curPage+1;
//     numlabel[1].innerHTML = curPage+1;
// } 

// let next = () => {
//  ClearTable();
//   //    console.log(res3);
//     curPage ++;
//     CreateFondLine(text);
//     let numlabel = document.querySelectorAll('.numpage');
//     numlabel[0].innerHTML = curPage+1;
//     numlabel[1].innerHTML = curPage+1;
// } 

let ClearTable = () => {

  let res2 = document.querySelector('.result');
    let ulelem = document.querySelectorAll('.baseresult');

//console.log(res2);
//   res2.removeChild(ulelem);
for (let i=0; i < ulelem.length;i++){
    ulelem[i].remove();
   // alert(i);
}
//   while (ulelem.firstChild) {
//        ulelem.remove(ulelem.firstChild);
//}
//     console.log(res2);
return res2;

}

let loadAnnot = (fondNum1) => {                            
    //alert(fondNum1);
    let popup = document.querySelector(".modal-annot");
    let close = popup.querySelector(".modal-close");
               
     popup.classList.add("modal-show");
   
      
     close.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
    });
    
    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (popup.classList.contains("modal-show")) {
                popup.classList.remove("modal-show");
                popup.classList.remove("modal-error");
            }
        }
    });
LoadAnnotation(fondNum1);
}

let LoadAnnotation = (fond2) => {
  // alert('Загрузка аннотации'+fond2);     
// Создаем экземпляр класса XMLHttpRequest
const request = new XMLHttpRequest();

// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
const url = NodePath + `scan2/get-annot?archivecode=` + archivecode + `&fond=` + fond2;

//let fond1 = document.querySelector('.numer1').value;
// Так же как и в GET составляем строку с данными, но уже без пути к файлу 

  
const params = "fond=" + fond2 + "&archivecode=" + archivecode;
//alert(fond2)
/* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
параметр тоже необязателен.*/ 
request.open("GET", url, true);
// alert('LF1');
//В заголовке говорим что тип передаваемых данных закодирован. 
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

request.addEventListener("readystatechange", () => {
        
    //alert('LF2');
    if(request.readyState === 4 && request.status === 200) {       
    //console.log(request.responseText);
   // alert(request.responseText);
        if(request.responseText ==0)
                    {
                        alert('Несовпадение');
                        //$("#err").empty();
                        //$( "#err" ).append( "Неверный логин или пароль" );
                        //$("div.#err").append("Неверный логин или пароль");
                    }
                    else
                    {
                        alert('OK');
                        //var text1 =request.responseText;
                        text =JSON.parse(request.responseText);
                        //let n =text[0][FondName];
                       // CreateFondLine(text);
                        //alert(text[0].Annot);
                        let annot = document.querySelector('.annotation');
      
   annot.textContent = text.recordset[0].Annotation;
               
                    }
}
});

//	Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос. 
request.send(params);
 
    }
