function Start() {
    scree.showCursor = true;
}

function onMouseOver(){
    this.guiText.color = color.red;
}

function onMouseExit(){
    this.guiText.material = color.white;
}