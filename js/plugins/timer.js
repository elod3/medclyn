jQuery(function ($) {
    'use strict';

    $._getJsonFromUrl = function() {
        var src = location.hash.length ? location.hash : location.search;

        var query = src.substr(1);
        var data = query.split("&");
        var result = {};
        for(var i=0; i<data.length; i++) {
          var item = data[i].split("=");
          result[item[0]] = item[1];
        }
        return result;
    };

    var _hideCounter = function() {
        $('.counter').addClass('finished');

        $('.couter-container').remove();

        $('#form-prelansare').remove();
        $('#form-prelansare-footer').remove();

        $('.pre-countdown-end').addClass('hidden');
        $('.post-countdown-end').removeClass('hidden');

        $('.btn-order-promo').remove();
        $('.btn-order-full').removeClass('hidden');

        $('#form-lansare').removeClass('hidden');
        $('#form-lansare-footer').removeClass('hidden');
    };

    var _runCounter = function () {

        var $counter = $('.counter'),
            urlVars = $._getJsonFromUrl(),
            suffix = '1',
            //get counter expire date
            counterDate = $counter.attr('data-counter-stop');

        if (typeof urlVars.end !== 'undefined') {
          if (!urlVars.end.length) {
            var targetDate1 = new Date(new Date().getTime() + 5 *24*60*60*1000);
            counterDate = targetDate1;
          } else {
            counterDate = urlVars.end;
            var targetDate1 = new Date(counterDate);
          }

          if (isNaN(targetDate1.getTime())) {
            _hideCounter();
            return;
          }

          targetDate1.setDate(targetDate1.getDate());
          targetDate1.setHours(23);
          targetDate1.setMinutes(59);
          targetDate1.setSeconds(59);
          counterDate = targetDate1;

          if (typeof(Storage) !== "undefined") {
            localStorage.setItem("targetDate" + suffix, targetDate1);
          }
        }

        if (typeof counterDate === 'string') {
            counterDate = new Date(counterDate);
        }

        if (typeof counterDate === 'undefined' || counterDate === null || isNaN(counterDate.getTime())) {
            _hideCounter();
            return;
        }

        //check if .counter exist in DOM
        if (!$counter.length > 0) {
            _hideCounter();
            return;
        }

        // set the date we're counting down to
        var targetDate = new Date(counterDate).getTime(),
            dateNow = new Date().getTime(),

        // variables for time units
            days, hours, minutes, seconds,

            $days = $counter.find('.days'),
            $hours = $counter.find('.hours'),
            $minutes = $counter.find('.min'),
            $seconds = $counter.find('.sec'),

            initTimer = false;

        if ( (targetDate - dateNow) < 0 ) {
            _hideCounter();
            // $counter.hide();
            $counter.addClass('finished');

            $('.couter-container').remove();

            $('#form-prelansare').remove();
            $('#form-prelansare-footer').remove();

            $('#form-lansare').removeClass('hidden');
            $('#form-lansare-footer').removeClass('hidden');

            return;
        }

        setInterval(function () {

            // find the amount of "seconds" between now and target
            var currentDate = new Date().getTime(),
                secondsLeft = (targetDate - currentDate) / 1000;

            // do some time calculations
            days = parseInt(secondsLeft / 86400, 10);
            secondsLeft = secondsLeft % 86400;

            hours = parseInt(secondsLeft / 3600, 10);
            secondsLeft = secondsLeft % 3600;

            minutes = parseInt(secondsLeft / 60, 10);
            seconds = parseInt(secondsLeft % 60, 10);

            if (!initTimer) {
                $seconds.text(seconds);
                $minutes.text(minutes);
                $hours.text(hours);
                $days.text(days);

                $counter.fadeIn('slow');
                initTimer = true;
            }

            if (seconds < 0) {
                _hideCounter();
                return;
            }

            $seconds.text(seconds);

            if ( seconds === 59 ) {
                $minutes.text(minutes);

                if ( minutes === 59  ) {
                    $hours.text(hours);

                    if ( hours === 23 ) {
                        $days.text(days);
                    }
                }
            }
        }, 1000);
    };

    _runCounter();
});