
const select = (el, all = false) => {
    el = el.trim()
    if(all){
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
}

const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

//Typing Effect
const typed = document.querySelector('.typed')
if (typed){
    let typed_string = typed.getAttribute('data-typed-items')
    typed_string = typed_string.split(',')
    new Typed('.typed', {
        strings: typed_string,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDeplay: 2000
    });
}

//scroll to
let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash) 
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
}

//progressBar effect    
let skillsContent = document.querySelector('.skills_section_content')
if (skillsContent)
{
    new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function(direction){
            let progress = document.querySelectorAll('.progress .progress-bar', true);
            progress.forEach((el) => {
                el.style.width = el.getAttribute('aria-valuenow') + '%'
            });
        }
    })
}

//portfolio filter
window.addEventListener('load', () => {
    let portfolioContainer = document.querySelector('.portfolio_container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio_item'
        });

        let portfolioFilters = document.querySelectorAll('#portfolio_filter li');

        portfolioFilters.forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (filter) {
                    filter.classList.remove('filter_active');
                });
                this.classList.add('filter_active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function () {
                    AOS.refresh();
                });
            });
        });
    }
});

const portfolioLightbox = GLightbox({
    selector: '.portfolio_box'
});

new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
});
//slide show
new Swiper('.testimotionals_silde_show', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

//scroll animate
window.addEventListener('load', () =>{
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    })
})

//back to top
let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
}

//mobile navbar_icon
on('click', '.mobile-nav-icon', function(e) {
    select('body').classList.toggle('nav_menu-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
})

on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('nav_menu-active')) {
        body.classList.remove('nav_menu-active')
        let navbarToggle = select('.mobile-nav-icon')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
}, true)
window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
});

new PureCounter();