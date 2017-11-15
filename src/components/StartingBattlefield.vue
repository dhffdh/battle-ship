<template>
    <div>
        <b-markers></b-markers>

        <div id="start-battlefield" class="b-canvas-wrapper b-svg-grid"></div>


        <div class="mt-2">
            Ваше поле
        </div>


        <!--<button v-on:click="check" class="btn btn-secondary">check Engine</button>-->

        <!--<div>
          <pre>{{ accessZone }}</pre>
        </div>-->



    </div>
</template>

<script>
    import Markers from './Markers'
    import { Engine } from './StartEngine'
    import Store from './Store'


    export default {
        name: 'StartingBattlefield',
        data () {
            return {

            }
        },
        mounted: function () {
            Engine.start();
            Store.startShips = Engine.arShips;
        },
        methods: {
            check: function (event) {

                console.log('Engine',Engine);
            }
        },
        components: {
            'b-markers': Markers,
        }
    }
</script>