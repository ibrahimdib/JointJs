




var network1 = new joint.dia.Graph;
// var directedGraphLayout = new joint.layout.DirectedGraph();
// directedGraphLayout.layout(network1);



var paper1 = new joint.dia.Paper({
    el: document.getElementById('paper1'),
    width: 1000,
    height: 800,
    model: network1,
    async: true,
    defaultConnectionPoint: { name: 'boundary' },
    defaultConnector: { name: 'smooth' },
    interactive: { linkMove: false },
    labelsLayer: true,
    frozen: true,

});



paper1.el.style.border = '1px solid #E2E2E2';


 

var headerHeight = 30;
var buttonSize = 14;
joint.dia.Element.define('CabinetGroup.Cabinet', {

    collapsed: false,
    attrs: {
        root: {
            magnetSelector: 'body'
        },
        shadow: {
            refWidth: '100%',
            refHeight: '100%',
            x: 3,
            y: 3,
            fill: '#000000',
            opacity: 0.05
        },
        body: {
            refWidth: '100%',
            refHeight: '100%',
            strokeWidth: 1,
            stroke: '#DDDDDD',
            fill: '#FCFCFC'
        },
        header: {
            refWidth: '100%',
            height: headerHeight,
            strokeWidth: 0.5,
            stroke: '#4666E5',
            fill: '#4666E5'
        },
        headerText: {
            textVerticalAnchor: 'middle',
            textAnchor: 'start',
            refX: 8,
            refY: headerHeight / 2,
            fontSize: 16,
            fontFamily: 'sans-serif',
            letterSpacing: 1,
            fill: '#FFFFFF',
            textWrap: {
                width: -40,
                maxLineCount: 1,
                ellipsis: '*'
            },
            style: {
                textShadow: '1px 1px #222222',
            }
        },
       
   
    }
}, {
    markup: [{
        tagName: 'rect',
        selector: 'shadow'
    }, {
        tagName: 'rect',
        selector: 'body'
    }, {
        tagName: 'rect',
        selector: 'header'
    }, ],





});




joint.dia.Element.define('ShelfGroup.Shelf', {

    collapsed: false,
    attrs: {
        root: {
            magnetSelector: 'body'
        },
        shadow: {
            refWidth: '100%',
            refHeight: '100%',
            x: 3,
            y: 3,
            fill: '#000000',
            opacity: 0.05
        },
        body: {
            refWidth: '100%',
            refHeight: '100%',
            strokeWidth: 1,
            stroke: '#DDDDDD',
            fill: '#FCFCFC'
        },
        header: {
            refWidth: '100%',
            height: headerHeight,
            strokeWidth: 0.5,
            stroke: '#4666E5',
            fill: 'green'
        },
        headerText: {
            textVerticalAnchor: 'middle',
            textAnchor: 'start',
            refX: 8,
            refY: headerHeight / 2,
            fontSize: 16,
            fontFamily: 'sans-serif',
            letterSpacing: 1,
            fill: '#FFFFFF',
            textWrap: {
                width: -40,
                maxLineCount: 1,
                ellipsis: '*'
            },
            style: {
                textShadow: '1px 1px #222222',
            }
        },

    }
}, {
    markup: [{
        tagName: 'rect',
        selector: 'shadow'
    }, {
        tagName: 'rect',
        selector: 'body'
    }, {
        tagName: 'rect',
        selector: 'header'
    },],


 
}, {
    // staticProperties
});

joint.dia.Element.define('BoardGroup.Board', {

}, {

    markup: [{
        tagName: 'rect',
        selector: 'body'
    }, {
        tagName: 'text',
        selector: 'label'
    }],

  
}, {
    // staticProperties
});


joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.DecoratedRect',
        size: {width: 100, height: 60},
        attrs: {
            'rect': { fill: 'transparent', stroke: '', width: 100, height: 60},
            'text': { 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
            'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 100, height: 60 }
        },
        



    }, joint.shapes.basic.Generic.prototype.defaults),
   
}

);

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




var cabinets = [];
var currentCabinetIndex =0;

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

            // Get all cabinets
            cabinets = network1.getElements().filter(function(el) {
                return el.attributes.type === "CabinetGroup.Cabinet";
            });

            // Initially, hide all cabinets
            cabinets.forEach(function(cabinet) {
                cabinet.attr('rect/display', 'none');
            });

            // Display the first cabinet if exists
            if (cabinets.length > 0) {
                displayCabinet(0);
            }
        };
        reader.readAsText(file);
    };
    input.click();
});


function displayCabinet(index) {
    // Hide all cabinets
    cabinets.forEach(function(cabinet) {
        var embeddedCells = cabinet.getEmbeddedCells();
        while (embeddedCells.length > 0) {
            var cell = embeddedCells.pop();
            if (cell) {
                cell.attr('rect/display', 'none');
                
            }

        }
        cabinet.attr('rect/display', 'none');
    });

    var embeddedCells = cabinets[index].getEmbeddedCells();
    while (embeddedCells.length > 0) {
        var cell = embeddedCells.pop();
        if (cell) {
            cell.attr('rect/display', 'block');
        }

    }
    cabinets[index].attr('rect/display', 'block');
}


document.getElementById('prevCabinet').addEventListener('click', function () {
    if (currentCabinetIndex > 0) {
        currentCabinetIndex--;
        displayCabinet(currentCabinetIndex);
    }
});

document.getElementById('nextCabinet').addEventListener('click', function () {
    if (currentCabinetIndex < cabinets.length - 1) {
        currentCabinetIndex++;
        displayCabinet(currentCabinetIndex);
    }
});




paper1.unfreeze();
paper1.setInteractivity(false)




