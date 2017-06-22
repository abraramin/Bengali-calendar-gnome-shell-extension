const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const bnDate = Me.imports.date;

let text, button;
var refreshInterval, currDay;


function updateDisplay(){
	text = new St.Label({text: bnDate.bnBnToday()});
    button.set_child(text);
}

function refreshLoop(){
	var currDate = new Date();
	currDay = currDate.getDay();

	refreshInterval = setInterval(function(){
		var updatedDate = new Date();
		var updatedDay = updatedDate.getDay();
		if(parseInt(currDay) != parseInt(updatedDay)){
			updateDisplay();
    		currDay = updatedDay;
		}
	}, 1000);
}


function stopTimer(){
	clearInterval(refreshInterval);
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });

    updateDisplay();
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    refreshLoop();
}

function disable() {
	stopTimer();
    Main.panel._rightBox.remove_child(button);
}
