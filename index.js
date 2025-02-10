const hamburger = document.querySelector('.hamburger');
const logo = document.querySelector('.logo');
const body = document.querySelector('.body');
const menu = document.querySelector('.menu');
const btn_contact_section = document.querySelector('.btn_contact_section');
const nav = document.querySelector('.nav-links');
const btnTop = document.querySelector('.back_to_top');
const links = document.querySelectorAll('.nav-links li a');
const project_type_btns = document.querySelectorAll('.project_type_btn');

menu.addEventListener('click',() => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
})

project_type_btns.forEach(element => {
    var project_type = element.innerHTML;
    element.addEventListener('click', () =>{
        project_type_btns.forEach(elementt => {
            elementt.classList.remove('active');
        })
        element.classList.add('active');
    })
});

window.addEventListener('scroll', function(e) {
    const lastPosition = window.scrollY
    if (lastPosition > 60 ) {
      nav.classList.add('active');
      hamburger.classList.add('active');
      btnTop.classList.add('active');
    } else if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      btnTop.classList.remove('active');
    } else {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      btnTop.classList.remove('active');
    }
  });

  window.addEventListener('scroll', function(e) {
    const lastPosition = window.scrollY
    if (lastPosition < 50 ) {
      links.forEach(element => {
        element.classList.remove('active-link');
        links[0].classList.add('active-link');
      });
    }
  });

  links.forEach(element => {
    element.addEventListener('click', () =>{
        links.forEach(elementt => {
            elementt.classList.remove('active-link');
        })
        element.classList.add('active-link');
    })
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

btnTop.addEventListener('click',()=> {
  links.forEach(element => {
    element.classList.remove('active-link');
    links[0].classList.add('active-link');
  });
});

btn_contact_section.addEventListener('click',()=> {
  links.forEach(element => {
    element.classList.remove('active-link');
    links[links.length - 1].classList.add('active-link');
  });
});