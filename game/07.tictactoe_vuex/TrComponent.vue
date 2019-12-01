<template>
    <tr>
        <td-component
            v-for="(cellData, index) in rowData"
            :key="index"
            :cell-index="index"
            :row-index="rowIndex"
        ></td-component>
    </tr>
</template>

<script>
    // not in methods of vue instance
    import TdComponent from './TdComponent';

    // by es6 module system
    export default {
        components: {
            TdComponent,
        },
        data() {
            return {
            };
        },
        props: {
            rowIndex: Number,
        },
        computed: {
            rowData() {
                return this.$store.state.tableData[this.rowIndex];
            }
        }
    };
</script>

<style scoped>
</style>