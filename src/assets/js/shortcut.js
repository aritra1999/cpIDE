$(window).bind("keydown", function(event){
    if(event.ctrlKey){
        switch(String.fromCharCode(event.which).toLocaleLowerCase()){
            case 'o':   log("Shortcut Open");
                        openFileExp.click();
                        break; 
            case 'x':   log("Shortcut Close");
                        closeApp();
                        break;
            case 's':   log("Shortcut Save");
                        saveFile();
                        break;
            case 'n':   log("Shortcut New File");
                        newFile();
                        break;
        }
        if(event.keyCode == 13){
            log("Run");
            runfile();
        }
    }
    
})