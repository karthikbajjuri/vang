$(function () {
  //Smooth Scroll to Section On Page load
  function scrollOnPageLoad() {
    if (window.location.hash) scroll(0, 0);
    setTimeout(scroll(0, 0), 1);
    var hashLink = window.location.hash;
    if ($(hashLink).length) {
      $(function () {
        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top,
          },
          3000
        );
      });
    }
  }
  scrollOnPageLoad();
  //Desktop Navigation
  if ($(".cmp-inPagenavigation").length) {
    $(document).on("click", ".cmp-inPagenavigation__lists a", function (e) {
      var selectedText = $(this).text();
      var $hash = $(this.hash);
      $(".selected-text").text(selectedText);
      if (
        this.pathname == window.location.pathname &&
        this.protocol == window.location.protocol &&
        this.host == window.location.host &&
        $(this).attr("href") != "#"
      ) {
        $("body,html").animate(
          {
            scrollTop: $hash.offset().top,
          },
          800
        );
        e.preventDefault();
      }
    });
    //Mobile Dropdown
    $(document).on("click", ".selected-text", function () {
      if ($(this).parent().hasClass("open")) {
        $(this).parent().removeClass("open");
        $(this).next().slideUp();
      } else {
        $(".cmp-inPagenavigation .nav").removeClass("open");
        $(".cmp-inPagenavigation .nav ul").slideUp();
        $(this).parent().addClass("open");
        $(this).next().slideDown();
      }
    });
    //Dropdown hide when click on body
    $(document).on("touchstart", function (event) {
      var $trigger = $(".cmp-inPagenavigation");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".cmp-inPagenavigation__lists").slideUp();
        $(".nav").removeClass("open");
      }
    });

    $(window).on("load resize", function () {
      if ($(window).width() >= 991) {
        //Desktop
        $(".cmp-inPagenavigation__lists").removeAttr("style");
        $(".cmp-inPagenavigation .nav").removeClass("open");
      }
    });

    $("a[href^='#']").on('click', function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop : $(this.hash).offset().top
            }, 800);
        });
  }
});
