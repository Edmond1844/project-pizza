import getProducts from "./getProducts.js";

let orderContainer = document.createElement('div');

let buttonDescending = document.createElement('button');
let buttonAscending = document.createElement('button');
orderContainer.append(buttonDescending, buttonAscending);

function getCards(url) {
    fetch(url)
        .then(res => res.json())
        .then((fetchData) => {    
            let productsCoppy = [...fetchData]; 
            console.log(productsCoppy);

            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            orderContainer.appendChild(cardList);
        
            getProducts(productsCoppy.slice(0, 2), cardList);
            
            let moreProduct = document.createElement('button');
            moreProduct.setAttribute('class', 'section-order__more-product');
            moreProduct.textContent = 'Показать еще товар';
            orderContainer.appendChild(moreProduct); 

            moreProduct.addEventListener('click', function() {
                if (productsCoppy.length > 0) {
                    getProducts(productsCoppy.splice(0, 2), cardList); 
                    if (productsCoppy.length === 0) {
                        moreProduct.remove(); 
                    }
                }
            });
            

            buttonAscending.addEventListener('click', function() {
                productsCoppy.sort((a, b) => a.price - b.price);
                cardList.innerHTML = ''; 

                getProducts(productsCoppy.slice(0, 2), cardList); 
            });

            buttonDescending.addEventListener('click', function() {
                productsCoppy.sort((a, b) => b.price - a.price); 
                cardList.innerHTML = ''; 
                getProducts(productsCoppy.slice(0, 2), cardList); 
            });
            
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
} 

export default getCards;