<template>
    <tr>
        <td-component
            v-for="(cellData, index) in rowData"
            :key="index"
            :cell-data="cellData"
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
                parent: 'what',
            };
        },
        props: {
            rowData: Array,
            rowIndex: Number,
        }
    };
</script>

<style scoped>
</style>