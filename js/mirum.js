const Mirum = () => {
  const ANIMATION_DURATION = 2000;
  const messageElements = ".mirum-imessage, .left-speech-bubble, .mirum-typing";
  let hasSkipped = false;
  return {
    init: () => {
      $(messageElements).addClass(
        "mirum-transition-all mirum-max-height mirum-hide"
      );
      $(".mirum-skip-btn").click(() => {
        hasSkipped = true;
        $(".mirum-input-field").addClass("mirum-hide");
        $(messageElements).removeClass("mirum-hide");
        $(".mirum-typing").addClass("mirum-hide");
      });
    },
    startAnim: () => {
      if (hasSkipped) {
        return false;
      }
      $(".mirum-input-field").addClass("mirum-hide");

      //Add a staggered delay to each element
      $("body")
        .find(messageElements)
        .each((index, element) => {
          let animationDelay = index * ANIMATION_DURATION;
          setTimeout(() => {
            if (hasSkipped) {
              return;
            }
            $(element).removeClass("mirum-hide");
            $(element).addClass("animate__animated animate__fadeInUp");

            //If the element is a typing indicator, fadeOut after 1 second
            if ($(element).hasClass("mirum-typing")) {
              setTimeout(() => {
                $(element).addClass("mirum-hide");
              }, ANIMATION_DURATION);
            }
          }, animationDelay);
        });
    },
  };
};

var mirum = Mirum();
mirum.init();

//Start the anims after the initial typed text is done
$(".typedjs-simple").each((i, e) => {
  let text = e.innerHTML + "";
  e.innerHTML = ""; //Clear it before starting otherwise creates issues
  //Only types strings one time
  var typed = new Typed(e, {
    strings: [text],
    typeSpeed: 50, // typing speed
    backSpeed: 50, // erasing speed
    onComplete: () => setTimeout(mirum.startAnim, 1000),
  });
});
