import './Style.css';
import { useState } from 'react';

const Timer = (props ) => {

    const [days,setDays] = useState(0);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);
    // https://www.w3schools.com/howto/howto_js_countdown.asp
    // Set the date we're counting down to
    const countDownDate = new Date(props.duedate).getTime();
    // Update the count down every 1 second
    const x = setInterval(function() {
    if (!countDownDate) return null;
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="timer-clock"
    // document.getElementById("timer-clock").innerHTML = days + " : " + hours + " : "
    // + minutes + " : " + seconds;
    // const clock=() =>{
    //   return days + " : " + hours + " : "
    //   + minutes + " : " + seconds;
    // }
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer-clock").innerHTML = "EXPIRED";
    }
    }, 1000);

    return (
      <div>
        <span id="timer-clock">{days + " : " + hours + " : "+ minutes + " : " + seconds}</span>
        <div id='timer-header'>
          <span>DATES</span>
          <span>HOURS</span>
          <span>MINUTES</span>
          <span>SECONDS</span>
        </div>
      </div>
    )
  };
  
  export default Timer;