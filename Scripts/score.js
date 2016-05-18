/*******************************************************************************
 *                        DO NOT CHANGE THE CODE BELOW                         *
 *          IF GOING TO USE WINDOW.ONLOAD THEN MUST INCLUDE THE INIT()         *
 *                                                                             *
 *                        SOME OF THE ID USED BY THIS:                         *
 *          bonusbar                             THIS DISPLAYS THE BLOCK WITH  *
 *                                               THE APPROPRIATE COLOR TO THE  *
 *                                               TIME TAKEN.                   *
 *                                               USE CSS TO MAKE THE WIDTH     *
 *                                               AND THE LENGTH OF THIS BAR    *
 *                                               (NO BORDER).                  *
 *                                                                             *
 *          scoreboard                           THIS DISPLAYS THE SCORE       *
 *                                               AQUIRED BY THE USER.          *
 *                                               IF OBTAINING WITH PHP, THE    *
 *                                               VARIABLE FOR SCORE IS SCORE.  *
 *                                                                             *
 *                     SOME OF THE ONCLICK USED BY THIS:                       *
 *          correctAnswer                        THIS FUNCTION WILL BE CALLED  *
 *                                               WHENEVER THE USER CORRECTLY   *
 *                                               ANSWER THE QUESTION AND       *
 *                                               CALCULATE THE SCORE           *
 *                                               ACCORDINGLY.                  *
 *******************************************************************************/
 
var timer;
var time, score, timeBarLength, defaultTimeBarLength;
var bonusbar;
var barDecriment = (1000 / updateRate) * slow;
var red, green, colorGap;

//This function initializes the time and color variables.
function init(){
	time = score = red = 0;
	green = 255;
	bonusbar = document.getElementById('bonusbar');
	bonusbar.style.background = "#00FF00";
	colorGap = 255 / barDecriment;
	defaultTimeBarLength = timeBarLength = bonusbar.offsetWidth;
	barDecriment = defaultTimeBarLength / barDecriment;
}
//This function starts the timer of the marathon mode.
function start(){
	timer=setInterval('run()', updateRate);
}
//This function calculate the amount of time has passed.
//As time passes, it updates the bonus time bar.
function run(){
	time++;
	
	green -= colorGap;
	red += colorGap;
	timeBarLength -= barDecriment;
	
	updateTimeBar();
}
//This function updates the bar as time passes along with the color.
function updateTimeBar(){
	var redcode = Math.floor(Math.max(red, 0)).toString(16);
	var greencode = Math.floor(Math.max(green, 0)).toString(16);
	
	bonusbar.style.background = "#" + redcode + greencode + "00";
	bonusbar.style.width = Math.max(Math.floor(timeBarLength), 0) + "px";
	
}
//This function is called whenever the correct button is pressed.
//	It adds the score dependent on the time.
//	It updates the score on the page.
//	It resets the time and timer variable.
function correctAnswer(){
	score += addScore(time);
	updateScore();
	resetComponent();
}
//This function returns the appropriate score compared to the time.
//Score returns...
//	minimal points		when	time 	> 	SLOW
//	low points			when	SLOW 	> 	time 	> 	NORMAL
//	medium points		when	NORMAL 	> 	time 	> 	QUICK
//	high points			when	QUICK 	> 	time
function addScore(myTime){
	return 	Math.floor(time / (1000 / updateRate)) <= slow ? 
			Math.floor(time / (1000 / updateRate)) <= normal ? 
			Math.floor(time / (1000 / updateRate)) <= quick ? 
			scoreHigh : scoreMed : scoreLow : scoreMin;
}
//This function resets the timer and the time whenever someone press a button.
function resetComponent(){
	//Resets the variable to beginning.
	time = red = 0;
	green = 255;
	timeBarLength = defaultTimeBarLength;
	//Update the bonus bar.	
	updateTimeBar();
	//Reset the time interval variable.
	clearInterval(timer);
	timer = setInterval('run()', updateRate);
	
}
//This function updates the score of the score box.
function updateScore(){
	document.getElementById('scoreboard').innerHTML = score;
}