// MAIN
// user database
const user = {
    HP: 100,
    attack: 1,
    XP: 0,
    limitXP: 100,
    level: 1,
    balance: 0,
    equippedItem: 0
};
const uHP = document.getElementById("user-hp");
const uXP = document.getElementById("user-xp");
const uXPLimit = document.getElementById("user-xp-limit");
const uBalance = document.getElementById("user-balance");
const uLevel = document.getElementById("user-lvl");
const uAttack = document.getElementById("user-attack");
uHP.innerText = user.HP;
uXP.innerText = user.XP;
uXPLimit.innerText = user.limitXP;
uBalance.innerText = user.balance;
uLevel.innerText = user.level;
uAttack.innerText = user.attack+" + "+user.equippedItem;
// monster database
const mCube = {
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
const mECube = {
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
const mPyramid = {
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
const mEPyramid = {
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
const mOctagone = {
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
const mLine = {
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
const mZigzag = {
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
const mbCubie = {
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
let monsters = [mCube, mECube, mPyramid, mEPyramid, mOctagone, mLine, mZigzag, mbCubie];
const mImg = document.getElementById("mon-img-c");
const mName = document.getElementById("mon-name");
const mHP = document.getElementById("mon-hp");
let mAttackSpeed;
let mNumber;
// shop database
const iFist = {
    attack: 0,
    obj: document.getElementsByClassName("item")[0],
    price: 0
};
const iKitchenKnife = {
    attack: 1,
    obj: document.getElementsByClassName("item")[1],
    price: 100
};
const iSimpleSword = {
    attack: 2,
    obj: document.getElementsByClassName("item")[2],
    price: 160
};
const iLargeSword = {
    attack: 3,
    obj: document.getElementsByClassName("item")[3],
    price: 200
};
const iSimplePistol = {
    attack: 4,
    obj: document.getElementsByClassName("item")[4],
    price: 420
};
const iAutoPistol = {
    attack: 5,
    obj: document.getElementsByClassName("item")[5],
    price: 520
};
const iMachineGun = {
    attack: 6,
    obj: document.getElementsByClassName("item")[6],
    price: 800
};
let shopList = [iFist, iKitchenKnife, iSimpleSword, iLargeSword, iSimplePistol, iAutoPistol, iMachineGun];
// overlays
const gameOver = document.getElementById("overlay");
// functions
let userLevelUp = () => {
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
        Object.defineProperty(user, "XP", {
            value: "-",
            writable: false,
            enumerable: true,
            configurable: true
        })
        uXP.innerText = user.XP;
    }
};
let respawnMonster = () => {
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
let monsterKilled = () => {
    uXP.classList.add("lime");
    uBalance.classList.add("gold");
    setTimeout(function() {
        uXP.classList.remove("lime");
        uBalance.classList.remove("gold");
    }, 750);
}
let userAttack = () => {
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
let buyEquip = (e) => {
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
