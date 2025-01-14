let button = [];
let pizzaCard = [];
let burgerCard = [];
let potatoCard = [];
let setCard = [];
let drinkCard = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/button')
    .then(res => res.json())
    .then((fetchedLink) => {
        button = fetchedLink; 

        let sectionOrder = document.createElement('section');
        sectionOrder.setAttribute('class', 'section-order');

        let orderContainer = document.createElement('div');
        orderContainer.setAttribute('class', 'section-order__container');

        let wrapperContent = document.createElement('div');
        wrapperContent.setAttribute('class', 'section-order__wrapper-content');

        let headerContent = document.createElement('div');
        headerContent.setAttribute('class', 'section-order__header-content');

        let headerWrapperText = document.createElement('div');
        headerWrapperText.setAttribute('class', 'section-order__wrapper-text');

        let headerTitle = document.createElement('h2');
        headerTitle.innerHTML = 'Сделай первый заказ &nbsp; и получи скидку <span>20%</span>';
        headerTitle.setAttribute('class', 'section-order__header-title');

        let headerTextContent = document.createElement('p');
        headerTextContent.setAttribute('class', 'section-order__header-text');
        headerTextContent.innerHTML = 'Предложение действует для новых клиентов &nbsp; и не распространяется на доставку';

        let headerBtn = document.createElement('button');
        headerBtn.setAttribute('type', 'button');
        headerBtn.setAttribute('class', 'section-order__header-btn');
        headerBtn.textContent = 'Заказать';

        let headerImg = document.createElement('img');
        headerImg.setAttribute('class', 'section-order__header-img');
        headerImg.setAttribute('src', './img/header-img.png');
        headerImg.setAttribute('width', '532');
        headerImg.setAttribute('height', '484');
        
        // подключение 
        document.body.appendChild(sectionOrder);
        sectionOrder.appendChild(orderContainer);
        orderContainer.appendChild(wrapperContent);
        wrapperContent.appendChild(headerContent);
        
        //header content
        headerContent.appendChild(headerWrapperText);
        headerWrapperText.appendChild(headerTitle);
        headerWrapperText.appendChild(headerTextContent);
        headerContent.appendChild(headerBtn);
        headerContent.appendChild(headerImg);

        // Меню 
        let wrapperNavigtion = document.createElement('div');
        wrapperNavigtion.setAttribute('class', 'section-order__wrapper-navigation');

        let wrapperTitle = document.createElement('h3');
        wrapperTitle.setAttribute('class', 'section-order__wrapper-title');
        wrapperTitle.textContent = 'Меню';

        let navList = document.createElement('ul');
        navList.setAttribute('class', 'section-order__wrapper-list');
                
        button.forEach((button) => {
            let navItem = document.createElement('li');

            let navButton = document.createElement('button');
            navButton.setAttribute('class', 'section-order__nav-button');
            navButton.setAttribute('data-target', button.dataTarget);
            navButton.textContent = button.buttonName; 
            navButton.setAttribute('type', button.type);

            navButton.addEventListener('click', function() {
                let target = navButton.getAttribute('data-target');
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

            navItem.appendChild(navButton);
            navList.appendChild(navItem);


            let imgBtn = document.createElement('img');
            imgBtn.setAttribute('class', 'section-order__nav-icon');
            imgBtn.setAttribute('src', button.img);

            navItem.appendChild(navButton); 
            navList.appendChild(navItem); 
            navButton.appendChild(imgBtn);
        });

        let openButton = document.createElement('button');
        openButton.setAttribute('class', 'section-order__button-open');
        openButton.setAttribute('type', 'button');
        openButton.textContent = 'Все';


        // С чатом сделал открытие списка!

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
                openButton.textContent = 'Все'; // Меняем текст кнопки обратно на "Все"
            }
        
            isExpanded = !isExpanded; // Переключаем состояние
        });
        

        // подключение
        orderContainer.appendChild(wrapperNavigtion);
        wrapperNavigtion.appendChild(wrapperTitle);
        wrapperNavigtion.appendChild(navList);
        wrapperNavigtion.appendChild(openButton);

        // Меню пицца 
        fetch('http://localhost:3001/pizzaCard')
        .then(res => res.json())
        .then((fetchedCard) => {
            pizzaCard = fetchedCard; 
            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            cardList.setAttribute('data-card', 'product-pizza');

            pizzaCard.forEach((pizzaCard) => {
                let cardItem = document.createElement('li');
                cardItem.setAttribute('class', 'section-order__card-item');
                cardList.appendChild(cardItem);

                let productPicture = document.createElement('img');
                productPicture.setAttribute('class', 'section-order__card-img');
                productPicture.setAttribute('src', pizzaCard.img);
                productPicture.setAttribute('alt', pizzaCard.productName);
                productPicture.setAttribute('width', pizzaCard.width);
                productPicture.setAttribute('height', pizzaCard.height);
                cardItem.appendChild(productPicture);

                let pizzaWrapper = document.createElement('div');
                pizzaWrapper.setAttribute('class', 'section-order__product-wrapper');
                cardItem.appendChild(pizzaWrapper);

                let pizzaName = document.createElement('h3');
                pizzaName.setAttribute('class', 'section-order__product-name');
                pizzaName.textContent = pizzaCard.productName;
                pizzaWrapper.appendChild(pizzaName);

                let pizzaPrice = document.createElement('p');
                pizzaPrice.setAttribute('class', 'section-order__product-price');
                pizzaPrice.textContent = pizzaCard.price + ' ₽';
                pizzaWrapper.appendChild(pizzaPrice);

                let addButton = document.createElement('button');
                addButton.setAttribute('class', 'section-order__add-button');
                pizzaWrapper.appendChild(addButton); 
                
                addButton.addEventListener('click', function(){
                    const cart = document.querySelector('.section-order__cart');

                    let productCard = document.createElement('div');
                    productCard.setAttribute('class', 'section-order__product-card-wrapper');
                    cart.appendChild(productCard);

                    let productImage = document.createElement('img');
                    productImage.setAttribute('src', pizzaCard.img);
                    productImage.setAttribute('class', 'section-order__img-cart');
                    productCard.appendChild(productImage);

                    let wrapperTextCard = document.createElement('div');
                    wrapperTextCard.setAttribute('class', 'section-order__wrapper-text-card');
                    productCard.appendChild(wrapperTextCard);

                    let productName = document.createElement('h3');
                    productName.setAttribute('class', 'section-order__element-name');
                    productName.textContent = pizzaCard.productName;
                    wrapperTextCard.appendChild(productName);

                    let productPrice = document.createElement('p');
                    productPrice.setAttribute('class', 'section-order__element-price');
                    productPrice.textContent = pizzaCard.price + ' ₽';
                    wrapperTextCard.appendChild(productPrice);

                    let wrapperBtnAddRemove = document.createElement('div');
                    wrapperBtnAddRemove.setAttribute('class', 'section-order__wrapper-btn-add-remove');
                    productCard.appendChild(wrapperBtnAddRemove);
                    
                    let number = '0' + 1;
                    
                    function calculationPrice() {
                        let priceItem = pizzaCard.price;
                        
                        const price = priceItem * number;
                        
                        return price;
                    };


                    let buttonRemove = document.createElement('button');
                    buttonRemove.setAttribute('class', 'section-order__button-add-remove');
                    wrapperBtnAddRemove.appendChild(buttonRemove);

                    let buttonAddMinus = document.createElement('img');
                    buttonAddMinus.setAttribute('src', './img/icon/minus.svg');
                    buttonRemove.appendChild(buttonAddMinus);
                    
                    buttonRemove.addEventListener('click', function() {
                        if (number > 1) { 
                            number--;

                            quantityProduct.textContent = number < 10 ? '0' + number : number; 
                            productPrice.textContent = calculationPrice(pizzaCard.price) + ' ₽';
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
                        // quantityProduct.textContent = '0' + number;
                        quantityProduct.textContent = number < 10 ? '0' + number : number;

                        productPrice.textContent = calculationPrice(pizzaCard.price) + ' ₽';
                    });
                })
                    
                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', pizzaCard.buttonImg);
                addButton.appendChild(buttonPlus);
            });

            // подключение
            orderContainer.appendChild(cardList);

            fetch('http://localhost:3001/burgerCard')
            .then(res => res.json())
            .then((fetchedCard) => { 
                burgerCard = fetchedCard; 

                let cardList = document.createElement('ul');
                cardList.setAttribute('class', 'section-order__card-list');
                cardList.setAttribute('data-card', 'product-burgers');
    
                burgerCard.forEach((burgerCard) => {
                    let cardItem = document.createElement('li');
                    cardItem.setAttribute('class', 'section-order__card-item');
                    cardList.appendChild(cardItem);
    
                    let productPicture = document.createElement('img');
                    productPicture.setAttribute('class', 'section-order__card-img');
                    productPicture.setAttribute('src', burgerCard.img);
                    productPicture.setAttribute('alt', burgerCard.productName);
                    productPicture.setAttribute('width', burgerCard.width);
                    productPicture.setAttribute('height', burgerCard.height);
                    cardItem.appendChild(productPicture);
    
                    let pizzaWrapper = document.createElement('div');
                    pizzaWrapper.setAttribute('class', 'section-order__product-wrapper');
                    cardItem.appendChild(pizzaWrapper);
    
                    let pizzaName = document.createElement('h3');
                    pizzaName.setAttribute('class', 'section-order__product-name');
                    pizzaName.textContent = burgerCard.productName;
                    pizzaWrapper.appendChild(pizzaName);
    
                    let pizzaPrice = document.createElement('p');
                    pizzaPrice.setAttribute('class', 'section-order__product-price');
                    pizzaPrice.textContent = burgerCard.price + ' ₽';
                    pizzaWrapper.appendChild(pizzaPrice);
    
                    let addButton = document.createElement('button');
                    addButton.setAttribute('class', 'section-order__add-button');
                    pizzaWrapper.appendChild(addButton);

                    // Добавление в корзину
                    cardList.addEventListener('click', function(event) {
                    if (event.target.matches('.section-order__add-button')) {
                        const card = event.target.closest('.section-order__card-item'); 
                
                        let addItemProduct = document.createElement('li');
                        addItemProduct.setAttribute('class', 'section-order__add-product-item');
                
                        let productImage = card.querySelector('.section-order__card-img').src; 
                        
                        let productPicture = document.createElement('img');
                        productPicture.setAttribute('src', productImage);
                        productPicture.setAttribute('width', '89');
                        productPicture.setAttribute('height', '86');
                        addItemProduct.appendChild(productPicture);
                
                        cartProducts.appendChild(addItemProduct); 
                    }
                    });
    
                    let buttonPlus = document.createElement('img');
                    buttonPlus.setAttribute('src', burgerCard.buttonImg);
                    addButton.appendChild(buttonPlus);
                    // подключение 
                    orderContainer.appendChild(cardList);
                });
                
            });
        });
        fetch('http://localhost:3001/potatoCard')
        .then(res => res.json())
        .then((fetchedCard) => { 
            potatoCard = fetchedCard; 

            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            cardList.setAttribute('data-card', 'product-potatos');

            potatoCard.forEach((potatoCard) => {
                let cardItem = document.createElement('li');
                cardItem.setAttribute('class', 'section-order__card-item');
                cardList.appendChild(cardItem);

                let productPicture = document.createElement('img');
                productPicture.setAttribute('class', 'section-order__card-img');
                productPicture.setAttribute('src', potatoCard.img);
                productPicture.setAttribute('alt', potatoCard.productName);
                productPicture.setAttribute('width', potatoCard.width);
                productPicture.setAttribute('height', potatoCard.height);
                cardItem.appendChild(productPicture);

                let pizzaWrapper = document.createElement('div');
                pizzaWrapper.setAttribute('class', 'section-order__product-wrapper');
                cardItem.appendChild(pizzaWrapper);

                let pizzaName = document.createElement('h3');
                pizzaName.setAttribute('class', 'section-order__product-name');
                pizzaName.textContent = potatoCard.productName;
                pizzaWrapper.appendChild(pizzaName);

                let pizzaPrice = document.createElement('p');
                pizzaPrice.setAttribute('class', 'section-order__product-price');
                pizzaPrice.textContent = potatoCard.price + ' ₽';
                pizzaWrapper.appendChild(pizzaPrice);

                let addButton = document.createElement('button');
                addButton.setAttribute('class', 'section-order__add-button');
                pizzaWrapper.appendChild(addButton);

                // Добавление в корзину
                cardList.addEventListener('click', function(event) {
                    if (event.target.matches('.section-order__add-button')) {
                        const card = event.target.closest('.section-order__card-item'); 
                
                        let addItemProduct = document.createElement('li');
                        addItemProduct.setAttribute('class', 'section-order__add-product-item');
                
                        let productImage = card.querySelector('.section-order__card-img').src; 
                
                        let productPicture = document.createElement('img');
                        productPicture.setAttribute('src', productImage);
                        productPicture.setAttribute('width', '89');
                        productPicture.setAttribute('height', '86');
                        addItemProduct.appendChild(productPicture);
                
                        cartProducts.appendChild(addItemProduct); 
                    }
                });

                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', potatoCard.buttonImg);
                addButton.appendChild(buttonPlus);
                // подключение 
                orderContainer.appendChild(cardList);
            });
            
        });
        fetch('http://localhost:3001/setCard')
        .then(res => res.json())
        .then((fetchedCard) => { 
            setCard = fetchedCard; 

            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            cardList.setAttribute('data-card', 'product-sets');

            setCard.forEach((setCard) => {
                let cardItem = document.createElement('li');
                cardItem.setAttribute('class', 'section-order__card-item');
                cardList.appendChild(cardItem);

                let productPicture = document.createElement('img');
                productPicture.setAttribute('class', 'section-order__card-img');
                productPicture.setAttribute('src', setCard.img);
                productPicture.setAttribute('alt', setCard.productName);
                productPicture.setAttribute('width', setCard.width);
                productPicture.setAttribute('height', setCard.height);
                cardItem.appendChild(productPicture);

                let pizzaWrapper = document.createElement('div');
                pizzaWrapper.setAttribute('class', 'section-order__product-wrapper');
                cardItem.appendChild(pizzaWrapper);

                let pizzaName = document.createElement('h3');
                pizzaName.setAttribute('class', 'section-order__product-name');
                pizzaName.textContent = setCard.productName;
                pizzaWrapper.appendChild(pizzaName);

                let pizzaPrice = document.createElement('p');
                pizzaPrice.setAttribute('class', 'section-order__product-price');
                pizzaPrice.textContent = setCard.price + ' ₽';
                pizzaWrapper.appendChild(pizzaPrice);

                let addButton = document.createElement('button');
                addButton.setAttribute('class', 'section-order__add-button');
                pizzaWrapper.appendChild(addButton);

                // Добавление в корзину
                cardList.addEventListener('click', function(event) {
                    if (event.target.matches('.section-order__add-button')) {
                        const card = event.target.closest('.section-order__card-item'); 
                
                        let addItemProduct = document.createElement('li');
                        addItemProduct.setAttribute('class', 'section-order__add-product-item');
                
                        let productImage = card.querySelector('.section-order__card-img').src;
                
                        let productPicture = document.createElement('img');
                        productPicture.setAttribute('src', productImage);
                        productPicture.setAttribute('width', '89');
                        productPicture.setAttribute('height', '86');
                        addItemProduct.appendChild(productPicture);
                
                        cartProducts.appendChild(addItemProduct); 
                    }
                });

                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', setCard.buttonImg);
                addButton.appendChild(buttonPlus);
                // подключение 
                orderContainer.appendChild(cardList);
            });
            
        });

        fetch('http://localhost:3001/drinkCard')
        .then(res => res.json())
        .then((fetchedCard) => { 
            drinkCard = fetchedCard; 

            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            cardList.setAttribute('data-card', 'product-drinks');

            drinkCard.forEach((drinkCard) => {
                let cardItem = document.createElement('li');
                cardItem.setAttribute('class', 'section-order__card-item');
                cardList.appendChild(cardItem);

                let productPicture = document.createElement('img');
                productPicture.setAttribute('class', 'section-order__card-img');
                productPicture.setAttribute('src', drinkCard.img);
                productPicture.setAttribute('alt', drinkCard.productName);
                productPicture.setAttribute('width', drinkCard.width);
                productPicture.setAttribute('height', drinkCard.height);
                cardItem.appendChild(productPicture);

                let pizzaWrapper = document.createElement('div');
                pizzaWrapper.setAttribute('class', 'section-order__product-wrapper');
                cardItem.appendChild(pizzaWrapper);

                let pizzaName = document.createElement('h3');
                pizzaName.setAttribute('class', 'section-order__product-name');
                pizzaName.textContent = drinkCard.productName;
                pizzaWrapper.appendChild(pizzaName);

                let pizzaPrice = document.createElement('p');
                pizzaPrice.setAttribute('class', 'section-order__product-price');
                pizzaPrice.textContent = drinkCard.price + ' ₽';
                pizzaWrapper.appendChild(pizzaPrice);

                let addButton = document.createElement('button');
                addButton.setAttribute('class', 'section-order__add-button');
                pizzaWrapper.appendChild(addButton);

                // Добавление в корзину
                cardList.addEventListener('click', function(event) {
                    if (event.target.matches('.section-order__add-button')) {
                        const card = event.target.closest('.section-order__card-item'); 
                
                        let addItemProduct = document.createElement('li');
                        addItemProduct.setAttribute('class', 'section-order__add-product-item');
                
                        let productImage = card.querySelector('.section-order__card-img').src; 
                
                        let productPicture = document.createElement('img');
                        productPicture.setAttribute('src', productImage);
                        productPicture.setAttribute('width', '89');
                        productPicture.setAttribute('height', '86');
                        addItemProduct.appendChild(productPicture);
                
                        cartProducts.appendChild(addItemProduct); 
                    }
                });

                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', drinkCard.buttonImg);
                addButton.appendChild(buttonPlus);

                // подключение 
                orderContainer.appendChild(cardList);
            });
        });

        let wrapperCart = document.createElement('div');
        wrapperCart.setAttribute('class', 'section-order__cart');
        orderContainer.appendChild(wrapperCart);

        let titleCart = document.createElement('h3');
        titleCart.textContent = 'Корзина';
        titleCart.setAttribute('class', 'section-order__title-cart');
        wrapperCart.appendChild(titleCart);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
});

