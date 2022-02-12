const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 10;
const playerhealValue = 20;

const MODE_ATTACK = 'ATTACK';
const STRONG_MODE_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enterdValue = prompt('Maximum life for you and the monster.', '100');

let chosenMaxLife = parseInt(enterdValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;



adjustHealthBars(chosenMaxLife);

function writeToLog(el, val, monsterHealth, playerHealth) {
    let logEntry;
    if (ev = LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
     } else if (ev = LOG_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev = LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev = LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
}


function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth = currentPlayerHealth - playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus live saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    } else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToLog(LOG_EVENT_GAME_OVER,'A DRAW', currentMonsterHealth, currentPlayerHealth)
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
            reset();
        }   
}

function attackMonster(mode) {
    let maxDamage; 
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = attackValue;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if(mode === STRONG_MODE_ATTACK) {
        maxDamage = strongAttackValue;
        logEvent = LOG_PLAYER_STRONG_ATTACK;
    };
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
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
    writeToLog(LOG_EVENT_PLAYER_HEAL, fullPlayerHealValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler)