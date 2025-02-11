    let cartArray = [];

    // if(!localStorage.getItem('addedProduct')) {
    //     console.log('Пусто')
    // } else {
    //     cartArray = JSON.parse(localStorage.getItem('addedProduct'));
    // }

    
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

    function getCards(url, arrayName)  {
        fetch(url)
        .then(res => res.json())
        .then((fetchData) => {
            let products = fetchData; 

            let cardList = document.createElement('ul');
            cardList.setAttribute('class', 'section-order__card-list');
            // cardList.setAttribute('data-card', arrayName);
            orderContainer.appendChild(cardList);

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

                let buttonPlus = document.createElement('img');
                buttonPlus.setAttribute('src', productItem.buttonImg);
                addButton.appendChild(buttonPlus);
            });
                
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
    };

    
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

    let wrapperTitle = document.createElement('h3');
    wrapperTitle.setAttribute('class', 'section-order__wrapper-title');
    wrapperTitle.textContent = 'Меню';
    navWrapper.appendChild(wrapperTitle);

    let headerNav = document.createElement('nav');
    navWrapper.appendChild(headerNav);

    let navList = document.createElement('ul');
    navList.setAttribute('class', 'section-order__wrapper-list');  
    headerNav.appendChild(navList);

    let openButton = document.createElement('button');
    openButton.setAttribute('class', 'section-order__button-open');
    openButton.setAttribute('type', 'button');
    openButton.textContent = 'Еще';
    
    navWrapper.appendChild(openButton);

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

    getButtons('http://localhost:3001/buttons');
    getCards('http://localhost:3001/pizzaCard');
    // getCards('http://localhost:3001/burgerCard');
    // getCards('http://localhost:3001/potatoCard');

