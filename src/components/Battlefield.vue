<template>
    <div>
        <b-markers></b-markers>

        <div class="b-battlefield b-canvas-wrapper">

            <div class="b-grid">
                <table class="b-grid-table">
                    <tbody>
                        <tr>
                            <td v-for="gridItem in items"
                                :key="gridItem.index"
                                class="b-grid-item"
                                v-bind:class="[ gridItem.classes , {
                                    'b-grid-item--miss': gridItem.miss ,
                                    'b-grid-item--miss-auto': gridItem.missAuto ,
                                    'b-grid-item--hit': gridItem.hit ,
                                    'b-grid-item--done': gridItem.done ,
                                }]"
                            >
                                <div class="b-grid-item-content">
                                    <span class="b-grid-item-status"></span>

                                    <span class="b-ship"
                                          v-if="gridItem.ship"
                                          v-bind:class="[ gridItem.ship.getClasses() ]"
                                    ></span>

                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="mt-2">
            Ваше поле
        </div>

    </div>
</template>

<script>
    import Markers from './Markers'
    import Store from './Store'
    _ = require('lodash');


    class gridShip{
        vertical = false;
        long = 1;
        done = false;

        constructor(params = {}){
            if(params.done){
                this.done = params.done;
            }
            if(params.long){
                this.long = params.long;
            }
            if(params.vertical){
                this.vertical = params.vertical;
            }
        };
        getClasses(){
            let v = this.vertical ? 'b-ship--pos-v-'+this.long: 'b-ship--pos-h-'+this.long;
            let d = this.done ? 'b-ship--done':'';
            return [v,d];
        };

    }


    export default {
        name: 'Battlefield',
        data () {
            return {
                //gridItems: []
            }
        },
        computed: {
            items(){
                return Store.gridItems;
            }
        },
        created: function () {

            if(Store.gridItems.length < 1){

                let index = 0;
                for( let j = 0; j < 10; j++){
                    for( let i = 0; i < 10; i++){

                        Store.gridItems.push(
                            {
                                x: i,
                                y: j,
                                index: index,
                                miss: false,
                                missAuto: false,
                                hit: false,
                                done: false,
                                empty: false,
                                ship: false,
                                classes: ['b-grid-item--x-'+i,'b-grid-item--y-'+j]
                            }
                        );
                        index++;
                    }
                }
            }
            this.createMyShips();

        },
        methods: {

            createMyShips(){



                let ships = Store.startShips;

                for( const ship of ships){

                    let gridShipEl = _.find(Store.gridItems, function(obj) {
                        return obj.x === ship.x && obj.y === ship.y;
                    });

                    gridShipEl.ship = new gridShip({
                        vertical: ship.vertical,
                        long: ship.long,
                        done: false
                    });

                    //console.log('ship',ship);
                    //console.log('gridShip',gridShip);

                }

                //Store.gridItems = this.gridItems;

                console.log('createMyShips',Store);
            }

        },
        components: {
            'b-markers': Markers,
        }
    }
</script>
