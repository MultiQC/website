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

});