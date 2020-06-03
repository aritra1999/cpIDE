function get_ext(path){
    paths = path.split('.');
    return paths[paths.length-1];
}

function get_mode(ext){
    switch(ext){
        case "cpp":return "c_cpp"; 
        case "c":return "c_cpp"; 
        case "py":return "python"; 
        case "java":return "java"; 
        default: return "invalid";
    }
}

function getPathFromName(path){ 

    var dir = "";
    if(navigator.platform.includes("Win") || navigator.platform.includes("win"))
        dir = "\\";
    else dir = "/";

    var paths = path.split(dir);
    var abs_path = "";

    for(var i=0;i<paths.length-1;i++){
        abs_path += (paths[i] + dir);
    }
    return abs_path;
}

function save_alert(){
    const options = {
        type: 'question',
        buttons: ['Save', 'Cancel', 'Exit'],
        title: 'Save',
        message: 'Save File?',
      };
    
    dialog.showMessageBox(null, options).then(function(v){
        switch(v.response){
            case 0: saveFile();break;
            case 1: break;
            case 2: remote.getCurrentWindow().close();
            default: console.log("Invalid");break;
        }
    })
}

// On startup
function on_startup(){

    log("Startup.")

    var file_path = settings_data.active_file_path;
    var ext = get_ext(file_path);
    var last_input = settings_data.last_input;

    editor.setTheme("ace/theme/" + settings_data.activeTheme);
    editor.session.setMode("ace/mode/c_cpp");

    log("Pulling and applying cached settings...")

    document.getElementById("editor-font").value = settings_data.editor_font_family;
    document.getElementById("ide-font").value = settings_data.ide_font_family;
    document.getElementById("editor-font-size").value = settings_data.editor_font_size;
    document.getElementById("theme").value = settings_data.activeTheme;

    log("Pulling and setting last input file...")

    if(last_input == "" || last_input == undefined){
        
        document.getElementById("input").innerHTML = ""; 
        log("Input file not found!");
        log("Setting input data to NULL");

    }else{
        fs.readFile(last_input, function(err, input){
            if(err){
                console.log(err);
                return;
            }
            document.getElementById("input").innerHTML = input; 
        })
    }

    log("Pulling and setting last code...");

    if(file_path != "Untitled *" && file_path != undefined){    
        fs.readFile(file_path, function(err, code){
            if(err){
                console.log(err);
                return;
            }
            
            var mode = get_mode(ext);

            editor.setValue(code.toString());
            editor.clearSelection();
            editor.session.setMode("ace/mode/"+mode);

            document.getElementById("fileName").innerHTML = settings_data.active_file_path;
            document.getElementById("language").value = mode;                    
            
        })
    }else{
        log("Source file not found!");
        log("Setting editor code to NULL");

        var code = "";
        editor.setValue(code.toString());
    }
}

function log(message){
    var date = new Date();
    var utcDate = date.toUTCString();

    console.log("[ LOG | " + utcDate + " ] " + message);
}