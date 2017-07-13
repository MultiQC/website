/* JavaScript for the Docs page */

$(function () {

  // Don't try to guess language to highlight (gets it wrong most of the time)
  hljs.configure({languages: []});

  // Resize the ToC width so the width doesn't change on scroll
  $('.toc').width($('.toc_column').width());
  $(window).resize(function () {
    $('.toc').width($('.toc_column').width());
  });

  // Copy subnavigation ToC to headings for mobile
  $('.toc li').each(function(){
    var target = $(this).children('a').attr('href');
    var subnav = $(this).children('ul');
    if(target.length > 0 && subnav.length > 0){
      $(target).after('<div class="toc toc_mobile_subnav"><ul class="nav nav-stacked">'+subnav.html()+'</ul><p class="backtotop"><a href="#">Back to top</a></p></div>');
    }
  });

});