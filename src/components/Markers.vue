<template>
    <div class="b-markers-wrapper">
        <div class="b-markers">
            <ul class="b-markers-letters">
                <li v-for="letter in letters">{{ letter }}</li>
            </ul>
            <ul class="b-markers-numbers">
                <li v-for="number in numbers">{{ number }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Markers',
        data () {
            return {
                letters: ['а','б','в','г','д','e','ж','з','и','к',],
                numbers: ['1','2','3','4','5','6','7','8','9','10',],

                handler: function(){
                    console.log('hideDrop event');
                }
            }
        },
        methods:{

        },
        mounted(){
            this.$root.$on('hideDrop', this.handler );
        },
        beforeDestroy(){
            this.$root.$off('hideDrop', this.handler );
        }
    }
</script>

<style lang="scss">
    $ship-size: 36;
    $offset-size: 18;


    .b-markers{
        position: relative;
        &-letters,
        &-numbers{
            display: block;
            padding: 0;
            margin: 0;
            li{
                display: block;
                list-style: none;
                padding: 0;
                margin: 0;
                width: #{$ship-size}px;
                height: #{$ship-size}px;
                line-height: #{$ship-size}px;
                text-align: center;
                text-transform: uppercase;
                font-size: 12px;
            }
        }
        &-letters{
            position: absolute;
            left: 30px;
            top: -8px;
            li{
                float: left;
            }
        }
        &-numbers{
            position: absolute;
            left: -9px;
            top: 30px;
            li{

            }
        }
    }
</style>