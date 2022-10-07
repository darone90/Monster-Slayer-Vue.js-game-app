function getDamage(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            result: null,
            round: 0,
            healUsed: false
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

    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <= 0) {
                this.result = 'draw'
            } else if (value <=0){
                this.result = 'monster'
            }
        },

        monsterHealth(value) {
            if(value <=0 && this.playerHealth <= 0) {
                this.result = 'draw'
            } else if (value <=0){
                this.result = 'player'
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
        }
    },
})

app.mount('#game')