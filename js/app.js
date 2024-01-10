// Liste de joueurs
const listPlayers = [
    ["hero1", "hero2", "hero3"],
    [{
        name: "Seong Gi-hun",
        marbles: 10,
        loss: 3,
        gain: 1
    },
    {
        name: "Kang Sae-byeok",
        marbles: 15,
        loss: 2,
        gain: 2
    },
    {
        name: "Cho Sang-woo",
        marbles: 20,
        loss: 1,
        gain: 3
    }]
];

// générer un chiffre aléatoire pour mes billes
function randomMarbles() {
    return Math.floor(Math.random() * 20) + 1;
}

// générer un chiffre aléatoire pour l'âge
function randomAge() {
    return Math.floor(Math.random() * (90 - 40) + 40);
}

// liste d'ennemies
const listEnemies = [
    { name: "Tao Huang", marbles: randomMarbles(), age: randomAge() }
    , { name: "Su He", marbles: randomMarbles(), age: randomAge() }
    , { name: "Tan Ju", marbles: randomMarbles(), age: randomAge() }
    , { name: "Shao Lin", marbles: randomMarbles(), age: randomAge() }
    , { name: "Xing Kang", marbles: randomMarbles(), age: randomAge() }
    , { name: "Jacky Chan", marbles: randomMarbles(), age: randomAge() }
]
const levels = [['level1', 'level2', 'level3'], [4, 12, 18]];

// #1
const LIST_BLOCK_HTML = document.querySelectorAll(".block");
// #2
const LEVELS = document.querySelector("#levels"); // global
const HEROES = document.querySelector("#heroes");
const ENEMIES = document.querySelector("#enemies");
const ACTION = document.querySelector("#action");
const CHOICES = document.querySelector("#choices");
const CHOICES_BUTTONS = document.querySelectorAll("#choices button");
const BLOCK_ENEMIES = document.querySelectorAll("#enemies .block");
const HERO_NAME = document.querySelector(".hero-name");
const REMAINING_MARBLES = document.querySelector(".remaining-marbles");
const REMAINING_ENCOUNTERS = document.querySelector(".remaining-encounters");
const HISTORY = document.querySelector("#history");
const GAME_DETAILS = document.querySelector("#game-details");
const WIN = document.querySelector("#win");
const LOOSE = document.querySelector("#loose");
const REPLAY = document.querySelector("#replay");
const END = document.querySelector("#end");


let hero;
let nbrEncounters;
let enemy;
let enemyIndex;

// #2
function handleDisplay(elemHTML, display) {
    elemHTML.style.display = display;
}

function updateHTML(elemHTML, content) {
    elemHTML.innerHTML = content;
}

// #1
function selectLevel(selectedClass) {

    // gérer le nombre de recontre suivant la niveau de difficulté sélectionnée
    // afficher à l'écran

    let levelIndex = levels[0].indexOf(selectedClass);
    nbrEncounters = levels[1][levelIndex];

    handleDisplay(LEVELS, "none");
    handleDisplay(ENEMIES, "flex");
    updateHTML(ACTION, "Choisissez un ennemi à combattre !");
    updateHTML(REMAINING_ENCOUNTERS, nbrEncounters);

}

// #1
function selectHero(selectedClass) {

    let heroIndex = listPlayers[0].indexOf(selectedClass);
    hero = Object.create(listPlayers[1][heroIndex]);

    // choisir un héro
    // mettre à jour à l'écran le nom du héro
    // le nombre de billes restantes
    updateHTML(HERO_NAME, hero.name);
    updateHTML(REMAINING_MARBLES, hero.marbles);

    handleDisplay(LEVELS, "flex");
    handleDisplay(HEROES, "none");
    updateHTML(ACTION, "Choisissez un niveau de difficulté !");
}

// #1
function handleEncounter(blockToDisplay) {


    enemyIndex = Array.prototype.indexOf.call(blockToDisplay.parentNode.children, blockToDisplay);
    enemy = listEnemies[enemyIndex];
    console.log("enemy : " , enemy);

    //#3

    for (let i = 0; i < BLOCK_ENEMIES.length; i++) {
        handleDisplay(BLOCK_ENEMIES[i], "none");
    }

    handleDisplay(blockToDisplay, "block");
    handleDisplay(CHOICES, "block");
    updateHTML(ACTION, "Votre ennemi à un nombre de billes pair ou impair dans sa main. Faites-un choix :")

}

function goBackToEnemiesMenu() {

    setTimeout(function () {

        // faire disparaitre le menu choices
        handleDisplay(CHOICES, "none");
        // et faire réapparaitre tous les ennemies
        for (let i = 0; i < BLOCK_ENEMIES.length; i++) {
            handleDisplay(BLOCK_ENEMIES[i], "block");
        }

    }, 2000);

}

function updateHistory(msg) {
    HISTORY.innerHTML += "<p>" + msg + "</p>";
}

function endGame(hasWon) {

    setTimeout(function() {

        handleDisplay(GAME_DETAILS, "none");
        handleDisplay(ENEMIES, "none");

        if(hasWon) {
            handleDisplay(WIN, "block");
            updateHTML(ACTION, "Vous avez remporté la partie!");
        } else {
            handleDisplay(LOOSE, "block");
            updateHTML(ACTION, "HAHAHA, je te laisse entre les mains de mercredi !");
        }

        handleDisplay(REPLAY, "block");


    }, 2000)

}

function showRedCross(enemyIndex, opacity) {
    BLOCK_ENEMIES[enemyIndex].querySelectorAll(".cross")[0].style.opacity = opacity;
    BLOCK_ENEMIES[enemyIndex].querySelectorAll(".cross")[1].style.opacity = opacity;
    BLOCK_ENEMIES[enemyIndex].querySelector("img").style.opacity = 0.5;
}

function compareValues(userAnswer) {


    updateHistory('Votre enemie a dans ses mains ' + enemy.marbles + " billes !");

    // si c'est pair j'ai gagné
    // ou si c'est impair j'ai gagné
    if((userAnswer == 0 && enemy.marbles % 2 == 0) 
        || userAnswer == 1 && enemy.marbles % 2 != 0) {
        updateHistory('Bravo, c\'est gagné, vous remportez ' + enemy.marbles + " billes + votre bonus de " + hero.gain + " billes !" );
        hero.marbles += (enemy.marbles + hero.gain);
        showRedCross(enemyIndex, 1);
    }
    // sinon c'est perdu
    else {
        hero.marbles -= (enemy.marbles + hero.loss);
        updateHistory('HAHAHA, c\'est perdu, vous perdez ' + enemy.marbles + " billes - votre malus de " + hero.loss + " billes !" );
        listEnemies[enemyIndex].marbles += enemy.marbles; // je donne une partie de mes billes à l'ennemie
        updateHistory('Grâce à vous, votre enemie a maintenant dans ses mains ' + listEnemies[enemyIndex].marbles + " billes !");
    }

    nbrEncounters--;
    updateHTML(REMAINING_ENCOUNTERS, nbrEncounters);

    if(hero.marbles > 0) {
        updateHTML(REMAINING_MARBLES, hero.marbles);
        updateHistory("Après ce combat il vous reste " + hero.marbles + " billes !");
    } else {
        updateHistory('HAHAHAHHA, you looose !');
    }

    if(hero.marbles <= 0 || nbrEncounters == 0) {
        endGame((hero.marbles > 0) ? true : false)
    }

    goBackToEnemiesMenu();

}

// #1
for (let i = 0; i < LIST_BLOCK_HTML.length; i++) {
    LIST_BLOCK_HTML[i].addEventListener("click", function () {

        let selectedClass = this.classList[1]; // local (accessible que dans la boucle for)

        if (selectedClass.startsWith('l')) { // levels
            selectLevel(selectedClass);
        } else if (selectedClass.startsWith('h')) { // hero
            selectHero(selectedClass);
        } else if (selectedClass.startsWith('e')) { // enemies
            handleEncounter(this);
        }

    });

}

for (let i = 0; i < CHOICES_BUTTONS.length; i++) {
    CHOICES_BUTTONS[i].addEventListener("click", function () {
        compareValues(i);
    });
}

REPLAY.addEventListener("click", function() {

    // réafficher la page heroes
    // réinitialiser : 
    updateHTML(HERO_NAME, "x");
    updateHTML(REMAINING_MARBLES, "x");
    updateHTML(REMAINING_ENCOUNTERS, "x");
    updateHTML(HISTORY, "<p> Historique : </p>");

    handleDisplay(REPLAY, "none");
    handleDisplay(ENEMIES, "none");
    handleDisplay(WIN, "none");
    handleDisplay(LOOSE, "none");
    handleDisplay(HEROES, "flex");
    handleDisplay(GAME_DETAILS, "flex");
    handleDisplay(HISTORY, "block");


    for(let i = 0; i < BLOCK_ENEMIES.length; i++) {
        BLOCK_ENEMIES[i].querySelectorAll('.cross')[0].style.opacity = 0;
        BLOCK_ENEMIES[i].querySelectorAll('.cross')[1].style.opacity = 0;
        BLOCK_ENEMIES[i].querySelector('img').style.opacity = 1;
    }

});

// var global : déclarée en dehors de toute fonction / si déclarée sans le mot clef let
// var local : déclarée dans une fonction ou dans un block
// var vs let?

// for(let i = 0; i < 5; i++) {
//     console.log(i);
// }

// console.log(i);


console.log(enemy);