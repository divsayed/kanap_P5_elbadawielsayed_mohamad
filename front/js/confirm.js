
// recupère l'id produit dans l'url
const urlParams = new URLSearchParams(window.location.search);
const orderid = urlParams.get('orderId')

// afficher l'id de la commande
document.querySelector('#orderId').textContent = orderid;