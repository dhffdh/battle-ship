
export class ship {

    name = 'ship';
    long = 1;
    x = 0;
    y = 0;
    vertical = true;
    index = false;

    constructor(params = {}) {

        if(params.long){
            this.long = params.long;
        }

        if( params.x > -1 && params.y > -1){
            this.x = params.x;
            this.y = params.y;
        }
        if( typeof params.vertical !== 'undefined'){
            this.vertical = params.vertical;
        }
        if(params.index > -1){
            this.index = params.index;
        }

        //console.log('constructor params this', params , this);
    }

    /*getRandomCords() {
        this.x = this.randomInteger(0,9);
        this.y = this.randomInteger(0,9);
        this.vertical = this.randomInteger(0,1);
    };
    randomInteger(min, max) {
        let rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
    };*/

    drawShip(R) {
        let side = Floor.size;
        let x_l,y_l;
        if(this.vertical){
            x_l = 1;
            y_l = this.long;
        }else{
            x_l = this.long;
            y_l = 1;
        }

        this.rect = R.rect( - 100 , -100 , side*x_l, side*y_l)
            .attr({
                fill: 'red'
            });

        this.rect.node.classList.add('b-ship');


        this.rect.dblclick(function () {

            this.self.vertical = !this.self.vertical;

            if( !Floor.checkFloorAccess(this.self.x , this.self.y , this.self ) ){

                this.self.vertical = !this.self.vertical;
                return false;

            }


            this.self.updateVertical();


        });

        this.rect.self = this;

        this.updateCoords();

    };

    updateCoords(){
        //console.log('updateCoords: ship',this.rect.node.classList );

        let newX = this.x * Floor.size + Floor.offsetX;
        let newY = this.y * Floor.size + Floor.offsetY;

        this.rect.attr({x: newX , y: newY});

    };

    updateVertical(){
        console.log('updateVertical',this);

        let x_l,y_l;
        if(this.vertical){
            x_l = 1;
            y_l = this.long;
        }else{
            x_l = this.long;
            y_l = 1;
        }

        this.rect.attr({
            width: Floor.size*x_l,
            height: Floor.size*y_l,
        });

    };

}

export let Floor = {

    lengthTypes: [4,3,3,2,2,2,1,1,1,1],
    size: 36,
    offsetX: 20,
    offsetY: 20,
    maxX: 9,
    maxY: 9,

    demoCoords: [
        {x:1,y:0,v: false},
        {x:1,y:7,v: true},
        {x:3,y:3,v: true},
        {x:7,y:3,v: false},
        {x:7,y:5,v: false},
        {x:6,y:9,v: false},
        {x:7,y:7,v: true},
        {x:9,y:7,v: false},
        {x:9,y:9,v: false},
        {x:1,y:4,v: false},
    ],

    accessZone: [],

    drawBattleground(R){

        for (let j = 0; j < this.maxY + 1; j++) {

            this.accessZone[j] = [];

            for (let i = 0; i < this.maxX + 1; i++) {

                this.accessZone[j][i] = {
                    access: true,
                    isShip: false
                };

                let rect = R.rect((this.offsetX + this.size * i), (this.offsetY + this.size * j), this.size, this.size)
                    .attr({
                        'stroke-width': '1px',
                        fill: '#fafafa',
                        stroke: '#7474fd',
                    })

                rect.node.classList.add('b-floor-grid-item');

            }
        }
        //console.log('accessZone',this.accessZone);
    },
    clearAccessZone(){
        for (let j = 0; j < this.maxY+ 1; j++) {
            for (let i = 0; i < this.maxX + 1; i++) {
                this.accessZone[j][i].access = true;
                this.accessZone[j][i].isShip = false;
                this.accessZone[j][i].isArea = false;
            }
        }
    },

    fillAccessZone(arShips,currentShip = false){

        //console.log('fillAccessZone currentShip', currentShip);
        //console.log('fillAccessZone accessZone',this.accessZone);

        this.clearAccessZone();

        //Обходим корабли
        for ( let ship of arShips){

            if( currentShip && ship.index === currentShip.index){
                continue;
            }

            //console.log('fillAccessZone ship',ship);
            this.accessZone[ship.y][ship.x].access = false;
            this.accessZone[ship.y][ship.x].isShip = true;

            for(let i = 1;i < ship.long; i++){
                let x,y;
                if(ship.vertical) {
                    y = ship.y + i;
                    x = ship.x;
                }else{
                    x = ship.x + i;
                    y = ship.y;
                }
                this.accessZone[y][x].access = false;
                this.accessZone[y][x].isShip = true;
            }
        }


        //Обходим вокруг кораблей
        for (let j = 0; j < this.maxY + 1; j++) {
            for (let i = 0; i < this.maxX + 1; i++) {

                if( this.accessZone[j][i].isShip === true ){

                    for (let j_box = -1; j_box <= 1; j_box++) {
                        for (let i_box = -1; i_box <= 1; i_box++) {
                            let i_new = i + i_box;
                            let j_new = j + j_box;
                            if( this.checkPosInFloor(i_new, j_new)){
                                if( this.accessZone[j_new][i_new].access === true ){
                                    this.accessZone[j_new][i_new].access = false;
                                    this.accessZone[j_new][i_new].isArea = true;
                                }
                            }
                        }
                    }

                }
            }
        }

    },
    /**
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    checkPosInFloor(x,y){
        if(( x < 0 || y < 0 || x > this.maxX || y > this.maxY )){
            return false;
        }
        return true;
    },
    /**
     *
     * @param x
     * @param y
     * @param currentShip
     * @returns {boolean}
     */
    checkFloorAccess(x, y, currentShip){

        //console.log( 'checkFloorAccess', currentShip );
        for(let i = 0;i < currentShip.long; i++){
            let x_new,y_new;
            if(currentShip.vertical) {
                y_new = y + i;
                x_new = x;
            }else{
                x_new = x + i;
                y_new = y;
            }

            if(!this.checkPosInFloor(x_new,y_new)){
                return false;
            }else{
                if( this.accessZone[y_new][x_new].access === false ){
                    return false;
                }
            }


        }

        return true;
    },

};

export let Engine = {

    LeftR: {}, // Поле игрока
    RightR: {}, // Поле противника
    arShips: [],

    onMove: function (dx,dy) {
        //console.log('onmove: dx,dy',dx,dy,this);

        //let newX = Math.round( (this.ox + dx) / Floor.size ) * Floor.size - Floor.offsetX;
        //let newY = Math.round( (this.oy + dy) / Floor.size ) * Floor.size - Floor.offsetX;

        let newX = this.ox + dx;
        let newY = this.oy + dy;


        this.attr({x: newX, y: newY});
    },
    onStart: function (x,y,e) {

        this.node.classList.add('b-ship--moveble');

        this.ox = this.attr("x");
        this.old_x = this.attr("x");

        this.oy = this.attr("y");
        this.old_y = this.attr("y");


        //console.log('onstart: this',this);

    },
    onEnd: function (e) {


        this.node.classList.remove('b-ship--moveble');

        Engine.getPosOnEnd(this);

        this.self.updateCoords();

    },

    /**
     * Колбэк
     * @param rect
     */
    getPosOnEnd(rect){
        //console.log('getPosOnMouseUp',rect);


        let x_pos = Math.round( ( rect.attr("x") - Floor.offsetX ) / Floor.size );
        let y_pos = Math.round( ( rect.attr("y") - Floor.offsetY ) / Floor.size );

        //console.log('getPosOnEnd: x_pos y_pos',x_pos,y_pos);

        if(x_pos < 0){
            x_pos = 0;
        }
        if(y_pos < 0){
            y_pos = 0;
        }

        if(x_pos > Floor.maxX){
            x_pos = Floor.maxX;
        }
        if(y_pos > Floor.maxY){
            y_pos = Floor.maxY;
        }

        if(this.checkNewPos(rect,{x: x_pos,y: y_pos })){
            rect.self.x = Math.abs(x_pos);
            rect.self.y = Math.abs(y_pos);
        }
    },

    /**
     * Проверка новой позиции корабля
     * @param rect
     * @param coords
     * @returns {boolean}
     */
    checkNewPos(rect, coords){


        //console.log('checkNewPos rect.self',rect.self);

        Floor.fillAccessZone( this.arShips , rect.self );


        if(coords.x < 0|| coords.y < 0){
            return false;
        }
        if(coords.x > Floor.maxX || coords.y > Floor.maxY){
            return false;
        }

        if( !Floor.checkFloorAccess(coords.x , coords.y , rect.self ) ){
            return false;
        }



        return true;
    },

    start: function () {

        Floor.drawBattleground(this.LeftR);
        Floor.drawBattleground(this.RightR);



        let i = 0;
        for ( const L of Floor.lengthTypes  ){

            let X = Floor.demoCoords[i].x;
            let Y = Floor.demoCoords[i].y;
            let V = Floor.demoCoords[i].v;

            this.arShips.push( new ship( {long: L,x: X,y: Y , vertical: V,index: i} ) );

            i++;
        }

        for ( const shipItem of this.arShips  ){

            //console.log('shipItem',shipItem);

            shipItem.drawShip(this.LeftR);
            shipItem.rect.drag(
                this.onMove,
                this.onStart,
                this.onEnd,
            );
        }

        Floor.fillAccessZone( this.arShips  );


    }



};