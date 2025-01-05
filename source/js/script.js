let button = [];
let pizzaCard = [];
let burgerCard = [];

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

        let cartPizza = document.createElement('div');
        cartPizza.setAttribute('class', 'section-order__cart');
        
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
                
                let menu = document.querySelector('.section-order__card-list');
                if (menu.getAttribute('data-card') === target) {
                    menu.classList.add('border');
                } else {
                    menu.classList.remove('border');
                }
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
                pizzaWrapper.setAttribute('class', 'section-order__pizza-wrapper');
                cardItem.appendChild(pizzaWrapper);

                let pizzaName = document.createElement('h3');
                pizzaName.setAttribute('class', 'section-order__pizza-name');
                pizzaName.textContent = pizzaCard.productName;
                pizzaWrapper.appendChild(pizzaName);

                let pizzaPrice = document.createElement('p');
                pizzaPrice.setAttribute('class', 'section-order__pizza-price');
                pizzaPrice.textContent = pizzaCard.price + ' ₽';
                pizzaWrapper.appendChild(pizzaPrice);

                let addButton = document.createElement('button');
                addButton.setAttribute('class', 'section-order__add-button');
                pizzaWrapper.appendChild(addButton);

                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', pizzaCard.buttonImg);
                addButton.appendChild(buttonPlus);
            });

            // подключение
            orderContainer.appendChild(cardList);

        //     fetch('http://localhost:3001/burgerCard')
        //     .then(res => res.json())
        //     .then((fetchedCard) => { 
        //         burgerCard = fetchedCard; 

        //         let cardListBurger = document.createElement('ul');
        //         cardListBurger.setAttribute('class', 'section-order__card-list');
        //         cardListBurger.setAttribute('data-card', 'product-burgers');
    
        //         burgerCard.forEach((burgerCard) => {
        //             let cardItem = document.createElement('li');
        //             cardItem.setAttribute('class', 'section-order__card-item');
        //             cardListBurger.appendChild(cardItem);
    
        //             let productPicture = document.createElement('img');
        //             productPicture.setAttribute('class', 'section-order__card-img');
        //             productPicture.setAttribute('src', burgerCard.img);
        //             productPicture.setAttribute('alt', burgerCard.productName);
        //             productPicture.setAttribute('width', burgerCard.width);
        //             productPicture.setAttribute('height', burgerCard.height);
        //             cardItem.appendChild(productPicture);
    
        //             let burgerWrapper = document.createElement('div');
        //             burgerWrapper.setAttribute('class', 'section-order__pizza-wrapper');
        //             cardItem.appendChild(burgerWrapper);
    
        //             let burgerName = document.createElement('h3');
        //             burgerName.setAttribute('class', 'section-order__pizza-name');
        //             burgerName.textContent = burgerCard.productName;
        //             burgerWrapper.appendChild(burgerName);
    
        //             let burgerPrice = document.createElement('p');
        //             burgerPrice.setAttribute('class', 'section-order__pizza-price');
        //             burgerPrice.textContent = burgerCard.price + ' ₽';
        //             burgerWrapper.appendChild(burgerPrice);
    
        //             let addButton = document.createElement('button');
        //             addButton.setAttribute('class', 'section-order__add-button');
        //             burgerWrapper.appendChild(addButton);
    
        //             let buttonPlus = document.createElement('img');
        //             buttonPlus.setAttribute('src', burgerCard.buttonImg);
        //             addButton.appendChild(buttonPlus);
        //         });

        //     // подключение 
        //     orderContainer.appendChild(cardListBurger);
        //     });
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
});
