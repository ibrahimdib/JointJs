



var network = new joint.dia.Graph;

var network1 = new joint.dia.Graph;
// var directedGraphLayout = new joint.layout.DirectedGraph();
// directedGraphLayout.layout(network1);


var paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    width: 100,
    height: 800,
    model: network,
    defaultConnectionPoint: { name: 'boundary' },
    defaultConnector: { name: 'smooth' },
    interactive: { linkMove: false },
    labelsLayer: true,
    frozen: true
});


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

paper.el.style.border = '1px solid #E2E2E2';

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
        button: {
            refDx: - buttonSize - (headerHeight - buttonSize) / 2,
            refY: (headerHeight - buttonSize) / 2,
            cursor: 'pointer',
            event: 'element:button:pointerdown',
            title: 'Collapse / Expand'
        },
        buttonBorder: {
            width: buttonSize,
            height: buttonSize,
            fill: '#000000',
            fillOpacity: 0.2,
            stroke: '#FFFFFF',
            strokeWidth: 0.5,
        },
        buttonIcon: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 1
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
    }, {
        tagName: 'text',
        selector: 'headerText'
    }, {
        tagName: 'g',
        selector: 'button',
        children: [{
            tagName: 'rect',
            selector: 'buttonBorder'
        }, {
            tagName: 'path',
            selector: 'buttonIcon'
        }]
    }],

    toggle: function (shouldCollapse) {
        var buttonD;
        var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
        if (collapsed) {
            buttonD = 'M 2 7 12 7 M 7 2 7 12';
            this.resize(800, 10);
        } else {
            buttonD = 'M 2 7 12 7';
            this.resize(800, 800);
        }
        this.attr(['buttonIcon', 'd'], buttonD);
        this.set('collapsed', collapsed);
    },

    isCollapsed: function () {
        return Boolean(this.get('collapsed'));
    },

    fitAncestorElements:function(){

        

    }



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
        button: {
            refDx: - buttonSize - (headerHeight - buttonSize) / 2,
            refY: (headerHeight - buttonSize) / 2,
            cursor: 'pointer',
            event: 'shelf:button:pointerdown',
            title: 'Collapse / Expand'
        },
        buttonBorder: {
            width: buttonSize,
            height: buttonSize,
            fill: '#000000',
            fillOpacity: 0.2,
            stroke: '#FFFFFF',
            strokeWidth: 0.5,
        },
        buttonIcon: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 1
        }
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
    }, {
        tagName: 'text',
        selector: 'headerText'
    }, {
        tagName: 'g',
        selector: 'button',
        children: [{
            tagName: 'rect',
            selector: 'buttonBorder'
        }, {
            tagName: 'path',
            selector: 'buttonIcon'
        }]
    }],


    toggle: function (shouldCollapse) {
        var buttonD;
        var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
        if (collapsed) {
            buttonD = 'M 2 7 12 7 M 7 2 7 12';
            this.resize(400, 0);

        } else {
            buttonD = 'M 2 7 12 7';
            this.resize(400, 400);
            this.attr('rect/display', 'block');
            this.attr('button/display', 'block');
        }
        this.attr(['buttonIcon', 'd'], buttonD);
        this.set('collapsed', collapsed);
    },

    isCollapsed: function () {
        return Boolean(this.get('collapsed'));
    },
    fitAncestorElements:function(){

        

    }




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

    toggle: function (shouldCollapse) {
        var buttonD;
        var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
        if (collapsed) {
            buttonD = 'M 2 7 12 7 M 7 2 7 12';
            this.resize(0, 0);
            this.attr('rect/display', 'none');
            this.attr('button/display', 'none');
         
        } else {
            buttonD = 'M 2 7 12 7';
            this.resize(400, 150);
       
            this.attr('rect/display', 'block');
            this.attr('button/display', 'block');
           
        }
        this.attr(['buttonIcon', 'd'], buttonD);
        this.set('collapsed', collapsed);
    },

    isCollapsed: function () {
        return Boolean(this.get('collapsed'));
    },
    fitAncestorElements:function(){

        

    }
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
    toggle: function (shouldCollapse) {
        var buttonD;
        var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
        if (collapsed) {
            buttonD = 'M 2 7 12 7 M 7 2 7 12';
            this.resize(0,0),
            this.attr('image/width', 0);
            this.attr('image/height', 0);
            
        } else {
            buttonD = 'M 2 7 12 7';
            this.resize(100,60),
            this.attr('image/width', 100);
            this.attr('image/height', 60);
        }
        this.attr(['buttonIcon', 'd'], buttonD);
        this.set('collapsed', collapsed);
    },

    isCollapsed: function () {
        return Boolean(this.get('collapsed'));
    },
}

);



var mainCabinet = new joint.shapes.CabinetGroup.Cabinet({
    id: 'cabinet',
    position: { x: 10, y: 50 },
    size: { width: 60, height: 60 },

    attrs: {
        label: {
            text: 'Cabinet',
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
},);




var mainShlef = new joint.shapes.ShelfGroup.Shelf({
    id: 'shelf',

    position: { x: 10, y: 150 },
    size: { width: 60, height: 60 },
    attrs: {
        label: {
            text: 'Shlef',
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



});

var mainBoard = new joint.shapes.BoardGroup.Board({
    id: 'board',
    position: { x: 10, y: 250 },
    size: { width: 60, height: 60 },
    attrs: {
        label: {
            text: 'board',
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
            strokeWidth: 3,

        },

    },

});


mainCabinet.addTo(network);
mainShlef.addTo(network);
mainBoard.addTo(network);

paper.unfreeze();
paper.setInteractivity(false)

paper1.unfreeze();


