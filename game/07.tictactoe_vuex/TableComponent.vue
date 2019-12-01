<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :key="index" :row-index="index"></tr-component>
    </table>
</template>

<script>
    // not in methods of vue instance
    import TrComponent from './TrComponent';
    // by es6 module system 
    export default {
        props: {
        },
        components: {
            TrComponent,
        },
        computed: {
            // from store
            tableData() {
                return this.$store.state.tableData;
            },
            // also can write by mapGetters
            turnMessage() {
                return this.$store.getters.turnMessage;
            }
        }
    };
</script>