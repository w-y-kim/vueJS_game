<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
    import { mapState } from 'vuex';
    import { CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER } from './store';
    // by es6 module system
    export default {
        props: {
            rowIndex: Number,
            cellIndex: Number,
        },
        computed: {
            // using vuex mapState
            ...mapState({
                cellData(state) {
                    return state.tableData[this.rowIndex][this.cellIndex];
                },
                tableData: state => state.tableData,
                turn: state => state.turn
            }),
            // cellData() {
            //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            // },
            // // get vuex state by using computed
            // tableData() {
            //     return this.$store.state.tableData;
            // },
            // turn() {
            //     return this.$store.state.turn;
            // }
        },
        methods: {
            onClickTd() {  
                if(this.cellData) return;         
                this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex });

                if(this.checkWin()) {
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                } else if(this.checkDraw()){
                    // When Draw
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    // onPlay
                    this.$store.commit(CHANGE_TURN);
                }
            },
            checkWin() {
                let win = false;
                let tableData = this.tableData;  
                if(tableData[this.rowIndex][0] ===  this.turn && tableData[this.rowIndex][1] === this.turn && tableData[this.rowIndex][2] === this.turn) win = true;
                else if (tableData[0][this.cellIndex] ===  this.turn && tableData[1][this.cellIndex] === this.turn && tableData[2][this.cellIndex] === this.turn) win = true;
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
        },
    };
</script>