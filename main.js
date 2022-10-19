let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create'
let tmp ;
//gettotal

function getTotal(){
  if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        
        total.innerHTML = result;
        total.style.background = 'green';
        
   }else{
        total.innerHTML = '';
        total.style.background = 'red'
    }
    }
//create product

let dataPro ;
if(localStorage.files != null){
    dataPro= JSON.parse( localStorage.files)
}else{
     dataPro = []
}

//save to local storag

submit.onclick=function(){
    let newPro={
      title : title.value,
      price : price.value,
      taxes : taxes.value,
      ads : ads.value,
      total:total.innerHTML,
      count:count.value,
      discount:discount.value,
      category : category.value, 
    }
   //count 

   if(mood === 'create'){
    if(count.value > 1){
      for(i = 0 ;  i < count.value ; i++)
      dataPro.push(newPro)
    }else{
      dataPro.push(newPro)
   }
    
    }else{
      dataPro[tmp] = newPro
      mood = 'create'
      count.style.display = 'block'
      submit.innerHTML = 'Create'
      
      

    }


   
    localStorage.setItem('files' , JSON.stringify(dataPro))
     clearData()
     showData()
     
    
}

//clear inputs

function clearData(){
  title.value = '';
  price.value='';
  taxes.value= '';
  ads.value= '';
  discount.value= '';
  count.value= '';
  category.value='';
  total.innerHTML = '';

}

//read

function showData(){
  getTotal()
  let table = '';
  for( let i = 0; i < dataPro.length; i++){
    table += `  
     <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].count}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick = "updateData(${i})" id="update">update</button></td>
    <td><button onclick ="deleteData(${i})" id="delete">delete</button></td>
       
</tr>
    `
    
  }
   //deleteaall button show when there is files in the local storage and if not will be gone xD
  document.getElementById('tbody').innerHTML= table;

  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length > 0 ){
    btnDelete.innerHTML = `<button onclick = 'deleteAll()'>Delete All (${dataPro.length})</button>`

  }else{
    btnDelete.innerHTML= ''
  }

}
showData()

//delete

function deleteData(i){
  
  dataPro.splice(i , 1)
  localStorage.files = JSON.stringify(dataPro)
  showData()


}
//deleteall

function deleteAll(){
  localStorage.clear
  dataPro.splice(0)
  showData()
}


//update

function updateData(i){
  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  category.value = dataPro[i].category
  getTotal()
  count.style.display = 'none'
  submit.innerHTML = 'Update'
  mood = 'update'
  tmp = i
  scroll({
    top:0,
    behavior:'smooth'
    
  })
  
}


//search
let serchMood = 'title'

function getSearchMood(id)
{
  let search = document.getElementById('search')
  if(id == 'searchTitle'){
    serchMood = 'title'
  }else{
    serchMood = 'category'
  }
  search.focus()
}





//clean data