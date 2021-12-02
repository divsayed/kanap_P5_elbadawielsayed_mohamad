let recupPanier = JSON.parse(localStorage.getItem("article"));
console.log(recupPanier)

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
});
