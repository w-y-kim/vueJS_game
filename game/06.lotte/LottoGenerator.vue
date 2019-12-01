<template>
    <div>
        <div>Numbers</div>
        <div id="result">
            <lotto-ball v-for="ball in winBalls"  :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>bonus</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">more</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall';

    // not in methods of vue instance
    function getWinNumbers() {
        const candidate = Array(45).fill().map((v,i) => i +1);
        const shuffle = [];
        while(candidate.length > 0){
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const windNumbers = shuffle.slice(0,6).sort((p,c) => p -c);
        return [...windNumbers, bonusNumber];
    }
    // by es6 module system
    const timeOut = []
    export default {
        components: {
            LottoBall,
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                redo: false,
                bonus: null,
            };
        },
        // for caching
        computed: {},
        methods: {
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
            },
            showBalls() {
                for (let i = 0 ; i < this.winNumbers.length - 1; i++) {
                    timeOut[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i + 1) * 1000);
                }
                timeOut[6] = setTimeout(()=>{
                    this.bonus =  this.winNumbers[6];
                    this.redo = true;
                }, 7000)
            },
        },//methods
        mounted() {
            this.showBalls();
        },
        beforeDestroy() {
            timeOut.forEach((t)=>{
                clearInterval(t);
                //clearTimeout(t);
            });

        },
        watch: {
            redo(value, oldValue) {
                if(value === false) {
                    this.showBalls();
                }
            }
        }
    };
</script>