(function() {
  var POLLING_INTERVAL_MINUTES = 1
    , MS_PER_MINUTE = 60000
    , interval = POLLING_INTERVAL_MINUTES * MS_PER_MINUTE
    , remaining = interval
  ;

  /**
   * Takes ms an converts it to a string formatted as hh:mm:ss
   */
  function timeFormat(t) {
    var seconds = Math.floor(t/1000)
      , minutes = Math.floor(seconds/60)
      , hours = Math.floor(minutes/60)
    ;

    function zeroPad(n) {
      return ((n < 10) ? '0' : '') + n;
    }

    minutes -= (hours * 60);
    seconds -= (minutes * 60);

    return ((hours > 0) ? zeroPad(hours) + ':' : '') +
           zeroPad(minutes) + ':' +
           zeroPad(seconds);
  }

  /**
   * Sets the countdown clock
   */
  function setClock() {
    var html
      , status = $('#twitter-feed .time-remaining .time')
    ;

    remaining -= 1000;
    if (!status.length) {
      $('<div class="tablet-up time-remaining">Twitter Feed Sync: ' +
               '<span class="time">' +
               timeFormat(remaining) +
               '</span>' +
               '</div>').insertAfter('#twitter-feed .twitter-feed');
    } else {
      status.html(timeFormat(remaining));
    }
  }

  window.setInterval(function() {
      $.get('/feed/?format=html', function(res) {
          $('#twitter-feed').html(res);
          remaining = interval;
          setClock();
        });
    }, interval);

  window.setInterval(setClock, 1000);
})();
