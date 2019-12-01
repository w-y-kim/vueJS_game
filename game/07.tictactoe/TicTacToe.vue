<template>
    <div>
        <div>{{turn}}'s turn</div>        
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}is the winner</div>        
    </div>
</template>

<script>
    // not in methods of vue instance
    import TableComponent from './TableComponent';

    // by es6 module system
    export default {
        components: {
            TableComponent
        },
        data() {
            return {
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                turn: 'O',
                winner: '',
            };
        },
        name: 'TicTacToe',
        props: {
            number: Number,
        },
        // for caching
        computed: {

        },
        methods: {},//methods
        watch: {}
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