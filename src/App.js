import React, {Component} from 'react';
//import ButtonList from './ButtonList';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			breakLength: 5, //Break Length.
			sessionLength: 25, //1 //Session length.
			tickingClock: false, //Tracks whether the clock is ticking or not. False is off, true is on.
			timeInMinutes: 25, //Current length in minutes.
			timeInSeconds: 1500, //60 //Current length in seconds.
			timeoutMethod: '', //Stores the timeout method.
			seshOrBreak: "Session" //Stores the string for 'Session' or 'Break'.
		}
		this.resetClick = this.resetClick.bind(this);
		this.toggleStartStop = this.toggleStartStop.bind(this);
		// this.countdownTimer = this.countdownTimer.bind(this);
		this.aTickingClock = this.aTickingClock.bind(this);
		this.calcMinutes = this.calcMinutes.bind(this);
		this.calcSeconds = this.calcSeconds.bind(this);
	}

	componentDidMount() { //When the webpage first loads.
		const fCCscript = document.createElement("script");
		fCCscript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
		fCCscript.async = true;
		document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.
	}

	handleUpdateCounter(counterId, operation, event) { //Handles all increment, decrement buttons.
		// console.log("1 HandleUpdateCounter.");
		 console.log("counterId: ", counterId); //breakLength or sessionLength
		// console.log("operation: ", operation); //decrement or increment

		let ourLength = this.state[counterId]; //breakLength or sessionLength
		let ourSeconds = this.state.timeInSeconds;

		console.log(ourLength);
		console.log(ourSeconds);


		if ((ourLength > 1) && (operation === "decrement")) { //User clicked on down arrow for Break or Session lengths.
			ourLength = ourLength - 1;
		}

		if ((ourLength < 60) && (operation === "increment")) { //User clicked on up arrow for Break or Session lengths.
			ourLength = ourLength + 1;
		}

		if (counterId === "sessionLength") {
			ourSeconds = ourLength * 60;
		}

		this.setState({
        	[counterId]: ourLength,
			timeInSeconds: ourSeconds
		});
	}


	toggleStartStop() {
		console.log("2 toggleStartStop", this.state.tickingClock);

		console.log("breakLength: " + this.state.breakLength);
		console.log("sessionLength: " + this.state.sessionLength);
		console.log("tickingClock: " + this.state.tickingClock);
		console.log("timeInSeconds: " + this.state.timeInSeconds);



		let startOrStop;
		//let OMG;

		if (this.state.tickingClock === false) {
			console.log("2a The clock is off. I will start.")
			startOrStop = true;
			this.aTickingClock();

		} else {
			console.log("2b The clock is running. I will stop.");
			startOrStop = false;
			//clearTimeout(OMG);
			clearTimeout(this.state.timeoutMethod);
		}

		this.setState({
			tickingClock: startOrStop
		});
	}


	aTickingClock() {
		// console.log("SessionLenth is: " + this.state.sessionLength)
		// console.log("In seconds that is: " + this.state.timeInSeconds);

		this.setState({
			timeInSeconds: this.state.timeInSeconds - 1
		});

		document.getElementById("time-left").innerHTML = this.calcMinutes() + ":" + this.calcSeconds();

		if (this.state.timeInSeconds !== 0) {
			this.setState({
				timeoutMethod: setTimeout(this.aTickingClock, 1000) //25
			});
		} else {

			let sessionOrBreak;
			let ourTimeInSeconds;
			let ourBeep = document.getElementById("beep");

			if (this.state.seshOrBreak === "Session") {
				console.log("Session done!");
				ourBeep.play();
				sessionOrBreak = "Break";
				ourTimeInSeconds = this.state.breakLength * 60;
				console.log("ourTimeInSeconds: " + ourTimeInSeconds);
				console.log("this.state.sessionlength: " + this.state.breakLength);
			} else if (this.state.seshOrBreak === "Break") {
				console.log("Break done!");
				ourBeep.play();
				sessionOrBreak = "Session";
				ourTimeInSeconds = this.state.sessionLength * 60;
				console.log("ourTimeInSeconds: " + ourTimeInSeconds);
				console.log("this.state.sessionlength: " + this.state.sessionLength);
			}

			clearTimeout(this.state.timeoutMethod);

			// console.log("sessionOrBreak: " + sessionOrBreak);
			// console.log("ourTimeInSeconds: " + ourTimeInSeconds);
			// console.log("this.state.breakLength: " + this.state.breakLength);
			console.log("this.state.sessionlength: " + this.state.sessionLength);

			this.setState({ //Start the break.
				seshOrBreak: sessionOrBreak,

				//sessionLength: 1, //25
				timeInSeconds: ourTimeInSeconds, //1499
			})

			this.aTickingClock();
		}
	}


	calcMinutes() {
		let minutes = Math.floor(this.state.timeInSeconds / 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return (minutes);
	}




	calcSeconds() {
		let seconds = this.state.timeInSeconds % 60;
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return (seconds);
	}


	resetClick() {
		console.log("4 I will reset the timer, and the settings.")
		clearTimeout(this.state.timeoutMethod);

		this.setState({
			breakLength: 5,
			sessionLength: 25,
			tickingClock: false,
			timeInSeconds: 1500
		})

		console.log("breakLength: " + this.state.breakLength);
		console.log("sessionLength: " + this.state.sessionLength);
		console.log("tickingClock: " + this.state.tickingClock);
		console.log("timeInSeconds: " + this.state.timeInSeconds);

		// document.getElementById("time-left").innerHTML = this.state.sessionLength + ":00";
	}


  render() {
    const {
      breakLength,
      sessionLength,
      seshOrBreak
    } = this.state;

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
		      					{breakLength} 
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
			      				{sessionLength}
			      			</div>
			      			<button id="session-increment"
			      			onClick = {
			        			this.handleUpdateCounter.bind(this, 'sessionLength', 'increment')
			      			}>▲</button>
		      			</div>
	      			</div>
				</div>

	    		<div id="timer-label">
	      			{seshOrBreak}:
	      			<audio className="clip" id="beep" src="http://www.orangefreesounds.com/wp-content/uploads/2017/11/Short-beep-noise.mp3"></audio>
	      			<div id="time-left">
	      				{/*{sessionLength}:{this.calcSeconds()}*/}
	      				{this.calcMinutes()}:{this.calcSeconds()}
	      				{/*this.state.timeInMinutes}:{this.state.timeInSeconds*/}
	      			</div>
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