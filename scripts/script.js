const modalController= ({modal, btnOpen, btnClose}) => {
  const buttonElem = document.querySelector(btnOpen);
  const modalElem = document.querySelector(modal);
  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;

  const closeModal = event => {
    const target = event.target;
    if (target === modalElem || target.closest(btnClose) || event.code === 'Escape') {
      modalElem.style.opacity = '0';
    }

    setTimeout(() => {
      modalElem.style.visibility = 'hidden';
    }, 300);

    window.removeEventListener('keydown', closeModal) //нажатие клавиши
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = '1';
    window.addEventListener('keydown', closeModal)
  }

  buttonElem.addEventListener('click', openModal);
  modalElem.addEventListener('click', closeModal);
}

modalController({
  modal: '.modal',
  btnOpen: '.menu__order',
  btnClose: '.modal__close'
});

const items = document.querySelectorAll('.questions__block');
const buttons = document.querySelectorAll('.questions__button');
const textWrapper = document.querySelectorAll('.questions__text-wrapper');

const accordionController = (items, buttons, textWrapper) => {
  let heightWrapper = 0;
  textWrapper.forEach((elem) => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  })


  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < items.length; i += 1) {
        if (index === i) {
          textWrapper[i].style.height =
            items[i].classList.contains('questions__active') ?
              '' : `${heightWrapper}px`;
          items[i].classList.toggle('questions__active');
        } else {
          items[i].classList.remove('questions__active');
          textWrapper[i].style.height = '';
        }
      }
    });
  });
}

accordionController(items,buttons,textWrapper);

modalController({
  modal: '.modal',
  btnOpen: '.menu__order',
  btnClose: '.modal__close'
});//TODO доделать фиксацию сверху страницу и блюр фона

const menuIcon = document.querySelector('.menu__img-menu');
const menu = document.querySelector('.menu__nav-mobile');

const burgerMenu = (menuIcon, menu) => {
  window.addEventListener('resize', () => {
    if (document.documentElement.scrollWidth > 768) {
      closeMenu();
    }
  });

  menuIcon.addEventListener('click', () => {
    openMenu();
  });


  const openMenu = () => {
    menu.style.cssText = `
    opacity: 1;
    display: flex;
    `
    menuIcon.src = 'menu/img/close.svg';

    menuIcon.addEventListener('click', closeMenu)
  }


  const closeMenu = () => {
    menu.style.cssText = `
     opacity: 0;
     display: none;
    `
    menuIcon.src = 'menu/img/menu.svg';
    menuIcon.removeEventListener('click', closeMenu)
  }
}

burgerMenu(menuIcon, menu);




