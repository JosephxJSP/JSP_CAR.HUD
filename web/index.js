Progress(100, ".kmh-load-b");
Progress(100, ".engine-b");
Progress(100, ".fuel-b");

responsivescreen = () => {
  let innerWidth = window.innerWidth;
  let baseWidth = 1920;
  $(".hud").css("zoom", ((innerWidth / baseWidth) * 100) / 100);
};
window.addEventListener("resize", responsivescreen);

window.addEventListener("message", function (e) {
  switch(e.data.action) {
    case "open":
      $("body").show();
      $(".hud").removeClass("openr").addClass("open");
    break;

    case "close":
      $(".hud").addClass("openr").removeClass("open");
      $("#belt-sound")[0].pause();
      $("#belt-sound")[0].currentTime = 0;
    break;

    case "update":
      calculate.rpm(e.data.data.rpm);
      calculate.fuel(e.data.data.fuel);
      calculate.engine(e.data.data.engine);
      calculate.belt(e.data.data.isBelt);
      calculate.locked(e.data.data.isLocked);
      calculate.type(e.data.data.type);
      calculate.wheel(e.data.data.wheel1, e.data.data.wheel2, e.data.data.wheel3, e.data.data.wheel4);
      calculate.treeDx(e.data.data.steering);
      $("#kmh").html(e.data.data.speed);
      $("#num-gear").html(e.data.data.gear==0 ? "R" : e.data.data.gear);
    break;

    case "playSound":
      playsound(e.data.sound, e.data.volume);
    break;
  }
});

function Progress(percent, element) {
  var circle = document.querySelector(element);
  var radius = circle.r.baseVal.value;
  var circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;
}

playsound = function(filename, volume) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", `./sounds/${filename}`, false);
  xhr.send();

  if (xhr.status != "404") {
    var sound = new Audio('./sounds/' + filename);
    sound.volume = volume;
    sound.play();
  }
}