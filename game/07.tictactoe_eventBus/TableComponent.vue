<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :key="index" :row-data="rowData" :row-index="index"></tr-component>
    </table>
</template>

<script>
    // not in methods of vue instance
    import TrComponent from './TrComponent';

    // by es6 module system 
    export default {
        props: {
            tableData: Array,
        },
        components: {
            TrComponent,
        }
    };
</script>

<style scoped>
</style>