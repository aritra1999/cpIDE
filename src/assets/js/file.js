const newBtn = document.getElementById('newBtn');
const openFileExp = document.getElementById('openFileExp');
const saveAsBtn = document.getElementById('saveAsBtn');

// Creating a new file
newBtn.addEventListener('click', newFile);
function newFile(){
    dialog.showSaveDialog(null).then(function(v){
        var file_name = v.filePath;

        var ext = get_ext(file_name);
        var accepted = ["cpp", "c", "py", "java"];

        if(accepted.includes(ext)){
            fs.writeFile(file_name, "", function(err){
                if(err){
                    console.log(err);
                    return; 
                }
                closeNav();

                update_file_path(file_name);
                document.getElementById("fileName").innerHTML = file_name;

                var mode = get_mode(ext);
                editor.session.setMode("ace/mode/"+mode);
                document.getElementById("language").value = mode;  
                
            })
        }else{
            alert("File type not supported");
        }
    })
    
}

// Opening a file
openFileExp.addEventListener('click', function(event){
    document.getElementById("openBtn").click();
})
function open_file(){
    var name = document.getElementById("openBtn");
    var file_name = name.files.item(0).name;
    var file_path = name.files.item(0).path;
    var file_type = name.files.item(0).type;

    closeNav();
    var ext = get_ext(file_path);
    fs.readFile(file_path, function(err, code){
        if(err){
            console.log(err);
            return;
        }
        
        var mode = get_mode(ext);
        
        update_file_path(file_path);

        editor.setValue(code.toString());
        editor.clearSelection();
        editor.session.setMode("ace/mode/"+mode);

        document.getElementById("fileName").innerHTML = file_path;
        document.getElementById("language").value = mode;                    
    
    })
}

// Saving as file

saveAsBtn.addEventListener('click',saveFile);
function saveFile(){
    var file_name_promise = dialog.showSaveDialog(null);
    file_name_promise.then(function(v){
        var file_name = v.filePath;
        var code = editor.getSession().getValue();

        fs.writeFile(file_name, code, function(err){
            if(err)
                console.log(err);
        })

        document.getElementById("fileName").innerHTML = active_file_path;
    })
}   

// Save 

