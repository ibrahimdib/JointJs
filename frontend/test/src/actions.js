




var image1 = null;
var image2 = null;
var image3 = null;
var image4 = null;
var image5 = null;

var updatedImage = [];


function generateNewId() {
    var maxId = 0;
    var cells = network1.getCells();
    for (var i = 0; i < cells.length; i++) {
        var cellId = cells[i].id;
        if (cellId > maxId) {
            maxId = cellId;
        }
    }
    return maxId > 0 ? maxId + 1 : 1;
}




var cabinet = null;
paper.on("cell:pointerdown", function (params) {
    if ('cabinet' === params.model.id) {
        var newId = generateNewId();
        var x = params.model.attributes.position.x;
        var y = params.model.attributes.position.y;
        cabinet = new joint.shapes.CabinetGroup.Cabinet({
            id: newId,
            position: { x: x, y: y },
            size: { width: 800, height: 800 },
            attrs: {
                label: {
                    text: 'Cabinet' + newId,
                    event: '',
                    fontWeight: 'bold',
                    cursor: 'text',
                    style: {
                        userSelect: 'text'
                    }
                },
                body: {
                    fill: "gray",
                    refHeight: "100%",
                    refWidth: "100%",
                    stroke: "#000000",
                    strokeWidth: 3
                },
            },
            shelves: [],
        });
        cabinet.addTo(network1);
    }
});

var shelf = null;
paper.on("cell:pointerdown", function (params) {

    if ('shelf' === params.model.id && cabinet != undefined) {
        var newId = generateNewId();
        var x = params.model.attributes.position.x;
        var y = params.model.attributes.position.x;
        shelf = new joint.shapes.ShelfGroup.Shelf({
            id: newId,
            position: { x: x, y: y + 200 },
            size: { width: 400, height: 400 },
            attrs: {
                label: {
                    text: '',
                    event: '',
                    fontWeight: 'bold',
                    cursor: 'text',
                    style: {
                        userSelect: 'text'
                    }
                },
                body: {
                    fill: "#FFFFFF",
                    refHeight: "100%",
                    refWidth: "100%",
                    stroke: "#000000",
                    strokeWidth: 3
                },
            },
            boards: []
        });
        shelf.addTo(network1);

    }
});



paper.on("cell:pointerdown", function (params) {
    if ('board' === params.model.id && shelf != undefined) {

        var x = params.model.attributes.position.x;
        var y = params.model.attributes.position.x;
        newId = generateNewId();
        image1 = new joint.shapes.basic.DecoratedRect({
            id: 'image1' + newId,
            position: { x: x + 20, y: y + 400 },
            attrs: {
                image: {
                  
                    'xlink:href': '../../frontend/test/images/port001.svg'
                }
            }
        });

        image2 = new joint.shapes.basic.DecoratedRect({
            id: 'image2' + newId,
            position: { x: x + 120, y: y + 400 },
            attrs: {
                image: {
                 
                    'xlink:href': '../../frontend/test/images/port002.svg'
                }
            }
        });

        image3 = new joint.shapes.basic.DecoratedRect({
            id: 'image3' + newId,
            position: { x: x + 220, y: y + 400 },
            attrs: {
                image: {
                   
                    'xlink:href': '../../frontend/test/images/port003.svg'
                }
            }
        });

        image4 = new joint.shapes.basic.DecoratedRect({
            id: 'image4' + newId,
            position: { x: x + 20, y: y + 450 },
            attrs: {
                image: {
                   
                    'xlink:href': '../../frontend/test/images/serial-port.svg'
                }
            }
        });

        image5 = new joint.shapes.basic.DecoratedRect({
            id: 'image5' + newId,
            position: { x: x + 120, y: y + 450 },
            attrs: {
                image: {
                
                    'xlink:href': '../../frontend/test/images/serial.svg'
                }
            }
        });


        var board = new joint.shapes.BoardGroup.Board({
            id: newId,
            position: { x: x, y: y + 400 },
            size: { width: 400, height: 120 },
            attrs: {
                label: {
                   
                    event: '',
                    fontWeight: 'bold',
                    cursor: 'text',
                    style: {
                        userSelect: 'text'
                    }
                },
                body: {
                    fill: "cyan",
                    refHeight: "100%",
                    refWidth: "100%",
                    stroke: "#000000",
                    strokeWidth: 3
                },
                images: [],
            },
        });

        if (board != null && image1 != null) {
            board.embed(image1);
            board.embed(image2);
            board.embed(image3);
            board.embed(image4);
            board.embed(image5);

            updatedImage.push(image1);
            updatedImage.push(image2);
            updatedImage.push(image3);
            updatedImage.push(image4);
            updatedImage.push(image5);
            board.attr({
                images: updatedImage,
            });
        } else {
            console.log('Parent object is null');
        }

        network1.addCell(board);
        network1.addCell(image1);
        network1.addCell(image2);
        network1.addCell(image3);
        network1.addCell(image4);
        network1.addCell(image5);

    }
});


var currentBoard = null;
var currentShelf = null;
var currentCabinet = null;

var updatedShelves = [];
var updatedBoard = [];



var _shelf = null;
paper1.on("cell:pointerdown", function (params) {
    _shelf = params.model.id;

    var typeNode = params.model.get('type');

    if (_shelf != undefined && typeNode === 'ShelfGroup.Shelf') {
        console.log("shelf here");
        currentShelf = network1.getCell(_shelf);
    } else {
        console.log('shelf is null');
    }


});

var _cabinet = null;
paper1.on("cell:pointerdown", function (params) {
    _cabinet = params.model.id;

    var typeNode = params.model.get('type');

    if (_cabinet != undefined && typeNode === 'CabinetGroup.Cabinet') {
        currentCabinet = network1.getCell(_cabinet);

        if (currentCabinet != null && currentShelf != null) {

        //    currentCabinet.resize(currentShelf.size().width + 100, currentShelf.size().height + 100);

            if (currentCabinet instanceof joint.dia.Element) {


                if (!updatedShelves.includes(currentShelf)) {
                    updatedShelves.push(currentShelf);
                    currentCabinet.embed(currentShelf);
                    currentCabinet.attr({
                        shelves: updatedShelves,
                    });

                }


            }

            console.error("CABINET", currentCabinet);
        } else {
            console.log('Child object is null');
        }


    }


});



var _board = null;
paper1.on("cell:pointerdown", function (params) {

    _board = params.model.id;
    var typeNode = params.model.get('type');



    if (_board != undefined && typeNode === 'BoardGroup.Board') {
        console.log("Board here");
        currentBoard = network1.getCell(_board);
    } else {
        console.log('Board is null');
    }
});

var __shelf = null;
paper1.on("cell:pointerdown", function (params) {

    __shelf = params.model.id;
    var typeNode = params.model.get('type');


    if (__shelf != undefined && typeNode === 'ShelfGroup.Shelf') {
        currentShelf = network1.getCell(__shelf);

        if (currentShelf != null && currentBoard != null) {

          //  currentShelf.resize(currentBoard.size().width + 100, currentBoard.size().height + 100);

            if (currentShelf instanceof joint.dia.Element) {

                if (!updatedBoard.includes(currentBoard)) {

                    updatedBoard.push(currentBoard);
                    currentShelf.attr({
                        boards: updatedBoard,
                    });
                    currentShelf.embed(currentBoard);
                }

            }
        } else {
            console.log('Child object is null');
        }

    }



});





network1.on('change:size', function (cell, newPosition, opt) {

    if (opt.skipParentHandler) return;

    if (cell.get('embeds') && cell.get('embeds').length) {
        // If we're manipulating a parent element, let's store
        // it's original size to a special property so that
        // we can shrink the parent element back while manipulating
        // its children.
        cell.set('originalSize', cell.get('size'));
    }
});

network1.on('change:position', function (cell, newPosition, opt) {

    if (opt.skipParentHandler) return;

    if (cell.get('embeds') && cell.get('embeds').length) {
        // If we're manipulating a parent element, let's store
        // it's original position to a special property so that
        // we can shrink the parent element back while manipulating
        // its children.
        cell.set('originalPosition', cell.get('position'));
    }

    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = network1.getCell(parentId);

    if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
    if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

    var originalPosition = parent.get('originalPosition');
    var originalSize = parent.get('originalSize');

    var newX = originalPosition.x;
    var newY = originalPosition.y;
    var newCornerX = originalPosition.x + originalSize.width;
    var newCornerY = originalPosition.y + originalSize.height;

    _.each(parent.getEmbeddedCells(), function (child) {

        var childBbox = child.getBBox();

        if (childBbox.x < newX) { newX = childBbox.x; }
        if (childBbox.y < newY) { newY = childBbox.y; }
        if (childBbox.corner().x > newCornerX) { newCornerX = childBbox.corner().x; }
        if (childBbox.corner().y > newCornerY) { newCornerY = childBbox.corner().y; }
    });

    // Note that we also pass a flag so that we know we shouldn't adjust the
    // `originalPosition` and `originalSize` in our handlers as a reaction
    // on the following `set()` call.
    parent.set({
        position: { x: newX, y: newY },
        size: { width: newCornerX - newX, height: newCornerY - newY }
    }, { skipParentHandler: true });
});



var deleteNode = document.getElementById('delete');
var node;
var type;
paper1.on("cell:pointerdown", function (params) {
    node = params.model.id;
    type = params.model.get('type');

});

var cabinet = null;
deleteNode.addEventListener("click", function (event) {
    console.log(network1.getCells());
    if (node != undefined) {
        switch (type) {
            case 'CabinetGroup.Cabinet':

                cabinet = network1.getCell(node);

                if (cabinet) {
                    var embeddedCells = cabinet.getEmbeddedCells();
                    while (embeddedCells.length > 0) {
                        var cell = embeddedCells.pop();
                        if (cell) {
                            network1.removeCells(cell);
                        }

                    }
                    network1.removeCells(cabinet);



                }
                console.log(network1.getCells());
                break;

            case 'ShelfGroup.Shelf':

                var shelf = network1.getCell(node);

                if (shelf) {
                    var embeddedCells = shelf.getEmbeddedCells();
                    while (embeddedCells.length > 0) {
                        var cell = embeddedCells.pop();
                        if (cell) {
                            network1.removeCells(cell);
                        }

                    }
                    network1.removeCells(shelf);

                }

                break;

            case 'BoardGroup.Board':

                var board = network1.getCell(node);

                if (board) {
                    var embeddedCells = board.getEmbeddedCells();
                    while (embeddedCells.length > 0) {
                        var cell = embeddedCells.pop();
                        if (cell) {
                            network1.removeCells(cell);
                        }

                    }
                    network1.removeCells(board);

                }

                break;




            default:
                console.log("error");
        }
    }
});



var unembendNode = document.getElementById('unembed');


var cabinet = null;
unembendNode.addEventListener("click", function (event) {
    if (node != undefined) {
        switch (type) {
            case 'CabinetGroup.Cabinet':
                var cabinet = network1.getCell(node);

                if (cabinet) {
                    var embeddedShelves = cabinet.getEmbeddedCells();
                    while (embeddedShelves.length > 0) {
                        var shelf = embeddedShelves.pop();
                        if (shelf) {
                            cabinet.unembed(shelf);

                        }
                    }

                  
                    cabinet.attr({ shelves: []});
                }

                console.log("clicked cabinet", cabinet);
                break;
            default:
                console.log("error");
        }
    }
});



 



