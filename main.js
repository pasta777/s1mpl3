// MAIN
// user database
var user = {
    HP: 100,
    attack: 1,
    XP: 0,
    limitXP: 100,
    level: 1,
    balance: 0,
    equippedItem: 0
};
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
uAttack.innerText = user.attack+" + "+user.equippedItem;
// monster database
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
var monsters = [mCube, mECube, mPyramid, mEPyramid, mOctagone, mLine, mZigzag, mbCubie];
var mImg = document.getElementById("mon-img-c");
var mName = document.getElementById("mon-name");
var mHP = document.getElementById("mon-hp");
var mAttackSpeed;
var mNumber;
// shop database
var iFist = {
    attack: 0,
    obj: document.getElementsByClassName("item")[0],
    price: 0
};
var iKitchenKnife = {
    attack: 1,
    obj: document.getElementsByClassName("item")[1],
    price: 100
};
var iSimpleSword = {
    attack: 2,
    obj: document.getElementsByClassName("item")[2],
    price: 160
};
var iLargeSword = {
    attack: 3,
    obj: document.getElementsByClassName("item")[3],
    price: 200
};
var iSimplePistol = {
    attack: 4,
    obj: document.getElementsByClassName("item")[4],
    price: 420
};
var iAutoPistol = {
    attack: 5,
    obj: document.getElementsByClassName("item")[5],
    price: 520
};
var iMachineGun = {
    attack: 6,
    obj: document.getElementsByClassName("item")[6],
    price: 800
};
var shopList = [iFist, iKitchenKnife, iSimpleSword, iLargeSword, iSimplePistol, iAutoPistol, iMachineGun];
// overlays
var gameOver = document.getElementById("overlay");
// functions
function userLevelUp() {
    user.level+=1;
    user.XP = 0;
    user.HP+=50;
    user.limitXP+=100;
    user.attack+=1;
    uXP.innerText = user.XP;
    uHP.innerText = user.HP;
    uLevel.innerText = user.level;
    uAttack.innerText = user.attack+" + "+user.equippedItem;
    uXPLimit.innerText = user.limitXP;
    uXP.classList.add("lime");
    uXPLimit.classList.add("lime");
    uHP.classList.add("lime");
    uLevel.classList.add("aqua");
    uAttack.classList.add("lime");
    setTimeout(function() {
        uXP.classList.remove("lime");
        uXPLimit.classList.remove("lime");
        uHP.classList.remove("lime");
        uLevel.classList.remove("aqua");
        uAttack.classList.remove("lime");
    }, 750);
    if (user.level === 10) {
        user.XP = "-";
        uXP.innerText = user.XP;
    }
};
function respawnMonster() {
    mNumber =  Math.floor(Math.random() * 8);
    mImg.setAttribute("src", monsters[mNumber].img);
    mName.innerText = monsters[mNumber].name;
    mHP.innerText = monsters[mNumber].HP;
    mAttackSpeed = monsters[mNumber].attackSpeed;
};
respawnMonster();
setInterval(function() {
    user.HP -= monsters[mNumber].attack;
    uHP.classList.add("red");
    uHP.innerText = user.HP;
    if(user.HP > 0) {
        setTimeout(function () {
            uHP.classList.remove("red");
        }, 750);
    }
    if (user.HP <= 0) {
        gameOver.classList.add("opened");
        user.HP = 0;
        uHP.innerText = user.HP;
    }
}, mAttackSpeed);
function monsterKilled() {
    uXP.classList.add("lime");
    uBalance.classList.add("gold");
    setTimeout(function() {
        uXP.classList.remove("lime");
        uBalance.classList.remove("gold");
    }, 750);
}
function userAttack() {
    monsters[mNumber].HP-=user.attack+user.equippedItem;
    mHP.innerText = monsters[mNumber].HP;
    mHP.classList.add("red");
    setTimeout(function() {
        mHP.classList.remove("red");
    }, 750);
    if(monsters[mNumber].HP <= 0) {
        user.XP+=monsters[mNumber].yieldXP;
        user.balance+=monsters[mNumber].yieldC;
        uXP.innerText = user.XP;
        uBalance.innerText = user.balance;
        monsters[mNumber].HP = monsters[mNumber].originalHP;
        monsterKilled();
        respawnMonster();
    }
    if (user.XP >= user.limitXP) {
        userLevelUp();
    }
}
function buyEquip(e) {
    var target = e.target || e.srcElement;
    var equipped = document.querySelector(".equipped");
    for(var i = 0; i<shopList.length;i++) {
        if(target === shopList[i].obj) {
            if(user.balance >= shopList[i].price) {
                user.equippedItem = shopList[i].attack;
                user.balance-=shopList[i].price;
                shopList[i].price = 0;
                shopList[i].obj.classList.add("bought");
                equipped.classList.remove("equipped");
                shopList[i].obj.classList.add("equipped");
                uBalance.innerText = user.balance;
                uAttack.innerText = user.attack+" + "+user.equippedItem;
                bigboy = shopList[i].obj.parentElement;
                if(bigboy.childElementCount === 3) {
                    bigboy.removeChild(bigboy.lastElementChild);
                    bigboy.removeChild(bigboy.lastElementChild);
                }
                
            }
        }
    }
}
mImg.addEventListener("click", userAttack);
for(var i = 0; i<shopList.length; i++) {
    shopList[i].obj.addEventListener("click", buyEquip);
}
