const St = imports.gi.St;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const bnDate = Me.imports.date;
const Mainloop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const Lang = imports.lang;
const Clutter = imports.gi.Clutter;


let bnCal;

const BengaliCalendar = new Lang.Class({
	Name: "BengaliCalendar", Extends: PanelMenu.Button,

	_init: function(){
		this.parent(0.0, "BengaliCalendar", false);
		this.buttonText = new St.Label({
			text: bnDate.bnBnToday(),
			y_align: Clutter.ActorAlign.CENTER
		});
		this.actor.add_actor(this.buttonText);
		this._refresh();
	},

	_refresh: function(){
		this._refreshUI();
		this._removeTimeout();
		this._timeout = Mainloop.timeout_add_seconds(1, Lang.bind(this, this._refresh));
		return true;
	},


	_refreshUI: function(){
		let txt = bnDate.bnBnToday();
		this.buttonText.set_text(txt);
	},

	_removeTimeout: function(){
		if(this._timeout){
			Mainloop.source_remove(this._timeout);
			this._timeout = null;
		}
	},

	stop: function(){
		if(this._timeout)
			Mainloop.source_remove(this._timeout);
		this._timeout = undefined;

		this.menu.removeAll();
	}
});


function init() {
}

function enable() {
    bnCal = new BengaliCalendar;
    Main.panel.addToStatusArea("bengaliCalendar", bnCal);
}

function disable() {
	bnCal.stop();
 	bnCal.destroy();
}
