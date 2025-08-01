(function() {
  "use strict";

  // Utility functions
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const addEvent = (el, event, fn) => el?.addEventListener(event, fn);
  const toggleClass = (el, className) => el?.classList.toggle(className);
  const addClass = (el, className) => el?.classList.add(className);
  const removeClass = (el, className) => el?.classList.remove(className);

  // Scroll utilities
  const toggleScrolled = () => {
    const body = $('body');
    const header = $('#header');
    if (!header?.classList.contains('scroll-up-sticky') && !header?.classList.contains('sticky-top') && !header?.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? addClass(body, 'scrolled') : removeClass(body, 'scrolled');
  };

  const toggleScrollTop = () => {
    const scrollTop = $('.scroll-top');
    if (scrollTop) {
      window.scrollY > 100 ? addClass(scrollTop, 'active') : removeClass(scrollTop, 'active');
    }
  };

  // Mobile nav
  const mobileNavToggle = () => {
    toggleClass($('body'), 'mobile-nav-active');
    const btn = $('.mobile-nav-toggle');
    toggleClass(btn, 'bi-list');
    toggleClass(btn, 'bi-x');
  };

  // Event listeners
  addEvent(document, 'scroll', toggleScrolled);
  addEvent(window, 'load', toggleScrolled);
  addEvent($('.mobile-nav-toggle'), 'click', mobileNavToggle);
  addEvent($('.scroll-top'), 'click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  addEvent(window, 'load', toggleScrollTop);
  addEvent(document, 'scroll', toggleScrollTop);

  // Hide mobile nav on same-page links
  $$('#navmenu a').forEach(link => {
    addEvent(link, 'click', () => {
      if ($('body').classList.contains('mobile-nav-active')) mobileNavToggle();
    });
  });

  // Toggle dropdowns
  $$('.navmenu .toggle-dropdown').forEach(dropdown => {
    addEvent(dropdown, 'click', function(e) {
      e.preventDefault();
      toggleClass(this.parentNode, 'active');
      toggleClass(this.parentNode.nextElementSibling, 'dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // FAQ toggles
  $$('.faq-item h3, .faq-item .faq-toggle').forEach(faq => {
    addEvent(faq, 'click', () => toggleClass(faq.parentNode, 'faq-active'));
  });

  // Initialize libraries
  addEvent(window, 'load', () => {
    AOS?.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    new PureCounter();
    GLightbox?.({ selector: '.glightbox' });
  });

  // Isotope layout
  $$('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item', layoutMode: layout, filter, sortBy: sort
      });
    });

    $$('.isotope-filters li', isotopeItem).forEach(filter => {
      addEvent(filter, 'click', function() {
        removeClass(isotopeItem.querySelector('.isotope-filters .filter-active'), 'filter-active');
        addClass(this, 'filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        AOS?.init();
      });
    });
  });

  // Swiper sliders
  addEvent(window, 'load', () => {
    $$('.init-swiper').forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector('.swiper-config').innerHTML.trim());
      swiperElement.classList.contains('swiper-tab') ? 
        initSwiperWithCustomPagination(swiperElement, config) : 
        new Swiper(swiperElement, config);
    });
  });

  // Hash link scrolling
  addEvent(window, 'load', () => {
    if (window.location.hash && $(window.location.hash)) {
      setTimeout(() => {
        const section = $(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  // Navmenu scrollspy
  const navmenuScrollspy = () => {
    $$('.navmenu a').forEach(link => {
      if (!link.hash) return;
      const section = $(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        $$('.navmenu a.active').forEach(activeLink => removeClass(activeLink, 'active'));
        addClass(link, 'active');
      } else {
        removeClass(link, 'active');
      }
    });
  };

  addEvent(window, 'load', navmenuScrollspy);
  addEvent(document, 'scroll', navmenuScrollspy);

})(); 