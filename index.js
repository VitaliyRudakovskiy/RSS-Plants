console.log('Score: 90 / 100');

const burger = document.querySelector('.burger-menu');
const popup = document.querySelector('.popup');
const menu = document.querySelector('.nav-menu').cloneNode(1);
const body = document.body;
const links = Array.from(menu.children);

burger.addEventListener('click', burgerHandler);
links.forEach((l) => l.addEventListener('click', closePopup));
popup.addEventListener('click', closePopup);

function burgerHandler(e) {
    e.preventDefault();
    popup.classList.toggle('open');
    burger.classList.toggle('active');
    body.classList.toggle('noscroll');
    renderPopup();
}

function renderPopup() {
    popup.appendChild(menu);
    menu.classList.remove('nav-menu');
    menu.classList.add('nav-menu-mod');
}

function closePopup () {
    popup.classList.remove('open');
    burger.classList.remove('active');
    body.classList.remove('noscroll');
}

//services blur effect

let serviceButtons = document.querySelectorAll('.service-btn');
let serviceCards = document.querySelectorAll('.service-item');

serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('clicked');

        let activeCards = document.querySelectorAll('.service-btn.clicked');
        let activeCardsId = [];

        for (let id of activeCards) {
            activeCardsId.push(id.getAttribute('id'));
        }

        serviceCards.forEach((card) => {
            if (card.getAttribute('class').includes('blur')) {
                card.classList.toggle('blur');
            }
            if(!activeCardsId.includes(card.getAttribute('class').split(' ')[1])) {
                card.classList.toggle('blur');
            }
            if (activeCardsId.length == 0) {
                card.classList.toggle('blur');
            }
        });

        if(activeCards.length === 2) {
            serviceButtons.forEach((e) => {
                if(!e.classList.contains('clicked')) {
                    e.setAttribute('disabled', true);
                }
            });
        }
        else {
            const noActiveService = document.querySelector('.service-btn:disabled');
            if (noActiveService) {
                noActiveService.removeAttribute('disabled');
            }
        }
    });
});

//prices section

let button = document.getElementsByClassName('open-list-button');
let rectangle = document.getElementsByClassName('rectangle');
let prices = document.getElementsByClassName('prices-item');
let priceInfo = document.getElementsByClassName('prices__item-hidden');
let pricesItem = document.querySelector('.prices-items');

const isActive = (number) => {
    if (button[number].classList.contains('open')) return false;
        for (let i = 0; i < button.length; i++) {
            if (button[i].classList.contains('open')) {
                button[i].classList.remove('open');
                prices[i].classList.remove('open');
                rectangle[i].classList.remove('open');
                pricesItem.classList.toggle('open');
                priceInfo[i].style.visibility = 'hidden';
                break;
            }
        }
    return false;
};
  
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', () => {
        if (!isActive(i)) {
            button[i].classList.toggle('open');
            prices[i].classList.toggle('open');
            rectangle[i].classList.toggle('open');
            pricesItem.classList.toggle('open');
            if (priceInfo[i].style.visibility == 'visible') {
                priceInfo[i].style.visibility = 'hidden';
            }      
            else {
                priceInfo[i].style.visibility = 'visible';
            }
        }
    });
}

//contacts dropdown list

const dropdownCityButton = document.querySelector('.rect-btn');
const dropdownCityButtonText = document.querySelector('.rect-text');
const dropdownCityList = document.querySelector('.dropdown__city-list');
const arrowDown = document.querySelector('.contacts__arrow-down');

dropdownCityButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownCityButton.classList.toggle('active');
    dropdownCityList.classList.toggle('active');
    arrowDown.classList.toggle('active');
});

const listItem = document.querySelectorAll('.dropdown__city-list-item');
const cityCard = document.getElementsByClassName('city-card');

listItem.forEach((item, index) => {
    item.addEventListener('click', () => {
        dropdownCityButtonText.innerText = item.innerText;
        dropdownCityButton.classList.remove('selected');
        dropdownCityButton.classList.toggle('selected');
        arrowDown.classList.remove('active');
        closeWindows(index);
    });
});

const closeWindows = (index) => {
    for (let i = 0; i < cityCard.length; i++) {
        if (index === i) cityCard[i].style.display = 'block';
        else cityCard[i].style.display = 'none';
    }
};

//скрытие выпадающего списка при клике вне его области

document.addEventListener('click', function (e) {
    if (e.target !== dropdownCityButton) {
        dropdownCityList.classList.remove('active');
        dropdownCityButton.classList.remove('active');
    }
});