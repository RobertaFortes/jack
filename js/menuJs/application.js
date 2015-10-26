// whole interaction shall stay here
var _$ = jQuery;


var heightDocument = _$('body').height();
var heightHeader = _$('#header').outerHeight();
var heightFooter = _$('#footer').outerHeight();

var heightWindow = _$(window).height();

function fluidHeightElement() {
  _$('.fluid-height, .modal-fluid .modal-content').css({
    height: heightDocument,
    minHeight: heightDocument
  });
}
function fluidHeightModal() {
  _$('.modal-fluid .modal-content, .modal-fluid .modal-figure, .modal-fluid-body').css({
    height: heightWindow,
    minHeight: heightWindow
  });
  // _$('.modal-open').css('overflow','hidden');
}


_$(document).ready(function() {
  fluidHeightElement();
  fluidHeightModal();

  _$('#link-global-menu').click(function() {
    _$(this).toggleClass('collapsed');

    _$('#content, #global-menu, #header, #footer, #cart-drop, #footer-payment').toggleClass('global-menu-opened');
    if(_$('#header').hasClass('global-menu-opened')) {
      _$('#access-global-menu').attr('data-title','Fechar');
    } else {
      _$('#access-global-menu').attr('data-title','Menu');
    }
  });

  _$('#tab-default .nav a').click(function (e) {
    e.preventDefault();
    _$(this).tab('show');
  });

  _$('.modal-push .close').click(function() {
    _$('.modal-push').slideUp();
    _$('#footer').removeClass('hidden-tmp');
  });


  _$('#modal-forgotpassword').on('shown.bs.modal', function (e) {
    _$(this).find('input').filter(':visible:first').focus();
  });


  _$('[data-toggle="tooltip"]').tooltip();

  _$('.content-disabled a, .content-disabled .btn, .content-disabled *').click(function(e) {
    e.preventDefault();
  });

  _$('.page-checkout #btn-signup').click(function(e) {
    e.preventDefault();
    _$('#content-acesse-sua-conta').slideUp();
    _$('#content-cadastro').slideDown();
    _$('#form-signup').find('input').filter(':visible:first').focus();

    _$('html, body').stop().animate({
            scrollTop: _$('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  _$('.page-checkout #btn-sign').click(function(e) {
    e.preventDefault();
    _$('#content-cadastro').slideUp();
    _$('#content-acesse-sua-conta').slideDown();
    _$('#form-login').find('input').filter(':visible:first').focus();

    _$('html, body').stop().animate({
            scrollTop: _$('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  _$('.page-checkout .jumbotron .nav a').click(function(e) {
    var _$anchor = _$(this);

    _$('html, body').stop().animate({
      scrollTop: _$(_$anchor.attr('href')).offset().top-100
    }, 1500,'easeInOutExpo');

    _$(this).parents('.nav').find('li').removeClass('active');
    _$(this).parents('li').toggleClass('active');

    e.preventDefault();
  });
});


_$(window).resize(function() {
  fluidHeightElement();
  fluidHeightModal();
});

_$(window).load(function() {
  _$('body').addClass('loaded');

  _$(".scroller-h").mCustomScrollbar({
    axis:"x",
    theme:"light-3",
    advanced:{autoExpandHorizontalScroll:true},
    contentTouchScroll: 25
  });
});

_$(window).bind('scroll', function() {
  var top = _$(this).scrollTop();
  var contentScroll = _$('body').offset().top;

  if(top > contentScroll + 100) {
    _$('#header').addClass('scrolled');
  } else {
    _$('#header').removeClass('scrolled');
  }
});

// --- Top Fixed
    


 _$(window).scroll(function () {
  console.log(_$(window).scrollTop())
  if (_$(window).scrollTop() > 100) {
    _$('#header').addClass('novosizeheader');
  }
  if (_$(window).scrollTop() < 100) {
    _$('#header').removeClass('novosizeheader');
    }
});

_$(document).ready(function(){
    _$("a.skip-cart").click(function(){
        _$("#cartpopup").toggle();
        _$('a.skip-cart').toggleClass('teste');
        

    });
});

_$(document).ready(function(){
    _$(".button.btn-cart").click(function(){
        _$("#fancybox-outer").hide();

         _$("#cartpopup").toggle();
        _$('a.skip-cart').toggleClass('teste');

       
        

    });
});


_$(document).ready(function(){
    _$("li.welcome-msg").click(function(){
        _$(".dropdown-menu").toggle();
        
        

    });
});









