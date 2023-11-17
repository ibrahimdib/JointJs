document.getElementById('save').addEventListener('click', function () {
    var network1Data = network1.toJSON();
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(network1Data));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "network1.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});


document.getElementById('load').addEventListener('click', function () {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var fileContent = event.target.result;
            var network1Data = JSON.parse(fileContent);
            network1.fromJSON(network1Data);
        };
        reader.readAsText(file);
    };
    input.click();
});



function graphToXML(graph) {
    var xml = '<graph>';
 
    graph.getCells().forEach(function(cell) {
        xml += '<cell id="' + cell.id + '">';
        xml += '<position x="' + cell.position().x + '" y="' + cell.position().y + '"/>';
        xml += '<size width="' + cell.size().width + '" height="' + cell.size().height + '"/>';
        xml += '</cell>';
    });
 
    xml += '</graph>';
 
    return xml;
 }


paper1.on("cell:pointerdown", function (params) {
    console.log("hi")

});




