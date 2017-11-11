<template>
    <div>

        <div class="b-canvas-wrapper">

            <table class="b-grid-table">
                <tbody>
                    <tr>

                        <td v-for="gridItem in items"
                            :key="gridItem.index"

                            class="b-grid-item b-grid-item--empty"
                            v-bind:class="[ gridItem.classes ]"

                            @click="onGridItemClick(gridItem)"
                        >
                            <div class="b-grid-item-content">

                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>


        </div>

    </div>
</template>

<script>

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
                            classes: ['b-grid-item--x-'+i,'b-grid-item--y-'+j]

                        }
                    );

                    index++;
                }
            }

        },
        methods: {

            onGridItemClick(gridItem){

                //gridItem.miss = true;
                gridItem.classes.push('b-grid-item--miss');

                console.log('onGridItemClick gridItem:',gridItem);

                //let item = this.gridItems[self.y-1][self.x-1];
                //console.log('onGridItemClick item:',item);

            }
        }
    }
</script>

<style lang="scss">

</style>