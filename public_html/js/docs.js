/* JavaScript for the Docs page */

$(function () {
  
  // Stop toc from scrolling over the header
  // $(window).on('load resize scroll', function(e){
  //   if(window.innerWidth > '992'){
  //     var wTop = $(window).scrollTop();
  //     var hHeight = $('.header').height();
  //     var tocTop = hHeight - wTop + 80;
  //     if(tocTop > 50){
  //       $('#toc').css({'position':'fixed', 'top': tocTop});
  //     } else {
  //       $('#toc').css({'position':'fixed', 'top': '50px'});
  //     }
  //   } else {
  //     $('#toc').css({'position':'relative', 'top': '0'});
  //   }
  // });
  
  $('#toc').affix({
      offset: {
        top: 80
      }
});
  // $('body').scrollspy({
  //     target: '#toc',
  //     offset: 80
  // });
  // $('#toc').on('activate.bs.scrollspy', function () {
  //       $('body').scrollspy('refresh');
  //       console.log('refreshing')
  //   });
  // $('[data-spy="scroll"]').each(function () {
  //   var $spy = $(this).scrollspy('refresh')
  // });
});