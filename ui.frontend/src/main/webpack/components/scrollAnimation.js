$(function () {
  var scrollMagicController = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: 0,
      reverse: true,
      offset: 100,
      triggerHook: "onEnter",
    },
  });
  $(".animate-fadeInUp").each(function (index, selector) {
    new ScrollMagic.Scene({ triggerElement: selector })
      .setClassToggle(selector, "js-active")
      .addTo(scrollMagicController);
  });

  new ScrollMagic.Scene({
    triggerElement: ".counter_number",
    duration: $(".counter_number").height(),
  })
    .on("enter", function () {
      $(".number").each(function () {
        var oldtext = $(this).text();
        $(this).text(oldtext.replace(/,/g, ""));
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

  Number.prototype.format = function (n) {
    var r = new RegExp("\\d(?=(\\d{3})+" + (n > 0 ? "\\." : "$") + ")", "g");
    return this.toFixed(Math.max(0, Math.floor(n))).replace(r, "$&,");
  };
});
