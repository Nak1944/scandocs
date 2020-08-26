'use strict';
    let curdate = document.querySelector(`.datecur`);
    let today = new Date();
    let Year = today.getFullYear();
    let Month = today.getMonth();
    let Day = today.getDate();
    let fMonth;
    // Преобразуем месяца
switch (Month)
{
  case 0: fMonth="января"; break;
  case 1: fMonth="февраля"; break;
  case 2: fMonth="марта"; break;
  case 3: fMonth="апреля"; break;
  case 4: fMonth="мае"; break;
  case 5: fMonth="июня"; break;
  case 6: fMonth="июля"; break;
  case 7: fMonth="августа"; break;
  case 8: fMonth="сентября"; break;
  case 9: fMonth="октября"; break;
  case 10: fMonth="ноября"; break;
  case 11: fMonth="декабря"; break;
}
 
    curdate.textContent = Day+`-`+fMonth+`-`+Year;

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
	}
    let archivecode = GetQueryStringParams("archivecode");
	let scandocsid = GetQueryStringParams("scandocsid");
    //let inpFondName = document.querySelector(`.fondNumer`);
    //inpFondName.value = fondnum;
    
    //rootfolder0 = GetQueryStringParams('rootfolder');
    //alert(scandocsid);
    
    let pageSize = 15000;
    let curPage = 1;   
    let text; 
    
     
     
let LoadOpises = (() => {
      // alert('LF');     
    // Создаем экземпляр класса XMLHttpRequest
    const request = new XMLHttpRequest();
   // let opisNum = document.querySelector(`.inpOpises`).value; 
// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
    const url = NodePath + `scan2/get-orderdocs?scandocsid=` + scandocsid;
    
// let fond1 = document.querySelector('.numer1').value;
// Так же как и в GET составляем строку с данными, но уже без пути к файлу 
 
 
const params = "scandocsid=" + scandocsid;
 //alert(params)
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
        //alert(request.responseText);
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
                            //var text =request.responseText;
                            text =JSON.parse(request.responseText);
                            //let n =text[0][FondName];
                            let totrows = document.querySelector(`.resu`);
                            totrows.textContent = `Количество записей: ` + text.recordset.length;
                            CreateOpisesLine(text.recordset);
                            
                   
						}
    }
});
 
//	Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос. 
request.send(params);
        })();



let CreateOpisesLine = (Opisrow) => {
    ClearTable();
    let res1 = document.querySelector('.result');
    
    // if (Opisrow.length < pageSize) {
    //     pageSize = Opisrow.length;
    // };
    // let start = pageSize*(curPage-1);
    // let stop = start + pageSize;
    for (let i=0; i< Opisrow.length; i++){
        
        let ulItem1 = document.createElement('ul'); 
      //  console.log(ulItem1);
        ulItem1.classList.add('baseresult');
        res1.appendChild(ulItem1);
        
        let liItem1 = document.createElement('li');
        ulItem1.appendChild(liItem1);
        liItem1.textContent= Opisrow[i].FondNum;
        
        
         let liItem2 = document.createElement('li');
        ulItem1.appendChild(liItem2);
        liItem2.textContent= Opisrow[i].OpisNum;
        
         let liItem3 = document.createElement('li');
        ulItem1.appendChild(liItem3);
        liItem3.textContent= Opisrow[i].DeloNum;
        
         let liItem4 = document.createElement('li');
        ulItem1.appendChild(liItem4);
        liItem4.textContent= Opisrow[i].DeloLitera;
        
        let liItem5 = document.createElement('li');
        ulItem1.appendChild(liItem5);
        liItem5.textContent= Opisrow[i].TotPages;
		
		let liItem6 = document.createElement('li');
        ulItem1.appendChild(liItem6);
        liItem6.textContent= Opisrow[i].DeloName;
		
		// let liItem7 = document.createElement('li');
        // ulItem1.appendChild(liItem7);
        // liItem7.textContent= Opisrow[i].TotPages;
		
		let liItem7 = document.createElement('li');
        ulItem1.appendChild(liItem7);
        //liItem8.textContent= Opisrow[i].FolderName;
		let aItem = document.createElement('a');
        aItem.classList.add('alink');
        //aItem.setAttribute('href', 'pictures.html?FolderName='+Opisrow[i].FolderName);
        aItem.setAttribute('href', `../viewer/v39.html?FolderName=`+Opisrow[i].FolderName + `&archivecode=` + archivecode);
         liItem7.appendChild(aItem);
        aItem.textContent=Opisrow[i].FolderName;
     
    }

}
      
// let prev = () => {
//     if (curPage > 0)
//         curPage --;
//     ClearTable();
//     CreateOpisesLine(text);
//     let numlabel = document.querySelectorAll('.numpage');
//     numlabel[0].innerHTML = curPage+1;
//     numlabel[1].innerHTML = curPage+1;
// } 

// let next = () => {
//  ClearTable();
//   //    console.log(res3);
//     curPage ++;
//     CreateOpisesLine(text);
//     let numlabel = document.querySelectorAll('.numpage');
//     numlabel[0].innerHTML = curPage+1;
//     numlabel[1].innerHTML = curPage+1;
// } 

let ClearTable = () => {
    
      let res2 = document.querySelector('.result');
        let ulelem = document.querySelectorAll('.baseresult');
    
   // console.log(res2);
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

//LoadOpises();