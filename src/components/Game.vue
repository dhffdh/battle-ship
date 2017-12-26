<template>
    <div class="b-container">

        <div class="b-row">
            <div class="b-col b-col-left">
                <b-start-bf v-if="showStartBattlefield" ></b-start-bf>
                <b-my-bf v-if="showMyBattlefield" ></b-my-bf>
            </div>

            <div class="b-col b-col-right">
                <b-rival-bf v-if="showMyBattlefield" ></b-rival-bf>
            </div>
        </div>

        <div class="text-center mt-4">
            <button v-on:click="startGame" class="btn btn-secondary">Начать игру</button>
        </div>

        <div class=" mt-4">
            <button v-on:click="logStore" class="btn btn-">Показать стор</button>
            <button v-on:click="editBf" class="btn btn-success">Редактировать свое поле</button>
        </div>

    </div>
</template>

<script>
    import StartingBattlefield from './StartingBattlefield'
    import Store from './Store'
    import Battlefield from './Battlefield'
    import RivalBattlefield from './RivalBattlefield'




    export default {
        name: 'Game',
        data () {
            return {
                msg: 'Морской бой.',
                showStartBattlefield: true,
                showMyBattlefield: false
            }
        },
        methods: {
            startGame(){

                console.log('Старт игры');


                this.showStartBattlefield = false;
                this.showMyBattlefield = true;
            },
            editBf(){
                this.showStartBattlefield = true;
                this.showMyBattlefield = false;
            },
            logStore(){
                console.log(Store);
            }
        },
        components: {
            'b-start-bf': StartingBattlefield,
            'b-rival-bf': RivalBattlefield,
            'b-my-bf': Battlefield,
        },
        mounted() {

            window.addEventListener('click', () => {

                console.log('dispatchEvent hideDrop');

                this.$root.$emit('hideDrop');

            });
        }

    }
</script>

