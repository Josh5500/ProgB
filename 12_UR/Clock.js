console.log('Clock is here');

let aStatus = false;
let a;
let stopButton;
let delayTid = 1;  
let delayInputField;
let setDelayButton;

function setup() {
   
    let c = new Clock(select('#clock'), 'black');
    c.start();

    let otherClockDiv = createDiv();
    let otherClock = new Clock(otherClockDiv);
    otherClock.start();
    otherClockDiv.position(100, 100);

    
    let currentHour = hour();
    let currentMinute = minute();
    let currentSecond = second();
    otherClock.setAlarm(currentHour, currentMinute, currentSecond);

   
    delayInputField = createInput(delayTid.toString());
    delayInputField.position(20, 20);
    delayInputField.style('width', '100px');
    
    setDelayButton = createButton('Set Timer (sek)');
    setDelayButton.position(130, 20);
    setDelayButton.mousePressed(() => {
        delayTid = parseInt(delayInputField.value()*1000);
        console.log(`Delay set to: ${delayTid}`);
        
        
        otherClock.callForWork();
    });
}


function preload() {
    a = loadSound('assets/520765__ofresco__sans.mp3');
}


function draw() {
    let currentHour = hour();
    let currentMinute = minute();
    let currentSecond = second();
}

class Clock {
    constructor(div, style) {
        this.div = div;
        this.style = style;
        this.hDiv = createDiv();
        this.mDiv = createDiv();
        this.sDiv = createDiv();
        this.div.child(this.hDiv);
        this.div.child(this.mDiv);
        this.div.child(this.sDiv);

        this.interval;

        this.alarmSet = false;
        this.alarmHours = null;
        this.alarmMinutes = null;
        this.alarmSeconds = null;
        this.alarmRinging = false;

        this.div.style('width', '16rem');
        this.div.style('height', '5rem');
        this.div.style('border', '4px dotted gray');
        this.div.style('display', 'grid');
        this.div.style('place-items', 'center');
        this.div.style('padding', '1rem');
        this.div.style('border-radius', '2rem');

        this.div.style(
            `width:16rem;
            height:5rem;
            border: 4px dotted gray;
            display:grid;
            grid-template-columns:1fr 1fr 1fr;
            padding: 1rem; 
            border-radius: 2rem;
            place-items:center;
            font-size:1.5rem;
            `
        );

        switch (style) {
            case 'pink':
                this.div.style('background', 'hotpink');
                break;
            case 'black':
                this.div.style('background', 'black');
                this.div.style('color', 'white');
                break;
            default:
                this.div.style('background', 'rgba(0,0,0,0)');
        }
    }

    start() {
        this.interval = setInterval(() => {

            this.hDiv.html(hour() < 10 ? '0' + hour() : hour());
            this.mDiv.html(minute() < 10 ? '0' + minute() : minute());
            this.sDiv.html(second() < 10 ? '0' + second() : second());
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    setAlarm(h, m, s) {
        this.alarmHours = h;
        this.alarmMinutes = m;
        this.alarmSeconds = s;
        this.alarmSet = true;
        console.log(`Alarm set to ${h}:${m}:${s}`);
    }

    callForWork() {
        
        console.log(`Alarm will go off after ${delayTid}ms`);
        setTimeout(() => {
            this.startAlarm(); 
        }, delayTid);
    }

    startAlarm() {
        
        this.div.style('background', 'red');
        a.loop(); 

        
        if (!stopButton) {
            stopButton = createButton('Stop Alarm');
            stopButton.mousePressed(() => {
                this.stopAlarm();
            });
            stopButton.position(300, 100);
            stopButton.style('font-size', '13px');
            stopButton.style('background-color', 'green');
            stopButton.style('color', 'white');
        }
    }

    stopAlarm() {
        
        a.stop();
        this.div.style('background', 'rgba(0,0,0,0)');
    }
}
