# Bengali-calendar-gnome-shell-extension
An extension for gnome-shell that adds a Bengali calendar to the top panel, which displays the current date in Bangla. At the moment this extension is displaying the revised Bengali calendar dates, which is used as the official calendar in People's Republic of Bangladesh.
Changing the variable ```mode``` in ```extension.js``` to equal to ```WB_MODE``` is the current workaround to get West Bengal calendar dates to be displayed. I will need to look more into gjs to progress further with this project.  

![alt text](http://i.imgur.com/4AGDuPu.png "preview")

## Installation
Download and install from:
https://extensions.gnome.org/extension/1246/bengali-calendar/

Alternatively, 
- Copy the directory ```bn_cal_gnome@perth155.github.com``` to ```~/.local/share/gnome-shell/extensions```
- Restart Gnome Shell- Press ```alt``` and  ```F2```, then enter ```r``` into the prompt.
- Turn on the extension from ```Gnome Tweak Tool```.

## Todo
- [X] Add switchable non-revised Bengali calendar as used in West Bengal (Partially Complete).
- [ ] Add an interactive calendar as a popup menu. 
