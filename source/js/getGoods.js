let cartArray = [];

let cartListProducts = document.createElement('ul');

import deleteProduct from "./deleteProduct.js";

function getGoods() {
    cartListProducts.innerHTML = '';

    cartArray.forEach((cardProduct, index) => {    
        let cartItemProduct = document.createElement('li');
        cartItemProduct.setAttribute('class', 'section-order__add-product-item');
        cartListProducts.appendChild(cartItemProduct);  

        let productImage = document.createElement('img');
        productImage.setAttribute('src', cardProduct.img);
        productImage.setAttribute('class', 'section-order__img-cart');
        cartItemProduct.appendChild(productImage);

        let wrapperTextCard = document.createElement('div');
        wrapperTextCard.setAttribute('class', 'section-order__wrapper-text-card');
        cartItemProduct.appendChild(wrapperTextCard);
        
        let productName = document.createElement('h3');
        productName.setAttribute('class', 'section-order__element-name');
        productName.textContent = cardProduct.productName;

        let productPrice = document.createElement('p');
        productPrice.setAttribute('class', 'section-order__element-price');
        productPrice.textContent = cardProduct.price + ' ₽';

        let productRemove = document.createElement('button');
        productRemove.setAttribute('type', 'button');
        productRemove.setAttribute('class', 'section-order__btn-delite');
        productRemove.textContent = 'Удалить';
        wrapperTextCard.append(productName,productPrice,productRemove);

        productRemove.addEventListener('click', function(){
            deleteProduct(index);
            productRemove.closest('li').remove();
        });

        
        let wrapperBtnAddRemove = document.createElement('div');
        wrapperBtnAddRemove.setAttribute('class', 'section-order__wrapper-btn-add-remove');
        cartItemProduct.appendChild(wrapperBtnAddRemove);

        let number = '0' + 1;
        
        function calculationPrice() {
            let priceItem = cardProduct.price;
            
            const price = priceItem * number;
            
            return price;
        };

        let buttonRemove = document.createElement('button');
        buttonRemove.setAttribute('class', 'section-order__button-add-remove');
        wrapperBtnAddRemove.appendChild(buttonRemove);
        

        let buttonAddMinus = document.createElement('img');
        buttonAddMinus.setAttribute('src', './img/icon/minus.svg');
        buttonRemove.appendChild(buttonAddMinus);

        buttonRemove.addEventListener('click', () => {
            deleteProduct(index);
            if (number > 1) { 
                number--;

                quantityProduct.textContent = number < 10 ? '0' + number : number; 
                productPrice.textContent = calculationPrice(cardProduct.price) + ' ₽';
            } else {
                buttonRemove.closest('li').remove();
            }
        });

        let quantityProduct = document.createElement('span');
        quantityProduct.setAttribute('class', 'section-order__quantity-product');
        quantityProduct.textContent = number;
        wrapperBtnAddRemove.appendChild(quantityProduct);

        let buttonAdd = document.createElement('button');
        buttonAdd.setAttribute('class', 'section-order__button-add-remove');
        wrapperBtnAddRemove.appendChild(buttonAdd);

        let buttonAddPlus = document.createElement('img');
        buttonAddPlus.setAttribute('src', './img/icon/plus.svg');
        buttonAddPlus.setAttribute('width', '15');
        buttonAddPlus.setAttribute('height', '15');
        buttonAdd.appendChild(buttonAddPlus);
        buttonAdd.addEventListener('click', function(){
            number++;
            quantityProduct.textContent = number < 10 ? '0' + number : number;

            productPrice.textContent = calculationPrice(cardProduct.price) + ' ₽';
        });
    })
};

export default getGoods;