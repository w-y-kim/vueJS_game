<template>
    <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
    // not in methods of vue instance

    // by es6 module system
    export default {
        name: 'LottoBall',
        props: {
            number: Number,
        },
        // for caching
        computed: {
            styleObject() {
                let background;
                if(this.number <= 10) {
                    background = 'red';
                } else if(this.number <= 20) {
                    background = 'yellow';
                } else if(this.number <= 40) {
                    background = 'aqua';
                } else {
                    background = 'green';
                }
                return {
                    background,
                };
            }
        },
        methods: {},//methods
        watch: {}
    };
</script>

<style scoped>
 .ball {
     display: inline-block;
     border: 1px solid black;
     border-radius: 20px;
     width: 40px;
     height: 40px;
     line-height: 40px;
     font-size: 20px;
     text-align: center;
     margin-right: 20px;
  }
</style>