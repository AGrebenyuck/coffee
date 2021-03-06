$(function(){

  $(window).scroll(function() {
    var height = $(window).scrollTop();
    
    if(height > 500){
      $('.header-top').addClass('header-top--fixed');
      $('.main').addClass('main--fixed');
    } else{
      $('.header-top').removeClass('header-top--fixed');
      $('.main').removeClass('main--fixed');
    }
  });

  $(".menu").on("click","a", function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),
		top = $(id).offset().top;
    
    $('.menu__list').toggleClass('menu__list--active');
		
		$('body,html').animate({scrollTop: top-125}, 1500);
	});

  $('.menu__btn').on('click', function(e){
    e.preventDefault();
    $('.menu__list').toggleClass('menu__list--active')
  });

  const testimonial = new Swiper('.testimonial__swiper', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 40,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          // renderFraction: function(current, total){
          //   return `<span class="${current}"></span>/<span class="${total}"></span> People`
          // },
          renderCustom: function (swiper, current, total) {
            return (current) + '/' + (total) + ' People';
          },
        }
      },
      1100: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          // renderFraction: function(current, total){
          //   return `<span class="${current}"></span>/<span class="${total}"></span> People`
          // },
          renderCustom: function (swiper, current, total) {
            return (current * 2) + '/' + (total * 2) + ' People';
          },
        }
      }
    }
  });

  $('.star').rateYo({
    starWidth: '16px',
    normalFill: 'transparent',
    ratedFill: '#C99E71',
    spacing: '6px',
    fullStar: true,
    starSvg: '<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99999 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L9.99999 14.8084L4.84999 17.5167L5.83332 11.7834L1.66666 7.72502L7.42499 6.88335L9.99999 1.66669Z" stroke="#C99E71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  });
  $('.star-testimonial').rateYo({
    starWidth: '20px',
    normalFill: '#101010',
    ratedFill: '#FAA61A',
    spacing: '4px',
    fullStar: true,
    starSvg: '<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill=""/></svg>'
  });

  // Dynamic Adapt v.1
  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // ???????????? ????????????????
    this.??bjects = [];
    this.daClassname = "_dynamic_adapt_";
    // ???????????? DOM-??????????????????
    this.nodes = document.querySelectorAll("[data-da]");

    // ???????????????????? ??bjects ????????????????
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const ??bject = {};
      ??bject.element = node;
      ??bject.parent = node.parentNode;
      ??bject.destination = document.querySelector(dataArray[0].trim());
      ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.??bjects.push(??bject);
    }

    this.arraySort(this.??bjects);

    // ???????????? ???????????????????? ??????????-????????????????
    this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    // ?????????????????????? ?????????????????? ???? ??????????-????????????
    // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
      const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, ??bjectsFilter);
      });
      this.mediaHandler(matchMedia, ??bjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < ??bjects.length; i++) {
        const ??bject = ??bjects[i];
        ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
        this.moveTo(??bject.place, ??bject.element, ??bject.destination);
      }
    } else {
      for (let i = 0; i < ??bjects.length; i++) {
        const ??bject = ??bjects[i];
        if (??bject.element.classList.contains(this.daClassname)) {
          this.moveBack(??bject.parent, ??bject.element, ??bject.index);
        }
      }
    }
  };

  // ?????????????? ??????????????????????
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // ?????????????? ????????????????
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  // ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
  // ???? ?????????????????????? ?????? this.type = min
  // ???? ???????????????? ?????? this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();
  
})