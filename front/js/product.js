// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id')
// console.log(id)

/*------------------------------*/


var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
//console.log(id);

fetch('http://localhost:3000/api/products/' + id) 
    .then(response => response.json())
    .then(donnees => {
         //console.log(donnees)
         let image = document.createElement('img')
         image.setAttribute('src', donnees.imageUrl)
         image.setAttribute('alt', donnees.altTxt )
         document.getElementsByClassName('item__img')[0].append(image)
         document.querySelector('h1').append(donnees.name)
         document.querySelector('#price').textContent = donnees.price
         document.getElementById('description').textContent = donnees.description
         
         //selection de la couleur
         donnees.colors.forEach(couleur => {
           //console.log(couleur)
           let option = document.createElement('option')
           option.textContent = couleur
           option.setAttribute('value', couleur)
           document.getElementById('colors').append(option)
         });

         //ajouter au panier
        let btn = document.getElementById('addToCart')

        btn.addEventListener("click", () =>{
        let panier = JSON.parse(localStorage.getItem("panier")) != null ? JSON.parse(localStorage.getItem("panier")) : [];
        //   console.log(panier)
          
          let product = {
            'id' : donnees._id, 
            'quantity' : Number( document.getElementById('quantity').value),
            'color' : document.getElementById('colors').value,
            'image' : image.src,
            'imageAlt' : image.alt, 
            'name'  : donnees.name,
            'price' : donnees.price 
          }
        console.log(product)
          panier.push(product)
          localStorage.setItem("panier", JSON.stringify(panier));

        })  

            })
    .catch (error => alert("Erreur de la requête"));


