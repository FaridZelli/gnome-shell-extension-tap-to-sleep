const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;

function suspend() {
    try {
        var value = GLib.spawn_command_line_async('systemctl suspend');
    } catch (err) {
        Main.notify(err + ": tap-to-sleep@FaridZelli experienced an error");
        log("tap-to-sleep@FaridZelli:" + err);
    }
}

let suspendIcon;
let suspendButton;
let suspendConnection;

function init () {}

function enable () {
suspendIcon = new St.Icon({
        icon_name: 'weather-clear-night-symbolic',
        style_class: 'system-status-icon'
    });

    suspendButton = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    suspendButton.set_child(suspendIcon);
    suspendConnection = suspendButton.connect('button-press-event', suspend);
    suspendConnection = suspendButton.connect('touch-event', suspend);

    Main.panel._rightBox.insert_child_at_index(suspendButton, -1);
}

function disable() {
    Main.panel._rightBox.remove_child(suspendButton);

if(suspendIcon) {
        suspendIcon.destroy();
        suspendIcon = null;
    }
    if(suspendButton) {
        if(suspendConnection){
            suspendButton.disconnect(suspendConnection);
            suspendConnection = null;
        }
        suspendButton.destroy();
        suspendButton = null;
    }

}
