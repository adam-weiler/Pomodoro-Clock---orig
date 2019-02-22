import React, {	Component } from 'react';
//import ButtonList from './ButtonList';
import './App.css';

//import { Constants } from './constants';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			breakLength: 5, //Break Length.
			sessionLength: 25, //Session length. //25 //1
			tickingClock: false, //Tracks whether the clock is ticking or not. False is off, true is on.
			//timeInMinutes: 11, //Current length in minutes. //25
			timeInSeconds: 1500, //Current length in seconds. //1500 //60
			timeoutMethod: '', //Stores the timeout method.
			seshOrBreak: "Session", //Stores the string for 'Session' or 'Break'.
			//secondsLeftForClock: '00',
			//minutesLeftForClock: this.calcMinutes(60)
		}
		this.resetClick = this.resetClick.bind(this);
		this.toggleStartStop = this.toggleStartStop.bind(this);
		// this.countdownTimer = this.countdownTimer.bind(this);
		this.aTickingClock = this.aTickingClock.bind(this);
		this.whatTimeIsIt = this.whatTimeIsIt.bind(this);
		// this.calcMinutes = this.calcMinutes.bind(this);
		// this.calcSeconds = this.calcSeconds.bind(this);
	}

	componentDidMount() { //When the webpage first loads.
		const fCCscript = document.createElement("script");
		fCCscript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
		fCCscript.async = true;
		document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.
	}

	handleUpdateCounter(counterId, operation, event) { //Handles all increment, decrement buttons.
		// console.log("1 HandleUpdateCounter.");
		// console.log("counterId: ", counterId); //breakLength or sessionLength
		// console.log("operation: ", operation); //decrement or increment

		let ourLength = this.state[counterId]; //breakLength or sessionLength
		let ourSeconds = this.state.timeInSeconds; //Hypothetical time in seconds.

		// console.log(ourLength);
		// console.log(ourSeconds);

		if ((ourLength > 1) && (operation === "decrement")) { //User clicked on down arrow for Break or Session lengths.
			ourLength = ourLength - 1;
		}

		if ((ourLength < 60) && (operation === "increment")) { //User clicked on up arrow for Break or Session lengths.
			ourLength = ourLength + 1;
		}

		if (counterId === "sessionLength") { //If user has changed sessionLength, ourSeconds variable is updated to reflect this.
			ourSeconds = ourLength * 60;
		}

		this.setState({
        	[counterId]: ourLength, //breakLength or sessionLength is increased or decreased by 1.
			timeInSeconds: ourSeconds //The hypothetical time in seconds is increased or decreased by 60.
		});
	}


	toggleStartStop() { //Toggles the clock to start or stop.
		// console.log("2 toggleStartStop");
		// console.log("sessionLength: " + this.state.sessionLength); //by default, 25.
		// console.log("breakLength: " + this.state.breakLength); //by default, 5.
		// console.log("tickingClock: " + this.state.tickingClock); //true or false.
		// console.log("timeInSeconds: " + this.state.timeInSeconds); //hypothetical time remaining.

		let startOrStop;

		if (this.state.tickingClock === false) { //The clock is not running.
			//console.log("2a The clock is off. I will start.");
			startOrStop = true; //Updates the flag to indicate the clock is starting.
			this.aTickingClock(); //Starts the clock function.

		} else { //The clock is running.
			//console.log("2b The clock is running. I will stop.");
			startOrStop = false; //Updates the flag to indicate the clock is stopping.
			clearTimeout(this.state.timeoutMethod); //Stops the clock function.
		}

		this.setState({
			tickingClock: startOrStop,
			timeInSeconds: this.state.timeInSeconds
		});
	}


	aTickingClock() {
		// console.log("3 aTickingClock");
		// console.log("SessionLenth is: " + this.state.sessionLength)
		console.log("In seconds that is: " + this.state.timeInSeconds); //This console.log is needed??

		//document.getElementById("time-left").innerHTML = this.calcMinutes() + ":" + this.calcSeconds();

		if (this.state.timeInSeconds !== 0) {
			this.setState({
				//minutesLeftForClock: this.calcMinutes(this.state.timeInSeconds),
				//secondsLeftForClock: this.calcSeconds(),
				timeoutMethod: setTimeout(this.aTickingClock, 1000), //1000 //25
				timeInSeconds: this.state.timeInSeconds - 1
			});
		} else {
			let sessionOrBreak;
			let ourTimeInSeconds;
			let ourBeep = document.getElementById("beep");
			//let ourBeep = this.state.beepMethod;
			//let ourBeep = Constants.beepMethod;
			//let ourBeep = document.getElementById("beep")
			//console.log("Our beep: " + ourBeep)
			//ourBeep.play()

			if (this.state.seshOrBreak === "Session") {
				console.log("Session done!");
				ourBeep.play();
				sessionOrBreak = "Break";
				ourTimeInSeconds = (this.state.breakLength + 1) * 60;
				// console.log("ourTimeInSeconds: " + ourTimeInSeconds);
				// console.log("this.state.sessionlength: " + this.state.breakLength);
			} else if (this.state.seshOrBreak === "Break") {
				console.log("Break done!");
				ourBeep.play();
				sessionOrBreak = "Session";
				ourTimeInSeconds = (this.state.sessionLength + 1) * 60;
				// console.log("ourTimeInSeconds: " + ourTimeInSeconds);
				// console.log("this.state.sessionlength: " + this.state.sessionLength);
			}

			clearTimeout(this.state.timeoutMethod);

			// console.log("sessionOrBreak: " + sessionOrBreak);
			// console.log("ourTimeInSeconds: " + ourTimeInSeconds);
			// console.log("this.state.breakLength: " + this.state.breakLength);
			// console.log("this.state.sessionlength: " + this.state.sessionLength);

			this.setState({ //Start the break.
				seshOrBreak: sessionOrBreak,

				//sessionLength: 1, //25
				timeInSeconds: ourTimeInSeconds, //1499
			})
			this.aTickingClock();
		}
		// this.setState({

		// });
	}


	whatTimeIsIt() {
		let minutes = Math.floor(this.state.timeInSeconds / 60);
		let seconds = Math.floor(this.state.timeInSeconds % 60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		return minutes + ':' + seconds;
	}

	// calcMinutes(val) {
	// 	let minutes = Math.floor(val / 60);
	// 	if (minutes < 10) {
	// 		minutes = "0" + minutes;
	// 	}
	// 	return (minutes);
	// }

	// calcSeconds() {
	// 	let seconds = this.state.timeInSeconds % 60;
	// 	if (seconds < 10) {
	// 		seconds = "0" + seconds;
	// 	}
	// 	return (seconds);
	// }


	resetClick() {
		// console.log("4 I will reset the timer, and the settings.")
		clearTimeout(this.state.timeoutMethod);

		let ourBeep = document.getElementById("beep");
		ourBeep.pause();
		ourBeep.currentTime = 0;

		this.setState({
			breakLength: 5,
			sessionLength: 25,
			tickingClock: false,
			timeInSeconds: 1500, //1500
			timeoutMethod: '',
			seshOrBreak: "Session"
			//minutesLeftForClock: this.calcMinutes(this.state.timeInSeconds),
			//secondsLeftForClock: '00'
		})

		// console.log("breakLength: " + this.state.breakLength);
		// console.log("sessionLength: " + this.state.sessionLength);
		// console.log("tickingClock: " + this.state.tickingClock);
		// console.log("timeInSeconds: " + this.state.timeInSeconds);

		// document.getElementById("time-left").innerHTML = this.state.sessionLength + ":00";
	}

	render() {
			// const {
			//   breakLength,
			//   sessionLength,
			//   seshOrBreak
			// } = this.state;

    return ( <div>
      			<h1>Pomodoro Clock</h1>
				<div id="both-labels">
	      			<div id="break-label">Break Length
	      				<br/>
	      				<div className="allButtons">
		      				<button id="break-decrement"
		      				onClick={
		        				this.handleUpdateCounter.bind(this, 'breakLength', 'decrement')
		      				}>▼</button>
		      				<div id="break-length">
		      					{this.state.breakLength} 
		      				</div>
		      				<button id = "break-increment" 
		      				onClick = {
		        				this.handleUpdateCounter.bind(this, 'breakLength', 'increment')
		      				}>▲</button>
						    {/* <ButtonList timer={breakLength}/> */}
					    </div>
	      			</div>

			    	<div id="session-label">Session Length
				    	<br/>
				    	<div className="allButtons">
					    	<button id="session-decrement"
			      			onClick = {
			        			this.handleUpdateCounter.bind(this, 'sessionLength', 'decrement')
			      			}>▼</button>
			      			<div id="session-length">
			      				{this.state.sessionLength}
			      			</div>
			      			<button id="session-increment"
			      			onClick = {
			        			this.handleUpdateCounter.bind(this, 'sessionLength', 'increment')
			      			}>▲</button>
		      			</div>
	      			</div>
				</div>

	    		<div id="timer-label">
	      			{this.state.seshOrBreak}:
	      			{/*<audio className="clip" id="beep" src="http://www.orangefreesounds.com/wp-content/uploads/2017/11/Short-beep-noise.mp3"></audio>*/}
					<audio className="clip" id="beep" src="https://onlineclock.net/audio/options/default.mp3"></audio>
	      			
	      			<div id="time-left">
	      				{this.whatTimeIsIt()}
	      			</div>

	      				{/*{sessionLength}:{this.calcSeconds()}*/}
	      				{/*this.state.timeInMinutes}:{this.state.timeInSeconds*/}
	      				{/*this.state.minutesLeftForClock}:{this.state.secondsLeftForClock*/}

	      			<button id="start_stop"
	      			onClick = {
	        			this.toggleStartStop.bind(this)
	      			}>Start Stop</button>
	      			<button id="reset"
	      			onClick = {
	        			this.resetClick.bind(this)
	      			}>Reset</button>
	      		</div> 
				{/*
					<button id="aTickingClock"
	      			onClick = {
	        			this.aTickingClock.bind(this)
	      			}>A Ticking Clock!</button>
	      		*/}
	      	</div>
    );
  }
}

export default App;
