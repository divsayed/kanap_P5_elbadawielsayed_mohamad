let recupPanier = JSON.parse(localStorage.getItem("article"));
//console.log(recupPanier)

recupPanier.forEach(item => {
    let article = document.createElement('article')
        article.setAttribute('class','cart__item' )
        article.setAttribute('data-id', item.id )
        article.setAttribute('data-color', item.color )
        
        
    //<div class="cart__item__img"> 1er div enfants avec son enfant img
    let divCartImg = document.createElement('div')  
        divCartImg.setAttribute('class','cart__item__img' )
       

    let imageCart = document.createElement('img')
        imageCart.setAttribute('src',item.image ) 
        imageCart.setAttribute('alt',item.imageAlt)
        divCartImg.append(imageCart)

    //<div class="cart__item__content"> 2em div enfant avec son 1er enfant enfants
    let divCarContent = document.createElement('div')
        divCarContent.setAttribute('class','cart__item__content')  

    let DescriptionProduct = document.createElement('div')
        DescriptionProduct.setAttribute('class', 'cart__item__content__description') 
    
    let nameProduct = document.createElement('h2')
        nameProduct.textContent = item.name

    let colorProduct = document.createElement('p') 
        colorProduct.textContent = item.color

    let priceProduct = document.createElement('p')   
        priceProduct.textContent = item.price +' €' 

    //<div class="cart__item__content"> 2em div enfant avec son 2em enfant enfants
    let settingProduct = document.createElement('div') 
         settingProduct.setAttribute('class', 'cart__item__content__settings') 
    // ses enfants   
    let quantityProduct = document.createElement('div')
         quantityProduct.setAttribute('class', 'cart__item__content__settings__quantity') 
     
    let qte = document.createElement('p')
        qte.textContent = 'Qté :' 
        
    let inuputProduct = document.createElement('input')  
        inuputProduct.setAttribute('type', 'number') 
        inuputProduct.setAttribute('class', 'itemQuantity')
        inuputProduct.setAttribute('name', 'itemQuantity') 
        inuputProduct.setAttribute('min', '1') 
        inuputProduct.setAttribute('max', '100') 
        inuputProduct.setAttribute('value', item.quantity) 

    let deletProduct = document.createElement('div')
        deletProduct.setAttribute('class', 'cart__item__content__settings__delete')  
        
     let comfirmDelet = document.createElement('p')
        comfirmDelet.setAttribute('class', 'deleteItem')
        comfirmDelet.textContent = 'Supprimer'
         
         
        divCarContent.append(DescriptionProduct , settingProduct)
        DescriptionProduct.append(nameProduct , colorProduct , priceProduct )
        settingProduct.append(quantityProduct , deletProduct)
        deletProduct.append(comfirmDelet)
        quantityProduct.append(qte , inuputProduct)
        article.append(divCartImg , divCarContent)

    let section = document.querySelector('#cart__items') 
        section.append(article)  

        localStorage.getItem(recupPanier) 
        //console.log(recupPanier)

});

   // Fonction qui calcule et affiche (produits + prix)
function totalsArticle(){

    let panier = JSON.parse(localStorage.getItem("article"));
    let totalQuantity = document.querySelector('#totalQuantity')
    let totalPrice = document.querySelector('#totalPrice')


    let sumQuantity = 0
    let sumTotal = 0

    panier.forEach(item => {
        sumQuantity += item.quantity
        sumTotal += item.quantity * item.price
        totalPrice.textContent = sumTotal
        totalQuantity.textContent = sumQuantity
    })
   
}
totalsArticle() 

/* SUPPRESSION DU PANIER */
document.querySelectorAll('.deleteItem').forEach(item => {
    item.addEventListener('click', () => {
        
        let article = item.closest('article')
        let id = article.getAttribute("data-id")
        let color = article.getAttribute("data-color")
        let panier = JSON.parse(localStorage.getItem("article"))
        let newPanier = []

        /* SUPPRIMER DU LOCALSTORAGE */
        panier.forEach(element => {
            if(element.id != id || element.color != color){
                newPanier.push(element)
            }
        })

        localStorage.setItem('article', JSON.stringify(newPanier))

        /* SUPPRIMER DU HTML */
        article.remove() 
        totalsArticle()
    })
})

/* MODIFICATION DU PANIER */
document.querySelectorAll('.itemQuantity').forEach(item => {
    item.addEventListener('change', () => {
        
        let article = item.closest('article')
        let id = article.getAttribute("data-id")
        let color = article.getAttribute("data-color")
        let panier = JSON.parse(localStorage.getItem("article"))
        let newPanier = []

        /* MODFIER DU LOCALSTORAGE */
        panier.forEach(element => {
            if(element.id == id || element.color == color){
                element.quantity = parseInt(item.value)
            }
            newPanier.push(element)
        })

        localStorage.setItem('article', JSON.stringify(newPanier))
        totalsArticle()
    })
})


// vérifier les données du formulaire, évènements en input afin d'indiquer un message d'erreur si un mauvais caractère est utilisé
//Prénom
 let firstName = document.querySelector('#firstName')
 let errorFirstName = document.querySelector('#firstNameErrorMsg'); 
 let regexName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i; // Expression régulière

 firstName.addEventListener('input', (e) => {
     e.preventDefault();          // // empêchera la soumission du formulaire (le comportement par défaut)
   if(!regexName.test(firstName.value)){ // si la correspandance est faux
     errorFirstName.textContent =  "Renseignez un prénom pour valider."   
   }else{
    errorFirstName.textContent = "" 
   } 
 })
//Nom
 let lastName = document.querySelector('#lastName')
 let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
 lastName.addEventListener('input', (e) =>{
     e.preventDefault();
     if(!regexName.test(lastName.value)){
        lastNameErrorMsg.textContent = "Renseignez un nom pour valider."
     }else{
        lastNameErrorMsg.textContent = "" 
     }
 })
 //Adresse
 let address = document.querySelector('#address')
 let addressErrorMsg = document.querySelector('#addressErrorMsg')
 let regexAdresse = /^[a-zA-Z0-9\s,'-]*$/;

 address.addEventListener('input', (e) =>{
     e.preventDefault();
     if(!regexAdresse.test(address.value)){
        addressErrorMsg.textContent = "Renseignez un Adresse pour valider."
     }else{
        addressErrorMsg.textContent = "" 
     }
 }) 
 //Ville
 let city = document.querySelector('#city')
 let cityErrorMsg = document.querySelector('#cityErrorMsg')
 let regexCity = /^[a-zA-Z',.\s-]{1,25}$/;

 city.addEventListener('input', (e) => {
     e.preventDefault()
     if(!regexCity.test(city.value)){
        cityErrorMsg.textContent = "Renseignez une ville pour valider"
     }else{
         cityErrorMsg.textContent = "" 
     }
 })
 // Email
 let email = document.querySelector('#email')
 let emailErrorMsg = document.querySelector('#emailErrorMsg')
 let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

 email.addEventListener('input', (e) => {
     e.preventDefault()
     if(!regexEmail.test(email.value)){
        emailErrorMsg.textContent = "Renseignez une Email pour valider"
     }else{
        emailErrorMsg.textContent = ""
     }
 })



