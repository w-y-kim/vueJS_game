<template>
    <div>
        <div v-bind:class="state" @click="onClickScreen" id="screen">{{message}}</div>

        <template v-if="result.length" v-show="result.length">
            <div>average time: {{average}}ms</div>
            <button @click="onReset">reset</button>
        </template>
    </div>
</template>

<script>
    // not in methods of vue instance
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    // by es6 module system
    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: 'click to start'
            }
        },
        // for caching
        computed: {
            average() {
                return this.result.reduce((a,c) => a +c, 0) / this.result.length || 0;
            }
        },
        methods: {
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if(this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = 'click when green color';
                    timeout = setTimeout(()=>{
                        this.state = 'now';
                        this.message = 'Click NOW!!!!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000);
                } else if(this.state === 'ready') {
                    clearTimeout(timeout);
                    this.state = 'now';
                    this.message = 'too fast, click when green color'
                } else if(this.state === 'now') {
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = 'click to reStart~~~~';
                    this.result.push(endTime - startTime);
                }
            }
        }
    };
</script>

<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }

</style>