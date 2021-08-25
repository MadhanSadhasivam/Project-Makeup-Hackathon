const body = document.body;
const div = document.createElement("div");
div.className="heading";
div.innerText="Makeup World";
body.append(div); 
const parentHeder = document.createElement('div')
body.append( parentHeder)
parentHeder.className = "parent_header"

const parentContainer = document.createElement('div')
body.append( parentContainer)
parentContainer.className = "parent_container"
let singleProduct = document.createElement('div') 
singleProduct.className = "singleProduct"
body.append(singleProduct)

async function getData(){
    try{
    return await fetch('https://makeup-api.herokuapp.com/api/v1/products.json').
    then(res=>res.json()).
    then(data=>data)
    }
    catch(e){
        alert(e)
    }
    return []
   
}

 async function executeData(){
let newData = await getData().then(data=> data)
const product_type = []
let newProduct = []
newData.map(data=>{
    if(!newProduct.includes(data.product_type)){
        newProduct.push(data.product_type)
    product_type.push({name: data.product_type,
    link : 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type='+data.product_type
    })
    }
})

product_type.map((product)=>{

    const header = document.createElement('div')
    parentHeder.appendChild(header)
    header.className = "header_main"
    header.innerHTML = `
    
     <div className = "header" id = "header">${product.name}</div> `
    header.onclick = (e)=>{
     document.getElementsByClassName("parent_header")[0].style.visibility = "hidden";
     document.getElementsByClassName("parent_header")[0].style.display = "none"
     document.getElementsByClassName("parent_container")[0].style.visibility = "visible";
    document.getElementsByClassName("parent_container")[0].style.display = "grid"
    document.getElementsByClassName("parent_container")[0].innerHTML = ``
    newPage(product.link)
     

    }
})

}

async function newPage(url){
    const newData = await fetch(url).then(res=>res.json()).then(data=>data)
   const button = document.createElement('button')
    parentContainer.appendChild(button)
   button.innerHTML = "Go Back"
  button.className = "goBackButton"
  button.id = "button1"
 button.onclick = ()=>{
    document.getElementsByClassName("parent_header")[0].style.visibility = "visible";
    document.getElementsByClassName("parent_header")[0].style.display = "grid"
    document.getElementsByClassName("parent_container")[0].style.visibility = "hidden";
    document.getElementsByClassName("parent_container")[0].style.display = "none"
    document.getElementById('button1').style.visibility = 'hidden'
}

    await newData.map(data=>{
        let sampleDiv = document.createElement('div')
        sampleDiv.id = 'sampleDiv'
        parentContainer.appendChild(sampleDiv)
        sampleDiv.onclick=()=>{
            parentContainer.style.visibility = 'hidden'
            parentContainer.style.display = "none"
            document.getElementsByClassName("singleProduct")[0].style.visibility = 'visible'
            document.getElementsByClassName("singleProduct")[0].style.display = 'block'
            document.getElementsByClassName("singleProduct")[0].innerHTML = ``
            displayParticularData(data)
        }
        sampleDiv.innerHTML = `
        <div className = "objects">
        <img class="ones" src =${data.image_link} alt = ${data.name} width = 100/>
        <div class="one" id="brand">Brand : ${data.brand}</div>
        <div class="one">Name : ${data.name}</div>
        <div class="one">Price : ${data.price_sign} ${data.price} </div>
        <div class="one">Product Link : <a href = ${data.product_link}>Product Link</a></div>
        </div>
        `
        //<div>Descriptopn : ${data.description}</div>
    })
}


function displayParticularData(data){

singleProduct.innerHTML = `
<div className = "objects" id = "obj">
<img class ="twos" src =${data.image_link} alt = ${data.name} width = 100/>
<div class="two" id="brand">Brand : ${data.brand}</div>
<div class="two">Name : ${data.name}</div>
<div class="two">Price : ${data.price_sign} ${data.price} </div>
<div class="two">Product Link : <a href = ${data.product_link}>Product Link</a></div>
<div class="two">Descriptopn : ${data.description}</div>
</div>`
const button = document.createElement('button')
singleProduct.append(button)
button.innerHTML = "Go Back"
button.className = "goBackButton"
button.id = "button2"
button.onclick = ()=>{
            document.getElementsByClassName("singleProduct")[0].style.visibility = "hidden";
        document.getElementsByClassName("singleProduct")[0].style.display = "none"
        document.getElementsByClassName("parent_container")[0].style.visibility = "visible";
        document.getElementsByClassName("parent_container")[0].style.display = "grid"
        document.getElementById('button1').style.visibility = 'visible'
        document.getElementById('button2').style.visibility = 'hidden'


}


 }



executeData()








