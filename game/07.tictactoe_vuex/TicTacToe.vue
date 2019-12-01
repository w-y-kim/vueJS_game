<template>
    <div>
        <div>{{turn}}'s turn</div>        
        <table-component />
        <div v-if="winner">{{winner}}is the winner</div>        
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import store from './store';
    // not in methods of vue instance
    import TableComponent from './TableComponent';

    // by es6 module system
    export default {
        store,
        components: {
            TableComponent
        },
        name: 'TicTacToe',
        props: {
            number: Number,
        },
        // for caching
        computed: {
            ...mapState(['winner','turn','tableData']),
            // ...mapState({
            //     winner() {
            //         return state.winner + this.data;
            //     } 
            //     winner: state => state.winner,
            //     turnState: 'turn',
            // })
            // winner() {
            //     return this.$store.state.winner;
            // },
            // turn() {
            //     return this.$store.state.turn;
            // }  
        },
        methods: {
        },//methods 
       
    };
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>