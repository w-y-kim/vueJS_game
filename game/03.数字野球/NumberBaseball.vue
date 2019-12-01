<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmit">
            <input ref="answer" maxlength="4" minlength="4" v-model="value" />
            <button type="submit">入力</button>
        </form>
        <div>try: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries" :key="t.try">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    // not in methods of vue instance
    const getNumbers = () => {
        const candiate = [...Array(9).keys()].map((v,i) => i + 1); // number range , Array(9).fill(0).map((v, i) => i +1 );
        const array = [];
        for (let i = 0; i < 4; i +=1) {
            const chosen = candiate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }
    // by es6 module system
    export default {
        data() {
            return {
                answer: getNumbers(),
                tries: [],
                value: '',
                result: ''
            }
        },
        methods: {
            initNumber() {
                this.value = '';
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            },
            onSubmit() {
                if(this.value == this.answer.join('')) { // Stirng literal compare to array
                    this.tries.push({
                        try: this.value,
                        result: 'HOME RUN',
                    });
                    this.result = 'HOME RUN';
                    alert('re start game');
                    this.initNumber();
                } else { // wrong answer
                    if (this.tries.length >= 2) {
                        this.result = ` fail, out of chance. the answer wsa ${this.answer.join('')}`;
                        alert('re start game');
                        this.initNumber();
                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for(let i = 0; i < 4; i +=1) {
                        if(answerArray[i] === this.answer[i]) {
                            strike++;
                        }else if(this.answer.includes(answerArray[i])){
                            ball++;
                        }
                    }// for
                    this.tries.push({
                        try: this.value,
                        result: `${strike}Strike ,  ${ball}ball`
                    });
                    this.value = '';
                    this.$refs.answer.focus();
                }// else
            } 
        }
    };
</script>

<style>
</style>