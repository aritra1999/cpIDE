const remote = require("electron").remote;

var minimize = document.getElementById("minimize");
var maximize = document.getElementById("maximize");
var close = document.getElementById("close");

minimize.addEventListener("click", minimizeApp);
maximize.addEventListener("click", maximizeApp);
close.addEventListener("click", closeApp);


function minimizeApp(){
    log("Minimizing editor.");
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximizeApp(){
    log("Maximizing editor.");
    if(window.screen.width - remote.getCurrentWindow().getSize()[0] < 50 && window.screen.height - remote.getCurrentWindow().getSize()[1] < 33){        
        remote.BrowserWindow.getFocusedWindow().maximize();
    }else{
        remote.BrowserWindow.getFocusedWindow().maximize();

    }

}   

function closeApp(){
    log("Closing editor.");
    var active_file_path = settings_data.active_file_path;

    if(active_file_path === undefined || active_file_path == "Untitled"){
        save_alert();
    }else{
        remote.getCurrentWindow().close();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}