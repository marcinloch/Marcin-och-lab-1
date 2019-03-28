let ball = document.querySelector('#ball')
let background = document.querySelector('.background')
let hole = document.querySelector('#hole')
let czas = Date.now()
let czas_start = false
let x_hole= Math.floor(Math.random()*530)+10
let y_hole = Math.floor(Math.random()*530)+10

hole.style.top = y_hole +`px`
hole.style.left = x_hole +`px`
let x_max
let y_max
y_max = background.clientHeight - ball.clientHeight;
x_max = background.clientWidth - ball.clientWidth;

let x_ball =0
let y_ball =0 
let x=0
let y=0
let point=0
let point_show= document.querySelector('#punkty')


hole.style.top = x_hole + `px`
hole.style.left = y_hole + `px`


    
window.addEventListener('deviceorientation', moveMe, true);
//poruszanie kulka
function moveMe(event) {
    if(czas_start==false){
        timer()
        czas_start=!czas_start
    }

    x = event.beta;
    y = event.gamma;
    
    if (x > 90) 
        x = 90 
    if (x < -90) 
         x = -90 

    x += 90;
    y += 90;

    x_ball = (x_max * x / 180 - 10)
    y_ball = (y_max * y / 180 - 10)

    ball.style.top = (x_max * x / 180 - 10) + `px`
    ball.style.left = (y_max * y / 180 - 10) + `px`

    if ((x_ball - x_hole)>=0 && (x_ball - x_hole)<=15
     && ((y_ball - y_hole) >=0) && ((y_ball - y_hole) <=15))
    {
        x_hole= Math.floor(Math.random()*530)+10
        y_hole = Math.floor(Math.random()*530)+10
        hole.style.top = x_hole + `px`
        hole.style.left = y_hole + `px`
        ball.style.top = 290 +`px`
        ball.style.left = 290 +`px`
        point++
        
        if(point==10)
        {
            point=0
            czas_start =!czas_start
            clearTimeout(t)
            alert(`${'Ukończyłeś grę z czasem: '+ (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)}`)
            clear_timer()
        }
        point_show.innerHTML=`${'Punkty: '+point}`
    }
}



let h1 = document.getElementsByTagName('h1')[0]
let seconds = 0, minutes = 0
let t;


function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) 
            minutes = 0;
        
    }
    h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)
    timer();
}
        
function timer() {
    t = setTimeout(add, 1000);
}

function clear_timer() {
    h1.textContent = "00:00";
    seconds = 0; minutes = 0;
}


 