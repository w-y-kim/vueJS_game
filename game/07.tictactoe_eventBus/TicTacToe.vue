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
    import EventBus from './EventBus';

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
        methods: {
            onClickTd(rowIndex, cellIndex) {  
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);
                
                if(this.checkWin(rowIndex, cellIndex)) {
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [['','',''],['','',''],['','','']];
                } else if(this.checkDraw()){
                    // When Draw
                    this.winner = '';
                    this.turn = 'O';
                    this.tableData = [['','',''],['','',''],['','','']];
                } else {
                    // onPlay
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }
            },
            checkWin(rowIndex, cellIndex) {
                let win = false;
                let tableData = this.tableData;  
                if(tableData[rowIndex][0] ===  this.turn && tableData[rowIndex][1] === this.turn && tableData[rowIndex][2] === this.turn) win = true;
                else if (tableData[0][cellIndex] ===  this.turn && tableData[1][cellIndex] === this.turn && tableData[2][cellIndex] === this.turn) win = true;
                else if (tableData[0][0] ===  this.turn && tableData[1][1] === this.turn && tableData[2][2] == this.turn) win = true;
                else if (tableData[0][2] ===  this.turn && tableData[1][1] === this.turn && tableData[2][0] === this.turn) win = true;
                return win;
            },
            checkDraw() {
                let result = true;
                this.tableData.forEach((row)=>{
                    row.forEach((cell)=>{
                        if(!cell) { result = false; }
                    });
                });
                return result;
            },
           
        },//methods 
        created() {
            EventBus.$on('clickTd', this.onClickTd);
        }    
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