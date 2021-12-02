//requête service web pour accéder à l'api
fetch('http://localhost:3000/api/products') 
	.then(respense => respense.json())
	.then(donnee => {
		//console.log(donnee)
		donnee.forEach(Display => {
			//console.log(Display);
			let section = document.getElementById('items');
			let a = document.createElement('a');
			let article = document.createElement('article');
			let image = document.createElement('img');
			let h3 = document.createElement('h3');
			let p = document.createElement('p');

			a.setAttribute('href', './product.html?id=' + Display._id);

			image.setAttribute('src', Display.imageUrl);
			image.setAttribute('alt', Display.altTxt);

			h3.setAttribute('class', 'productName');
			h3.textContent = Display.name;

			p.setAttribute('class', 'productDescription');
			p.textContent = Display.description;

			article.append(image, h3, p);
			a.append(article);
			section.append(a);
		});
	})
	.catch(Error => alert("Erreur est survenu"));