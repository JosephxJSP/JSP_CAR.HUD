let calculate = {}

calculate.rpm = function(rpmx) {
  let numberAsString = String(rpmx);
  let firstDigitAsString = numberAsString[0];
  let rpm = firstDigitAsString;
  if (Math.round(rpm * 10) >= 85 ) {
    $("#mile").css("stroke","#ff5555");
    $("#mile").css("filter","drop-shadow(0 0 0.1rem #ff5555)");
    $("#mile").css("animation", "none");
    Progress(Math.round(rpm * 10), ".kmh-load");
  } else if ( Math.round(rpm * 10) >= 65 && Math.round(rpm * 10) < 85) {
    $("#mile").css("stroke","#ffe555");
    $("#mile").css("animation", "none");
    $("#mile").css("filter","drop-shadow(0 0 0.1rem #ffe555)");
    Progress(Math.round(rpm * 10), ".kmh-load");
  } else if ( Math.round(rpm * 10) == 10) {
    $("#mile").css("animation", "red 0.1s infinite");
    Progress(100, ".kmh-load");
  }else {
    $("#mile").css("animation", "none");
    $("#mile").css("stroke","#ffffff");
    $("#mile").css("filter","drop-shadow(0 0 0.1rem #ffffff)");
    Progress(Math.round(rpm * 10), ".kmh-load");
  }
}

calculate.fuel = function(fuel) {
  if (fuel >= 95) {
    Progress(37, ".fuel");
  } else if (fuel >= 90) {
    Progress(35, ".fuel");
  } else if (fuel >= 85) {
    Progress(34, ".fuel");
  } else if (fuel >= 80) {
    Progress(33, ".fuel");
  } else if (fuel >= 75) {
    Progress(32, ".fuel");
  } else if (fuel >= 70) {
    Progress(31, ".fuel");
  } else if (fuel >= 65) {
    Progress(29, ".fuel");
  } else if (fuel >= 60) {
    Progress(27, ".fuel");
  } else if (fuel >= 55) {
    Progress(26, ".fuel");
  } else if (fuel >= 50) {
    Progress(25, ".fuel");
  } else if (fuel >= 45) {
    Progress(23, ".fuel");
  } else if (fuel >= 40) {
    Progress(22.5, ".fuel");
  } else if (fuel >= 35) {
    Progress(21, ".fuel");
  } else if (fuel >= 30) {
    Progress(20.5, ".fuel");
  } else if (fuel >= 25) {
    Progress(19, ".fuel");
  } else if (fuel >= 20) {
    Progress(18.5, ".fuel");
  } else if (fuel >= 15) {
    Progress(18, ".fuel");
  } else if (fuel >= 10) {
    Progress(17, ".fuel");
  } else if (fuel >= 5) {
    Progress(15, ".fuel");
  } else if (fuel < 5) {
    Progress(10, ".fuel");
  }
}

calculate.engine = function(engine) {
  if (engine >= 95) {
    Progress(37, ".engine");
  } else if (engine >= 90) {
    Progress(35, ".engine");
  } else if (engine >= 85) {
    Progress(34, ".engine");
  } else if (engine >= 80) {
    Progress(33, ".engine");
  } else if (engine >= 75) {
    Progress(32, ".engine");
  } else if (engine >= 70) {
    Progress(31, ".engine");
  } else if (engine >= 65) {
    Progress(29, ".engine");
  } else if (engine >= 60) {
    Progress(27, ".engine");
  } else if (engine >= 55) {
    Progress(26, ".engine");
  } else if (engine >= 50) {
    Progress(25, ".engine");
  } else if (engine >= 45) {
    Progress(23, ".engine");
  } else if (engine >= 40) {
    Progress(22.5, ".engine");
  } else if (engine >= 35) {
    Progress(21, ".engine");
  } else if (engine >= 30) {
    Progress(20.5, ".engine");
  } else if (engine >= 25) {
    Progress(19, ".engine");
  } else if (engine >= 20) {
    Progress(18.5, ".engine");
  } else if (engine >= 15) {
    Progress(18, ".engine");
  } else if (engine >= 10) {
    Progress(17, ".engine");
  } else if (engine >= 5) {
    Progress(15, ".engine");
  } else if (engine < 5) {
    Progress(10, ".engine");
  }
}

calculate.belt = function(isBelt) {
  if (isBelt) {
    $("#belt").removeClass("pp");
    $("#belt-sound")[0].pause();
    $("#belt-sound")[0].currentTime = 0;
  } else {
    $("#belt").addClass("pp");
    $("#belt-sound")[0].play();
    $("#belt-sound")[0].volume = 0.1;
  }
}

calculate.locked = function(isLocked) {
  if (isLocked == 2) {
    $("#lock").removeClass("pp");
  } else {
    $("#lock").addClass("pp");
  }
}

calculate.treeDx = function(steering) {
  if (steering < -1) {
    $(".hud").removeClass("left-turn");
    $(".hud").addClass("right-turn");
  } else if (steering > 1) {
    $(".hud").removeClass("right-turn");
    $(".hud").addClass("left-turn");
  } else {
    $(".hud").removeClass("left-turn");
    $(".hud").removeClass("right-turn");
  }
}

calculate.type = function(type) {
  if (type == 1 || type == 4) {
    $("#wheel").hide();
    $("#wheel2").hide();
    $("#wheel3").hide();
    $("#wheel4").hide();
    $("#belt-sound")[0].pause();
  } else if (type == 2) {
    $("#wheel").hide();
    $("#wheel2").hide();
    $("#wheel3").hide();
    $("#wheel4").hide();
    $("#belt-sound")[0].pause();
  } else if (type == 3) {
    $("#wheel").hide();
    $("#wheel2").hide();
    $("#wheel3").hide();
    $("#wheel4").hide();
    $("#belt-sound")[0].pause();
  } else {
    $("#wheel").show();
    $("#wheel2").show();
    $("#wheel3").show();
    $("#wheel4").show();
  }
}

calculate.wheel = function(wheel1, wheel2, wheel3, wheel4) {
  if (wheel1 == 0) {
    $("#wheel").attr("src", "img/wheel.png");
  } else if (wheel1 == 1) {
    $("#wheel").attr("src", "img/wheel_pink.png");
  } else if (wheel1 == 2) {
    $("#wheel").attr("src", "img/wheel_red.png");
  }

  if (wheel2 == 0) {
    $("#wheel2").attr("src", "img/wheel4.png");
  } else if (wheel2 == 1) {
    $("#wheel2").attr("src", "img/wheel_pink4.png");
  } else if (wheel2 == 2) {
    $("#wheel2").attr("src", "img/wheel_red4.png");
  }

  if (wheel3 == 0) {
    $("#wheel3").attr("src", "img/wheel2.png");
  } else if (wheel3 == 1) {
    $("#wheel3").attr("src", "img/wheel_pink2.png");
  } else if (wheel3 == 2) {
    $("#wheel3").attr("src", "img/wheel_red2.png");
  }

  if (wheel4 == 0) {
    $("#wheel4").attr("src", "img/wheel3.png");
  } else if (wheel4 == 1) {
    $("#wheel4").attr("src", "img/wheel_pink3.png");
  } else if (wheel4 == 2) {
    $("#wheel4").attr("src", "img/wheel_red3.png");
  }
}