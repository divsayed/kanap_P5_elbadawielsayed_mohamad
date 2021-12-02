const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
console.log(id)


fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(donnees => {
        //console.log(donnees)
        let image = document.createElement('img')
        image.setAttribute('src', donnees.imageUrl)
        image.setAttribute('alt', donnees.altTxt)
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

        btn.addEventListener("click", () => {
            let panier = JSON.parse(localStorage.getItem("article")) != null ? JSON.parse(localStorage.getItem("article")) : [];
            console.log(panier)

            let product = {
                id: donnees._id,
                quantity: Number(document.getElementById('quantity').value),
                color: document.getElementById('colors').value,
                image: image.src,
                imageAlt: image.alt,
                name: donnees.name,
                price: donnees.price
            }
            // condition de selection des couleur et des quantité.
            if (product.color == 0) {
                alert("Vous devez selectionner une couleur");
                return;
            }
            if ((product.quantity == 0) || (product.quantity < 0) || (product.quantity > 100)) {
                alert("Vous devez selectionner un Nombre entre 1 et 100");
                return;
            }
            // condition si le local storage contient un produit
            if (panier) {
                const result = panier.find(el => el.id == product.id && el.color == product.color);
                if (result) {
                    let newQuantite = Number(product.quantity) + Number(result.quantity);
                    result.quantity = newQuantite;
                    localStorage.setItem("article", JSON.stringify(panier));
                    console.log(panier);

                    //Si le produit commandé n'est pas dans le panier
                } else {
                    panier.push(product);
                    localStorage.setItem("article", JSON.stringify(panier));
                    console.log(panier);
                }
                //Si le panier est vide
            } else {
                panier = [];
                panier.push(product);
                localStorage.setItem("article", JSON.stringify(panier));
                //console.log(panier);
            }

        })
    })
    .catch(error => alert("Erreur de la requête"));