// whole interaction shall stay here

var heightDocument = jQuery(document).height();
var heightHeader = jQuery('#header').outerHeight();
var heightFooter = jQuery('#footer').outerHeight();

var heightWindow = jQuery(window).height();

function fluidHeightElement() {
  jQuery('.fluid-height, .modal-fluid .modal-content').css({
    height: heightDocument,
    minHeight: heightDocument
  });
}
function fluidHeightModal() {
  jQuery('.modal-fluid .modal-content, .modal-fluid .modal-figure, .modal-fluid-body').css({
    height: heightWindow,
    minHeight: heightWindow
  });
  // jQuery('.modal-open').css('overflow','hidden');
}


jQuery(document).ready(function() {
  fluidHeightElement();
  fluidHeightModal();

  jQuery('#link-global-menu').click(function() {
    jQuery(this).toggleClass('collapsed');

    jQuery('#content, #global-menu, #header, #footer, #cart-drop, #footer-payment').toggleClass('global-menu-opened');
    if(jQuery('#header').hasClass('global-menu-opened')) {
      jQuery('#access-global-menu').attr('data-title','Fechar');
    } else {
      jQuery('#access-global-menu').attr('data-title','Menu');
    }
  });

  jQuery('#tab-default .nav a').click(function (e) {
    e.preventDefault();
    jQuery(this).tab('show');
  });

  jQuery('.modal-push .close').click(function() {
    jQuery('.modal-push').slideUp();
    jQuery('#footer').removeClass('hidden-tmp');
  });


  jQuery('#modal-forgotpassword').on('shown.bs.modal', function (e) {
    jQuery(this).find('input').filter(':visible:first').focus();
  });


  jQuery('[data-toggle="tooltip"]').tooltip();

  jQuery('.content-disabled a, .content-disabled .btn, .content-disabled *').click(function(e) {
    e.preventDefault();
  });

  jQuery('.page-checkout #btn-signup').click(function(e) {
    e.preventDefault();
    jQuery('#content-acesse-sua-conta').slideUp();
    jQuery('#content-cadastro').slideDown();
    jQuery('#form-signup').find('input').filter(':visible:first').focus();

    jQuery('html, body').stop().animate({
            scrollTop: jQuery('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  jQuery('.page-checkout #btn-sign').click(function(e) {
    e.preventDefault();
    jQuery('#content-cadastro').slideUp();
    jQuery('#content-acesse-sua-conta').slideDown();
    jQuery('#form-login').find('input').filter(':visible:first').focus();

    jQuery('html, body').stop().animate({
            scrollTop: jQuery('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  jQuery('.page-checkout .jumbotron .nav a').click(function(e) {
    var jQueryanchor = jQuery(this);

    jQuery('html, body').stop().animate({
      scrollTop: jQuery(jQueryanchor.attr('href')).offset().top-100
    }, 1500,'easeInOutExpo');

    jQuery(this).parents('.nav').find('li').removeClass('active');
    jQuery(this).parents('li').toggleClass('active');

    e.preventDefault();
  });
});


jQuery(window).resize(function() {
  fluidHeightElement();
  fluidHeightModal();
});

jQuery(window).load(function() {
  jQuery('body').addClass('loaded');

  jQuery(".scroller-h").mCustomScrollbar({
    axis:"x",
    theme:"light-3",
    advanced:{autoExpandHorizontalScroll:true},
    contentTouchScroll: 25
  });
});

jQuery(window).bind('scroll', function() {
  var top = jQuery(this).scrollTop();
  var contentScroll = jQuery('body').offset().top;

  if(top > contentScroll + 100) {
    jQuery('#header').addClass('scrolled');
  } else {
    jQuery('#header').removeClass('scrolled');
  }
});
