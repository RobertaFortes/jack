// whole interaction shall stay here

var heightDocument = $(document).height();
var heightHeader = $('#header').outerHeight();
var heightFooter = $('#footer').outerHeight();

var heightWindow = $(window).height();

function fluidHeightElement() {
  $('.fluid-height, .modal-fluid .modal-content').css({
    height: heightDocument,
    minHeight: heightDocument
  });
}
function fluidHeightModal() {
  $('.modal-fluid .modal-content, .modal-fluid .modal-figure, .modal-fluid-body').css({
    height: heightWindow,
    minHeight: heightWindow
  });
  // $('.modal-open').css('overflow','hidden');
}


$(document).ready(function() {
  fluidHeightElement();
  fluidHeightModal();

  $('#link-global-menu').click(function() {
    $(this).toggleClass('collapsed');

    $('#content, #global-menu, #header, #footer, #cart-drop, #footer-payment').toggleClass('global-menu-opened');
    if($('#header').hasClass('global-menu-opened')) {
      $('#access-global-menu').attr('data-title','Fechar');
    } else {
      $('#access-global-menu').attr('data-title','Menu');
    }
  });

  $('#tab-default .nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('.modal-push .close').click(function() {
    $('.modal-push').slideUp();
    $('#footer').removeClass('hidden-tmp');
  });


  $('#modal-forgotpassword').on('shown.bs.modal', function (e) {
    $(this).find('input').filter(':visible:first').focus();
  });


  $('[data-toggle="tooltip"]').tooltip();

  $('.content-disabled a, .content-disabled .btn, .content-disabled *').click(function(e) {
    e.preventDefault();
  });

  $('.page-checkout #btn-signup').click(function(e) {
    e.preventDefault();
    $('#content-acesse-sua-conta').slideUp();
    $('#content-cadastro').slideDown();
    $('#form-signup').find('input').filter(':visible:first').focus();

    $('html, body').stop().animate({
            scrollTop: $('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  $('.page-checkout #btn-sign').click(function(e) {
    e.preventDefault();
    $('#content-cadastro').slideUp();
    $('#content-acesse-sua-conta').slideDown();
    $('#form-login').find('input').filter(':visible:first').focus();

    $('html, body').stop().animate({
            scrollTop: $('#content-acesse-sua-conta').offset().top-200
        }, 1500,'easeInOutExpo');
  });

  $('.page-checkout .jumbotron .nav a').click(function(e) {
    var $anchor = $(this);

    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top-100
    }, 1500,'easeInOutExpo');

    $(this).parents('.nav').find('li').removeClass('active');
    $(this).parents('li').toggleClass('active');

    e.preventDefault();
  });
});


$(window).resize(function() {
  fluidHeightElement();
  fluidHeightModal();
});

$(window).load(function() {
  $('body').addClass('loaded');

  $(".scroller-h").mCustomScrollbar({
    axis:"x",
    theme:"light-3",
    advanced:{autoExpandHorizontalScroll:true},
    contentTouchScroll: 25
  });
});

$(window).bind('scroll', function() {
  var top = $(this).scrollTop();
  var contentScroll = $('body').offset().top;

  if(top > contentScroll + 100) {
    $('#header').addClass('scrolled');
  } else {
    $('#header').removeClass('scrolled');
  }
});
