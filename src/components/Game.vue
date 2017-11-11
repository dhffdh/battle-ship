<template>
    <div class="b-container">

        <div class="b-row">
            <div class="b-col b-col-left">
                <b-markers></b-markers>

                <b-start-bf></b-start-bf>

            </div>

            <div class="b-col b-col-right">
                <b-markers></b-markers>
                <b-rival-bf></b-rival-bf>

                <div class="mt-2">
                    Поле противника
                </div>

            </div>

        </div>




    </div>
</template>

<script>
    import Markers from './Markers'
    import StartingBattlefield from './StartingBattlefield'
    import Battlefield from './Battlefield'

    export default {
        name: 'Game',
        data () {
            return {
                msg: 'Морской бой.',
            }
        },
        methods: {

        },
        components: {
            'b-markers': Markers,
            'b-start-bf': StartingBattlefield,
            'b-rival-bf': Battlefield,
        }
    }
</script>

