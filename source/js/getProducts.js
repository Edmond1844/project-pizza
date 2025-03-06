function getProducts(products, cardList) {
    products.forEach(productItem => {
        let cardItem = document.createElement('li');
        cardItem.setAttribute('class', 'section-order__card-item');
        cardList.appendChild(cardItem);

        let productPicture = document.createElement('img');
        productPicture.setAttribute('class', 'section-order__card-img');
        productPicture.setAttribute('src', productItem.img);
        productPicture.setAttribute('alt', productItem.productName);
        productPicture.setAttribute('width', productItem.width);
        productPicture.setAttribute('height', productItem.height);
        cardItem.appendChild(productPicture);

        let contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('class', 'section-order__product-wrapper');
        cardItem.appendChild(contentWrapper);

        let productName = document.createElement('h3');
        productName.setAttribute('class', 'section-order__product-name');
        productName.textContent = productItem.productName;
        contentWrapper.appendChild(productName);

        let productPrice = document.createElement('p');
        productPrice.setAttribute('class', 'section-order__product-price');
        productPrice.textContent = productItem.price + ' ₽';
        contentWrapper.appendChild(productPrice);

        let addButton = document.createElement('button');
        addButton.setAttribute('class', 'section-order__add-button');
        contentWrapper.appendChild(addButton);

        addButton.addEventListener('click', function() {
            cartArray.push(productItem);
            localStorage.setItem('addedData', JSON.stringify(cartArray));
            cartListProducts.innerHTML = '';
            getGoods();
        });

        let buttonPlus = document.createElement('img');
        buttonPlus.setAttribute('src', productItem.buttonImg);
        addButton.appendChild(buttonPlus);
    });
};

export default getProducts;