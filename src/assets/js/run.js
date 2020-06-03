function runfile(){

    active_file_path = settings_data.active_file_path;

    var editor = ace.edit('editor');
    var code = editor.getSession().getValue()
    var input = document.getElementById('input').value;
    var language = document.getElementById('language').value;
    var OS = navigator.platform;
    var exec_command = ext = "";
    var abs_path = getPathFromName(active_file_path);

    // Check if code is saved or not
    if(active_file_path == "Untitled" || active_file_path === undefined){
        saveFile();
        return;
    }
    
    // Saving input in input file
    log("Writing input to file...");    
    fs.writeFile( abs_path + 'input.in', input, (err)=>{
        if (err) console.log(err);
    })

    log("Updating input file name in settings.json");
    settings_data.last_input = abs_path + 'input.in';

    fs.writeFile(settingsFile, JSON.stringify(settings_data), function writeJSON(err) {
        if (err) return console.log(err);
    });


    switch(language){
        case "c_cpp":   ext = "cpp";
                        if(OS.toLowerCase().includes("win")){ 
                            exec_command = 'g++ "' + active_file_path + '" -o "' + abs_path + 'a.exe" && "' + abs_path + 'a.exe" <"' + abs_path + 'input.in"> "' + abs_path + 'output.out"';
                        }else{
                            exec_command = 'g++ "' + active_file_path + '" -o "' + abs_path + 'a.out" && ./"' + abs_path + 'a.out" <"' + abs_path + 'input.in"> "' + abs_path + 'output.out"';
                        }
                        break;
        case "python":  ext = "py";
                        exec_command = 'python "' + active_file_path + '" <"' + abs_path + 'input.in"> "' + abs_path + 'output.out"';
                        break;
        case "java":    ext = "java" ;
                        exec_command = 'java "' + active_file_path + '" <"' + abs_path + 'input.in"> "' + abs_path + 'output.out"';
                        break;
    }
    console.log(exec_command);
    
    // Check if file extension and
    if(get_ext(active_file_path) != ext){
        alert("Your language does not match with your file extension.");
        retrun;
    }

    // Save code from editor to file.
    fs.writeFile(active_file_path, code, (err) => { 
        if (err) console.log(err); 
    })


    //Execute and run
    document.getElementById('output').value = "Running...";
    exec(exec_command, function (error, stdOut, stdErr) {
        
        if (error) {    
            if (error.toString().includes("-linux-gnu/Scrt1.o: In function `_start':")){
                runfile();
                
            }else{
                error = error.toString().replace(exec_command, "");
                error = error.toString().replace("Error: Command failed:", "");
                document.getElementById('output').value = error.toString();
            }
        } else {
            
            var output_file_path = abs_path + 'output.out';

            fs.readFile(output_file_path, 'utf-8', (err, data) => {
                if(err){
                    console.log("An error ocurred reading the file :" + err.message);
                    return;
                }
                console.log("Data: ", data);
                document.getElementById('output').value = data;
            });
        }
    });        
}

function language_changed(language){
    var mode =  "";
    
    switch(language.value){
        case "java": mode = "java";break;
        case "c_cpp": mode = "c_cpp";break;
        case "python": mode = "python";break;
    }
    
    editor.session.setMode("ace/mode/"+mode);
}

