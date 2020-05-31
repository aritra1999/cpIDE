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
    var paths = path.split("\\");
    var abs_path = "";

    var dir = "";
    if(navigator.platform.includes("Win") || navigator.platform.includes("win"))
        dir = "\\";
    else dir = "/";

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
    const fileName = settingsFile;
    const settings_data = require(fileName);

    var file_path = settings_data.active_file_path;
    var ext = get_ext(file_path);
    var last_input = settings_data.last_input;
    var activeTheme = settings_data.activeTheme;
    var editor_font_family = settings_data.editor_font_family;
    var editor_font_size = settings_data.editor_font_size;
    var ide_font_family = settings_data.ide_font_family;
    
    editor.setTheme("ace/theme/" + activeTheme);
    editor.session.setMode("ace/mode/c_cpp");

    document.getElementById("editor-font").value = editor_font_family;
    document.getElementById("ide-font").value = ide_font_family;
    document.getElementById("editor-font-size").value = editor_font_size;


    if(last_input != "" && last_input != undefined){
        fs.readFile(last_input, function(err, input){
            if(err){
                console.log(err);
                return;
            }
            document.getElementById("input").innerHTML = input; 
        })
    }

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

            active_file_path = file_path;
            document.getElementById("fileName").innerHTML = file_path;
            document.getElementById("language").value = mode;                    
            
        })
    }
}