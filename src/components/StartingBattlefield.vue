<template>
    <div>
        <div id="start-battlefield" class="b-canvas-wrapper b-svg-grid"></div>


        <div class="mt-2">
            Ваше поле
        </div>


        <button v-on:click="check" class="btn btn-secondary">check Engine</button>

        <!--<div>
          <pre>{{ accessZone }}</pre>
        </div>-->



    </div>
</template>

<script>
    import { Floor , Engine } from './StartEngine'
    import Markers from './Markers'


    export default {
        name: 'StartingBattlefield',
        data () {
            return {
            }
        },
        mounted: function () {

            Engine.R = Raphael("start-battlefield", 400, 400);
            Engine.start();
        },
        methods: {
            check: function (event) {

                console.log('Engine',Engine);

            }
        },
        components: {
        }
    }
</script>

<style lang="scss">

</style>