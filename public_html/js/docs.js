/* JavaScript for the Docs page */

// JQuery function for adding IDs to 
// https://github.com/ghiculescu/jekyll-table-of-contents
(function($){

  // Add ID elements
  // http://stackoverflow.com/questions/4146306/set-header-id-attribute-from-content-with-javascript
  $('h1, h2').each(function() {
      var hyphenated = $(this).text().replace(/\s/g,'-').toLowerCase();
      $(this).attr('id',hyphenated);
    }
  );

  $.fn.toc = function(options) {
    var defaults = {
      noBackToTopLinks: false,
    },
    settings = $.extend(defaults, options);

    var headers = $('h1, h2').filter(function() {
      // get all headers with an ID
      return this.id;
    }), output = $(this);
    if (!headers.length || headers.length < 3 || !output.length) {
      return;
    }

    var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10); }
    var highest_level = headers.map(function(_, ele) { return get_level(ele); }).get().sort()[0];
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    var level = get_level(headers[0]),
      this_level,
      html = ' <ul>';
    headers.on('click', function() {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
    .addClass('clickable-header')
    .each(function(_, header) {
      this_level = get_level(header);
      if (!settings.noBackToTopLinks && this_level === highest_level) {
        $(header).addClass('top-level-header').after(return_to_top);
      }
      if (this_level === level) // same level as before; same indenting
        html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      else if (this_level < level) // higher level than before; end parent ol
        html += "</li></ul></li><li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      else if (this_level > level) // lower level than before; expand the previous to contain a ol
        html += "<ul><li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      level = this_level; // update for the next one
    });
    html += "</ul>";
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function() {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }
    output.html(html);
  };
})(jQuery);



// Now use this function to make the ToC
$(document).ready(function() {
	// Table of contents
  $('#toc').toc();
  // $('.toc ul ul li').hide();
  
  // $('body').scrollspy({
  //     target: '#toc',
  //     offset: 40
  // });
});