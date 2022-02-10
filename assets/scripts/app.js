const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 10;
const playerhealValue = 20;

const MODE_ATTACK = 'ATTACK';
const STRONG_MODE_ATTACK = 'STRONG_ATTACK'
const enterdValue = prompt('Maximum life for you and the monster.', '100');

let chosenMaxLife = parseInt(enterdValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;



adjustHealthBars(chosenMaxLife);


function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth = currentPlayerHealth - playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus live saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You won!')
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!')
    } else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!')
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
            reset();
        }
       
}

function attackMonster(mode) {
    let maxDamage; 
    if (mode === MODE_ATTACK) {
        maxDamage = attackValue;
    } else if(mode === STRONG_MODE_ATTACK) {
        maxDamage = strongAttackValue;
    };
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    endRound();  
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(STRONG_MODE_ATTACK);
}

function healPlayerHandler() {
    let fullPlayerHealValue;
    if (currentPlayerHealth >= chosenMaxLife - playerhealValue) {
        alert("You can't heal to more than your max initial health!");
        fullPlayerHealValue = chosenMaxLife - currentPlayerHealth;
    } else {
        fullPlayerHealValue = playerhealValue;
    }
    increasePlayerHealth(playerhealValue);
    currentPlayerHealth = currentPlayerHealth + playerhealValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);