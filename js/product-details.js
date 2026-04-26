async function getProductDetails(id) {
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        const productDetails=document.querySelector(".product-details");
        const productDetailsImages=document.createElement('div');
        productDetailsImages.className="product-details__images";
        const productThumbnails=document.createElement('div');
        productThumbnails.className="product-details__image-thumbnails";
        for(let i=0;i<3;i++){
            const thumbnailImage= document.createElement('img');
            thumbnailImage.src=product.image;
            thumbnailImage.id=`thumbnail-${i}`;
            if(i===0){
                thumbnailImage.style="background: rgba(0,0,0,0.2);"
            }
            thumbnailImage.addEventListener('click', (event)=>{
                const mainImage=document.querySelector('.product-details__main-image img');
                mainImage.src=event.target.src;
                const thumbnails=document.querySelectorAll('.product-details__image-thumbnails img');
                thumbnails.forEach(thumbnail=>{
                    thumbnail.style="background: rgba(0,0,0,0.45);";
                });
                event.target.style="background: rgba(0,0,0,0.2);"
            });
            productThumbnails.appendChild(thumbnailImage);
        }

        productDetailsImages.appendChild(productThumbnails);
        const mainImageContainer=document.createElement('div');
        mainImageContainer.className="product-details__main-image";
        const mainImage=document.createElement('img');
        mainImage.src=product.image;
       
        mainImageContainer.appendChild(mainImage);
        productDetailsImages.appendChild(mainImageContainer);
        productDetails.appendChild(productDetailsImages);

        const productDetailsInfo=document.createElement('div');
        productDetailsInfo.className="product-details__info";

        const productTitle=document.createElement('h2');
        productTitle.textContent=product.title;
        productDetailsInfo.appendChild(productTitle);

        const productCategory=document.createElement('p');
        productCategory.className="product-details__category";
        productCategory.textContent=product.category;
        productDetailsInfo.appendChild(productCategory);
       
        const productDescription=document.createElement('p');
        productDescription.className="product-details__description";
        productDescription.textContent=product.description;
        productDetailsInfo.appendChild(productDescription);


         const productPrice=document.createElement('p');
        productPrice.className="product-details__price";
        productPrice.textContent=`$${product.price}`;
        productDetailsInfo.appendChild(productPrice);


        const addToCartButton=document.createElement('button');
        addToCartButton.className="product-details__add-to-cart";
        addToCartButton.textContent="Add to Cart";
        productDetailsInfo.appendChild(addToCartButton);

        productDetails.appendChild(productDetailsInfo);


    } catch(ex){
        console.error('Error fetching product details:', ex);
    }
}

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const productId = getProductIdFromUrl();
getProductDetails(productId);