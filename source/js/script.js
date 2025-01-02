let data = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/data')
    .then(res => res.json())
    .then((fetchedData) => {

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
        headerBtn.setAttribute('type', 'submit');
        headerBtn.setAttribute('class', 'section-order__header-btn');
        headerBtn.textContent = 'Заказать';


        let headerImg = document.createElement('img');
        headerImg.setAttribute('class', 'section-order__header-img');
        headerImg.setAttribute('src', './img/header-img.png');
        headerImg.setAttribute('width', '532')
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

        orderContainer.appendChild(cartPizza);
    });
});