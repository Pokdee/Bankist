const signUp = document.querySelectorAll('.btn--show-modal')
const crossBtn = document.querySelector('.btn--close-modal')
const instanceBtn = document.querySelectorAll('.operations__tab')
const operationsContent = document.querySelectorAll('.operations__content')
const slider = document.querySelector('.slider')
const slide = document.querySelectorAll('.slide')
const rightBtn = document.querySelector('.slider__btn--right')
const leftBtn = document.querySelector('.slider__btn--left')
const logINBtn = document.querySelector('.nav__log--in');

const overLay = document.querySelector('.cover');
const modalWindow = document.querySelector('.modal')
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const sectionSignup = document.querySelector('.section--sign-up');
const learnMore = document.querySelector('.btn--text');
const operations = document.querySelector('.operations')
const navigation = document.querySelector('.nav')
const header = document.querySelector('.header');
const headertitle = document.querySelector('.header__title')
const dotsContainer = document.querySelector('.dots');
const section1place = section1.getBoundingClientRect();
const headerplace = header.getBoundingClientRect();

const nav__childs = [...navigation.children];
const link = [...nav__childs[1].children].flatMap(
  ( (el) => [...el.children])
)
const links = [nav__childs[0],...link]


const closeModal = function () {
  modalWindow.classList.add("hidden")
  overLay.classList.add("hidden")
}

const openModal = function () {
  modalWindow.classList.remove("hidden")
  overLay.classList.remove("hidden")
}



const contentDisplay = function (num) {

  operationsContent.forEach(
    (el) => {
      if (el.classList.contains(`operations__content--${num}`)) {
      el.classList.add('operations__content--active')
      }
    }
  )

}



///////////////////////////////



signUp.forEach(
  (v) => v.addEventListener(
    'click', () => openModal()
  )
)

crossBtn.addEventListener(
  'click' , () => {closeModal()})

learnMore.addEventListener(
  'click' , () => scrollTo({
    left : 0,
    top : headerplace.bottom + 150,
    behavior : 'smooth'
  }))

document.querySelector('.nav__links').addEventListener(
  'click' , function (e) {
    e.preventDefault()
    
    if (e.target.classList.contains('nav__link')) {
      const id = document.querySelector(e.target.getAttribute('href'));
      id.scrollIntoView({behavior:'smooth'})
    }
  }
)

operations.addEventListener(
  'click' , function (e) {
    const target = e.target.closest('.operations__tab');
    
    instanceBtn.forEach(
      (el) => {
        //Match the target
        if (el === target) {

          //remove active from button
          instanceBtn.forEach( (el) => el.classList.remove('operations__tab--active') )

          //add active to target button
          if (!target.classList.contains('operations__tab--active')) {

            target.classList.add('operations__tab--active')     
          }

          //remove active from content
          operationsContent.forEach(
            (el) =>  el.classList.remove('operations__content--active')
          )

          //add active to target content
          if (target.classList.contains('operations__tab--1')) {
            contentDisplay(1)
          }
          if (target.classList.contains('operations__tab--2')) {
            contentDisplay(2)
          }
          if (target.classList.contains('operations__tab--3')) {
            contentDisplay(3)
          }

        }
      }
    )
  }
)       

link.forEach(
  (el) => {
    el.addEventListener(
      'mouseover' , (e) => {
        const target = e.target;
        target.style.opacity = '1';
        target.style.transition = '.3s'
        links.forEach(
          (el) => {
            if (el !== target) {
              el.style.opacity = '0.5';
              el.style.transition = '.3s'
            }
          }
        )
      }
    )
  }
)  

link.forEach(
  (el) => {
    el.addEventListener(
      'mouseout' , () => {
        links.forEach(
          (el) => {
            el.style.opacity = '1';
            el.style.transition = '.3s'
          }
        )
      }
    )
  }
)

////////////////////////

const navihigh = navigation.getBoundingClientRect().height;




const stickynav = function (e) {
  e.forEach(
    entry => {
      if (!entry.isIntersecting) {
        navigation.classList.add('sticky__nav');
        navigation.classList.add('sticky__nav--move')
        header.style.marginTop = `${navihigh + 40}px`
      }
      else{
        navigation.classList.remove('sticky__nav')
        header.style.marginTop = '0'
      }
    }
  )
}



const headerObserver = new IntersectionObserver(stickynav,{
  root : null , 
  threshold : 0,
  rootMargin:`-${navihigh}px`
})

headerObserver.observe(header)
////////////////////

const allSection = document.querySelectorAll('.section')

const revealer = function (e) {
  e.forEach( 
    entry => {
      
      if (!entry.isIntersecting) return
      entry.target.classList.remove('section--hidden');
      entry.target.classList.add('section--reveal');
      sectionObserver.unobserve(entry.target);
    }
  )
}

const sectionObserver = new IntersectionObserver(revealer , {
  root : null ,
  threshold : 0.1
})

allSection.forEach(
  (section) => {
   section.classList.add('section--hidden');
    sectionObserver.observe(section)
  }
)

//image lazy loading 

const image = document.querySelectorAll('.features__img')

const loadImage = function (e) {
  e.forEach(
    ety => {
      if (ety.isIntersecting) {
        const tarGet = ety.target ; 
        
        tarGet.src = tarGet.dataset.src;
        tarGet.addEventListener(
          'load' , function () {
            tarGet.classList.remove('lazy-img')
          }
        )

      
        imageObserver.unobserve(tarGet)
      }
    }
  )
}

const imageObserver = new IntersectionObserver(loadImage,{
  root : null , 
  threshold : 0,
  rootMargin : '200px'
})

image.forEach(
  img => {
    imageObserver.observe(img)
  }
)


/////////////
//Making dots and its activater
const dotsMaker = function () {
slide.forEach(
  (_,i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend' , `<button class = "dot dot-${i}"></button>`
)
}
)}
dotsMaker();
const dots = document.querySelectorAll('.dot')

const dotActivater = function (num) {
  dots.forEach((dot) => dot.classList.remove('active--dot'))
  dots[num].classList.add('active--dot')
}

//Go To slide
const goToSlide = function (slideNum) {
  
  slide.forEach(
    (img,i) => {
     img.style.transform = `translate(${100 * (i - slideNum)}%)`
     img.style.transition = '1s';
    dotActivater(slideNum)
    } 
  )
}


//Moving slide left & right 
let  curpic = 0 ;
//to right
const nextSlide = function () {
  curpic++;
  if (curpic > slide.length - 1) {
    curpic = 0
  }
  goToSlide(curpic)
}

//to Left 

const previousSlide = function () {
  curpic--;
  if (curpic < 0) {
    curpic = slide.length - 1
  }
  goToSlide(curpic)
}

goToSlide(0)

//controlling the sliding with fn

const sliding = function () {
rightBtn.addEventListener('click' ,nextSlide)

leftBtn.addEventListener('click' ,previousSlide)

document.addEventListener(
  'keydown' , (e) => {
    if (e.key === 'ArrowRight') return nextSlide();
    if (e.key === 'ArrowLeft') return previousSlide();
  }
)

dotsContainer.addEventListener(
  'click' , (e) => {
    const target = e.target;
    dots.forEach(
      (dot,i) => {
        if (dot === target) {
        goToSlide(i)
        }
      }
    )
  }
)
}

sliding();



logINBtn.addEventListener(
  'click' , () => {
    window.open('Bankist/index.html')
  }
)















































