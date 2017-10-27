<template>
    <div class="hello">

        <div id="raphael" class="b-canvas-wrapper"></div>

    </div>
</template>

<script>
    import { ship , shipInfo, Engine } from './class.js'

    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Морской бой.'
            }
        },
        mounted: function () {

            const R = Raphael("raphael", 600, 600);

            for (let j = 0; j < 10; j++) {
                for (let i = 0; i < 10; i++) {
                    let rect = R.rect((50 + 40 * i), (50 + 40 * j), 40, 40)
                        .attr({'stroke-width': '1px', fill: '#fafafa', stroke: '#7474fd'})
                }
            }

            const arShips = [];


            let i = 0;
            for ( const L of shipInfo.lengthTypes  ){

                const X = shipInfo.demoCoords[i].x;
                const Y = shipInfo.demoCoords[i].y;
                const V = shipInfo.demoCoords[i].v;
                arShips.push( new ship( {long: L,x: X,y: Y , vertical: V} ) );

                i++;
            }

            for ( const shipItem of arShips  ){
                //console.log('shipItem',shipItem);

                shipItem.draw(R);
                shipItem.rect.drag(
                    Engine.onMove,
                    Engine.onStart,
                    Engine.onEnd,
                );
            }
        }
    }
</script>

