    let cartArray = [];

    if(!localStorage.getItem('addedData')) {
        console.log('Пусто')
    } else {
        cartArray = JSON.parse(localStorage.getItem('addedData'));
    }

    let sectionOrder = document.createElement('section');
    sectionOrder.setAttribute('class', 'section-order');
    document.body.appendChild(sectionOrder);

    let orderContainer = document.createElement('div');
    orderContainer.setAttribute('class', 'section-order__container');
    sectionOrder.appendChild(orderContainer);

    let wrapperContent = document.createElement('div');
    wrapperContent.setAttribute('class', 'section-order__wrapper-content');
    orderContainer.appendChild(wrapperContent);

    let headerContent = document.createElement('div');
    headerContent.setAttribute('class', 'section-order__header-content');
    wrapperContent.appendChild(headerContent);

    let headerWrapperText = document.createElement('div');
    headerWrapperText.setAttribute('class', 'section-order__wrapper-text');
    headerContent.appendChild(headerWrapperText);

    let headerTitle = document.createElement('h2');
    headerTitle.innerHTML = 'Сделай первый заказ &nbsp; и получи скидку <span>20%</span>';
    headerTitle.setAttribute('class', 'section-order__header-title');
    headerWrapperText.appendChild(headerTitle);

    let headerTextContent = document.createElement('p');
    headerTextContent.setAttribute('class', 'section-order__header-text');
    headerTextContent.innerHTML = 'Предложение действует для новых клиентов &nbsp; и не распространяется на доставку';
    headerWrapperText.appendChild(headerTextContent);

    let headerBtn = document.createElement('button');
    headerBtn.setAttribute('type', 'button');
    headerBtn.setAttribute('class', 'section-order__header-btn');
    headerBtn.textContent = 'Заказать';
    headerContent.appendChild(headerBtn);

    let headerImg = document.createElement('img');
    headerImg.setAttribute('class', 'section-order__header-img');
    headerImg.setAttribute('src', './img/header-img.png');
    headerImg.setAttribute('width', '532');
    headerImg.setAttribute('height', '484');
    headerContent.appendChild(headerImg);

    let navWrapper = document.createElement('div');
    navWrapper.setAttribute('class', 'section-order__wrapper-navigation');
    orderContainer.appendChild(navWrapper);

    let buttonDescending = document.createElement('button');
    buttonDescending.setAttribute('class', 'section-order__button-filter');
    buttonDescending.textContent = 'По убыванию цены';

    let buttonAscending = document.createElement('button');
    buttonAscending.setAttribute('class', 'section-order__button-filter');
    buttonAscending.textContent = 'По возрастанию цены';

    orderContainer.append(buttonDescending, buttonAscending);

    let wrapperTitle = document.createElement('h3');
    wrapperTitle.setAttribute('class', 'section-order__wrapper-title');
    wrapperTitle.textContent = 'Меню';

    let headerNav = document.createElement('nav');
    
    let navList = document.createElement('ul');
    navList.setAttribute('class', 'section-order__wrapper-list');  
    headerNav.appendChild(navList);

    let openButton = document.createElement('button');
    openButton.setAttribute('class', 'section-order__button-open');
    openButton.setAttribute('type', 'button');
    openButton.textContent = 'Еще';
    
    navWrapper.append(wrapperTitle, headerNav, openButton);

    let isExpanded = false; // Флаг для отслеживания состояния
                    
    openButton.addEventListener('click', function() {
        let items = document.querySelectorAll('.section-order__wrapper-list li');
                                    
        if (!isExpanded) {
            // Если список не развернут, показываем все элементы
            items.forEach((item) => {
                item.style.display = 'list-item'; // Делаем элемент видимым
            });

            openButton.textContent = 'Скрыть'; // Меняем текст кнопки на "Скрыть"
            } else {
            // Если список развернут, скрываем все элементы
                items.forEach((item, index) => {
                    if (index >= 4) { // Скрываем элементы начиная с пятого
                        item.style.display = 'none'; // Скрываем элемент
                    }
                });
                
                openButton.textContent = 'Еще'; // Меняем текст кнопки обратно на "Все"
            }
                                
            isExpanded = !isExpanded; // Переключаем состояние
    });

    let wrapperCart = document.createElement('div');
    wrapperCart.setAttribute('class', 'section-order__cart');
    orderContainer.appendChild(wrapperCart);

    let titleCart = document.createElement('h3');
    titleCart.textContent = 'Корзина';
    titleCart.setAttribute('class', 'section-order__title-cart');
    wrapperCart.appendChild(titleCart);

    let cartListProducts = document.createElement('ul');
    cartListProducts.setAttribute('class', 'section-order__cart-list');
    wrapperCart.appendChild(cartListProducts);

    function getButtons(url) {
        fetch(url)
            .then(res => res.json())
            .then((menuNavigation) => {
                let navWrapperList = document.querySelector('.section-order__wrapper-list');

                let buttons = menuNavigation;
                buttons.forEach(buttonNav => {
                    let navItem = document.createElement('li');

                    let navButton = document.createElement('button');
                    navButton.setAttribute('class', 'section-order__nav-button');
                    navButton.setAttribute('data-target', buttonNav.dataTarget);
                    navButton.textContent = buttonNav.buttonName; 
                    navButton.setAttribute('type', buttonNav.type);
                    navItem.appendChild(navButton);

                    navWrapperList.appendChild(navItem);

                    let imgBtn = document.createElement('img');
                    imgBtn.setAttribute('class', 'section-order__nav-icon');
                    imgBtn.setAttribute('src', buttonNav.img);
                    navButton.appendChild(imgBtn);

                    navButton.addEventListener('click', function() {
                        let target = navButton.getAttribute('data-target');
                        let urlTarget = `http://localhost:3001/${target}`;

                        const cardLisrRemove = document.querySelector('.section-order__card-list');

                        if(cardLisrRemove) {
                            cardLisrRemove.remove();
                        }
                        getCards(urlTarget);
                        
                        let allNavButtons = document.querySelectorAll('.section-order__nav-button');
                                        
                        allNavButtons.forEach((btn) => {
                            btn.classList.remove('section-order__nav-button--active');
                        });
                            navButton.classList.add('section-order__nav-button--active');
                                        
                            let allMenus = document.querySelectorAll('.section-order__card-list');
                        
                            allMenus.forEach((menu) => {
                                if (menu.getAttribute('data-card') === target) {
                                    menu.classList.remove('section-order__hidden');
                                } else {
                                    menu.classList.add('section-order__hidden');
                                }
                            });
                    });
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    };

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
                        getProducts(cardsToShow.splice(0, 2), cardList); 
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

    function deleteProduct(index){
        cartArray.splice(index, 1);
        localStorage.setItem('addedData', JSON.stringify(cartArray));
        getGoods();
    };

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


    getButtons('http://localhost:3001/buttons');
    getCards('http://localhost:3001/pizzaCard');
    getGoods();

