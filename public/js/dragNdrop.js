function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    const xhr = new XMLHttpRequest();
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let target = ev.target.id;
    xhr.open("POST", "/drop", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(
        {"albums":target, "image":data}
        ));
    let album = ev.target.className;
    confirm(`image succesfully added to ${album}`);
}