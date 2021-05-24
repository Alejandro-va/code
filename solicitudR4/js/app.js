const template = document.querySelector('#tabla').content;
const tabla = document.querySelector('.table')//aca pontola tabla
const fragment = new DocumentFragment()

const getDatos = async () => {
   try {
      let res = await axios.get("http://api.mediastack.com/v1/news?access_key=9412a4afdb2128780c2d97b30d075c28&languages=en,-de&categories=business,sports&limit=20");
      let datos = await res.data
      //console.log(datos)
      pintarDatos(datos) 

   
   } catch (err) {
      let message = err.response.statusText || "Ocurrio un error";
      tabla.innerHTML = `Error ${err.response.status}: ${message}`
   }

}

const pintarDatos =(pagination)=> {
   console.log(pagination.data)

  pagination.data.map((element) => {
     console.log(element)

     template.querySelectorAll('td')[0].textContent=element.author
     template.querySelectorAll('td')[1].textContent=element.title
     template.querySelectorAll('td')[2].textContent=element.source
     template.querySelectorAll('td')[3].innerHTML= `<img src=${element.image} alt="Image" width="90px">`
     template.querySelectorAll('td')[4].textContent=element.category
     template.querySelectorAll('td')[5].textContent=element.language
     template.querySelectorAll('td')[6].textContent=element.country
     template.querySelectorAll('td')[7].textContent=element.published_at


    const clone = document.importNode(template, true)
     fragment.appendChild(clone) 
   })
   tabla.appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', getDatos)