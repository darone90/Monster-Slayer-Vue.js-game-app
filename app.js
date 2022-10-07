function getDamage(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            result: null,
            winner: null,
            player: 0,
            monster: 0,
            round: 0,
            healUsed: false
        }
    },

    computed: {
        monsterBar() {
            if(this.monsterHealth < 0) {
                return {width: '0%'}
            } else {
                return {width: this.monsterHealth + '%'}
            }; 
        },

        playerBar() {
            if(this.playerHealth < 0) {
                return {width: '0%'}
            } else {
                return {width: this.playerHealth + '%'}
            };
        },

        disableButton() {
            return this.round % 3 !== 0 
        }
    },

    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <= 0) {
                this.result = 'draw'
            } else if (value <=0){
                this.result = 'monster';
                this.monster++;
            }
        },

        monsterHealth(value) {
            if(value <=0 && this.playerHealth <= 0) {
                this.result = 'draw'
            } else if (value <=0){
                this.result = 'player';
                this.player++;
            }
        },

        player(value) {
            if(value === 3) {
                this.winner = 'player';
                setTimeout(() => {
                    this.restart()
                },5000);
            }    
        },

        monster(value) {
            if(value === 3) {
                this.winner = 'monster';
                setTimeout(() => {
                    this.restart()
                },5000);
            }
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
            this.BeastRage();
        },

        specialAttack() {
            const damage = getDamage(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
        }, 

        heal() {
            const heal = getDamage(8, 25);
            if(this.playerHealth + heal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += heal;
            }
            this.healUsed = true;
            this.round++;
        },

        BeastRage() {
            const chance = getDamage(1, 10);
            if(chance > 8) {
                const criticDamage = getDamage(15,25)
                const blockChance = getDamage(1,10);
                if(blockChance < 5) {
                    this.playerHealth -= criticDamage;
                } else if (blockChance >= 5 && blockChance < 8) {
                    this.playerHealth -= criticDamage/2;
                } else {
                    return
                }
            }
        },

        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.result = null;
            this.round = 0;
            this.healUsed = false;
        },

        restart() {
            this.palyer = 0;
            this.monster = 0;
            this.winner = null;
            this.newGame();
        },

        tryEscape() {
            const chanceToEscape = getDamage(1,10)
            if(chanceToEscape < 7) {
                this.result = 'monster'
            } else if (chanceToEscape >= 7 && chanceToEscape < 10){
                this.result = 'draw'
            } else {
                this.result = 'player'
            }
        }
    },
})

app.mount('#game')