<template>
    <div class="b-container">

        <div class="b-row">
            <div class="b-col b-col-left">
                <b-markers></b-markers>
                <div id="left-floor" class="b-canvas-wrapper"></div>
            </div>

            <div class="b-col b-col-right">

                <b-markers></b-markers>
                <div id="right-floor" class="b-canvas-wrapper"></div>
            </div>

        </div>




        <a v-on:click="check" class="b-btn">check Engine</a>


        <div>
            <pre>{{ accessZone }}</pre>
        </div>

    </div>
</template>

<script>
    import { Floor , Engine } from './Engine'
    import Markers from './Markers'



    export default {
        name: 'Game',
        data () {
            return {
                msg: 'Морской бой.',
                accessZone: {},

            }
        },
        mounted: function () {

            Engine.LeftR = Raphael("left-floor", 400, 400);
            Engine.RightR = Raphael("right-floor", 400, 400);

            Engine.start();

            this.accessZone = Floor.accessZone;
            //console.log('Engine',Engine);
        },
        methods: {
            check: function (event) {

                console.log('Engine',Engine);

            }

        },
        components: {
            'b-markers': Markers
        }
    }
</script>

