/* JavaScript for the Homepage */

$(function () {
  
  // Switch the installation instruction type
  $('.install-switcher .btn').click(function(e){
     e.preventDefault();
     $('#quick_install pre').hide();
     $( $(this).attr('href') ).show();
     $('.install-switcher .btn').removeClass('active');
     $(this).addClass('active');
  });
  
  // iFrame demo window buttons
  $('#iframe_browser_buttons span:first-of-type, #iframe_browser_buttons span:nth-of-type(2)').click(function(e){
    $('#iframe_browser').slideUp();
    $('#mqc_homepage .header').animate({'margin-bottom': 30})
    $('#mqc_homepage').removeClass('hasDemoiFrame');
  });
  $('#iframe_browser_buttons span:last-of-type').click(function(e){
    window.location = $('#iframe_browser iframe').attr('src');
  });
  
  // iFrame demo tabs
  $('#iframe_browser_tabs li a').click(function(e){
    e.preventDefault();
    $('#iframe_browser_tabs li').removeClass('active');
    $(this).parent().addClass('active');
    $('#iframe_browser iframe').attr('src', $(this).attr('href'));
  });
});