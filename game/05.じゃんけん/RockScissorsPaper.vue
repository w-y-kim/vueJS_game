<template>
    <div>
        <div id="computer" :style="computedStyle"></div>
        <div>
            <button @click="onClick('rock')">Rock</button>
            <button @click="onClick('scissors')">Scissors</button>
            <button @click="onClick('paper')">Paper</button>
        </div>
        <div>{{result}}</div>
        <div>Score: {{score}}</div>

    </div>

</template>

<script>
    // not in methods of vue instance
    const rspCord = {
        rock: '0px',
        scissors: '-238px',
        paper: '-510px'
    };
    const scores = {
        rock: 1,
        scissors: 0,
        paper: -1,
    };
    const computerChoice = (imgCord) => {
        return Object.entries(rspCord).find((v)=>{return v[1] === imgCord})[0];
    }

    let interval  = null;


    // by es6 module system
    export default {
        data() {
            return {
                imgCord: rspCord.rock,
                result: '',
                score: 0,
                message: 'click to start'
            }
        },
        // for caching
        computed: {
            computedStyle() {
                return {
                    background: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjq5nsDssn91ION7pmz8LT1e20enBwSad-IAt0BiJHv84TDpTq) ${this.imgCord} 0`
                }
            }
        },
        methods: {

            onClick(choice) {
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCord)];
                const diff =  myScore - cpuScore;
                if(diff === 0) {
                    this.result = 'tied';
                } else if([-1,2].includes(diff)) {
                    this.result = 'win';
                    this.score += 1;
                } else {
                    this.result = 'lose';
                    this.score -= 1;
                }
                setTimeout(()=>{ this.changeHand() }, 3000);
            },
            changeHand() {
                interval = setInterval(()=>{
                    switch (this.imgCord) {
                        case rspCord.rock:
                            this.imgCord =  rspCord.scissors;
                            break;
                        case rspCord.scissors:
                            this.imgCord =  rspCord.paper;
                            break;
                        case rspCord.paper:
                            this.imgCord =  rspCord.rock;
                            break;
                        default:
                    }
                }, 100);
            },
        },//methods
        beforeCreate() {
            console.debug('beforeCreate');
        },
        created() {
            console.debug('created');
        },
        beforeMount() {
            console.debug('beforeMount');
        },
        mounted() {
            console.log('mounted');
            this.changeHand();
        },
        beforeUpdate() {
            console.debug('beforeUpdate');
        },
        updated() {
            console.debug('updated');
        },
        beforeDestroy() {
            console.debug('updated');
            clearInterval(interval);
        },
        destroyed() {
            console.debug('destroyed');
        }
    };
</script>

<style scoped>
    #computer {
        width: 268px;
        height: 280px;
    }
</style>