function getDamage(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0
        }
    },

    computed: {
        monsterBar() {
            return {width: this.monsterHealth + '%'}
        },

        playerBar() {
            return {width: this.playerHealth + '%'}
        },

        disableButton() {
            return this.round % 3 !== 0 
        }
    },

    methods: {
        attackMonster() {
            const damage = getDamage(5,12);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },

        attackPlayer() {
            const damage = getDamage(8,15);
            this.playerHealth -= damage;
            this.round++;
        },

        specialAttack() {
            const damage = getDamage(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
        }
    },
})

app.mount('#game')