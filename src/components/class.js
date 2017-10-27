
export class ship {

    name = 'ship';
    long = 1;
    x = 0;
    y = 0;
    vertical = true;

    constructor(params = { x: 0 , y: 0, long: 1}) {
        //console.log('constructor params', params );
        if(params.long){
            this.long = params.long;
        }
        if(params.x && params.y){
            this.x = params.x;
            this.y = params.y;
        }
        if( typeof params.vertical !== 'undefined'){
            this.vertical = params.vertical;
        }
        //console.log('constructor this', this );

    }




    getRandomCords = function() {
        this.x = this.randomInteger(0,9);
        this.y = this.randomInteger(0,9);
        this.vertical = this.randomInteger(0,1);
    };

    randomInteger = function(min, max) {
        let rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
    };

    draw = function (R) {
        let side = 40;
        let x_l,y_l;
        if(this.vertical){
            x_l = 1;
            y_l = this.long;
        }else{
            x_l = this.long;
            y_l = 1;
        }

        this.rect = R.rect((50 + side * this.x), (50 + side * this.y), side*x_l, side*y_l)
            .attr({'stroke-width': '1px', fill: 'red', stroke: '#333'})

    };

    /*static drawShip = function (ship,R) {
        let side = 40;

        let x_l,y_l;

        if(ship.vertical){
            x_l = 1;
            y_l = ship.long;
        }else{
            x_l = ship.long;
            y_l = 1;
        }

        ship.rect = R.rect((50 + side * ship.x), (50 + side * ship.y), side*x_l, side*y_l)
            .attr({'stroke-width': '1px', fill: 'red', stroke: '#333'})

    };*/

}


export let shipInfo = {

    name: 'shipInfo',

    lengthTypes: [4,3,3,2,2,2,1,1,1,1],

    demoCoords: [
        {x:2,y:0,v: false},
        {x:1,y:7,v: true},
        {x:3,y:3,v: true},
        {x:7,y:3,v: false},
        {x:7,y:5,v: false},
        {x:6,y:9,v: true},
        {x:7,y:7,v: true},
        {x:9,y:7,v: false},
        {x:9,y:9,v: false},
        {x:1,y:4,v: false},
    ],

};

export let Engine = {

    onMove: function (dx,dy) {
        //console.log('onmove: dx,dy',dx,dy,this);
        this.attr({x: this.ox + dx, y: this.oy + dy});
    },
    onStart: function (x,y,e) {
        console.log('onstart: x,y,e',x,y,e);
        this.attr({opacity: 0.7});

        this.ox = this.attr("x");
        this.oy = this.attr("y");
    },
    onEnd: function (e) {
        console.log('onend: e',e);
        this.attr({opacity: 1});
    }


};