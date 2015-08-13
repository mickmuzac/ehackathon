// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function() {

  // Grab the current date
  var currentDate = new Date();

  // Set some date in the future. In this case, it's always Jan 1
  var futureDate  = new Date(currentDate.getFullYear() + 1, 0, 1);

  // Calculate the difference in seconds between the future and current date
  var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

  var mins = Math.round(diff/60);
  var hours = Math.round(mins/60);
  var days = Math.round(hours/24);


  console.log("Seconds: "+diff);
  console.log("Minutes: "+mins);
  console.log("Hours: "+hours);
  console.log("Days: "+days);

  // timer(
  //     diff, // milliseconds
  //     function(timeleft) { // called every step to update the visible countdown
  //       var time = timeleft.toString();
  //       var t1 = time.slice(1,2);
  //       var t2 = time.slice(2,3);
  //       var t3 = time.slice(3,4);
  //       var t4 = time.slice(4,5);
  //       //console.log(t);
  //       document.getElementById('count-dwn-num-01').innerHTML = t1;
  //       document.getElementById('count-dwn-num-02').innerHTML = t2;
  //       document.getElementById('count-dwn-num-03').innerHTML = t3;
  //       document.getElementById('count-dwn-num-04').innerHTML = t4;
  //     },
  //     function() { // what to do after
  //         //alert("Timer complete!");
  //     }
  // );

  // var myCounter = new Countdown({
  //   seconds:diff,  // number of seconds to count down
  //   onUpdateStatus: function(sec){console.log(sec);}, // callback for each second
  //   onCounterEnd: function(){ alert('counter ended!');} // final action
  // });
  //
  // myCounter.start();

  //Instantiate a coutdown FlipClock
  // clock = $('.countdown-timer').FlipClock(diff, {
  //   clockFace: 'HourlyCounter',
  //   countdown: true,
  //   showSeconds: false
  // });

});

function timer(time,update,complete) {
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now <= 0) {
            clearInterval(interval);
            complete();
        }
        else update(Math.floor(now/1000));
    },100);
}

function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}



//-------- animate scroll

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 105
        }, 500);
        return false;
      }
    }
  });
});
