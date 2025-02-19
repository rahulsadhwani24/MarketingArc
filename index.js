const body = document.querySelector('.body');
const main = document.querySelector('.main');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');
const btnTop = document.querySelector('.back_to_top');
const btn_contact_section = document.querySelector('.btn_contact_section');
const ourProjects = document.querySelector('.our_projects');
const projects = document.querySelectorAll('.project');
let projectsArray = new Array;
let websiteSlides = new Array;
let desktopAppSlides = new Array;
let mobileAppSlides = new Array;
let websiteSlidesCount = 0;
let desktopAppSlidesCount = 0;
let mobileAppSlidesCount = 0;
const project_type_btns = document.querySelectorAll('.project_type_btn');
let project_type = document.querySelectorAll('.project_type');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let set_project_type = "All";
let temp;
let i;
var counter = 0;


projects.forEach(project => {
  project.style.display = "none";
  projectsArray.push(project);
  if(project.children[0].innerHTML == "Website"){
    websiteSlidesCount++;
  }
  else if(project.children[0].innerHTML == "Desktop App"){
    desktopAppSlidesCount++;
  }
  else if(project.children[0].innerHTML == "Mobile App"){
    mobileAppSlidesCount++;
  }
})
slider(projectsArray);

projects.forEach(function(project, index){
  if(project.children[0].innerHTML == "Website"){
    if(websiteSlides.length < websiteSlidesCount){ 
      websiteSlides.push(index);
    }
  }
  else if(project.children[0].innerHTML == "Desktop App"){
    if(desktopAppSlides.length < desktopAppSlidesCount){
      desktopAppSlides.push(index);
    }
  }
  else if(project.children[0].innerHTML == "Mobile App"){
    if(mobileAppSlides.length < mobileAppSlidesCount){
      mobileAppSlides.push(index);
    }
  }
})

project_type_btns.forEach(element => {
  element.addEventListener('click', () =>{
    project_type_btns.forEach(elem => {
      elem.classList.remove('active');
    })
    element.classList.add('active');

    temp = element.innerHTML;
    
    if(temp != "All"){
      set_project_type = temp.slice(0, -1);
      
      if(set_project_type == "Website"){
        counter = websiteSlides[0];
      }
      if(set_project_type == "Desktop App"){
        counter = desktopAppSlides[0];
      }
      if(set_project_type == "Mobile App"){
        counter = mobileAppSlides[0];
      }
      projects[counter].classList.add("Prev");
      projects[counter].classList.remove("Next");
    }
    
    else{
      set_project_type = "All";
      counter = 0;
      projects[counter].classList.remove("Prev");
      projects[counter].classList.add("Next");
    }
    projects.forEach(proj =>{
      proj.style.display = "none";
    })
    projects[counter].style.display = "flex";
  })
});

main.addEventListener('click',() => {
  if(menu.classList.contains("open")){
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
    main.classList.toggle('stopScroll');
  }
})

menu.addEventListener('click',() => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
    main.classList.toggle('stopScroll');
})

links.forEach(element => {
    element.addEventListener('click', () =>{
        links.forEach(elementt => {
          elementt.classList.remove('active-link');
        })
        element.classList.add('active-link');
        
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
        menu.classList.toggle('open');
        main.classList.remove('stopScroll');
    })
});

window.addEventListener('scroll', function() {
  remove_hash_from_url();
  if(!btnTop.classList.contains('active')){
    links.forEach(elementt => {
      elementt.classList.remove('active-link');
    })
    links[0].classList.add('active-link');
  }
  if(window.scrollY > 100){
    btnTop.classList.add('active');
  }
  else{
    btnTop.classList.remove('active');
  }
});

btnTop.addEventListener('click',()=> {
  links.forEach(element => {
    element.classList.remove('active-link');
  });
  links[0].classList.add('active-link');
});

btn_contact_section.addEventListener('click',()=> {
  links.forEach(element => {
    element.classList.remove('active-link');
  });
  links[links.length - 1].classList.add('active-link');
});


function CounterIncrement(){
  if(set_project_type == "Website"){
    if(counter > websiteSlides[websiteSlides.length-1]){
      counter = websiteSlides[0];
    }
  }
  else if(set_project_type == "Desktop App"){
    if(counter > desktopAppSlides[desktopAppSlides.length-1]){
      counter = desktopAppSlides[0];
    }
  }
  else if(set_project_type == "Mobile App"){
    if(counter > mobileAppSlides[mobileAppSlides.length-1]){
      counter = mobileAppSlides[0];
    }
  }
}

function counterDecrement(){
  if(set_project_type == "Website"){
    if(counter < 1){
      counter = websiteSlides.length;
    }
  }
  else if(set_project_type == "Desktop App"){
    if(counter < desktopAppSlides[0]+1){
      counter = desktopAppSlides[desktopAppSlides.length-1]+1;
    }
  }
  else if(set_project_type == "Mobile App"){
    if(counter < mobileAppSlides[0]+1){
      counter = mobileAppSlides[mobileAppSlides.length-1]+1;
    }
  }
}

function remove_hash_from_url() {
  var uri = window.location.toString();
  if (uri.indexOf("#") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("#"));
      window.history.replaceState({}, document.title, clean_uri);
  }
}

function slider(slides, backward = prev, forward = next){

  ourProjects.addEventListener('touchstart', function(e){
    touchStart = Math.floor(e.touches[0].clientX);
  })
  
  ourProjects.addEventListener('touchend', function(e){
    touchEnd = Math.floor(e.changedTouches[0].clientX);
    touchDifference = touchEnd - touchStart;
  
    if(touchDifference > 40){
      nextSlide(slides);
    }
  
    if(touchDifference < -40){
      previousSlide(slides);
    }
  })

  forward.addEventListener('click',()=>{
    nextSlide(slides);
	});
	
  backward.addEventListener('click',()=>{
    previousSlide(slides);
	});

  slides[counter].style.display = "flex";
}

function nextSlide(slides){
  counter++;
    CounterIncrement();
    
    slides.forEach(function(elem, index){
      elem.style.display = "none";
      elem.classList.remove("Prev");
      elem.classList.add("Next");
    })
		
		if(counter > slides.length-1){
			counter = 0;
		}
		slides[counter].style.display = "flex";
}

function previousSlide(slides){
  counterDecrement();
    if(counter < 1){
			counter = slides.length;
		}
		counter--;
    
    slides.forEach(elem => {
      elem.style.display = "none";
      elem.classList.remove("Next");
      elem.classList.add("Prev");
    })
		
		slides[counter].style.display = "flex";
}

let touchStart;
let touchEnd;
let touchDifference;

