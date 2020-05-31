function update_file_path(file_path){

    const fileName = settingsFile;
    const settings_data = require(fileName);

    settings_data.active_file_path = file_path;
    
    fs.writeFile(fileName, JSON.stringify(settings_data), function writeJSON(err) {
        if (err) return console.log(err);

    });
    
}

function changeTheme(){
    var selected_theme = document.getElementById('theme').value;
    editor.setTheme("ace/theme/" + selected_theme);
    document.getElementById('settings').style.display='none';
    
    closeNav(); 

    const fileName = settingsFile;
    const settings_data = require(fileName);

    settings_data.activeTheme = selected_theme;
    fs.writeFile(fileName, JSON.stringify(settings_data), function writeJSON(err) {
        if (err) return console.log(err);

    });
}

function changeSettings(){
    const fileName = settingsFile;
    const settings_data = require(fileName);

    var editor_font_family = document.getElementById("editor-font").value;
    var ide_font_family = document.getElementById("ide-font").value;
    var editor_font_size = document.getElementById("editor-font-size").value;

    settings_data.editor_font_family = editor_font_family;
    settings_data.editor_font_size = editor_font_size;
    settings_data.ide_font_family = ide_font_family;

    fs.writeFile(fileName, JSON.stringify(settings_data), function writeJSON(err) {
        if (err) return console.log(err);

    });

    on_startup();
    
    location.reload();

}