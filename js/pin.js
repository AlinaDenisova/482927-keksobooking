'use strict';

(function () {
    var LOCATION_MIN_Y= 130;
    var LOCATION_MAX_Y= 630;
    var MAIN_PIN_HEIGHT= 65;
    var MAIN_PIN_WIDTH= 65;

  var address = document.querySelector('input[name="address"]');

    var getMainPinCoords = function () {
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinX = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
    return Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
  };

  var fillAddress = function () {
    address.value = getMainPinCoords();
  };

  // перетаскивание пина
  var mainPin = document.querySelector('.map__pin--main');
  var userMap = document.querySelector('.map');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var minDistanceTopPin = LOCATION_MIN_Y - MAIN_PIN_HEIGHT;
      var maxDistanceTopPin = LOCATION_MAX_Y - MAIN_PIN_HEIGHT;
      var top = mainPin.offsetTop - shift.y;
      var left = mainPin.offsetLeft - shift.x;

      if (top <= (minDistanceTopPin)) {
        mainPin.style.top = minDistanceTopPin + 'px';
        mainPin.style.left = left + 'px';
        startCoords.y = minDistanceTopPin;
      } else if (top >= maxDistanceTopPin) {
        mainPin.style.top = maxDistanceTopPin + 'px';
        mainPin.style.left = left + 'px';
        startCoords.y = maxDistanceTopPin;
      } else {
        mainPin.style.top = top + 'px';
        mainPin.style.left = left + 'px';
      }
      fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      userMap.removeEventListener('mousemove', onMouseMove);
      userMap.removeEventListener('mouseup', onMouseUp);
    };
    userMap.addEventListener('mousemove', onMouseMove);
    userMap.addEventListener('mouseup', onMouseUp);
  });
})();
