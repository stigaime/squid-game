// Liste de joueurs
const listPlayers = [
    {
        name:"Seong Gi-hun",
        marbles:10,
        loss: 3,
        gain: 1
    },
    {
        name:"Kang Sae-byeok",
        marbles:15,
        loss: 2,
        gain: 2
    },
    {
        name:"Cho Sang-woo",
        marbles:20,
        loss: 1,
        gain: 3
    }
];

// générer un chiffre aléatoire pour mes billes
function randomMarbles() {
    return Math.floor(Math.random() * 20 ) + 1;
}

// générer un chiffre aléatoire pour l'âge
function randomAge() {
    return Math.floor(Math.random() * (90 - 40) + 40);
}

// liste d'ennemies
const listEnemies = [
    { name: "Tao Huang", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Su He", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Tan Ju", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Shao Lin", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Xing Kang", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Jacky Chan", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Kang Liuxian", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Zhen Xiang ", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Ding Bao", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Zhong Lei", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Xie Cai", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Tsing Tsao", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Xénon Led", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Sushi Man", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Chirachi", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Changyijunquan Wuhanzhanxinya", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Sundong Xionghuo", marbles: randomMarbles(), age: randomAge() }
    ,{ name: "Li Tchi", marbles: randomMarbles(), age: randomAge() }
]
const levels = [['Easy', 'Medium', 'Impossible'], [4, 12, 18]];

// je demande au user de choisir un hero et un niveau de difficulté
const heroAnswer = parseInt(prompt('Which player will you be? Seong Gi-hun (0) - Kang Sae-byeok (1) - Cho Sang-woo (2)'));
const levelAnswer = parseInt(prompt("Choose a dificulty : Easy (0) - Medium (1) - Impossible (2)"));

const hero = listPlayers[heroAnswer];
let numberOfEncounters = levels[1][levelAnswer];

console.log("Vous débutez le jeu avec " + hero.name + " avec " + hero.marbles + " billes, un bonus de " + hero.gain + " billes et un malus de " + hero.loss + " !");
console.log("Vous devrez affronter " + numberOfEncounters + " enemies");

function handleEncounter(userAnswer, enemyMarbles, enemyIndex) { // argument

    console.log('Votre enemie a dans ses mains ' + enemyMarbles + " billes !");

    // si c'est pair j'ai gagné
    // ou si c'est impair j'ai gagné
    if((userAnswer % 2 == 0 && enemyMarbles % 2 == 0) 
        || userAnswer % 2 != 0 && enemyMarbles % 2 != 0) {
        console.log('Bravo, c\'est gagné, vous remportez ' + enemyMarbles + " billes + votre bonus de " + hero.gain + " billes !" );
        hero.marbles += (enemyMarbles + hero.gain);
        listEnemies.splice(enemyIndex, 1); // je supprime l'ennemie de ma liste d'ennemies
    }
    // sinon c'est perdu
    else {
        hero.marbles -= (enemyMarbles + hero.loss);
        listEnemies[enemyIndex].marbles += enemyMarbles; // je donne une partie de mes billes à l'ennemie
        console.log('HAHAHA, c\'est perdu, vous perdez ' + enemyMarbles + " billes - votre malus de " + hero.loss + " billes !" );
        console.log('Grâce à vous, votre enemie a maintenant dans ses mains ' + listEnemies[enemyIndex].marbles + " billes !");
    }

    if(hero.marbles > 0) {
        console.log("Après ce combat il vous reste " + hero.marbles + " billes !");
    } else {
        console.log('HAHAHAHHA, you looose !');
    }

    // si j'ai gagné faut attribuer les billes à hero sinon
    // faut tuer l'enemie

}

let count = 1;
// la partie continue tant qu'il me reste des billes et un joueur à affronter
while(hero.marbles > 0 && numberOfEncounters > 0) {

    let enemyIndex = Math.floor(Math.random() * listEnemies.length - 1 ) + 1; // position de l'enemie dans la liste d'enemies
    let enemy = listEnemies[enemyIndex];
    console.log("Round n° " + count  + " - Vous rencontrez " + enemy.name);

    // pair ou impair?
    let userAnswer = parseInt(prompt("L'enemie à des billes dans sa main, est-ce un nombre pair - (0) ou impair - (1) ?"));

    if(enemy.age > 70) {

        let cheatAnswer = parseInt(prompt("Votre ennemi à plus de 70 ans, voulez-vous tricher? Oui - (0) ou Non - (1) ?"));

        if(cheatAnswer === 0) {
            hero.marbles += enemy.marbles; // je remporte ses billes
            listEnemies.splice(enemyIndex, 1); // il meurt
            console.log("Votre enemie est illiminé sans pitié, et vous remportez " + enemy.marbles + " billes automatiquement");
            console.log("Vous avez désormais " + hero.marbles + " billes en votre possession !");
            numberOfEncounters--;
            count++;
            continue; // je vais à la rencontre suivante
            
        } else {
            console.log("Votre comportement est noble, bonne chance !");
        }
    }

    handleEncounter(userAnswer, enemy.marbles, enemyIndex);

    numberOfEncounters--;
    count++;

}

