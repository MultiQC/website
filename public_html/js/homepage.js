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

  // Video switcher
  $('.video-chooser a').click(function(e){
    if($('#multiqc-video').is(':visible')){
      e.preventDefault();
      $('.video-chooser a').removeClass('active');
      $(this).addClass('active');
      $('#multiqc-video').attr('src', $(this).data('src'));
    }
  });
  // Video languages
  $('.video-chooser-lang-btn-group a').click(function (e) {
    e.preventDefault();
    $('.video-lang-buttons').hide();
    $($(this).attr('href')).show();
    $($(this).attr('href') + ' ul li:first a').trigger("click");
  });

  // iFrame demo window buttons
  $('#iframe_browser_buttons span:first-of-type, #iframe_browser_buttons span:nth-of-type(2)').click(function(e){
    $('#iframe_browser').slideUp();
  });
  $('#iframe_browser_buttons span:last-of-type').click(function(e){
    window.location = $('#iframe_browser iframe').attr('src');
  });

  // Switch report links / iFrame tab click
  $('.demo-chooser a, #iframe_browser_tabs li a').click(function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    $('#iframe_browser_tabs li, .demo-chooser a').removeClass('active');
    $('.demo-chooser a[href="'+href+'"]').addClass('active');
    $('#iframe_browser_tabs li a[href="'+href+'"]').parent().addClass('active');
    $('#iframe_browser iframe').attr('src', href);
    var descrip_id = $('.demo-chooser a.active').data('target');
    $('.demo-descriptions > div').hide();
    $(descrip_id).show();
  });

  // Load modal on page load if we have a location hash set
  if(window.location.hash){
    $(window.location.hash).modal('show');
  }

  // Modal hash links
  $('.modal').on('show.bs.modal', function(e){
    var id = $(this).attr('id');
    window.location.hash = id;
  });
  $('.modal').on('hide.bs.modal', function(e){
    history.replaceState(null, null, ' ');
  });

});
