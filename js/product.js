async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        const productsContainer = document.querySelector('.products');

        products.forEach(element => {
            const productCard = document.createElement('div');
            productCard.className = "product-card";
            productCard.id = element.id;

            const productImg = document.createElement('img');
            productImg.src = element.image;
            productCard.appendChild(productImg);

            const productTitle = document.createElement('p');
            productTitle.className = "product-card__title";
            if(element.title.length > 30){
                productTitle.textContent = element.title.substring(0, 30) + '...';
            } else {
                productTitle.textContent = element.title;
            }
            productCard.appendChild(productTitle);

            const productCardInfo = document.createElement('div');
            productCardInfo.className = "product-card__info";


            const productPrice = document.createElement('p');
            productPrice.className = "product-card__price";
            productPrice.textContent = `$${element.price}`;
            productCardInfo.appendChild(productPrice);

            const cartButton = document.createElement('button');
            cartButton.className = "product-card__cart-button";
            cartButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;

            productCardInfo.appendChild(cartButton);
            productCard.appendChild(productCardInfo);

            productsContainer.appendChild(productCard);
            productCard.addEventListener('click', () => {
                    window.location.href = `product-details.html?id=${element.id}`;
                });
            });

    } catch (ex) {
        console.error('Error fetching products:', ex);
    }
}

getProducts();