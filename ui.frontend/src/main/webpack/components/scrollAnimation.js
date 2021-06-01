$(function () {
  Number.prototype.format = function (n) {
    var r = new RegExp("\\d(?=(\\d{3})+" + (n > 0 ? "\\." : "$") + ")", "g");
    return this.toFixed(Math.max(0, Math.floor(n))).replace(r, "$&,");
  };
  var scrollMagicController = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: 0,
      reverse: true,
      offset: 100,
      triggerHook: "onEnter",
    },
  });
  //Fade In Up
  $(".animate-fadeInUp").each(function (index, selector) {
    new ScrollMagic.Scene({ triggerElement: selector })
      .setClassToggle(selector, "js-active")
      .addTo(scrollMagicController);
  });
  //Flip Number
  $(".flip_numbers").each(function (index, selector) {
    new ScrollMagic.Scene({ triggerElement: selector })
      .on("enter", function () {
        $(".fadeIn").hide();
        $(".fadeOut").show();
        setTimeout(function () {
          $("." + selector.classList[0]).addClass("flip");
        }, 200);
        setTimeout(function () {
          $(".fadeOut").fadeOut(function () {
            $(".fadeIn").fadeIn();
          });
        }, 1200);
      })
      .on("leave", function () {
        $("." + selector.classList[0]).removeClass("flip");
      })
      .addTo(scrollMagicController);
  });
  //Number Increment
  new ScrollMagic.Scene({
    triggerElement: ".counter_number",
    duration: $(".counter_number").height(),
  })
    .on("enter", function () {
      $(".number").each(function () {
        var oldtext = $(this).data("count");
        $(this).text(oldtext);
        $(this)
          .prop("counter", 0)
          .animate(
            {
              counter: $(this).text(),
            },
            {
              duration: 10000,
              easing: "swing",
              step: function (step) {
                $(this).text("" + step.format());
              },
            }
          );
      });
    })
    .addTo(scrollMagicController);
});
