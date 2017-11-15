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
                                    'b-grid-item--empty': gridItem.empty ,
                                    'b-grid-item--done': gridItem.hit ,
                                }]"
                                @click="onGridItemClick(gridItem)"
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
            Поле противника
        </div>

    </div>
</template>

<script>
    import Markers from './Markers'
    import Store from './Store'


    class gridShip{

        vertical = false;
        long = 1;

        constructor(params = {}){

            if(params.long){
                this.long = params.long;
            }
            if(params.vertical){
                this.vertical = params.vertical;
            }

        };

        getClasses(){
            let v = this.vertical ? 'b-ship--pos-v-'+this.long: 'b-ship--pos-h-'+this.long;
            return [v];
        };

    }



    export default {
        name: 'Battlefield',
        data () {
            return {
                gridItems: []
            }
        },
        computed: {

            items(){
                return this.gridItems;
            }
        },
        created: function () {

            let index = 0;
            for( let j = 0; j < 10; j++){
                for( let i = 0; i < 10; i++){


                    this.gridItems.push(
                        {
                            x: i,
                            y: j,
                            index: index,
                            miss: false,
                            missAuto: false,
                            hit: false,
                            empty: true,
                            ship: false,
                            classes: ['b-grid-item--x-'+i,'b-grid-item--y-'+j]
                        }
                    );


                    index++;
                }
            }

        },
        methods: {

            onGridItemClick(gridItem){

                Store.count++;


                gridItem.empty = false;

                if(gridItem.miss){
                    gridItem.miss = false;
                    gridItem.hit = true;
                }else{
                    gridItem.miss = true;
                    gridItem.hit = false;
                }

                /*if(!gridItem.ship){
                    gridItem.ship = new gridShip({
                        vertical: true,
                        long: 3,
                    });
                }*/

                //gridItem.missAuto = !gridItem.missAuto;
                //console.log('gridItem:',gridItem);
            }
        },
        components: {
            'b-markers': Markers,
        }
    }
</script>

<style lang="scss">

</style>