
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

    drawShadowShip(R) {

        /*
        let side = Floor.size;
        let x_l,y_l;
        if(this.vertical){
            x_l = 1;
            y_l = this.long;
        }else{
            x_l = this.long;
            y_l = 1;
        }
        this.rect = R.rect( 0 , 0 , side*x_l, side*y_l)
            .attr({
                fill: 'white'
            });
        this.rect.node.classList.add('b-svg-ship','b-svg-ship-shadow');
        this.rect.self = this;
        this.updateCoords();
        */

    };

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
                fill: 'white'
            });

        this.rect.node.classList.add('b-svg-ship');


        this.rect.dblclick(function () {
            this.self.vertical = !this.self.vertical;
            //Проверка поля при смене вертикали короля
            if( !Floor.checkFloorAccess({x: this.self.x , y:this.self.y} , this.self ) ){
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
        //console.log('updateVertical',this);

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
    offsetX: 30,
    offsetY: 30,
    maxX: 9,
    maxY: 9,
    rivalPoints: [],

    demoCoords: [
        {x:5,y:0,v:false},
        {x:1,y:7,v:true},
        {x:3,y:3,v:true},
        {x:7,y:3,v:false},
        {x:7,y:5,v:false},
        {x:6,y:9,v:false},
        {x:7,y:7,v:true},
        {x:9,y:7,v:false},
        {x:9,y:9,v:false},
        {x:1,y:4,v:false},
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
                        fill: '#fff',
                    });
                rect.node.classList.add('b-svg-grid-item');
            }
        }
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
                            if( this.checkPosInFloor({x:i_new, y:j_new})){
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
    checkPosInFloor(coords){
        if(( coords.x < 0 || coords.y < 0 || coords.x > this.maxX || coords.y > this.maxY )){
            return false;
        }
        return true;
    },

    /**
     * Проверка поля на новые координаты x, y для корабля currentShip
     *
     * @param x
     * @param y
     * @param currentShip
     * @returns {boolean}
     */
    checkFloorAccess(coords, currentShip){

        //console.log( 'checkFloorAccess coords', coords );

        for(let i = 0;i < currentShip.long; i++){
            let x_new,y_new;
            if(currentShip.vertical) {
                y_new = coords.y + i;
                x_new = coords.x ;
            }else{
                x_new = coords.x  + i;
                y_new = coords.y;
            }

            if(!this.checkPosInFloor({x:x_new,y:y_new})){
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

    R: {}, // Поле игрока
    RightR: {}, // Поле противника
    arShips: [], // Массив кораблей
    shadowShip: {}, // Корабль-тень для эффекта привязки к сетке,

    onMove: function (dx,dy) {
        //console.log('onmove: dx,dy',dx,dy,this);

        //let newX = this.ox + dx;
        //let newY = this.oy + dy;

        let gridX = (Math.round( ((this.ox + dx ) / Floor.size ) - 1) * Floor.size) + Floor.offsetX;
        let gridY = (Math.round( ((this.oy + dy ) / Floor.size ) - 1) * Floor.size) + Floor.offsetY;

        this.attr({x: gridX, y: gridY});

    },
    onStart: function (x,y,e) {

        this.node.classList.add('b-svg-ship--moveble');

        this.ox = this.attr("x");
        this.old_x = this.attr("x");

        this.oy = this.attr("y");
        this.old_y = this.attr("y");


        //Engine.shadowShip.rect.ox = this.attr("x");
        //Engine.shadowShip.rect.oy = this.attr("y");


        //console.log('onstart: this',this);

    },
    onEnd: function (e) {


        this.node.classList.remove('b-svg-ship--moveble');

        Engine.setCoordsOnEnd(this);

        this.self.updateCoords();

    },

    /**
     * Установка координат +
     * Общая валидация/округление новых координат + проверка
     *
     * @param rect
     */
    setCoordsOnEnd(rect){
        //console.log('getPosOnMouseUp',rect);

        let x_pos = Math.round( ( rect.attr("x") - Floor.offsetX ) / Floor.size );
        let y_pos = Math.round( ( rect.attr("y") - Floor.offsetY ) / Floor.size );

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

        if( !Floor.checkFloorAccess(coords , rect.self ) ){
            return false;
        }

        return true;
    },

    start: function () {

        Floor.drawBattleground(this.R);


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

            shipItem.drawShip(this.R);
            shipItem.rect.drag(
                this.onMove,
                this.onStart,
                this.onEnd,
            );
        }

        Floor.fillAccessZone( this.arShips  );

    }

};