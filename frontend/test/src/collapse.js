var flag = false;
var shelf = null;
var board = null;
var embeddedBoards;
var embeddedImages;
var image = null;
paper1.on('element:button:pointerdown', function(elementView) {
    var element = elementView.model;
    // `toggle()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
    element.toggle();
    var embeddedShelves = element.getEmbeddedCells();
    
    
    while (embeddedShelves.length > 0) {
         shelf = embeddedShelves.pop();
        if (shelf) {
            shelf.attr('rect/display', 'none');
            shelf.attr('button/display', 'none');
            shelf.toggle();
         

            embeddedBoards = shelf.getEmbeddedCells();
            while(embeddedBoards.length > 0){
                board = embeddedBoards.pop();
                if(board){
                    board.toggle();
                    embeddedImages = board.getEmbeddedCells();
                    while(embeddedImages.length > 0){
                        image = embeddedImages.pop();
                        if(image){
                            image.toggle();
                        }
                    }
                }

            }
        }
    }
   
    // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
    element.fitAncestorElements();

});





var flag1 = false;
var shelf1 = null;
var board1 = null;
var embeddedImages1;
var image1 = null;
paper1.on('shelf:button:pointerdown', function(elementView) {
    var element = elementView.model;
 
    // var parentId = elementView.get('parent');
    console.log(elementView.model);
    element.toggle();

    var embeddedBoards1 = element.getEmbeddedCells();
    while (embeddedBoards1.length > 0) {
         board1 = embeddedBoards1.pop();
        if (board1) {
            board1.toggle();
            embeddedImages1 = board1.getEmbeddedCells();
            while(embeddedImages1.length > 0){
                image1 = embeddedImages1.pop();
                if(image1){
                    image1.toggle();
                }

            }
        }
    }
   
    // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
    element.fitAncestorElements();

});



paper1.on('element:pointermove', function(elementView) {
    var element = elementView.model;
    // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
 
    var tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
    element.fitAncestorElements();
    
});

paper1.on('cell:mouseover', function(cellView) {
  var tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'block';
  tooltip.style.left = cellView.model.attributes.position.x + 170+'px';
  tooltip.style.top = cellView.model.attributes.position.y + 200 + 'px';
  tooltip.innerHTML = cellView.model.id;
});

paper1.on('cell:mouseout', function(cellView, evt, x, y) {
  var tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'none';
});
