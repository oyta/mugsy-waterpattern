class Cone {
    constructor(angle = 0) {
      this.startAngle = angle; 
      this.endAngle = null;
      this.startTime = null;
      this.endTime = null;
      this.direction = true; // true = clockwise
    }
  
  // newAngle in radians
  // moveTime in seconds
  // direction == true => clockwise rotation of the cone
  move(newAngle = 0, moveTime = 20, direction = true) {
      if( this.isRunning() ) {
        this.startAngle = this.getAngleCurrent();
      }
      
      this.endAngle = newAngle % 360;
      this.direction = direction;
      this.startTime = new Date();
      
      let time = new Date();
      time.setSeconds(time.getSeconds() + moveTime);
      this.endTime = time;
    }
  
    isRunning() 
  {
    let isRunning = false;
    isRunning = this.endTime != null;
    
    return isRunning;
  }
  
    getAngleCurrent() {
      let returnAngle = 0;
      if(this.isRunning()) 
      {
        if(this.direction)
        {
          returnAngle = (this.startAngle + this.getDistanceDone()) % 360;
        } 
        else
          {
            returnAngle = (this.startAngle - this.getDistanceDone());
            returnAngle = returnAngle < 0 ? 360 + returnAngle : returnAngle;
          }
      if(this.getTimeShareDone() >= 1 || this.getDistanceDone() == 1)
      {
        this.startAngle = this.endAngle;
        this.endAngle = null;
        this.endTime = null;
      }
  }
  else {
        returnAngle = this.startAngle;
      }
      
      return returnAngle;
    }
  
    getDistanceDone() {
      let distanceLeft = this.getDistanceTotal() * this.getTimeShareDone();
      
      return distanceLeft;
    }
  
    getDistanceTotal() {
      let distance = 0;
      if( this.direction ) // clockwise
        {
          distance = this.endAngle - this.startAngle;
        }
      else // counter clockwise
        {
          distance = this.startAngle - this.endAngle;
        }
        
      if( distance < 0 )
        {
          distance = 360 + distance;
        }
      
      return distance;
    }
  
  // return degrees or radians per seconds 
  getSpeed(radians = true) {
    let time = this.getTimeTotal();
    let distance = this.getDistanceTotal();
    distance = radians ? Helper.deg2rad( distance ) : distance;
   
    return distance / time;
  }
  
  // return seconds
  getTimeTotal() { 
    let secondsStart = this.startTime.getTime() / 1000;
    let secondsEnd = this.endTime.getTime() / 1000;
    let difference = secondsEnd - secondsStart;
    
    return difference;
  }
  
  // return seconds
  getTimeDone() { 
    let now = new Date();
    let secondsStart = this.startTime.getTime() / 1000;
    let secondsNow = now.getTime() / 1000;
    let secondsEnd = this.endTime.getTime() / 1000;
    let differenceTotal = this.getTimeTotal();
    let differenceDone = secondsNow - secondsStart;
    
    return differenceDone;        
  }
  
  //return seconds
  getTimeShareDone() {
    let timeShareDone = this.getTimeDone() / this.getTimeTotal();
    
    return timeShareDone;
  }
  
  log(html = true) {
    let logStr = "";
    let lf = html ? "<br/>" : "\r\n";
    
    if( cone.isRunning() ) {
      logStr += "Start angle: " + this.startAngle + " > " + Math.round(this.getAngleCurrent()) +" > " + this.endAngle + lf;
      logStr += "Duration: " + Math.round(this.getTimeDone()) + " / " + this.getTimeTotal() + " seconds " + lf;
      logStr += "Distance: " + Math.round(this.getDistanceDone()) + " / " + Math.round(this.getDistanceTotal()) + lf;
      logStr += "Speed: " + Math.round(this.getSpeed() * 100) / 100 + " radians per second";
    }
    else 
      {
        logStr += "Not running, current angle: " + cone.getAngleCurrent() + lf;
        logStr += "Start angle: " + this.startAngle + lf;
      }
    return logStr;
  }
  

}

class Spout {
    constructor(percent = 0) {
      this.startPercent = percent; 
      this.endPercent = null;
      this.startTime = null;
      this.endTime = null;
    }
  
    move(newPercent = 0, moveTime = 20) { // moveTime i seconds
      if( this.isRunning() ) {
        this.startPercent = this.getPercentCurrent();
      }
      
      this.endPercent = newPercent > 100 ? 100 : newPercent < 0 ? 0 : newPercent;
      this.startTime = new Date();
      
      let time = new Date();
      time.setSeconds(time.getSeconds() + moveTime);
      this.endTime = time;
    }
  
    isRunning() 
    {
      let isRunning = false;
      isRunning = this.endTime != null;

      return isRunning;
    }
  
    getPercentCurrent() {
      let returnPercent = 0;
      if(this.isRunning()) 
      {
          returnPercent = this.startPercent + this.getDistanceDone();
      
      if(this.getTimeShareDone() >= 1 || this.getDistanceDone() == 1)
      {
        this.startPercent = this.endPercent;
        this.endPercent = null;
        this.endTime = null;
      }
  }
  else {
        returnPercent = this.startPercent;
      }
      
      return returnPercent;
    }
  
    getDistanceDone() {
      let distanceLeft = this.getDistanceTotal() * this.getTimeShareDone();
      
      return distanceLeft;
    }
  
    getDistanceTotal() {
      let distance = 0;
      distance = this.endPercent - this.startPercent;
      
      return distance;
    }
  
  // return percent per seconds 
  getSpeed() {
    let time = this.getTimeTotal();
    let distance = this.getDistanceTotal();
   
    return distance / time;
  }
  
  // return seconds
  getTimeTotal() { 
    let secondsStart = this.startTime.getTime() / 1000;
    let secondsEnd = this.endTime.getTime() / 1000;
    let difference = secondsEnd - secondsStart;
    
    return difference;
  }
  
  // return seconds
  getTimeDone() { 
    let now = new Date();
    let secondsStart = this.startTime.getTime() / 1000;
    let secondsNow = now.getTime() / 1000;
    let secondsEnd = this.endTime.getTime() / 1000;
    let differenceTotal = this.getTimeTotal();
    let differenceDone = secondsNow - secondsStart;
    
    return differenceDone;        
  }
  
  //return seconds
  getTimeShareDone() {
    let timeShareDone = this.getTimeDone() / this.getTimeTotal();
    
    return timeShareDone;
  }
  
  log(html = true) {
    let logStr = "";
    let lf = html ? "<br/>" : "\r\n";
    
    if( cone.isRunning() ) {
      logStr += "Start percent: " + this.startPercent + " > " + Math.round(this.getPercentCurrent()) +" > " + this.endPercent + lf;
      logStr += "Duration: " + Math.round(this.getTimeDone()) + " / " + this.getTimeTotal() + " seconds " + lf;
      logStr += "Distance: " + Math.round(this.getDistanceDone()) + " / " + Math.round(this.getDistanceTotal()) + lf;
      logStr += "Speed: " + Math.round(this.getSpeed() * 100) / 100 + " radians per second";
    }
    else 
      {
        logStr += "Not running, current percent: " + cone.getPercentCurrent() + lf;
        logStr += "Start percent: " + this.startPercent + lf;
      }
    return logStr;
  }
}

class TargetMessage {
  constructor(target, moveTime, direction = true) {
    this.target = target;
    this.moveTime = moveTime;
    this.direction = direction;
  }
}

class TraceInfo {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
  
  isEqual(anotherObject) {
    let returnValue = false;
    if(anotherObject != undefined) {
    if(anotherObject.hasOwnProperty("type")
        && anotherObject.hasOwnProperty("value"))
       {
       if( anotherObject.type == this.type
          && anotherObject.value == this.value) {
          return true;
      }
    }
    }
 
    return returnValue;
  }
}

class Scheduler {
  constructor(cone, coneSchedule, spout, spoutSchedule)
  {
    this.cone = cone;
    this.coneSchedule = coneSchedule.reverse();
    this.spout = spout;
    this.spoutSchedule = spoutSchedule.reverse();
    this.running = false;
  }
  
  start() {
    this.running = true;
    this.next();
  }
  
  next() {
    if( this.running ) {
        if( spoutSchedule.length > 0 && !this.spout.isRunning()) {
            let target = spoutSchedule.pop();
            this.spout.move(target.target, target.moveTime);
          }
        if(coneSchedule.length > 0 && !this.cone.isRunning()) {
            let target = coneSchedule.pop();
           this.cone.move(target.target, target.moveTime, target.direction);
        }
      }
  }
}

class Helper {
      static deg2rad(degrees = 0) {
    return 2 * Math.PI * degrees / 360;    
  }
  
  static rad2deg(radians = 0) {
    return 360 * radians / (2 * Math.PI);
  }
  }

class WaterTrace {
  constructor(angle = 0) {
    this.history = new Array();
    this.angle = angle;
  }
  
  add(traceInfo) {
    if( traceInfo.type == "rotate" ) {
      let diffAngle = traceInfo.value - this.angle;
      this.angle = traceInfo.value;
      traceInfo.value = diffAngle;
    }
    
    if( traceInfo.type == "lineTo") {
      let lastTrace = this.lastTrace();
      if( traceInfo.isEqual( lastTrace )) {
        return;
      }
    }
    
    this.history.push(traceInfo);
  }
  
  canvasCommands(context) {
    let ctx = context;
    let tempHistory = this.history.slice();
    
    ctx.translate(150,150);
    ctx.save();
    ctx.strokeStyle = 'rgba(50,50,200,1.0)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    let start = this.startPosition();
    ctx.moveTo(start.value,0);
    
    for(let i = this.history.length-1; i > 0; --i) {
      let traceInfo = this.history[i];
      if(traceInfo.type == "rotate") {
        ctx.rotate(traceInfo.value);
      }
      else if(traceInfo.type == "lineTo") {
        ctx.lineTo(traceInfo.value,0);
      }
    }
    
    ctx.stroke();
    ctx.restore();
    ctx.translate(-150,-150);
  }
  
  startPosition() {
    let returnPosition = new TraceInfo("lineTo",0);
    for(let i = this.history.length-1; i >= 0; i--) {
      returnPosition = this.history[i];
      if( returnPosition.type == "lineTo" ) {
        break;
      }
    }
    
    return returnPosition;
  }
  
  lastTrace() {
    let returnTrace;
    returnTrace = this.history[this.history.length-1];
    
    return returnTrace;
  }
  
  lastLineInfo() {
    let lastLineInfo = new TraceInfo("lineTo", -999999999);
    let traceInfo;
    
    for(let i = this.history.length-1; i >= 0; i--) {
      traceInfo = this.history[i];
      if( traceInfo.type == "lineTo" ) {
        lastLineInfo = traceInfo;
        break;
      }
    }
    
    return lastLineInfo;
  }
  
  totalRotation() {
    let total = 0;
    for(let i = this.history.length-1; i >= 0; --i) {
      if( this.history[i].type == "rotate") {
        total += this.history[i].value;
      }
    }
    
    return Math.round(Helper.rad2deg(total));
  }
}

let cone;
let spout;
let coneSchedule = new Array();
let spoutSchedule = new Array();
let scheduler;
let trace;
let runTime = 280; // seconds
let currentTime = 0; // seconds
let updateInterval = 10; // ms
let widthOfCanvas = 300; 
let coneDiameter = 220;

function init( exampleNumber) {
    switch( exampleNumber ) {
      case 1:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 5, true));

        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 5, true));
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(10, 1));
        spoutSchedule.push(new TargetMessage(10, 5));
        
        spoutSchedule.push(new TargetMessage(20, 1));
        spoutSchedule.push(new TargetMessage(20, 5));
        
        spoutSchedule.push(new TargetMessage(30, 1));
        spoutSchedule.push(new TargetMessage(30, 5));

        spoutSchedule.push(new TargetMessage(40, 1));
        spoutSchedule.push(new TargetMessage(40, 5));

        spoutSchedule.push(new TargetMessage(50, 1));
        
        break;
      case 2:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(-90, 1, false));
        coneSchedule.push(new TargetMessage(90, 1, true));
        coneSchedule.push(new TargetMessage(0, 1, true));
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(100, 30));
       
        break;
        
      case 3: 
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 0.5, true));
        coneSchedule.push(new TargetMessage(359, 1, true));
        coneSchedule.push(new TargetMessage(358, 1, true));
        coneSchedule.push(new TargetMessage(357, 1, true));
        coneSchedule.push(new TargetMessage(356, 1, true));
        coneSchedule.push(new TargetMessage(355, 1, true));
        coneSchedule.push(new TargetMessage(354, 1, true));
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(0, 0.5));
        spoutSchedule.push(new TargetMessage(100, 2));
        spoutSchedule.push(new TargetMessage(50, 1));
        spoutSchedule.push(new TargetMessage(100, 1));
        spoutSchedule.push(new TargetMessage(0, 2));
        break;
      case 4:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 3, true));
        coneSchedule.push(new TargetMessage(358, 3, true));
        coneSchedule.push(new TargetMessage(357, 3, true));
        coneSchedule.push(new TargetMessage(356, 3, true));
        coneSchedule.push(new TargetMessage(355, 3, true));
        coneSchedule.push(new TargetMessage(354, 3, true));
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(0, 1));
        spoutSchedule.push(new TargetMessage(50, 18));
        
        break;
        
      case 5:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(358, 5, true));
        coneSchedule.push(new TargetMessage(357, 5, true));
        coneSchedule.push(new TargetMessage(356, 5, true));
        coneSchedule.push(new TargetMessage(355, 5, true));
        coneSchedule.push(new TargetMessage(354, 5, true));
        
        coneSchedule.push(new TargetMessage(353, 5, true));
        coneSchedule.push(new TargetMessage(352, 5, true));
        coneSchedule.push(new TargetMessage(351, 5, true));
        coneSchedule.push(new TargetMessage(350, 5, true));
        coneSchedule.push(new TargetMessage(349, 5, true));
        coneSchedule.push(new TargetMessage(348, 5, true));
        
        coneSchedule.push(new TargetMessage(347, 5, true));
        coneSchedule.push(new TargetMessage(346, 5, true));
        coneSchedule.push(new TargetMessage(345, 5, true));
        coneSchedule.push(new TargetMessage(344, 5, true));
        coneSchedule.push(new TargetMessage(343, 5, true));
        coneSchedule.push(new TargetMessage(342, 5, true));
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(0, 1));
        spoutSchedule.push(new TargetMessage(100, 5));
        spoutSchedule.push(new TargetMessage(0, 5));
        
        spoutSchedule.push(new TargetMessage(100, 10));
        spoutSchedule.push(new TargetMessage(0, 10));
        spoutSchedule.push(new TargetMessage(100, 10));
        spoutSchedule.push(new TargetMessage(0, 10));
        
        spoutSchedule.push(new TargetMessage(100, 15));
        spoutSchedule.push(new TargetMessage(0, 15));
        break;
      case 6:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(0, 1, true));
        coneSchedule.push(new TargetMessage(30, 5, true));
  
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(60, 5, true));
        
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(90, 5, true));
        
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(120, 5, true));
        
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(150, 5, true));
        
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(180, 5, true));
        
        coneSchedule.push(new TargetMessage(330, 5, false));
        coneSchedule.push(new TargetMessage(120, 5, true));
        
        coneSchedule.push(new TargetMessage(300, 5, false));
        coneSchedule.push(new TargetMessage(90, 5, true));
        
        coneSchedule.push(new TargetMessage(270, 5, false));
        coneSchedule.push(new TargetMessage(60, 5, true));
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(0, 1));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        
        spoutSchedule.push(new TargetMessage(0, 5));
        spoutSchedule.push(new TargetMessage(100, 5));
        

        break;
      case 7:
        cone = new Cone(0);
        let minDeg = 0;
        let maxDeg = 220;
        let coneDur = 1;
        let spoutDur = coneDur;
        let spoutMin = 0;
        let spoutMax = 50;
        let iterations = 12;
        let degChange = 18;
        
        coneSchedule.push(new TargetMessage(minDeg, 1, true));
        coneSchedule.push(new TargetMessage(maxDeg, coneDur, true));
        iterations--;
        maxDeg += degChange;
        
        for(let i = 0; i < iterations; i++) {
          minDeg += degChange;
          coneSchedule.push(new TargetMessage(minDeg, coneDur, false));
          coneSchedule.push(new TargetMessage(maxDeg, coneDur, true));
          maxDeg += degChange;
        }
        iterations++;
        
        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(spoutMin, 1));
        spoutSchedule.push(new TargetMessage(spoutMax, spoutDur));
        iterations--;
        
        for(let i = 0; i < iterations; i++ ) {
          spoutSchedule.push(new TargetMessage(spoutMin, spoutDur));
          spoutSchedule.push(new TargetMessage(spoutMax, spoutDur));
        }
        
        coneSchedule.push(new TargetMessage(330, 2, true));
        break;
      default:
        cone = new Cone(0);
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(359, 5, true));
        coneSchedule.push(new TargetMessage(0, 5, false));
        coneSchedule.push(new TargetMessage(90, 1, true));

        spout = new Spout(0);
        spoutSchedule.push(new TargetMessage(100, 50));
        break;
    }

    scheduler = new Scheduler(cone, coneSchedule, spout, spoutSchedule);
    scheduler.start();

    trace = new WaterTrace();

    window.requestAnimationFrame(draw);
}

function start(ctx) {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.strokeStyle = 'rgba(180, 180, 180, 1.0)';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgb(127, 70, 45,1.0)';

  ctx.save();
  
  ctx.beginPath();
  ctx.arc(150, 150, coneDiameter/2, 0, Math.PI * 2, false);
  ctx.stroke();
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  
  start(ctx);
  scheduler.next();
  
  var coneAngle = Helper.deg2rad(cone.getAngleCurrent());

  var spoutWidth = coneDiameter;
  var spoutPosition = spoutWidth * spout.getPercentCurrent() / 100;
  
  document.getElementById("position").innerHTML = "Spout pos: " + Math.round(spoutPosition) + "<br/><br>";
  document.getElementById("position").innerHTML += cone.log(true) + "<br/><br/>";
  document.getElementById("position").innerHTML += "";
  document.getElementById("note").innerHTML = "Trace length: " + trace.history.length;
  
  rotateCone(ctx, coneAngle);
  moveDripper(ctx, spoutPosition);
  
  if(spout.isRunning() || cone.isRunning()) {
      trace.add(new TraceInfo("lineTo", spoutPosition-spoutWidth/2));
      trace.add(new TraceInfo("rotate", coneAngle));
  }
  
  trace.canvasCommands(ctx);
  
  //window.requestAnimationFrame(draw);
  currentTime += updateInterval/1000;
  if( currentTime < runTime) {
    setTimeout(draw, updateInterval);
  }
}

function rotateCone(ctx, radians) {
    ctx.save();
    ctx.translate(150, 150); 
 
    ctx.beginPath();
    ctx.rotate(radians);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
 
   ctx.restore();
}

function moveDripper(ctx, percent) {
  ctx.fillStyle = 'rgb(40, 40, 40,0.7)';
  ctx.fillRect(45 + percent -5, 150-5, 10, 10)
  ctx.save;
}

init(7);

