<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
    // by es6 module system
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if(this.cellData) return;
                //nested Obejct is not updated by this way 
                //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn; 
                const rootData = this.$root.$data; 
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
                
                if(this.checkWin(rootData)) {
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''],['','',''],['','','']];
                } else if(this.checkDraw(rootData)){
                    // When Draw
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''],['','',''],['','','']];
                } else {
                    // onPlay
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
                
            },
            checkWin(rootData) {
                let win = false;
                let tableData = rootData.tableData;  
                if(tableData[this.rowIndex][0] ===  rootData.turn && tableData[this.rowIndex][1] === rootData.turn && tableData[this.rowIndex][2] === rootData.turn) win = true;
                else if (tableData[0][this.cellIndex] ===  rootData.turn && tableData[1][this.cellIndex] === rootData.turn && tableData[2][this.cellIndex] === rootData.turn) win = true;
                else if (tableData[0][0] ===  rootData.turn && tableData[1][1] === rootData.turn && tableData[2][2] == rootData.turn) win = true;
                else if (tableData[0][2] ===  rootData.turn && tableData[1][1] === rootData.turn && tableData[2][0] === rootData.turn) win = true;
                return win;
            },
            checkDraw(rootData) {
                let result = true;
                rootData.tableData.forEach((row)=>{
                    row.forEach((cell)=>{
                        if(!cell) { result = false; }
                    });
                });
                return result;
            }
        }
    };
</script>

<style scoped>
</style>