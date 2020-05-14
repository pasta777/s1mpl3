// MAIN
var user = {
    HP: 100,
    attack: 1,
    XP: 0,
    limitXP: 100,
    level: 1,
    balance: 0
}
var mCube = {
    name: "Cube",
    originalHP: 12,
    HP: 12,
    attack: 12,
    attackSpeed: 2200,
    yieldXP: 12,
    yieldC: 12,
    ID: 0,
    img: "img/cube.png"
};
var mECube = {
    name: "Enhanced Cube",
    originalHP: 13,
    HP: 13,
    attack: 13,
    attackSpeed: 2180,
    yieldXP: 13,
    yieldC: 13,
    ID: 1,
    img: "img/cube_e.png"
};
var mPyramid = {
    name: "Pyramid",
    originalHP: 8,
    HP: 8,
    attack: 8,
    attackSpeed: 1800,
    yieldXP: 8,
    yieldC: 8,
    ID: 2,
    img: "img/pyramid.png"
};
var mEPyramid = {
    name: "Egyptian Pyramid",
    originalHP: 9,
    HP: 9,
    attack: 9,
    attackSpeed: 1400,
    yieldXP: 9,
    yieldC: 9,
    ID: 3,
    img: "img/pyramid_e.png"
}
var mOctagone = {
    name: "Octagone",
    originalHP: 8,
    HP: 8,
    attack: 8,
    attackSpeed: 1800,
    yieldXP: 8,
    yieldC: 8,
    ID: 4,
    img: "img/octagone.png"
};
var mLine = {
    name: "Line",
    originalHP: 5,
    HP: 5,
    attack: 5,
    attackSpeed: 1200,
    yieldXP: 8,
    yieldC: 8,
    ID: 5,
    img: "img/line.png"
};
var mZigzag = {
    name: "Zigzag",
    originalHP: 15,
    HP: 15,
    attack: 5,
    attackSpeed: 1500,
    yieldXP: 8,
    yieldC: 8,
    ID: 6,
    img: "img/zigzag.png"
};
var mbCubie = {
    name: "Ⓑ Cubie",
    originalHP: 30,
    HP: 30,
    attack: 10,
    attackSpeed: 2500,
    yieldXP: 30,
    yieldC: 30,
    ID: 7,
    img: "img/cubie.png"
};
var gameOver = document.getElementById("overlay");
var uHP = document.getElementById("user-hp");
var uXP = document.getElementById("user-xp");
var uXPLimit = document.getElementById("user-xp-limit");
var uBalance = document.getElementById("user-balance");
var uLevel = document.getElementById("user-lvl");
var uAttack = document.getElementById("user-attack");
uHP.innerText = user.HP;
uXP.innerText = user.XP;
uXPLimit.innerText = user.limitXP;
uBalance.innerText = user.balance;
uLevel.innerText = user.level;
uAttack.innerText = user.attack;
var monsters = [mCube, mECube, mPyramid, mEPyramid, mOctagone, mLine, mZigzag, mbCubie];
var mImg = document.getElementById("mon-img-c");
var mName = document.getElementById("mon-name");
var mHP = document.getElementById("mon-hp");
var mNumber;
function userLevelUp() {
    user.level+=1;
    user.XP = 0;
    user.HP+=50;
    user.limitXP+=100;
    user.attack+=1;
    uXP.innerText = user.XP;
    uHP.innerText = user.HP;
    uLevel.innerText = user.level;
    uAttack.innerText = user.attack;
    uXPLimit.innerText = user.limitXP;
    if (user.level === 10) {
        user.XP = "-";
        uXP.innerText = user.XP;
    }
};
var attackSpeed;
function respawnMonster() {
    mNumber =  Math.floor(Math.random() * 8);
    mImg.setAttribute("src", monsters[mNumber].img);
    mName.innerText = monsters[mNumber].name;
    mHP.innerText = monsters[mNumber].HP;
    attackSpeed = monsters[mNumber].attackSpeed;
};
respawnMonster();
setInterval(function() {
    user.HP-=monsters[mNumber].attack;
    uHP.innerText = user.HP;
    if(user.HP <= 0) {
        gameOver.classList.add("opened");
        user.HP = 0;
        uHP.innerText = user.HP;
    }
}, attackSpeed);
function userAttack() {
    monsters[mNumber].HP-=user.attack;
    mHP.innerText = monsters[mNumber].HP;
    if(monsters[mNumber].HP <= 0) {
        user.XP+=monsters[mNumber].yieldXP;
        user.balance+=monsters[mNumber].yieldC;
        uXP.innerText = user.XP;
        uBalance.innerText = user.balance;
        monsters[mNumber].HP = monsters[mNumber].originalHP;
        respawnMonster();
    }
    if (user.XP >= user.limitXP) {
        userLevelUp();
    }
}
mImg.addEventListener("click", userAttack);
