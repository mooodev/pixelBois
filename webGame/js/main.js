
(function () {
let gameOn = false;
const switchScreen = () => {

if(!gameOn && exampleSocket.readyState !== 1){
  exampleSocket = new WebSocket(onlineadr)
  return;
}

    _turnAllMusicOff();
    this.selectedItem = null;
    document.getElementById("GUI_itemSelector").hidden = true;
    gameController.inventory = [];
    typewiterArray = []
    if (gameOn) {
      //  document.exitFullscreen()
        gameOn = false;
        document.getElementById("GUI_siteContainer").hidden = false;
        document.getElementById("GUI_gameContainer").hidden = true;
        for (let n = 0; n < gameController.map.players.length; n++) {
            gameController.map.players[n].activeControl = false;
        }

        soundSea.stop();
        soundBirds.stop();
        //startHeaderParticles();
    } else {
      //  document.getElementById("GUI_gameContainer").requestFullscreen()
        soundSea.play();
        soundBirds.play();
        gameOn = true;
        if (gameController.map.players.length > 0) {
            for (let n = 0; n < gameController.map.players.length; n++) {
                if (gameController.map.players[n].boid == gameController.boid) {
                    gameController.map.players[n].activeControl = true;
                }
            }
        }
        //stopHeaderParticles();
        document.getElementById("GUI_siteContainer").hidden = true;
        document.getElementById("GUI_gameContainer").hidden = false;
        _sendHelloMessage();

    }
}


//color pallette #1B2430 #51557E #816797 #D6D5A8
const Contract = "0x0568A87e64E65f4cC7898E08f0e57FFe2AA6241f"
class PfpDownloader {
    constructor() {
        this.web3 = undefined;
        this.myAddress = undefined;
        this.osResponse = undefined;
        this.osStats = undefined;
        this.contractInstance = undefined;
        this.myNfts = [];
        this.totalOwned = 12345;
        this._lastExtraBit = '';
    }
    async connectMM() {
        this.myNfts = []
        this.osResponse = undefined;
        this.totalOwned = 12345;
        this._lastExtraBit = '';
        this.myAddress = undefined;
        document.getElementById("nftHolder").innerHTML = ''

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        })

        this._addLoadingCard();
        this._addLoadingCard()
        this._addLoadingCard()
        this._addLoadingCard()
        document.getElementById("GUI_preLoginButtons").hidden = true;
        document.getElementById("GUI_postLoginButtons").hidden = false;
        //   document.getElementById("_addressMain").innerHTML = this.myAddress.toString()
        const account = accounts[0];
        this.myAddress = account;
        this.getBalanceOf(this.myAddress)
        this.getDataFromOS(this.myAddress)
        const newLi = document.createElement("li");
        newLi.textContent = this.myAddress.toString().slice(0, 8) + "..."
        document.getElementById("GUI_infoBar").appendChild(newLi)
    }
    getDataFromOS(address, extra) {
        const Http = new XMLHttpRequest();
        let url = 'https://api.opensea.io/api/v1/assets?owner=';
        url += address;
        url += "&limit=30"
        if (extra) {
            url += "&cursor=" + extra;
        }
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.responseText.charAt(0) == "{" && Http.responseText.charAt(Http.responseText.length - 1) == "}") {
                if (this._lastExtraBit !== JSON.stringify(JSON.parse(Http.responseText).next)) {
                    this._lastExtraBit = JSON.stringify(JSON.parse(Http.responseText).next);
                    this.osResponse = JSON.stringify(JSON.parse(Http.responseText));
                    this.searchForOwnerNfts()
                }
            }
            return true;
        }
    }
    searchForOwnerNfts() {
        if (this.totalOwned > 0) {
            document.getElementById("nftHolder").innerHTML = ''
        } else {
            return false;
        }
        for (let n = 0; n < JSON.parse(this.osResponse).assets.length; n++) {
            let _new = true;
            for (let n1 = 0; n1 < this.myNfts.length; n1++) {
                if (JSON.parse(this.osResponse).assets[n].name == this.myNfts[n1].name) _new = false;
            }
            if (JSON.parse(this.osResponse).assets[n].description == "My Breathtaking Pixel Bois" && _new) {
                this.myNfts.push(JSON.parse(this.osResponse).assets[n])
            }
        }
        for (let m = 0; m < this.myNfts.length; m++) {
            this.addCard(this.myNfts[m].name, m)
        }
        if (JSON.parse(this.osResponse).next !== null && this.totalOwned > this.myNfts.length) {
            this._addLoadingCard()
            this.getDataFromOS(this.myAddress, JSON.stringify(JSON.parse(this.osResponse).next))
        }
        return true;
    }
    addCard(name) {
        let _id = name.slice(5)
        let _div = document.createElement("div");
        // let _saveButton = document.createElement("button");
        // _saveButton.innerHTML = "💾<span class='tooltiptext'>Save image</span>"
        // _saveButton.id = _id;
        // _saveButton.addEventListener("click", (e) => {
        //     this.savePfp(e.path[0].id)
        // });
        // _saveButton.style.position = "absolute"
        // _div.appendChild(_saveButton);
        // if(document.getElementById("hidden").children.length == 0){
        //   document.getElementById("hidden").appendChild(_saveButton)
        // }
        // let _osButton = document.createElement("button");
        // _osButton.innerHTML = "🌊<span class='tooltiptext'>View on OpenSea</span>"
        // _osButton.id = _id;
        // _osButton.addEventListener("click", (e) => {
        //     window.open('https://opensea.io/assets/ethereum/0x0568a87e64e65f4cc7898e08f0e57ffe2aa6241f/'+e.path[0].id);
        // });
        // _osButton.style.position = "absolute"
        // _osButton.style.marginLeft = document.getElementById("hidden").children[0].offsetWidth + "px"
        // _div.appendChild(_osButton);
        // _div.appendChild(_saveButton);
        _div.classList.add('columns');
        let _img = document.createElement("img");
        _img.src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + _id + ".png"
        //_img.alt = name;
        _img.classList.add("thumbnail")
        // _img.style.width = "100px";
        let _divCont = document.createElement("p");
        _divCont.classList.add('thumbnail_align');
        let _name = document.createElement("h4");
        _name.innerHTML = name;
        _divCont.appendChild(_img);
        _divCont.appendChild(_name);
        _div.id = name;
        _div.addEventListener("click", (ev) => {
            selectBoi(ev.path[2].id, ev.path[2])
        });

        // let _healthBarDiv = document.createElement("div");
        // let _healthBar = document.createElement("hr");
        // let _hp = 0;
        // let _mp = 0;
        // for(let x = 0 ; x < this.myNfts[pos].traits.length ; x++){
        //   if(this.myNfts[pos].traits[x].trait_type == "HP"){
        //     _hp = this.myNfts[pos].traits[x].value;
        //   }
        //   if(this.myNfts[pos].traits[x].trait_type == "MP"){
        //     _mp = this.myNfts[pos].traits[x].value;
        //   }
        // }
        // _healthBar.innerHTML = "<span class='tooltiptext'>HP:" + _hp+"/"+_hp  + "<br>MP:"+_mp+"/"+_mp + "</span>"
        // _healthBarDiv.appendChild(_healthBar);
        // _div.appendChild(_healthBarDiv);
        _div.appendChild(_divCont);
        document.getElementById("nftHolder").appendChild(_div)
    }
    _addLoadingCard() {
        let _div = document.createElement("div");
        _div.classList.add('columns');
        let _img = document.createElement("img");
        _img.src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/preloader.gif"
        //_img.style.width = "100%";
        _img.alt = "loading nfts";
        _img.classList.add("thumbnail")
        // _img.style.width = "100px";
        let _divCont = document.createElement("p");
        _divCont.classList.add('thumbnail_align');
        let _name = document.createElement("h4");
        _name.innerHTML = "Loading..";
        let _name2 = document.createElement("p");
        _name2.innerHTML = "Plase await";
        _divCont.appendChild(_img);
        // _divCont.appendChild(_name2);
        _divCont.appendChild(_name);
        _div.appendChild(_divCont);
        _div.style.textAlign = "center";
        document.getElementById("nftHolder").appendChild(_div)
        typewiterArray.push(new Typewiter(_name, "LOADING YOUR NFT DATA...", 100))
        // _div.style.width = "100%"
        // _div.style.height = "300px"
        // _div.style.marginLeft =  (window.innerWidth/2)-((document.getElementById("GUI_nftory").offsetWidth/4)/1.4)+"px"
        if (this.totalOwned > document.getElementById("nftHolder").children.length && this.totalOwned !== 12345) {
            this._addLoadingCard()

        }
    }

    welcomeInteraction() {
        //document.getElementById("info_screen").textContent = "Ok fair enough, move along now."
        typewiterArray.push(new Typewiter(document.getElementById("info_screen"), "Ok fair enough, move along now..", 140))
        document.getElementById("info_block").removeChild(document.getElementById("info_block").lastChild)
        document.getElementById("info_block").removeChild(document.getElementById("info_block").lastChild)
        let _chooseButton = document.createElement("button");
        _chooseButton.textContent = "🦊Connect MetaMask"
        _chooseButton.style.width = "100%"
        _chooseButton.style.height = "50px";
        _chooseButton.onclick = function() {
            controller.connectMM()
        };
        document.getElementById("info_block").appendChild(_chooseButton)
    }
    async getStatsFromOS() {
        const Http = new XMLHttpRequest();
        let url = 'https://api.opensea.io/api/v1/collection/my-breathtaking-pixel-bois/stats';
        await Http.open("GET", url);
        await Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.responseText.charAt(0) == "{") {
                if (this.osStats == undefined) {
                    this.osStats = JSON.parse(Http.responseText);
                    this.displayStats();
                }
            }
            return true;
        }
    }
    displayStats() {
        let statsText = "Floor:" + this.osStats.stats.floor_price + " ETH"
        //statsText += "Market Cap:" + this.osStats.stats.market_cap + " ETH<br>"
        //statsText += "Floor:" + this.osStats.stats.floor_price + " ETH<br>"
        // statsText += "Owners:"+osstats.stats.num_owners+"<br>"
        //statsText += "Total sales:" + this.osStats.stats.total_sales + "<br>"

        const newLi = document.createElement("li");
        newLi.textContent = statsText
        document.getElementById("GUI_infoBar").appendChild(newLi)

        // document.getElementById("_mainStats").innerHTML = statsText;
    }
    savePfp(id) {
        let a = document.createElement('a');
        a.href = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + id + ".png";
        a.download = id + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    async getBalanceOf(address) {
        await this.contractInstance.methods.balanceOf(address).call().then(function(total) {
            controller.totalOwned = Number(total);
            if (total == 0) {
                //you dont own any!
                document.getElementById("nftHolder").innerHTML = ''
                setTimeout(() => {
                    // controller._addStartCard();
                    let p = document.createElement('p');
                    typewiterArray.push(new Typewiter(p, "Looks like you dont own any bois..", 70))
                    p.classList.add("thumbnail_align")
                    document.getElementById("nftHolder").appendChild(p)
                    //document.getElementById("info_screen").innerHTML = "Oh no looks likt you dont own any BOIZ D:"
                }, "100")
            }
        })
    }
}
class Typewiter {
    constructor(target, text, speed) {
        for (let tp = 0; tp < typewiterArray.length; tp++) {
            if (typewiterArray[tp].target == target) {
                typewiterArray.splice(tp, 1)
                tp = typewiterArray.length;
            }
        }
        this.quest = false;
        this.speed = speed;
        this.currentTimer = 100;
        this.target = target;
        this.text = text;
        this.position = 0;
        this.typing = true;
        this.target.innerHTML = ''
    }
    update(delta) {
        this.currentTimer -= delta;
        if (this.currentTimer < 0) {
            if (gameOn) sound_typing.play();
            this.currentTimer = JSON.parse(JSON.stringify(this.speed));
            this.target.innerHTML += this.text.charAt(this.position);
            this.position += 1;
            this.target.parentNode.scrollTo(0, this.target.scrollHeight);
            if (this.position >= this.text.length) {
                if (gameOn) sound_typing.stop()
                this.typing = false;
                // const br = document.createElement("br");
                // this.target.appendChild(br)
                // this.target.appendChild(br)
                if (this.quest) {
                    document.getElementById("GUI_questButtonHolder").innerHTML = ''
                    if (currentDialogue.availableQuestions.length > 0) {
                        for (let n = 0; n < currentDialogue.availableQuestions.length; n++) {
                            const b = document.createElement("button");
                            b.textContent = currentDialogue.availableQuestions[n].text
                            b.id = currentDialogue.availableQuestions[n].id;
                            b.addEventListener("click", (e) => {
                                document.getElementById("GUI_questButtonHolder").innerHTML = ''
                                document.getElementById("GUI_questText").textContent = '';
                                for (let r = 0; r < currentDialogue.replyData.length; r++) {
                                    if (currentDialogue.replyData[r].id == e.path[0].id) {
                                        typewiterArray.push(new Typewiter(document.getElementById("GUI_questText"), currentDialogue.replyData[r].text, 25))
                                        if (currentDialogue.replyData[r].endDialogue) {
                                            _toggleQuest()
                                        }
                                        if (currentDialogue.replyData[r].startQuest) {
                                            _startQuest()
                                        }
                                        if (currentDialogue.replyData[r].shop) {
                                            _toggleQuest()
                                            gameController.shop.requestShopList();
                                        }
                                    }
                                }
                            });
                            document.getElementById("GUI_questButtonHolder").appendChild(b)
                        }
                    }
                }
            }
        }
    }
}

const controller = new PfpDownloader()



var typewiterArray = []


class Dialgue {
    constructor() {
        this.active = true;
        this.currentText = new StatementConstruct(0, '...');
        this.availableQuestions = [];
        this.replyData = [];
    }
    updateConversation(_id) {
        if (!this.active) {
            return false;
        }
        for (let n = 0; n < this.replyData.length; n++) {
            if (this.replyData[n].id == _id) {
                this.newCurrentText(this.replyData[n])
                if (this.replyData[n].specialOptions) {
                    //this.availableQuestions = [];
                    this.availableQuestions.unshift(JSON.parse(JSON.stringify(this.replyData[n].specialOptions)))
                    this.replyData[n].specialOptions = false;
                }
                if (this.replyData[n].endDialogue) {
                    this.stopConversation()
                }
                n = this.replyData.length
            }
        }
        this.updateCard();
        return true;
    }
    newCurrentText(statement) {
        this.currentText = statement;
        return true;
    }
    makeQuestionVisible(question) {
        this.availableQuestions.push(question)
        return true;
    }
    stopConversation() {
        this.availableQuestions = [];
        this.updateCard();
        return true;
    }
    endConversation() {
        if (!this.active) {
            return false;
        }
        this.currentText = new StatementConstruct(0, 'Goodbye');
        this.stopConversation()
        this.active = false;
        return true;
    }
}
class Question {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.pushed = false;
    }
}
class StatementConstruct {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.specialOptions = false;
        this.endDialogue = false;
    }
    returnText() {
        if (typeof this.text === 'string' || this.text instanceof String) {
            return this.text;
        } else {
            let _rand = Math.floor(Math.random() * this.text.length)
            return this.text[_rand]
        }
    }
}

let currentDialogue;
let startDialogue = new Dialgue();
let welcomeMessage = new StatementConstruct(0, "Oh hey there you are awake!\nPlease look around ,relax and feel at home at my farm. My daughter will cook something for us later.")
let q0 = new Question(1, "Where is my clothes?")
let a0 = new StatementConstruct(1, "You washed up a shore here a day ago..Seems you had a boating accident o smthn.\n We will get you some clothes later for now you are lucky to be alive!")
let q1 = new Question(2, 'Ok bye.')
let a1 = new StatementConstruct(2, "")
let q2 = new Question(3, 'Trade')
let a2 = new StatementConstruct(3, "")
a1.endDialogue = true;
a2.shop = true;
startDialogue.currentText = welcomeMessage;
//startDialogue.availableQuestions = [q0, q1]
//startDialogue.replyData = [a0, a1]
startDialogue.replyData = [a0,a1,a2]
startDialogue.availableQuestions = [q0,q1,q2]
currentDialogue = startDialogue;


let questDialogue = new Dialgue();
let qwelcomeMessage = new StatementConstruct(0, "Hey my father wants me to cook a berry salad tonight, but I just did my nails.. So can you help me?")
let qq0 = new Question(1, "Yeah sure!")
let qa0 = new StatementConstruct(1, "Awsome! Here are some Berry seeds and Shears, go plant them on a farm and bring back the berry!")
//\nGrab a bucket in front of the house, fill it up with water from the well and water the plants to make them grow faster! Good luck.
let qq1 = new Question(2, 'Nope.')
let qa1 = new StatementConstruct(2, "")
qa1.endDialogue = true;
qa0.startQuest = true;
questDialogue.currentText = qwelcomeMessage;
questDialogue.availableQuestions = [qq0, qq1]
questDialogue.replyData = [qa0, qa1]

let questDialogueAwait = new Dialgue();
let qwelcomeMessageAwait = new StatementConstruct(0, "Are you bringing me that berry?")
questDialogueAwait.currentText = qwelcomeMessageAwait;

let questDialogueDone = new Dialgue();
let qwelcomeMessageDone = new StatementConstruct(0, "Great, the salad will be fire! Keep the seeds and grab a bucket in front of the house and water your plants to grow faster!")
questDialogueDone.currentText = qwelcomeMessageDone;



//classes
class GlobalTime {
    constructor() {
        this.int = 0;
        this.timer = 1000;
    }
    ticktock(delta) {
        this.timer -= Math.floor(delta);
        if (this.timer < 0) {
            this.timer = 1000;
            this.incrInt()
        }
    }
    incrInt() {
        gameController.update();
        this.int++;
        return;
    }
}
class GameController {
    constructor() {
        this.energy = 100;
        this.balance = 0;
        this.map;
        this.weather;
        this.inventory = [];
        this.openInventory = false;
        this.selectedItem = null;
        this.shop;
        this.lvl = 1;
        this.xp = 0;
        this.firstQuest = true;
        createInventory(this.inventory)
    }
    update() {

      if(gameOn){
        intervalID = setTimeout(() => {
            if (document.hidden && gameOn) {
                switchScreen();
            }
        }, 3000);
      }

        if (ladyquest !== undefined) {
            if (!gameController.firstQuest) {
                let questReady = false;
                for (let q = 0; q < gameController.inventory.length; q++) {
                    if (gameController.inventory[q].name == "Berry" && gameController.inventory[q].amount > 0) {
                        questReady = true;
                    }
                }
                if (questReady) {
                    planeShopKeep.material.map = _texQuestDone
                } else {
                    planeShopKeep.material.map = _texQuestAwait
                }
            } else if (gameController.firstQuest) {
                planeShopKeep.material.map = _texQuest
            } else if (gameController.firstQuest == "done") {
                planeShopKeep.material.map.opacity = 0;
            }
        }
        this.weather.update()
        this._drawInventory();
        this._drawUIX()

        for (let n = 0; n < this.map.map.length; n++) {
            for (let m = 0; m < this.map.map[n].length; m++) {
                if (this.map.map[n][m].farm.obj) {
                    if (this.map.map[n][m].farm.planted && this.map.map[n][m].farm.planted.ripeTime >= -1) {
                        this.map.map[n][m].farm.planted.ripeTime--;
                        if (this.map.map[n][m].farm.planted.watered) {
                            this.map.map[n][m].farm.planted.ripeTime--;
                        }
                        if (this.map.map[n][m].farm.planted.ripeTime < 0) {
                            if (this.map.map[n][m].farm.planted.name == "Berry") {
                                _prepareObjTexture("berry2")
                            } else if (this.map.map[n][m].farm.planted.name == "Carrot") {
                                _prepareObjTexture("carrot2")
                            } else {
                                _prepareObjTexture("sunflower2")
                            }
                            this.map.map[n][m].farm.obj.geometry = new THREE.PlaneGeometry(globalX, globalY * 1.5);
                            this.map.map[n][m].farm.obj.position.y = (n * 16) + (globalY / 4);
                            let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                            this.map.map[n][m].farm.obj.material.map = _tex;
                            //this.map.map[n][m].farm.obj.material.color.set(0x0f0f00);
                        } else if (this.map.map[n][m].farm.planted.ripeTime < this.map.map[n][m].farm.planted.ripeTimeFull / 2) {
                            this.map.map[n][m].farm.planted.ripeTimeFull = 0;
                            if (this.map.map[n][m].farm.planted.name == "Berry") {
                                _prepareObjTexture("berry1")
                            } else if (this.map.map[n][m].farm.planted.name == "Carrot") {
                                _prepareObjTexture("carrot1")
                            } else {
                                _prepareObjTexture("sunflower1")
                            }
                            let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                            this.map.map[n][m].farm.obj.material.map = _tex;
                        }
                    }
                }
            }
        }
    }
    _updatePlayerMovement() {
        if (tempHoverInfo !== undefined) {
            document.getElementById("GUI_hoverInfo").textContent = _secondsToMinutes(tempHoverInfo.ripeTime);
        }
        if (ladyquest !== undefined) ladyannie.update(20, 3)
        waterannie.update(30, 1);
        this.shop.shopkeepannie.update(10, 3);
        for (let _player of this.map.players) {
            if (_player.moveArray.length > 0) {
                _player.walkingannie.update(50, _player.direction);
                //  if(_player.idleannie.currentTile !== 3)_player.idleannie.currentTile = 3;
                if (_player.moveArray[0].x * 16 > _player.obj.position.y) {
                    _player.direction = 0;
                    _player.obj.position.y += 2;
                } else
                if (_player.moveArray[0].x * 16 < _player.obj.position.y) {
                    _player.direction = 3;
                    _player.obj.position.y -= 2;
                } else
                if (Math.floor(_player.moveArray[0].y * 16) > Math.floor(_player.obj.position.x)) {
                    _player.direction = 1;
                    _player.obj.position.x += 2;
                } else
                if (_player.moveArray[0].y * 16 < _player.obj.position.x) {
                    _player.direction = 2;
                    _player.obj.position.x -= 2;
                }

                if (Math.floor(_player.moveArray[0].x * 16) == Math.floor(_player.obj.position.y) &&
                    Math.floor(_player.moveArray[0].y * 16) == Math.floor(_player.obj.position.x)) {
                    //_player.obj.position.y = _player.moveArray[0].x*16
                    //_player.obj.position.x = _player.moveArray[0].y*16
                    _player.moveArray.shift();
                    if (_player.moveArray.length == 0) {
                        _player.obj.material.map = _player._texP;
                        sound_walking.play();
                        sound_walking.stop();
                        _player.idleannie.update(1000, _player.direction);
                    }
                }
            } else {
                if (_player.obj.material.map == _player._texW) {
                    _player.obj.material.map = _player._texP;
                    sound_walking.stop();
                }
                //  if(_player.idleannie.currentTile)
                //  _player.idleannie.currentTile = 0;
                _player.idleannie.update(5, _player.direction);

            }
        }
    }
    _drawUIX() {
        if (this.energy < 100) this.energy += 0.01
        if (this.energy > 100) this.energy = 100;
        //document.getElementById("GUI_Energy").textContent = Math.floor(this.energy);
        document.getElementById("GUI_Energy").style.width = Math.floor(this.energy) + "%"
        document.getElementById("GUI_Time").textContent = gameController.weather.hour + ":" + gameController.weather.minutes + " " + gameController.weather.weeks[gameController.weather.currentDay] + "🌔"
        // document.getElementById("GUI_EnergyBack").style.top = document.getElementById("GUI_Energy").offsetTop + "px"
        // document.getElementById("GUI_EnergyBack").style.left = document.getElementById("GUI_Energy").offsetLeft + "px"
        document.getElementById("GUI_boiName").innerHTML = gameController.boid + "<br>💰:" + gameController.balance;
        document.getElementById("GUI_xpBar").style.width = Math.floor(((gameController.xp / expSet[gameController.lvl]) * 100) * 0.42) + "%"
    }
    _drawGameEffects() {
        if (this.selectedItem) {
            if (this.selectedItem.name == "Shears" || this.selectedItem.name == "Water" || this.selectedItem.name.slice(this.selectedItem.name.length - 5, this.selectedItem.name.length) == "seeds") {
                for (let n = 0; n < this.map.map.length; n++) {
                    for (let m = 0; m < this.map.map[n].length; m++) {
                        if (this.selectedItem.name !== "Shears" && this.map.map[n][m].farm && !this.map.map[n][m].farm.planted && this.selectedItem.name !== "Water") {
                            this.map.map[n][m].farm.obj.material.color.set(0xFFD700)
                        }
                        if (this.selectedItem.name == "Water" && this.map.map[n][m].farm.planted && this.map.map[n][m].farm.planted.ripeTime > 0) {
                            this.map.map[n][m].farm.obj.material.color.set(0x2B7ADB)
                        }
                        if (this.selectedItem.name == "Shears" && this.map.map[n][m].farm.planted !== undefined && this.map.map[n][m].farm.planted.ripeTime <= 0) {
                            // if(this.map.map[n][m].farm.planted !== undefined && this.map.map[n][m].farm.planted.ripeTime <= 0 && this.map.map[n][m].farm.planted.name){
                            this.map.map[n][m].farm.obj.material.color.set(0x39FF14)
                            // }
                        }
                    }
                }
            }
        } else {
            for (let n = 0; n < this.map.map.length; n++) {
                for (let m = 0; m < this.map.map[n].length; m++) {
                    if (this.map.map[n][m].farm) {
                        this.map.map[n][m].farm.obj.material.color.set(0xffffff)
                    }
                }
            }
        }
    }
    _openInventory() {
        this.openInventory = true;
        for (let z = 0; z < 18; z++) {
            if (z > 5) {
                document.getElementById("GUI_InventoryScreen").children[z].hidden = false;
            }
        }
        this._drawInventory()
    }
    _closeInventory() {
        this.openInventory = false;
        for (let z = 0; z < 18; z++) {
            if (z > 5) {
                document.getElementById("GUI_InventoryScreen").children[z].hidden = true;
            }
        }
    }
    toggleInventory() {
        if (this.openInventory) {
            this._closeInventory()
            document.getElementById("GUI_openInventory").textContent = "🧳"
        } else {
            this._openInventory()
            document.getElementById("GUI_openInventory").textContent = "❌"
        }
        this._drawInventory();
    }
    _drawInventory() {
        document.getElementById("GUI_openInventory").style.marginLeft = document.getElementById("GUI_InventoryScreen").offsetLeft + document.getElementById("GUI_InventoryScreen").offsetWidth + "px"
        document.getElementById("GUI_openInventory").style.marginTop = document.getElementById("GUI_InventoryScreen").offsetTop + "px"
        if (this.map !== undefined) this._drawGameEffects()

        let num = 6;
        if (this.openInventory) {
            num = 18;
        }
        for (let n = 0; n < num; n++) {
            let item = this.inventory[n]
            if (!item || item.amount <= 0 && item.name !== "Water") {
                let button = document.createElement("button")
                //  button.innerHTML = '<img src="https://mooodev.github.io/pixelBois/breathtakingSite/favico.png" draggable="true" ondragstart="drag(event)" id="xxx" width="100%" height="100%">'
                button.height = 50;
                button.id = n;
                button.style.width = Math.floor((document.getElementById("GUI_InventoryScreen").offsetWidth) / 7) + "px";
                document.getElementById("GUI_InventoryScreen").children[n].innerHTML = '';
                document.getElementById("GUI_InventoryScreen").children[n].appendChild(button);
            } else {
                let button = document.createElement("button")
                button.height = 50;
                let _pngtemp = ".png"
                if (item.name == "Water") {
                    if (item.amount < 3) {
                        _pngtemp = "1empty.png"
                    } else {
                        _pngtemp = "1.png"
                    }
                }
                button.style.backgroundImage = "url('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/" + item.name + _pngtemp + "')"
                button.innerHTML = "<h4>x" + item.amount + "</h4>"
                button.id = n;
                button.draggable = true;
                let span = document.createElement("span")
                span.textContent = item.name
                span.style.opacity = "0";
                button.appendChild(span)
                button.style.width = Math.floor((document.getElementById("GUI_InventoryScreen").offsetWidth) / 7) + "px";
                button.addEventListener("click", function(e) {
                    sound_click.play();
                    gameController.selectItem(e.path[0].id, e.path[0].style.backgroundImage)
                    //document.body.style.cursor = 'grab';
                }, true);
                button.addEventListener("dragstart", (event) => {
                    // make it half transparent
                    drag(event)
                });
                document.getElementById("GUI_InventoryScreen").children[n].innerHTML = '';
                if (gameController.selectedItem) {
                    if (gameController.selectedItem.name == item.name) button.style.backgroundColor = "green"
                }
                document.getElementById("GUI_InventoryScreen").children[n].appendChild(button);
            }
        }

        //         //document.body.style.cursor = 'pointer';
        //         document.body.style.cursor = 'unset';

        document.getElementById("GUI_xpBar").style.marginLeft = (document.getElementById("GUI_InventoryScreen").offsetLeft + 5) + "px"
        document.getElementById("GUI_xpBar").style.marginTop = (document.getElementById("GUI_InventoryScreen").offsetTop + 7) + "px"
        document.getElementById("GUI_xpBarBack").style.marginLeft = (document.getElementById("GUI_InventoryScreen").offsetLeft + 5) + "px"
        document.getElementById("GUI_xpBarBack").style.marginTop = (document.getElementById("GUI_InventoryScreen").offsetTop + 7) + "px"
    }
    useItem(x, y) {
        if (this.selectedItem) {
            for (let n = 0; n < this.map.map.length; n++) {
                for (let m = 0; m < this.map.map[n].length; m++) {
                    if (this.map.map[n][m].obj) {
                        if (this.map.map[n][m].obj.position.x == x && this.map.map[n][m].obj.position.y == y) {
                            if (this.map.map[n][m].farm) {
                                this._farmingItem(m, n)
                            }
                            if (this.map.map[n][m].water) {
                                this._refillWater()
                            }
                            // for (let p = 0; p < gameController.map.players.length; p++) {
                            //     if (gameController.map.players[p].obj.position.x == x && gameController.map.players[p].obj.position.y == y) {
                            //         this._useEdible(p)
                            //     }
                            // }
                        }
                    }
                }
            }
        }
    }
    _useEdible() {
        requestToUseEdible();
        if (this.selectedItem.name == "Berry") {
            sound_powerUp.play()
            gameController.energy += 1;
            this.selectedItem.amount--;
            this._checkIfSelectedItemEmpty()
        } else if (this.selectedItem.name == "Carrot") {
            sound_powerUp.play()
            gameController.energy += 2;
            this.selectedItem.amount--;
            this._checkIfSelectedItemEmpty()
        } else if (this.selectedItem.name == "Sunflower") {
            sound_powerUp.play()
            gameController.energy += 5;
            this.selectedItem.amount--;
            this._checkIfSelectedItemEmpty()
        }
        return;
    }
    hoverInfo(x, y, event) {
        if (this.map == undefined) return;
        let _shown = false;
        for (let n = 0; n < this.map.map.length; n++) {
            for (let m = 0; m < this.map.map[n].length; m++) {
                if (this.map.map[n][m].obj) {
                    if (this.map.map[n][m].obj.position.x == x && this.map.map[n][m].obj.position.y == y) {
                        if (this.map.map[n][m].farm.planted) {
                            if (this.map.map[n][m].farm.planted.ripeTime > 0) {
                                _shown = true;
                                tempHoverInfo = this.map.map[n][m].farm.planted;
                                document.getElementById("GUI_hoverInfo").hidden = false;
                                document.getElementById("GUI_hoverInfo").textContent = _secondsToMinutes(this.map.map[n][m].farm.planted.ripeTime)
                                document.getElementById("GUI_hoverInfo").style.top = (event.clientY - 40) + "px"
                                document.getElementById("GUI_hoverInfo").style.left = event.clientX + "px"

                            }
                        }
                    }
                }
            }
        }
    }
    _refillWater() {
        if (this.selectedItem) {
            if (this.selectedItem.name == "Water") {
                _requestWaterRefill();
                sound_watering.play();
                sound_watering.stop();
                sound_watering.play();
                this.selectedItem.amount = 10;
            }
            this.selectedItem = null;
            document.getElementById("GUI_itemSelector").hidden = true;
            return;
        }
    }
    _checkIfSelectedItemEmpty() {
        if (this.selectedItem.amount == 0) {
            document.getElementById("GUI_itemSelector").hidden = true;
            setTimeout(function() {
                gameController.selectItem(false)
                gameController._drawGameEffects()
            }, 25);

        }
    }
    async _farmingItem(x, y) {
        if (!this.map.map[y][x].farm.planted) {
            if (this.selectedItem.name.slice(this.selectedItem.name.length - 5, this.selectedItem.name.length) == "seeds" && this.selectedItem.amount > 0) {
                if (this.energy <= 0) {
                    return false;
                } else {
                    if (!_decreasePlayerEnergy(gameController, 1)) return
                    askToPlantASeed(x, y, this.selectedItem.name)
                    sound_plant.play();
                    sound_plant.stop();
                    sound_plant.play();
                }
                this.selectedItem.amount--;
                if (this.selectedItem.name.slice(0, 5) == "Berry") {
                    _prepareObjTexture("berry0")
                    this.map.map[y][x].farm.planted = JSON.parse(JSON.stringify(plantArray[0]));
                } else if (this.selectedItem.name.slice(0, 6) == "Carrot") {
                    _prepareObjTexture("carrot0")
                    this.map.map[y][x].farm.planted = JSON.parse(JSON.stringify(plantArray[1]));
                } else {
                    _prepareObjTexture("sunflower0")
                    this.map.map[y][x].farm.planted = JSON.parse(JSON.stringify(plantArray[2]));
                }
                let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                this.map.map[y][x].farm.obj.material.map = _tex;
                this.map.map[y][x].farm.obj.material.transparent = true;
                //this.map.map[y][x].obj.material.color.set(0xfffff0);
                this._checkIfSelectedItemEmpty()
                this._drawInventory()
                return;
            }

        }
        if (this.map.map[y][x].farm.planted && this.selectedItem.amount > 0) { //&& !this.map.map[y][x].farm.planted.watered
            if (this.selectedItem.name == "Water") {
                if (this.energy <= 0) {
                    return false;
                } else {
                    if (!_decreasePlayerEnergy(gameController, 0.5)) return
                    askToWaterAPlant(x, y)
                    waterannie.currentTile = 0;
                    sound_watering.play();
                    sound_watering.stop();
                    sound_watering.play();
                    planeWatering.position.x = this.map.map[y][x].farm.obj.position.x + 2
                    planeWatering.position.y = this.map.map[y][x].farm.obj.position.y
                    planeWatering.position.z = 13;
                    setTimeout(function() {
                        planeWatering.position.z = -20;
                    }, 300);

                }
                this.selectedItem.amount--;
                this.map.map[y][x].farm.planted.watered = true;
                //this.map.map[y][x].farm.obj.material.color.set(0x00fff0);
                return;
            }
        }
        if (this.map.map[y][x].farm.planted && this.map.map[y][x].farm.planted.ripeTime < 0) {
            if (this.selectedItem.name == "Shears") {
                if (this.energy <= 0) {
                    return false;
                } else {
                    if (!_decreasePlayerEnergy(gameController, 1)) return
                    askToCropAPlant(y, x)
                    this.selectedItem.amount--;
                    sound_shears.play()
                }

                //  this._addInventory(new Item(this.map.map[y][x].farm.planted.name + " seeds", 2));
                //  this._addInventory(new Item(this.map.map[y][x].farm.planted.name, 1));
                if (this.map.map[y][x].farm.planted.name == "Berry") {
                    _prepareObjTexture("berry3")
                } else if (this.map.map[y][x].farm.planted.name == "Carrot") {
                    _prepareObjTexture("carrot3")
                } else {
                    _prepareObjTexture("sunflower3")
                }
                //this.map.map[y][x].farm.obj.position.y -= globalY;
                this.map.map[y][x].farm.obj.position.y = y * 16;
                let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                this.map.map[y][x].farm.obj.material.map = _tex
                this.map.map[y][x].farm.obj.geometry = new THREE.PlaneGeometry(globalX, globalY);
                this.map.map[y][x].farm.planted = false;
                this.map.map[y][x].farm.watered = false;
                setTimeout(function() {
                    _prepareObjTexture("rock")
                    let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                    gameController.map.map[y][x].farm.obj.material.map = _tex
                }, 2000);

                //  scene.remove(this.map.map[y][x].farm.obj)
                //this.map.map[y][x].farm.obj.material.color.set(0xffff00);
            }
        }
        return;
    }
    _addInventory(item) {

        let _newItem = true;
        for (let n = 0; n < this.inventory.length; n++) {
            if (this.inventory[n].name == item.name) {
                this.inventory[n].amount += item.amount;
                _newItem = false;
                n = this.inventory.length
            }
        }

        if (!_newItem) {
            return true;
        }
        for (let n = 0; n < this.inventory.length; n++) {
            if (this.inventory[n] == '' || this.inventory[n] == undefined) {
                this.inventory[n] = item;
                n = this.inventory.length
            }
        }
        if (this.inventory.length >= 18) {
            return false;
        }
        return true;
    }

    selectItem(id, domImg) {
        if (!id) {
            document.getElementById("GUI_SelectedItem").textContent = "nothing"
            this.selectedItem = null;
            document.getElementById("GUI_itemSelector").hidden = true;
            return;
        }
        if (this.selectedItem) {
            if (gameController.inventory[id].name == this.selectedItem.name) {
                document.getElementById("GUI_SelectedItem").textContent = "nothing"
                document.getElementById("GUI_itemSelector").hidden = true;
                this.selectedItem = null;
            } else {
                document.getElementById("GUI_SelectedItem").textContent = gameController.inventory[id].name
                this.selectedItem = gameController.inventory[id]
                document.getElementById("GUI_itemSelector").style.backgroundImage = domImg
                document.getElementById("GUI_itemSelector").hidden = false;

            }
        } else {

            document.getElementById("GUI_SelectedItem").textContent = gameController.inventory[id].name
            this.selectedItem = gameController.inventory[id]
            document.getElementById("GUI_itemSelector").hidden = false;
            document.getElementById("GUI_itemSelector").style.backgroundImage = domImg


        }
        gameController._drawInventory()
    }
}
class Item {
    constructor(_name, amount) {
        this.name = _name;
        this.amount = amount;
        this.farm = true;
    }
}
class GameMap {
    constructor() {
        this.map = []
        this.mobs = [];
        this.players = [];
    }
    newMap(x, y) {
        for (let n = 0; n < y; n++) {
            this.map.push([])
            for (let m = 0; m < x; m++) {
                let newTile = new Tile();
                const geometry = new THREE.PlaneGeometry(globalX, globalY);
                const material = new THREE.MeshPhongMaterial({
                    color: 0x63ab3f
                });
                const plane = new THREE.Mesh(geometry, material);
                plane.position.x = m * globalX;
                plane.position.y = n * globalY;
                newTile.obj = plane;
                this.map[n].push(newTile)
                scene.add(this.map[n][m].obj);
            }
        }
    }
    addWater(x, y) {
        _prepareObjTexture("water")
        this.map[y][x].water = true;
        this.map[y][x].blocked = true;
        //this.map[y+1][x].blocked = true;
        let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        const geometry = new THREE.PlaneGeometry(globalX * 2, globalY * 2);
        const material = new THREE.MeshPhongMaterial({
            map: _tex,
            transparent: true,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = x * globalX;
        plane.position.y = y * globalY;
        plane.position.z = 11;
        plane.rotation.x = 0.5
        this.map[y][x].obj = plane;
        scene.add(this.map[y][x].obj);
    }
    async addTree(y, x, type) {
        let tempZ = 10;
        let _treeType = Math.random()
        if (_treeType < 0.2) {
            if (Math.random() < 0.5) {
                if (Math.random() < 0.5) {
                    _prepareObjTexture("trunk")
                } else {
                    _prepareObjTexture("bush")
                }

            } else {
                if (Math.random() < 0.5) {
                    _prepareObjTexture("flower5")
                } else {
                    _prepareObjTexture("flower2")
                }
            }

            tempZ = 3;
            let _texTr = new THREE.TextureLoader().load(tileCanvas.toDataURL());
            if (this.map[y] && this.map[y][x]) this.map[y][x].blocked = true;
            //this.map[y+1][x].blocked = true;
            const geometry = new THREE.PlaneGeometry(globalX, globalY);
            const materialTr = new THREE.MeshPhongMaterial({
                map: _texTr,
                transparent: true
            });
            const planeTr = new THREE.Mesh(geometry, materialTr);
            let _noiseRand = 0;
            if (x == 0) {
                _noiseRand = Math.floor(Math.random() * 16)
            } else {
                _noiseRand = Math.floor(Math.random() * 16)
            }
            planeTr.position.x = (x * globalX) + _noiseRand;
            planeTr.position.y = (y * globalY) + _noiseRand;
            planeTr.position.z = tempZ
            planeTr.rotation.x = 0.5
            scene.add(planeTr);
            return;
        } else
        if (!type) {
            tempZ = 7.5;
            if (_treeType < 0.4) {
                _prepareObjTexture("tree")
            } else if (_treeType < 0.8) {
                _prepareObjTexture("tree2")
            } else {
                _prepareObjTexture("tree3")
            }
        } else {
            _prepareObjTexture("tree")
        }

        let _texTr = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        if (this.map[y] && this.map[y][x]) this.map[y][x].blocked = true;
        //this.map[y+1][x].blocked = true;
        const geometry = new THREE.PlaneGeometry(globalX * 2, globalY * 2);
        const materialTr = new THREE.MeshPhongMaterial({
            map: _texTr,
            transparent: true
        });
        const planeTr = new THREE.Mesh(geometry, materialTr);
        let _noiseRand = 0;
        if (x == 0) {
            _noiseRand = Math.floor(Math.random() * 16)
        } else {
            _noiseRand = Math.floor(Math.random() * 16)
        }
        planeTr.position.x = (x * globalX) + _noiseRand;
        planeTr.position.y = (y * globalY) + _noiseRand;
        planeTr.position.z = tempZ
        planeTr.rotation.x = 0.5
        scene.add(planeTr);
    }
    addFarm(x, y, _x, _y) {
        _prepareObjTexture("rock")
        let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        for (let n = _y; n < y + _y; n++) {
            for (let m = _x; m < x + _x; m++) {
                this.map[n][m].obj.material.color.set(0x8f4d57);
                this.map[n][m].farm = new FarmTile();
                const geometry = new THREE.PlaneGeometry(globalX, globalY);
                const material = new THREE.MeshPhongMaterial({
                    //color: 0x8f4d57,
                    map: _tex,
                    transparent: true
                });
                //material.map.needsUpdate = true;
                const plane = new THREE.Mesh(geometry, material);
                plane.position.x = (m * globalX)
                plane.position.y = (n * globalY)
                plane.position.z = 5;
                plane.rotation.x = 0.5
                this.map[n][m].farm.obj = plane;
                scene.add(this.map[n][m].farm.obj);
            }
        }
    }
    addHouse(x, y) {
        const lightP = new THREE.PointLight(0xffd700, 1, 50);
        lightP.position.set(x * 16, (y * 16) - 9, 30);
        scene.add(lightP);
        _prepareObjTexture("house")
        this.map[y][x].blocked = true;
        this.map[y - 1][x - 1].blocked = true;
        this.map[y - 1][x + 1].blocked = true;
        let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        const geometry = new THREE.PlaneGeometry(globalX * 5, globalY * 5);
        const material = new THREE.MeshPhongMaterial({
            map: _tex,
            transparent: true,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = x * globalX;
        plane.position.y = y * globalY;
        plane.position.z = 22;
        plane.rotation.x = 0.5
        this.map[y][x].obj = plane;
        scene.add(this.map[y][x].obj);
        _prepareObjTexture("bucket")
        this.map[y - 2][x + 1].blocked = true;
        let _tex1 = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        const geometry1 = new THREE.PlaneGeometry(globalX, globalY);
        const material1 = new THREE.MeshPhongMaterial({
            map: _tex1,
            transparent: true
        });
        const plane1 = new THREE.Mesh(geometry1, material1);
        plane1.position.x = (x + 1) * globalX;
        plane1.position.y = (y - 2) * globalY;
        plane1.position.z = 6;
        plane1.rotation.x = 0.5
        this.map[y][x].obj = plane1;
        scene.add(this.map[y][x].obj);

        // _prepareObjTexture("bush")
        // this.map[y - 1][x + 2].blocked = true;
        // let _tex2 = new THREE.TextureLoader().load(tileCanvas.toDataURL());
        // const geometry1B = new THREE.PlaneGeometry(globalX, globalY);
        // const material1B = new THREE.MeshPhongMaterial({
        //     map: _tex2,
        //     transparent: true
        // });
        // const planeBush = new THREE.Mesh(geometry1B, material1B);
        // planeBush.position.x = (x + 3) * globalX;
        // planeBush.position.y = (y - 2) * globalY;
        // planeBush.position.z = 6;
        // planeBush.rotation.x = 0.5
        // this.map[y][x].obj = planeBush;
        // scene.add(this.map[y][x].obj);
    }
    addPlayer(activeControl, x, y, _boid) {
        document.getElementById("GUI_boiName").textContent = _boid + " : lvl" + gameController.lvl
        document.getElementById("GUI_boiAvatar").src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + _boid.slice(5, _boid.length) + ".png"
        let _player = new Player()
        _player.boid = _boid;
        _player.activeControl = activeControl;
        _preparePlayerTexture("walk", _boid)
        _player._texW = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
        _preparePlayerTexture("idle", _boid)
        _player._texP = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
        _player.walkingannie = new TextureAnimator(_player._texW, 4, 4, 2, 3, 175);
        _player.idleannie = new TextureAnimator(_player._texP, 4, 4, 2, 3, 175);
        const geometry = new THREE.PlaneGeometry(globalX, (globalY + (globalY / 2)));
        const material = new THREE.MeshPhongMaterial({
            map: _player._texP,
            transparent: true
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = this.players.length * 32
        plane.material.needsUpdate = true;
        plane.position.z = 10
        plane.position.x = x * globalX;
        plane.position.y = y * globalY;
        plane.rotation.x = 0.5
        const materialEmote = new THREE.MeshPhongMaterial({
            map: _texEmote,
            transparent: true
        });
        materialEmote.needsUpdate = true;
        const planeEmote = new THREE.Mesh(geometryEmote, materialEmote);
        planeEmote.position.x = 13;
        planeEmote.position.y = 10;
        planeEmote.position.z = 11;
        planeEmote.rotation.x = 0.1
        planeEmote.material.opacity = 0;
        scene.add(planeEmote)
        plane.add(planeEmote)
        if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "Demon") {
            const light = new THREE.PointLight(0xff0000, 0.7, 60);
            light.position.set(0, 5, 12);
            light.rotation.x = 0.3
            scene.add(light);
            plane.add(light)
        }

        _player.obj = plane;
        _player.emote = materialEmote;
        this.players.push(_player)

        scene.add(this.players[this.players.length - 1].obj);
    }
}

var tileImgPlayer = document.createElement("IMG");
var tileCanvasPlayer = document.createElement("CANVAS")
tileCanvasPlayer.width = 32;
tileCanvasPlayer.height = 48;
tileImgPlayer.src = 'data:image/png;base64,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'
let imageNpcs = document.createElement("IMG");
imageNpcs.src = "data:image/png;base64,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"



var tileCanvasPlayerctx = tileCanvasPlayer.getContext("2d");
let _preparePlayerTexture = (type, _boid) => {
    tileCanvasPlayerctx.clearRect(0, 0, 500, 500);
    let xxx = 0;
    let yyy = 0;

    if (type == "shop") {
        tileCanvasPlayer.width = 128;
        tileCanvasPlayer.height = 192;
        tileCanvasPlayerctx.drawImage(imageNpcs, 0, 0, 128, 192, 0, 0, 128, 188);
        return;
    }

    if (type == "lady") {
        tileCanvasPlayer.width = 128;
        tileCanvasPlayer.height = 192;
        tileCanvasPlayerctx.drawImage(imageNpcs, 512, 0, 128, 192, 0, 0, 128, 188);
        return;
    }
    if (type == "ladyWalk") {
        tileCanvasPlayer.width = 128;
        tileCanvasPlayer.height = 192;
        tileCanvasPlayerctx.drawImage(imageNpcs, 640, 0, 128, 192, 0, 0, 128, 188);
        return;
    }

    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "Skeleton") {
        xxx = 1536;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "Zombie") {
        xxx = 1280;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "Demon") {
        xxx = 1024;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "Vampire") {
        xxx = 768;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "pink") {
        xxx = 256;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "pale") {
        xxx = 512;
    } else
    if (boiSkinArr[Number(_boid.slice(5, _boid.length)) - 1].skin == "choko") {

    }

    let temp = Math.floor(Math.random() * 5)
    if (type == "idle") {
        tileCanvasPlayer.width = 128;
        tileCanvasPlayer.height = 190;
        tileCanvasPlayerctx.drawImage(tileImgPlayer, xxx, yyy, 128, 192, 0, 0, 128, 188);
    } else {
        //Math.floor(Math.random()*5)*256
        tileCanvasPlayer.width = 128;
        tileCanvasPlayer.height = 190;
        tileCanvasPlayerctx.drawImage(tileImgPlayer, xxx + 160, yyy, 128, 192, 0, 0, 128, 188);
    }

}
class Tile {
    constructor() {
        this.obj = false;
        this.farm = false;
        this.water = false;
        this.blocked = false;
    }
}
class FarmTile {
    constructor() {
        this.active = true;
        this.watered = false;
        this.planted = false;
    }
}
class Plant {
    constructor(name, time, xp) {
        this.name = name;
        this.ripeTime = time;
        this.ripeTimeFull = time;
        this.xp = xp;
        this.price;
    }
}
class Shop {
    constructor() {
        this.sellingItems = [];
        this.buyingItems = [];
        this.shopkeepannie;
        this.selectedSellItem;
        this.selectedBuyItem;
        this.obj;
        this.initShopKeep();
    }
    initShopKeep() {
        document.getElementById("GUI_shopExit").addEventListener("click", function() {
            gameController.shop.closeShop();
        });
        _preparePlayerTexture("shop")
        let _texShopKeep = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
        this.shopkeepannie = new TextureAnimator(_texShopKeep, 4, 4, 2, 3, 175);
        const geometryShopKeep = new THREE.PlaneGeometry(globalX, (globalY + (globalY / 2)));
        const materialShopKeep = new THREE.MeshPhongMaterial({
            map: _texShopKeep,
            transparent: true
        });
        const planeShopKeep = new THREE.Mesh(geometryShopKeep, materialShopKeep);
        planeShopKeep.position.x = globalX * 13;
        planeShopKeep.position.y = globalY * 16;
        planeShopKeep.position.z = 8;
        planeShopKeep.rotation.x = 0.5
        this.obj = planeShopKeep;
        scene.add(this.obj)
    }
    sellItem(item) {
        sound_click.play()
        let _msg = new MessageTemplate
        _msg.type = 'game:sellShop'
        _msg.msg = {
            boid: gameController.boid,
            name: item
        }
        sendMessageWS(_msg)
        gameController.shop.requestShopList()
    }
    buyItem(item) {
        sound_click.play()
        let _msg = new MessageTemplate
        _msg.type = 'game:buyShop'
        _msg.msg = {
            boid: gameController.boid,
            name: item
        }
        sendMessageWS(_msg)
        gameController.shop.requestShopList()
    }
    closeShop() {
        sound_click.play();
        document.getElementById("GUI_shop").hidden = true;
    }
    requestShopList() {
        let _msg = new MessageTemplate
        _msg.type = 'game:viewShop'
        _msg.msg = gameController.boid
        sendMessageWS(_msg)
    }
}
class Player {
    constructor() {
        this.activeControl = true;
        //this.positionX = 0;
        //this.positionY = 0;
        this.direction = 1;
        this.positionZ = 1;
        this.speed = [0, 0];
        this.desiredPos = [0, 1];
        this.moveArray = [];
        this.obj;
        this.adr = "0x";
    }
    newDestination(_x, _y, online) {
        let temp_moveArray = path_findPath(Math.round(Math.floor(this.obj.position.x) / globalX), Math.round(Math.floor(this.obj.position.y) / globalY), _x / globalX, _y / globalY)
        if (temp_moveArray == undefined || !temp_moveArray) {
            return false;
        }



        if (temp_moveArray.length > 0) {
            if (online) {
                if (!_decreasePlayerEnergy(gameController, 0.3)) return
                this.moveArray = temp_moveArray;
                _sendMoveArray(this.moveArray)
                sound_walking.play();
                sound_walking.stop();
                sound_walking.play();
            }
            this.obj.material.map = this._texW;
        }
        this.moveArray = temp_moveArray;
        // else{
        //   sound_walking.play();
        //   sound_walking.stop();
        // }
        // else {
        //     if (!gameController.map.map[(_y / 16) - 1][_x / 16].blocked && !gameController.map.map[(_y / 16) - 1] !== undefined) {
        //         this.newDestination(_x, _y - 16)
        //     }
        // }
        //this.moveArray.pop()
    }
}

class WeatherControl {
    constructor() {
        this.currentWeather;
        this.currentTimeOfDay;
        this.hour = 19;
        this.seconds = 0;
        this.minutes = 30;
        this.timeOfDay;
        this.time = 0;
        this.currentDay = 0;
        this.currentMonth = 0;
        this.weeks = [
            "Monday", "Tuesday", "Wed🐸", "Thursday", "Friday", "Saturday", "Sunday"
        ]
        this.months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    }
    _stopAllWeather() {
        scene.fog.near = 0.1;
        scene.fog.far = 0;

        this.currentWeather = ''
        for (let n = 0; n < rainArray.length; n++) {
            rainArray[n].position.z = 300
        }
    }

    update() {

        if (Math.round(this.hour) >= 4 && Math.round(this.hour) < 9 && this.timeOfDay !== 0) {
            //morning

            this.timeOfDay = 0
        }
        if (Math.round(this.hour) >= 9 && Math.round(this.hour) < 20 && this.timeOfDay !== 1) {
            //day

            this.timeOfDay = 1
            // scene.fog.near = 0.1
            // scene.fog.far = 0
            // light.intensity = 1;
        }
        if (Math.round(this.hour) >= 20 && Math.round(this.hour) < 24 && this.timeOfDay !== 2) {
            //evening

            this.timeOfDay = 2
            // scene.fog.near = 200
            // scene.fog.far = 600
        }
        if (Math.round(this.hour) >= 24 && this.timeOfDay !== 3 || Math.round(this.hour) < 4 && this.timeOfDay !== 3) {
            //night

            this.timeOfDay = 3
        }
    }

    _updateWeather() {
        visual_shakeSea();


        //evening
        // scene.fog.color.r = 0
        // scene.fog.color.g = 0
        // scene.fog.color.b = 0.1
        // if(scene.fog.far > 300)scene.fog.far -= 1;
        // if(scene.fog.near < 300)scene.fog.near += 1;
        //if(light.intensity > 0.3)light.intensity -= 0.001

        //morning
        // light.intensity = 0.1
        // scene.fog.color.r = 0;
        // scene.fog.color.g = 0;
        // scene.fog.color.b = 0;
        // if(scene.fog.color.r < 0.5) scene.fog.color.r += 0.001
        // if(scene.fog.color.b < 0.4) scene.fog.color.b += 0.01
        // scene.fog.color.g = 0
        // scene.fog.far = 300;
        // scene.fog.near = 150;
        // if(light.intensity < 0.3)light.intensity += 0.0001
        //return
        //return;//update rain + day
        // for (let n = 0; n < 2; n++) {
        //     smokeArray[n].position.x += 0.2;
        //     if (smokeArray[n].position.x > 1000) {
        //         smokeArray[n].position.y = Math.floor(Math.random() * 400) - 100
        //         smokeArray[n].position.x = -500
        //     }
        // }
        if (gameController.weather.currentWeather == "rain") {
            gameController.weather.rain();
        } else
        if (gameController.weather.currentWeather == "lightRain") {
            gameController.weather.lightRain();
        } else
        if (gameController.weather.currentWeather == "thunder") {
            gameController.weather.thunder();
        }
        this.seconds += 1;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
            if (Math.random() < 0.25) {
                gameController.map.players[1].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
            }
            if (Math.random() < 0.025) {
                gameController.map.players[0].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
            }
            if (Math.random() < 0.025) {
                gameController.map.players[2].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
            }
        }
        if (this.minutes >= 60) {
            this.minutes = 0;
            this.hour++;
            _getTime();
            // gameController.map.players[1].newDestination(  Math.floor(Math.random()*20)*globalX,Math.floor(Math.random()*20)*globalY ,false )
            // gameController.map.players[2].newDestination(  Math.floor(Math.random()*20)*globalX,Math.floor(Math.random()*20)*globalY ,false )
            // gameController.map.players[0].newDestination(  Math.floor(Math.random()*20)*globalX,Math.floor(Math.random()*20)*globalY ,false )
        }
        if (this.hour >= 24) this.hour = 0;
        // if (this.timeOfDay == 2) {
        //     //ev
        //     if (this.hour > 21 && light.intensity > 0.5) light.intensity -= 0.0005
        //     if (this.hour > 22 && light.intensity > 0.4) light.intensity -= 0.001
        //     if (scene.fog.near > 1) scene.fog.near -= 0.1
        //     if (scene.fog.far > 275) scene.fog.far -= 0.1
        //     if (light.intensity > 0.7) light.intensity -= 0.00001
        //     if (moonLight.intensity < 0.1) moonLight.intensity += 0.0001
        // }
        // if (this.timeOfDay == 3) {
        //     //night
        //     if (scene.fog.far > 255) scene.fog.far -= 0.1
        //     if (light.intensity > 0.1) light.intensity -= 0.001
        //     if (moonLight.intensity < 0.3) moonLight.intensity += 0.001
        //     if (smokeArray[0].material.opacity < 0.6) {
        //         for (let n = 0; n < smokeArray.length; n++) {
        //             smokeArray[n].material.opacity += 0.01
        //         }
        //
        //     }
        // }
        // if (this.timeOfDay == 0) {
        //     //mning
        //     //  if(scene.fog.near < 200)scene.fog.near += 1
        //     if (moonLight.intensity > 0) moonLight.intensity -= 0.001
        //     //if(scene.fog.far < 500)scene.fog.far += 0.1
        //     if (light.intensity < 1) light.intensity += 0.001
        //     if (smokeArray[0].material.opacity > 0) {
        //         for (let n = 0; n < smokeArray.length; n++) {
        //             smokeArray[n].material.opacity -= 0.001
        //         }
        //     }
        // }
        // if (this.timeOfDay == 1) {
        //     //day
        //     if (light.intensity < 1) light.intensity += 0.01
        // }










        // return;
        // this.time++;
        // if (this.time < 50) {
        //     this.morning();
        // } else if (this.time < 200) {
        //     this.day()
        // } else if (this.time < 240) {
        //     this.evening()
        // } else {
        //     this.night();
        // }
        // if (this.time > 240) {
        //     lightmorning.intensity = 0.1;
        //     lightevening.intensity = 1;
        //     this.time = 0;
        // }
    }

    day() {
        if (this.currentTimeOfDay !== "day") {
            this.currentTimeOfDay = "day"
            //scene.remove( lightevening );
            scene.remove(lightmorning);
            scene.add(light);
        }
    }
    evening() {
        if (this.currentTimeOfDay !== "e") {
            this.currentTimeOfDay = "e"
            scene.remove(light);
            scene.add(lightevening);
        } else {
            lightevening.intensity -= 0.01;
        }
    }
    morning() {
        if (this.currentTimeOfDay !== "m") {
            this.currentTimeOfDay = "m"
            scene.remove(lightnight);
            //  scene.add( lightevening );
            scene.add(lightmorning);
        } else {
            lightmorning.intensity += 0.01;
        }
    }
    night() {
        if (this.currentTimeOfDay !== "n") {
            this.currentTimeOfDay = "n"
            scene.remove(lightevening);
            scene.add(lightnight);
        }
    }



    perfectWeather() {

    }
    foggy() {
        const near = 100;
        const far = 300;
        const color = 'gray';
        this.foggyOn = true;
        //const color = 'lightblue'
        //const color = 0x694200
        //const color = 0x63ab3f; //creepy
        scene.fog = new THREE.Fog(color, near, far);
        scene.background = new THREE.Color(color);
    }
    lightRain() {
        for (let n = 0; n < 50; n++) {
            rainArray[n].position.z -= 2;
            if (rainArray[n].position.z < 0) {
                rainArray[n].position.x = ((gameController.map.players[cameraPosition].obj.position.x) + Math.random() * 200) - 100
                rainArray[n].position.y = ((gameController.map.players[cameraPosition].obj.position.y) + Math.random() * 200) - 100
                //rainArray[n].position.z = 100
                rainArray[n].position.z = Math.floor(Math.random() * 600) + 200;
            }
        }
    }
    rain() {
        for (let n = 0; n < 500; n++) {
            rainArray[n].position.z -= 2;
            if (rainArray[n].position.z < 0) {
                rainArray[n].position.x = ((gameController.map.players[cameraPosition].obj.position.x) + Math.random() * 200) - 100
                rainArray[n].position.y = ((gameController.map.players[cameraPosition].obj.position.y) + Math.random() * 200) - 100
                //rainArray[n].position.z = 100
                rainArray[n].position.z = Math.floor(Math.random() * 600) + 200;
            }
        }
    }
    thunder() {
        scene.add(flash);
        //scene.fog = new THREE.FogExp2(0x11111f, 0.01);
        //renderer.setClearColor(scene.fog.color);
        for (let n = 0; n < rainArray.length; n++) {
            rainArray[n].position.z -= 2;
            if (rainArray[n].position.z < 0) {
                rainArray[n].position.x = ((gameController.map.players[cameraPosition].obj.position.x) + Math.random() * 200) - 100
                rainArray[n].position.y = ((gameController.map.players[cameraPosition].obj.position.y) + Math.random() * 200) - 100
                rainArray[n].position.z = 100
            }
        }
        if (Math.random() > 0.9 || flash.power > 100) {
            if (flash.power < 100) {
                flash.position.set(
                    Math.random() * 400,
                    500 + Math.random() * 200,
                    100
                );
            }
            flash.power = 50 + Math.random() * 500;
        }
    }
    lightSnow() {

    }
    snow() {

    }
}
//three init
//global three
const globalX = 16;
const globalY = 16;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);
document.getElementById("GUI_gameContainer").appendChild(renderer.domElement);
//renderer.domElement.style = "z-index:7;position:absolute;"
camera.position.z = 105;
camera.position.x = 10 * globalX;
camera.position.y = 10 * globalY;
//randomly later added stuff..
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (ev) {
        ev.dataTransfer.setData("text", ev.path[1].className);
    }
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data) {
        if (data.slice(0, 7) == "guiTile" && ev.path[1].className.slice(0, 7) == "guiTile") {
            swapInventoryPlaces(Number(data.slice(7)) - 1, Number(ev.path[1].className.slice(7)) - 1, gameController.inventory)
            gameController._drawInventory();
        }
    }
}
let swapInventoryPlaces = (a, b, targetInventory) => {
    let copy1
    if (targetInventory[a] !== undefined) copy1 = JSON.parse(JSON.stringify(targetInventory[a]))
    let copy2
    if (targetInventory[b] !== undefined) copy2 = JSON.parse(JSON.stringify(targetInventory[b]))
    targetInventory[Number(a)] = copy2;
    targetInventory[Number(b)] = copy1;
    //drawInventory
}
let addGUIInventory = () => {
    for (let n = 0; n < 18; n++) {
        const newDiv = document.createElement("div");
        newDiv.className = 'guiTile' + (n + 1)
        newDiv.addEventListener("drop", (ev) => {
            drop(ev)
        });
        newDiv.addEventListener("dragover", (ev) => {
            allowDrop(ev)
        });
        document.getElementById("GUI_InventoryScreen").appendChild(newDiv)
        // newDiv = '<div ondrop="drop(event)" ondragover="allowDrop(event)" class="guiTile' + (n + 1) + '"> </div>'
        // document.getElementById("GUI_InventoryScreen").innerHTML += newDiv
    }
}
addGUIInventory();
document.getElementById("GUI_openInventory").addEventListener("click", () => {
    gameController.toggleInventory()
})
let createInventory = (targetInventory) => {
    let num = 19 - targetInventory.length
    for (let n = 0; n < num; n++) {
        targetInventory.push('')
    }
}
//three raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event, click) {
    if (event.buttons > 0) {}
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.position.z == 12) {
            return;
        }
        if (intersects[i].object.position.z == 10 && intersects[i].point.z < 12.5) {
            locatePlayerByObjId(intersects[i].object.id)
            if (click && gameController.selectedItem) {
                for (let p = 0; p < gameController.map.players.length; p++) {
                    if (gameController.map.players[p].obj.position.x == intersects[i].object.position.x && gameController.map.players[p].obj.position.y == intersects[i].object.position.y) {
                        gameController._useEdible(p)
                    }
                }
            }
            return;
        }
        if (intersects[i].object.position.z == 6) {
            if (click) {
                sound_click.play()
                _requestWaterBucket();
            }
        }
        if (intersects[i].object.position.z == 7) {
            // if(click)_toggleQuest();
            if (click) {
                sound_chicken.play()
                gameController.map.players[0].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
                gameController.map.players[1].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
                gameController.map.players[2].newDestination(Math.floor(Math.random() * 20) * globalX, Math.floor(Math.random() * 20) * globalY, false)
                return;
            }
        }
        // //what to do to objects
        let _x = intersects[i].object.position.x;
        let _y = intersects[i].object.position.y;


        if (intersects[i].object.position.z == 8) {
            let _text = ''
            if (intersects[i].object.position.y == 256) {
                _text = "Boi#368:FarmShop"
                currentDialogue = startDialogue;
            } else {
                _text = "Farmers daughter"
            }
            document.getElementById("GUI_hoverInfo").hidden = false;
            document.getElementById("GUI_hoverInfo").style.top = (event.clientY - 40) + "px"
            document.getElementById("GUI_hoverInfo").style.left = event.clientX + "px"
            document.getElementById("GUI_hoverInfo").textContent = _text
            if (click) {
                // gameController.shop.requestShopList();
                sound_click.play();
                // return;
                if (intersects[i].object.position.y == 256) {
                    currentDialogue = startDialogue;
                } else
                if (gameController.firstQuest) {
                    currentDialogue = questDialogue
                } else if (!gameController.firstQuest) {
                    let questReady = false;
                    for (let q = 0; q < gameController.inventory.length; q++) {
                        if (gameController.inventory[q].name == "Berry" && gameController.inventory[q].amount > 0) {
                            questReady = true;
                        }
                    }
                    if (questReady) {
                        currentDialogue = questDialogueDone
                        _startQuest();
                        _toggleQuest();
                        gameController.firstQuest = "done"
                    } else {
                        currentDialogue = questDialogueAwait
                    }
                }
                if (intersects[i].object.position.y !== 256 && gameController.firstQuest !== "done") {
                    _toggleQuest();
                    return;
                }
                if (intersects[i].object.position.y == 256) {
                    currentDialogue = startDialogue;
                    _toggleQuest();
                    return;
                }

            }
            return;
        }

        if (intersects[i].object.position.z == 0) {
            document.getElementById("GUI_hoverInfo").hidden = true;
            tempHoverInfo = undefined;
        }

        gameController.hoverInfo(_x, _y, event)



        if (click) {
            if (gameController.selectedItem && intersects[i].object.position.z == 0) {
                gameController.useItem(_x, _y)
            }
            // if(intersects[i].object.position.z == 13){
            //   gameController.shop.obj.material.color.set(0xb7d463)
            //   gameController.shop.requestShopList();
            //   sound_click.play();
            //   return;
            // }
            if (!gameController.selectedItem) {
                for (let _p of gameController.map.players) {
                    if (_p.activeControl && intersects[i].object.position.z == 0) {
                        _p.newDestination(_x, _y, true)
                        //_p.moveArray.pop();
                    }
                }
            }

        }
    }
}
renderer.domElement.addEventListener("mousemove", function(e) {
    if (gameController.selectedItem) {
        document.getElementById("GUI_itemSelector").style.marginLeft = e.clientX + "px"
        document.getElementById("GUI_itemSelector").style.marginTop = e.clientY + "px"
    }
    onMouseClick(e);
}, true);
renderer.domElement.addEventListener("click", function(e) {
    onMouseClick(e, true);
}, true);
var _graph = [];
let path_updateMap = () => {
    _graph = [];
    for (var n = 0; n < gameController.map.map.length; n++) {
        _graph.push([])
        for (var m = 0; m < gameController.map.map[n].length; m++) {
            if (gameController.map.map[n][m].blocked) {
                _graph[n].push(0)
            } else {
                _graph[n].push(1)
            }
        }
    }
}
let path_findPath = (_startX, _startY, _endX, _endY) => {
    if (_startX < 0 || _startY < 0 || _endX < 0 || _endY < 0) {
        return [];
    }
    _endX = Math.floor(_endX)
    _endY = Math.floor(_endY)
    path_updateMap();
    var graph = new Graph(_graph)
    var start = graph.grid[_startY][_startX];
    var end = graph.grid[_endY][_endX];
    var result = astar.search(graph, start, end);
    if (result == undefined && !result) result = [];
    return result;
}
let cameraPosition = 0;
const updateCameraPosition = () => {
    //  camera.position.x = gameController.map.players[0].obj.position.x
    if (gameController.map.players.length > 0) {
        camera.position.y = gameController.map.players[cameraPosition].obj.position.y - 60
        //overly complicated camera movement
        if (camera.position.x - gameController.map.players[cameraPosition].obj.position.x < 0) {
            camera.position.x++
        }
        if (camera.position.x - gameController.map.players[cameraPosition].obj.position.x < -32) {
            camera.position.x += 1
        }
        if (camera.position.x - gameController.map.players[cameraPosition].obj.position.x > 0) {
            camera.position.x--
        }
        if (camera.position.x - gameController.map.players[cameraPosition].obj.position.x > 32) {
            camera.position.x -= 1
        }
    }
}

const visual_shakeSea = () => {
    for (let w = 0; w < _seaArray.length; w++) {
        if (_seaArray[w].goingDown) {
            _seaArray[w].position.z -= 0.05;
            if (_seaArray[w].position.z < 0.3) {
                _seaArray[w].goingDown = false;
            }
        } else {
            _seaArray[w].position.z += 0.05;
            if (_seaArray[w].position.z > 3) {
                _seaArray[w].goingDown = true;
            }
        }
        // if(_seaArray[w].position.z < 20){
        //   _seaArray[w].position.z = Math.cos(_seaArray[w].position.z)*16
        // }
    }
}
const updateTypeWriter = (delta) => {
    //typewriter
    for (let tp = 0; tp < typewiterArray.length; tp++) {
        typewiterArray[tp].update(delta);
        if (!typewiterArray[tp].typing) {
            typewiterArray.splice(tp, 1)
            tp--;
        }
    }
}

//game loop
var time = Date.now();
let _framesPerSecond = 0;
let _framesPerSecondStartTime = Date.now();
let _framesPerSecondVar = 42;
const _framesPerSecondConst = 42;
let questGDown = true;
let bestList = false;

function animate() {
    setTimeout(function() {

        //site control
        if (!gameOn) {
            if (exampleSocket.readyState == 0) {
                document.getElementById("GUI_siteConnectionStatus").textContent = "🟡Connecting please wait.."
                document.getElementById("GUI_playButton").children[0].textContent = "Loading can take up to 30sec"
            } else if (exampleSocket.readyState == 1) {
                document.getElementById("GUI_siteConnectionStatus").textContent = "🟢NETWORK:PIXELBOIS"
                document.getElementById("GUI_playButton").children[0].textContent = "🎮 PLAY"

                if (!bestList) {
                    _saySiteHello()
                    bestList = true;
                }
                //document.getElementById("GUI_siteConnectionStatus").textContent = "NETWORK:PIXELBOIS"
            } else {
                document.getElementById("GUI_siteConnectionStatus").textContent = "🔴pls try later :("
                document.getElementById("GUI_playButton").children[0].textContent = "Connect"
            }
            if (gameController.boid !== undefined) {
                animateSelection();
            }
        } else {
            if (exampleSocket.readyState - 2 > 0) {
                switchScreen();
            }

            if (ladyquest !== undefined) {
                if (gameController.firstQuest == "done") {
                    ladyquest.position.x = gameController.map.players[0].obj.position.x
                    ladyquest.position.y = gameController.map.players[0].obj.position.y + 7
                } else {
                    ladyquest.position.x = 4 * 16
                    ladyquest.position.y = 7.5 * 16
                }
                if (planeShopKeep.material.map.opacity !== 0) {
                    if (questGDown) {
                        if (ladyquest.position.z > 13) {
                            ladyquest.position.z -= 0.3
                        } else {
                            questGDown = false;
                        }
                    } else {
                        if (ladyquest.position.z < 18) {
                            ladyquest.position.z += 0.1
                        } else {
                            questGDown = true;
                        }
                    }
                }
            }


            //game
            let delta = Date.now() - time;
            time = Date.now();
            gameTime.ticktock(delta);
            gameController._updatePlayerMovement()
            updateCameraPosition()
            updateTypeWriter(delta)
            gameController.weather._updateWeather()
        }
        //fps control
        requestAnimationFrame(animate);
    }, 1000 / _framesPerSecondVar);
    renderer.render(scene, camera);
    _framesPerSecond++;
    if (Date.now() - _framesPerSecondStartTime > 1000) {
        if (Math.round(_framesPerSecond) < _framesPerSecondConst && _framesPerSecondVar < 100) {
            _framesPerSecondVar++;
        } else if (Math.round(_framesPerSecond) > _framesPerSecondConst && _framesPerSecondVar > 20) {
            _framesPerSecondVar--;
        }
        _framesPerSecond = 0;
        _framesPerSecondStartTime = Date.now();
    }
}

//particle and light effects
let rainArray = []
for (let n = 0; n < 1000; n++) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x5E96C3
    });
    if (Math.random() < 0.2) {
        material.color.set(0x000fff);
    }
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = Math.floor(Math.random() * 600) + 200;
    plane.position.x = Math.floor(Math.random() * 100)
    plane.position.y = Math.floor(Math.random() * 100)
    rainArray.push(plane)
    scene.add(rainArray[rainArray.length - 1])
}
flash = new THREE.PointLight(0x062d89, 1, 500, 1);
flash.position.set(200, 300, 100);
const lightmorning = new THREE.AmbientLight(0xfcd14d, 0.1);

var light = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(light);
var lightevening = new THREE.HemisphereLight(0x2B2C5A, 0xffffff);
//scene.add( lightevening );
var lightnight = new THREE.HemisphereLight(0x2B2C5A, 0x2B2C5A);
// scene.add( lighth );
const geometryBG = new THREE.PlaneGeometry(globalX * 100, globalY * 100);
const materialBG = new THREE.MeshPhongMaterial({
    color: 0x63ab3f
});
const planeBG = new THREE.Mesh(geometryBG, materialBG);
// planeBG.position.x =
// planeBG.position.y =
planeBG.position.z = -1
scene.add(planeBG);

let _texBGS = new THREE.TextureLoader().load("https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png");



let smokeArray = []
let _addSmoke = () => {
    for (let n = 0; n < 6; n++) {
        const geometry = new THREE.PlaneGeometry(globalX * 50, globalY * 5);
        const material = new THREE.MeshPhongMaterial({
            //color: 0x63afff
            map: _texBGS,
            transparent: true
        });

        material.opacity = 0

        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = Math.floor(Math.random() * 10) + 50;
        plane.position.x = Math.floor(Math.random() * 436)
        //  plane.position.y = Math.floor(Math.random() * 536) - 336
        plane.position.y = n * 100
        plane.rotation.x = 0.5;
        smokeArray.push(plane)
        scene.add(smokeArray[smokeArray.length - 1])
    }
}

//working with textures
var _prepareObjTexture = (type) => {

    //housing
    tileCanvasctx.clearRect(0, 0, 1000, 1000);
    if (type == "none") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 690, 160, 32, 32, 0, 0, 32, 32);
    }
    if (type == "berry0") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 544, 160, 32, 32, 0, 0, 32, 32);
    }
    if (type == "berry1") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 576, 160, 32, 32, 0, 0, 32, 32);
    }
    if (type == "berry2") {
        tileCanvas.width = 32;
        tileCanvas.height = 48;
        tileCanvasctx.drawImage(tileImg, 608, 144, 32, 48, 0, 0, 32, 48);
    }
    if (type == "berry3") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 640, 160, 32, 32, 0, 0, 32, 32);
    }
    if (type == "carrot0") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 544, 96, 32, 32, 0, 0, 32, 32);
    }
    if (type == "carrot1") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 576, 96, 32, 32, 0, 0, 32, 32);
    }
    if (type == "carrot2") {
        tileCanvas.width = 32;
        tileCanvas.height = 48;
        tileCanvasctx.drawImage(tileImg, 608, 80, 32, 48, 0, 0, 32, 48);
    }
    if (type == "carrot3") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 640, 96, 32, 32, 0, 0, 32, 32);
    }
    if (type == "sunflower0") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 544, 222, 32, 32, 0, 0, 32, 32);
    }
    if (type == "sunflower1") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 576, 222, 32, 32, 0, 0, 32, 32);
    }
    if (type == "sunflower2") {
        tileCanvas.width = 32;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 608, 190, 32, 64, 0, 0, 32, 64);
    }
    if (type == "sunflower3") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 640, 222, 32, 32, 0, 0, 32, 32);
    }
    if (type == "dirt") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 32, 32, 32, 32, 0, 0, 32, 32);
    }
    if (type == "rock") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 160, 0, 32, 32, 0, 0, 32, 32);
    }
    if (type == "rockBig") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 214, 0, 32, 32, 0, 0, 32, 32);
    }
    if (type == "tree") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 160, 128, 64, 64, 0, 0, 64, 64);
    }
    if (type == "tree2") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 160, 192, 64, 64, 0, 0, 64, 64);
    }
    if (type == "tree3") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 160, 256, 64, 64, 0, 0, 64, 64);
    }
    if (type == "tree4") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 224, 256, 64, 64, 0, 0, 64, 64);
    }
    if (type == "trunk") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 130, 256, 32, 32, 0, 0, 64, 64);
    }
    if (type == "bush") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 130, 224, 32, 32, 0, 0, 64, 64);
    }
    if (type == "flower1") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 160, 64, 32, 32, 0, 0, 32, 32);
    }
    if (type == "flower2") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 160, 96, 32, 32, 0, 0, 32, 32);
    }
    if (type == "flower3") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 160, 32, 32, 32, 0, 0, 32, 32);
    }
    if (type == "flower5") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 224, 32, 32, 32, 0, 0, 32, 32);
    }
    if (type == "flower4") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 224, 64, 32, 32, 0, 0, 32, 32);
    }
    if (type == "house") {
        tileCanvas.width = 160;
        tileCanvas.height = 160;
        tileCanvasctx.drawImage(tileImg, 288, 256, 160, 160, 0, 0, 160, 160);
    }
    if (type == "bucket") {
        tileCanvas.width = 32;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 384, 64, 32, 32, 0, 0, 32, 32);
    }
    if (type == "water") {
        tileCanvas.width = 64;
        tileCanvas.height = 64;
        tileCanvasctx.drawImage(tileImg, 0, 480, 64, 64, 0, 0, 64, 64);
    }
    if (type == "horisontalfence") {
        tileCanvas.width = 96;
        tileCanvas.height = 32;
        tileCanvasctx.drawImage(tileImg, 384, 0, 96, 32, 0, 0, 96, 32);
    }
    if (type == "verticalfence") {
        tileCanvas.width = 32;
        tileCanvas.height = 96;
        tileCanvasctx.drawImage(tileImg, 352, 0, 32, 96, 0, 0, 32, 96);
    }
    if (type == "river") {
        tileCanvas.width = 32;
        tileCanvas.height = 128;
        tileCanvasctx.drawImage(tileImg, 0, 320, 32, 32, 0, 0, 32, 32);
        tileCanvasctx.drawImage(tileImg, 0, 320, 32, 32, 0, 32, 32, 32);
        tileCanvasctx.drawImage(tileImg, 0, 320, 32, 32, 0, 64, 32, 32);
        tileCanvasctx.drawImage(tileImg, 0, 320, 32, 32, 0, 96, 32, 32);
    }
    if (type == "sandBump") {
        tileCanvas.width = 96;
        tileCanvas.height = 96;
        tileCanvasctx.drawImage(tileImg, 0, 96, 96, 96, 0, 0, 96, 96);
    }
    if (type == "highGround") {
        tileCanvas.width = 96;
        tileCanvas.height = 96;
        tileCanvasctx.drawImage(tileImg, 0, 192, 96, 96, 0, 0, 96, 96);
    }
}

//texture animator duh
function TextureAnimator(texture, tilesHoriz, tilesVert, fromTile, numTiles, tileDispDuration) {
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;
    // how long has the current image been displayed?
    this.currentDisplayTime = 0;
    // which image is currently being displayed?
    this.currentTile = 0;
    this.update = function(milliSec, tileRow) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = (currentColumn) / this.tilesHorizontal;
            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal) + tileRow;
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
};


//SOUNDS
const listener = new THREE.AudioListener();
camera.add(listener);
// create a global audio source
const sound_energyDown = new THREE.Audio(listener);
const sound_walking = new THREE.Audio(listener);
const sound_watering = new THREE.Audio(listener);
const sound_shears = new THREE.Audio(listener);
const sound_plant = new THREE.Audio(listener);
const sound_click = new THREE.Audio(listener);
const sound_powerUp = new THREE.Audio(listener);
const sound_fail = new THREE.Audio(listener);
const sound_MusicEnterance = new THREE.Audio(listener);
const sound_typing = new THREE.Audio(listener);
const sound_chicken = new THREE.Audio(listener);
const sound_kaching = new THREE.Audio(listener);
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/8bitEnterance.mp3', (buffer) => {
    sound_MusicEnterance.setBuffer(buffer);
    sound_MusicEnterance.setLoop(false);
    sound_MusicEnterance.setVolume(0.2);
})
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/8bitTyping.mp3', (buffer) => {
    sound_typing.setBuffer(buffer);
    sound_typing.setLoop(false);
    sound_typing.setVolume(0.5);
})
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/energyDown.mp3', function(buffer) {
    sound_energyDown.setBuffer(buffer);
    sound_energyDown.setLoop(false);
    sound_energyDown.setVolume(0.5);
});
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/walking.mp3', function(buffer) {
    sound_walking.setBuffer(buffer);
    sound_walking.setLoop(true);
    sound_walking.setVolume(0.6);
});
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/water.wav', function(buffer) {
    sound_watering.setBuffer(buffer);
    sound_watering.setLoop(false);
    sound_watering.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/cut.mp3', function(buffer) {
    sound_shears.setBuffer(buffer);
    sound_shears.setLoop(false);
    sound_shears.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/dig.mp3', function(buffer) {
    sound_plant.setBuffer(buffer);
    sound_plant.setLoop(false);
    sound_plant.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/click.mp3', function(buffer) {
    sound_click.setBuffer(buffer);
    sound_click.setLoop(false);
    sound_click.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/water.mp3', function(buffer) {
    sound_powerUp.setBuffer(buffer);
    sound_powerUp.setLoop(false);
    sound_powerUp.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/chkn.mp3', function(buffer) {
    sound_chicken.setBuffer(buffer);
    sound_chicken.setLoop(false);
    sound_chicken.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/fail.mp3', function(buffer) {
    sound_fail.setBuffer(buffer);
    sound_fail.setLoop(false);
    sound_fail.setVolume(0.5);
});

audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/kaching.mp3', function(buffer) {
    sound_kaching.setBuffer(buffer);
    sound_kaching.setLoop(false);
    sound_kaching.setVolume(0.4);
});



var _FarmbgString = "data:image/png;base64,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m/u1rv/v/Wm//X92vt8orq40J7zuHHLx4uf5H9+f9punH3qiUdx7t++e+7Woqv8B+TACAAAAADIw6foCALqWKo/7904rMOcvv78x77gf//mVufG/cMfVSUTEX166bW5c0Rv3vTv35489cHDb8xT9vX/+4Mz3/+9/OlUrTnye8WV594mzB2qdryrP7//VPXPj9u/dOYmIOH95WoEvViLr9r+f/+tzc9//79x3bRIR8Tdnd9fqf0dL9mNP/a/sPEWX/8mvzHy/9z//Ra048XnGl+Xd09fr7Q5Qled//fN3z42r6n9AfowAAAAAgAwYAQBkq6zyeOTQHTPHvfDqtLKaKjXFuZ7//nv3RcStOdh19xFPFaFUeUyOnz4TERFPfvrh2r8LFB17+URElOdXWT6XqcrzL27uc/7so7MjE15/61JEbK1EJnX73+/dPe0vP/frs5XUY39498z1FF8v+tGf7J65Xv2PVajqf2X5XPp+FXn+1Femf1fq9j8jASBfRgAAAABABuwCAGSvrPLYF08/8VDXl8CAHP3Gd7q+hBmpX73+1qU0d3lm9KH+x5gMrf8B+TECAAAAADJgBADAki1rX2iVR9pIeZPmIFdpm6/LyvNlS3P8686tLqP/0UbT/tc2X5eV50B+jAAAAACADBgBANBQqnyWSRXRquPW7annXlrLeb72/OfXcp51Gft9a5uvW+JK9jlftlT5LJMqolXHrdvY82hVxn7f2uZrX/Mc6D8jAAAAACADRgAANFSc8/zaudtrHZese2RAqqCl/ahXtdp62m86nW/olcjc7lvVXP6qPD96bj2VyC1znv+w5nGb1l0xzS2PliW3+1Y5l78qz79iJABQjxEAAAAAkIG1jwB4/jOf2/b1i2euR0TEpc2vLMdtB6bPevYc2Dnztei5r395bdfUhar823/+8sxXluO923fP/Vo09vzr2vHTZza/dnwhA+O+sQzyqB33DWC5jAAAAACADKxtBECqvO7fO608n7/8/sa84/bceG8SEXEpds99veiuXe9PIiL27X4/IiL+5r16cbnFX333RkREHPiF+ZXX/Xt3TiJutdPYKrF18++2vZcm0wN21GqHfR+a3v/dH57e33fOfqhR++USf/t70zmK79wzf+57V/n39uUrERFx7949c19Pc0OLqvY/79v+6GlOa3FObaqslWl73NDnHie5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";

let playerTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAB6lJREFUeJztXEFIG1kY/p5bXG0UaaJriKlSB2SxRQvRellxoawHoXSxh8r21GIPxUtz6KGXHkphj8KC9LClt5ZeGiwLPVhkLXpx3UAjW9sNTIvVDsnGyW6rWduCzh6Smb7JvJlM8uKMbvKBkMnM9zLzfTPvzXz/+IAqKhuEXhgNDQEAmr0N2EhvKfS6Zm8D2UhvAQAi0afMxnj5bkATYDQ0hG4hgBVRUgBgdCSEC9/1AgDuPYkh8jgKAOgWAmRFlAwHwctX2wCcNeAQvdGKKCk3rpxFb5cPsbisfX+iI4gLk72IxWXcvP1IQd6ZUw4+LeBGeosloAJkBQSGLA0ohq8TgEZvl4/52S5K4bthQA3dQLcQIDdvPzLdwZu3H+UUZIOXT8MpAwydYGfQh1frsjI6EsKJjiAA4I/VdUQeR9EZ9JFX67LlNVgqnz6FH05eYrZ/LnzXVh9UDF/XCeagAMCNK2d1ZMpZAhg7Il6+2obTBuT3AVrPaXEqm16DPHxVwFfrsgJA23n1cwRRdR0ZDbE7wVL4pp2gS3DcAKYAgwE/eo56dN8tr2UwLyXMGi0r30kYBGDtPIDcd/6CB8HLN2tjrwyoMXzjMqwEHAz4y843FWBqUWR+tgtevlPYd2eACqcM0AnQ2tJKgOz1MjEgaN9PDAhYXsvotmGBl+8GNAEErwfJVFKZbesBkD0I+g8AZtt6kEwlFcFrvMZ4+YA7BmijgJjOKBMDAiZ3gavXRvD9m1Zd49PtSczeX8fEgICpRdEwFvPyBa8HYiqprPUP4/TbZW2Hacy29aB2aUYRvB6DCKXydcPg8loGYydlAEFMtycNDYy1yFh+Zmy4HHy3DNAEaK6rI/NSQhk92YZYXDY8QamPl/NSAs11dQYHePnAZwFj8XpMd+nXxeKybQOK4bPuyRV1vFRvHOjlSPSpZSfGwx8NDSn527OWzdooha9r6Ov+b8cBoHtX+RkAVmrIZdbyy6W5O6wdOIh8g5JqI2Yw+/H/C7+KSoMhEaqkmgBADYN2I+VIlN0QL98tAzQB3KwJAO4ZwEyEKqUmAFAPQ5VYEwAoAVZECZ1BHzkXvot7T2KIxWXE4jLuPYnhXPgujgt+siJKpg3x8t0yQHcJWEXKz8XCeRwPnxKQmekfF/zkuT0DiuLTAhSKlK3i6HLwXTGg2LpAwYPg4LtigE6A/ES12Cyfl28DZTdAJ0B+nFxMll8OvhsG2EqF7eTx5eCzBCzmt0vhMwXgzfHLXQfYSwOKrQvwRtq2+E4aQMfiRCWqkbKarM5LCXiavJY7z8u3ibIboAkgpjNoPtZBphZFXZY/LyXwqX8YmXdpJZ9Mg5fvlgG6UWDj9aqyE76Oq+1JnLm/ji++CWVXLJg8guWBh08JqNDXrCoglmYsh8BS+YYboenczodrRPyEEHYWohhrkREpeAj8fDcMMHSCsbiMW331mNwVsJMjPkjZfyLj5U+3JxGLywjXZE9nVcC94munxKm+IQSPNALpTSV/2JiXEvirvoF8+rCF335nJzIHla8JQMfJao6uQs3TgcKZ/EHj033AHQDj+YQ8WGXqB51fRUXC9IXFSqkPGO4DKq0+YBCg0uoDlpFYJdQHDHeClVYfMAiwIko4LvhN8/3OoK9gfYCH77QBzEtAjZCtXjk3/QVOPiWg6Tv/Ng2wxTfrAxSg5FfWuflOGsASwDK4sAFevtaGEwYULIy4EFU7aoClAKxXz3uOejBvfgmWlc9qo9wGmKbCTtUCCrXBLraUj287Fne6VuCUASwBHMn+i8VeGcA8AzxNXqJeJ2q0rEbNU4siWG9rl5HvqAFMATLv0sqn/mHQB7G8lsHUoojmYx1ETJu/sFwOvpMGWI4CO+HrmEM2Wf3lhyDm3rRiY/JH2yXqUvmagEszGAz4dQWO5mMdRHy9avm7xfBNO8GxFlmLtcM1Is7cX2f+D8Be8YGcgOcvYratB1evjWAnfB0br1dtj/N2+KYCqFn+zkIUk7sCbvXV6x4vC4GXny9gLC5zGWDGN5yKp/qGUFvXgK+2t5j5OryNZP3vTct8/iDxDX3Ae0LG8TGDjRpyGVLCmK//szUOQgCTiPmg8VmdoNv5vNv8KioKzHmEOgI+rEqybrjoCPjIqpTtxQtF0qXy3YDpPEJqsgpATVIB2J9HqFi+2gbgrAH5/zGi0DueD+pAiMkUFlx8NwzYV1No0Jk+jd4uHx5OXiqqJmCXv2/nEXIK1XmE6AZyqM4jlLfD+ajOI7SHcNyAfTuHiFOoCuD2DriNqgD0QlNtbcGbFKttePluQCfAbuMRy4rKYMCP3cYjput5+W4YoA2DgtcDUU4qs/3DOA1jDW15LVN4GhsOPpAT8EtiWvwcDPjx7KMCyOxwtBQ+cx6hufMXMcdqYSFqaxqbUvhuGcCeR+jPGd2dFJC9nUQL7M0jVALfLQOY8wg9SPmA1HYe24exFtnWPEKl8AF3DNAEePHxA5qbDpPI46hy2mQenshSAkrTYfLi/b+GH+flpwjIvJRQICUwGPDj12dvTecBShHjrXCp/EOfGyBIbW6Pg8rTtViZXt7cHgchhli5LHwC4/asZQZK5dP/MKF+tJyHB7lM/eWS/io7qPz/AHdTTlXRu9BaAAAAAElFTkSuQmCC";

let playerTextureWalk = "data:image/png;base64,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"

let _wateringAnimation = "data:image/png;base64,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"

// var tileImgAnimation = document.createElement("IMG");
// tileImg.src = _wateringAnimation;
var tileImg = document.createElement("IMG");
var tileCanvas = document.createElement("CANVAS")
tileCanvas.width = 32;
tileCanvas.height = 32;
tileImg.src = _FarmbgString;
var tileCanvasctx = tileCanvas.getContext("2d");



//game single animations
let _texEmote = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/emote_hello.png");
let _texEmoteUp = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/emote_yes.png");
let _texEmoteDown = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/emote_no.png");


//let waterannie = new TextureAnimator(_texWatering, 4, 1, 1, 4, 175);

const geometryEmote = new THREE.PlaneGeometry(globalX * 2, globalY * 2);



//game single animations
let _texWatering = new THREE.TextureLoader().load(_wateringAnimation);
let waterannie = new TextureAnimator(_texWatering, 4, 1, 1, 4, 175);

const geometryWatering = new THREE.PlaneGeometry(globalX * 2, globalY * 2);
const materialWatering = new THREE.MeshPhongMaterial({
    map: _texWatering,
    transparent: true
});
const planeWatering = new THREE.Mesh(geometryWatering, materialWatering);
planeWatering.position.x = globalX;
planeWatering.position.y = globalY;
planeWatering.position.z = -16;
planeWatering.rotation.x = 0.6

//DRAWING ON MAP
//also knows as farming layer
var addLayer2 = (farmSize) => {
    //deside on lvl/farmsize demensions
    let _dim = 0;
    let _fs = farmSize;
    if (farmSize < 9) {
        _dim = 3
    } else if (farmSize < 16) {
        _dim = 4
    } else if (farmSize < 26) {
        _dim = 5
    } else {
        _dim = 6
    };
    for (var n = 8; n < _dim + 8; n++) {
        for (var m = 8; m < _dim + 8; m++) {
            if (_fs > 0) {
                gameController.map.map[n][m]._drawingBgActive = true;
                _fs--;
            };
        }
    }
    //fix so it looks good
    let _tempLayer2 = JSON.parse(JSON.stringify(gameController.map.map))
    for (var nn = 0; nn < 14; nn++) {
        for (var mm = 0; mm < 14; mm++) {
            if (gameController.map.map[nn][mm + 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn + 1][mm]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn][mm - 1] !== undefined && gameController.map.map[nn][mm - 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn - 1] !== undefined && gameController.map.map[nn - 1][mm]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn - 1] !== undefined && gameController.map.map[nn - 1][mm - 1] !== undefined &&
                gameController.map.map[nn - 1][mm - 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn - 1] !== undefined && gameController.map.map[nn - 1][mm + 1] !== undefined &&
                gameController.map.map[nn - 1][mm + 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn + 1] !== undefined && gameController.map.map[nn + 1][mm - 1] !== undefined &&
                gameController.map.map[nn + 1][mm - 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
            if (gameController.map.map[nn + 1] !== undefined && gameController.map.map[nn + 1][mm + 1] !== undefined &&
                gameController.map.map[nn + 1][mm + 1]._drawingBgActive) {
                _tempLayer2[nn][mm]._drawingBgActive = true;
            }
        }
    }
    for (var nn1 = 0; nn1 < 14; nn1++) {
        for (var mm1 = 0; mm1 < 14; mm1++) {
            gameController.map.map[nn1][mm1]._drawingBgActive = _tempLayer2[nn1][mm1]._drawingBgActive
        }
    }
    for (var nnn = 0; nnn < 16; nnn++) {
        for (var mmm = 0; mmm < 16; mmm++) {
            let _tempnum = 0;
            if (gameController.map.map[nnn][mmm]._drawingBgActive == true && gameController.map.map[nnn][mmm + 1] !== undefined) {
                if (gameController.map.map[nnn][mmm + 1]._drawingBgActive) _tempnum += 2;
            }
            if (gameController.map.map[nnn][mmm]._drawingBgActive == true && gameController.map.map[nnn][mmm - 1]._drawingBgActive !== undefined) {
                if (gameController.map.map[nnn][mmm - 1]._drawingBgActive) _tempnum += 8;
            }
            if (gameController.map.map[nnn][mmm]._drawingBgActive == true && gameController.map.map[nnn + 1] !== undefined) {
                if (gameController.map.map[nnn + 1][mmm]._drawingBgActive) _tempnum += 4;
            }
            if (gameController.map.map[nnn][mmm]._drawingBgActive == true && gameController.map.map[nnn - 1] !== undefined) {
                if (gameController.map.map[nnn - 1][mmm]._drawingBgActive) _tempnum += 1;
            }
            if (_tempnum == 15) {
                if (!gameController.map.map[nnn + 1][mmm - 1]._drawingBgActive) _tempnum = 25;
                if (!gameController.map.map[nnn + 1][mmm + 1]._drawingBgActive) _tempnum = 26;
                if (!gameController.map.map[nnn - 1][mmm + 1]._drawingBgActive) _tempnum = 27;
                if (!gameController.map.map[nnn - 1][mmm - 1]._drawingBgActive) _tempnum = 28;
            }
            gameController.map.map[nnn][mmm].num = _tempnum;
        }
    }
    for (var nnnn = 0; nnnn < 16; nnnn++) {
        for (var mmmm = 0; mmmm < 16; mmmm++) {
            if (gameController.map.map[nnnn][mmmm].num > 0) {
                _prepareFarmTexture(gameController.map.map[nnnn][mmmm].num);
                let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                const geometry = new THREE.PlaneGeometry(globalX, globalY);
                const material = new THREE.MeshPhongMaterial({
                    map: _tex,
                    transparent: true
                });
                // if(gameController.map.map[nnnn][mmmm].obj !== undefined && !gameController.map.map[nnnn][mmmm].farm){
                //    scene.remove( gameController.map.map[nnnn][mmmm].obj );
                // }

                if (!gameController.map.map[nnnn][mmmm].farm) {
                    scene.remove(gameController.map.map[nnnn][mmmm].obj);
                    gameController.map.map[nnnn][mmmm].obj = new THREE.Mesh(geometry, material);
                    scene.add(gameController.map.map[nnnn][mmmm].obj);
                    gameController.map.map[nnnn][mmmm].obj.position.x = (mmmm * globalX)
                    gameController.map.map[nnnn][mmmm].obj.position.y = (nnnn * globalX)
                    gameController.map.map[nnnn][mmmm].obj.position.z = 0;
                }
            }
        }
    }
}
var _prepareFarmTexture = (num) => {
    tileCanvas.width = 32;
    tileCanvas.height = 32;
    tileCanvasctx.clearRect(0, 0, 32, 32);
    if (num > 0) {
        if (num == 15) {
            tileCanvasctx.drawImage(tileImg, 32, 32, 32, 32, 0, 0, 32, 32);
        } else if (num == 6) {
            tileCanvasctx.drawImage(tileImg, 0, 64, 32, 32, 0, 0, 32, 32);
        } else if (num == 14) {
            tileCanvasctx.drawImage(tileImg, 32, 64, 32, 32, 0, 0, 32, 32);
        } else if (num == 12) {
            tileCanvasctx.drawImage(tileImg, 64, 64, 32, 32, 0, 0, 32, 32);
        } else if (num == 13) {
            tileCanvasctx.drawImage(tileImg, 64, 32, 32, 32, 0, 0, 32, 32);
        } else if (num == 9) {
            tileCanvasctx.drawImage(tileImg, 64, 0, 32, 32, 0, 0, 32, 32);
        } else if (num == 11) {
            tileCanvasctx.drawImage(tileImg, 32, 0, 32, 32, 0, 0, 32, 32);
        } else if (num == 3) {
            tileCanvasctx.drawImage(tileImg, 0, 0, 32, 32, 0, 0, 32, 32);
        } else if (num == 7) {
            tileCanvasctx.drawImage(tileImg, 0, 32, 32, 32, 0, 0, 32, 32);
        } else if (num == 25) {
            tileCanvasctx.drawImage(tileImg, 96, 32, 32, 32, 0, 0, 32, 32);
        } else if (num == 26) {
            tileCanvasctx.drawImage(tileImg, 96, 64, 32, 32, 0, 0, 32, 32);
        } else if (num == 27) {
            tileCanvasctx.drawImage(tileImg, 128, 32, 32, 32, 0, 0, 32, 32);
        } else if (num == 28) {
            tileCanvasctx.drawImage(tileImg, 128, 64, 32, 32, 0, 0, 32, 32);
        }
        return true;
    }
}

let _addMapBoarders = () => {
    let geometry123 = new THREE.PlaneGeometry(260, 1600);
    let material123 = new THREE.MeshPhongMaterial({
        color: 0x4fa4b8
    });
    let rivBack = new THREE.Mesh(geometry123, material123);
    rivBack.position.x = -154
    rivBack.position.z = 0
    scene.add(rivBack);
    rivBack.add(soundSea)
    _addSea(-32);
    for (let n = 0; n < gameController.map.map.length; n++) {
        // gameController.map.addTree(n,0)
        gameController.map.addTree(n, gameController.map.map.length - 1)
        //  gameController.map.addTree(0,n)
        gameController.map.addTree(gameController.map.map.length - 1, n)

        _addRiver(0, n)

        if (n % 2 == 0) {
            //_addFence(n,0)
            //  _addFence(n,gameController.map.map.length-1)
        }
    }
}
_addRiver = (x, y) => {
    _prepareObjTexture("river")
    let _texF = new THREE.TextureLoader().load(tileCanvas.toDataURL());
    let geometry123 = new THREE.PlaneGeometry(16, 64);
    let material123 = new THREE.MeshPhongMaterial({
        map: _texF,
        transparent: true
    });
    for (let n = 0; n < 100; n++) {
        let riv = new THREE.Mesh(geometry123, material123);
        //  gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
        //  gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.5
        riv.position.z = 0;
        riv.position.x = -16;
        riv.position.y = (n * 64) - 160;
        scene.add(riv);
    }


    _prepareObjTexture("sandBump")
    let _texB = new THREE.TextureLoader().load(tileCanvas.toDataURL());
    let geometry1234 = new THREE.PlaneGeometry(48, 48);
    let material1234 = new THREE.MeshPhongMaterial({
        map: _texB,
        transparent: true
    });
    let rivSand = new THREE.Mesh(geometry1234, material1234);
    rivSand.position.z = 0.1;
    rivSand.position.x = 16;
    rivSand.position.y = 32;
    scene.add(rivSand);

    _prepareObjTexture("highGround")
    let _texB2 = new THREE.TextureLoader().load(tileCanvas.toDataURL());
    let material12345 = new THREE.MeshPhongMaterial({
        map: _texB2,
        transparent: true
    });
    let rivSandSouth = new THREE.Mesh(geometry1234, material12345);
    rivSandSouth.position.z = 2;
    rivSandSouth.position.x = 320;
    rivSandSouth.position.y = 16;
    scene.add(rivSandSouth);
    rivSandSouth.add(soundBirds)
}

let _seaArray = [];
let _addSea = (pos) => {

    let geometry1234 = new THREE.PlaneGeometry(16, 1600);
    let material1234 = new THREE.MeshPhongMaterial({
        color: 0x4fa4b8
    });
    let riv2 = new THREE.Mesh(geometry1234, material1234);

    //  gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
    //  gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.5
    riv2.position.z = 0;
    if (_seaArray.length > 0) {
        riv2.position.z = _seaArray.length
    }
    riv2.position.x = pos

    riv2.position.y = 0
    scene.add(riv2);

    _seaArray.push(riv2)


    let material12345 = new THREE.MeshPhongMaterial({
        color: 0x65a7b7
    });
    let riv3 = new THREE.Mesh(geometry1234, material12345);
    //  gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
    //  gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.5
    riv3.position.z = 0;
    if (_seaArray.length > 0) {
        riv3.position.z = _seaArray.length
    }
    riv3.position.x = pos - 16
    riv3.position.y = 0
    scene.add(riv3);
    _seaArray.push(riv3)
    if (_seaArray.length < 20) {
        _addSea(pos - 32);
    } else {



    }
}
//adding fence & decorations (this should be in map class)
let _addFence = (x, y) => {
    if (x == 0) return;
    _prepareObjTexture("horisontalfence")
    let _texF = new THREE.TextureLoader().load(tileCanvas.toDataURL());
    let geometry123 = new THREE.PlaneGeometry(3 * 16, 16);
    let material123 = new THREE.MeshPhongMaterial({
        map: _texF,
        transparent: true
    });
    let _fencePosX = x
    let _fencePosY = y
    gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
    gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.5
    gameController.map.map[_fencePosY][_fencePosX].obj.position.z = 7.1;
    gameController.map.map[_fencePosY][_fencePosX].obj.position.x = _fencePosX * 16;
    gameController.map.map[_fencePosY][_fencePosX].obj.position.y = _fencePosY * 16;
    scene.add(gameController.map.map[_fencePosY][_fencePosX].obj);
    gameController.map.map[_fencePosY][_fencePosX].blocked = true;
    if (gameController.map.map[_fencePosY][_fencePosX + 1] !== undefined) gameController.map.map[_fencePosY][_fencePosX + 1].blocked = true;
    if (gameController.map.map[_fencePosY][_fencePosX - 1] !== undefined) gameController.map.map[_fencePosY][_fencePosX - 1].blocked = true;
}
let _addFenceVert = (x, y) => {
    _prepareObjTexture("verticalfence")
    let _texF = new THREE.TextureLoader().load(tileCanvas.toDataURL());
    let geometry123 = new THREE.PlaneGeometry(16, 3 * 16);
    let material123 = new THREE.MeshPhongMaterial({
        map: _texF,
        transparent: true
    });
    let _fencePosX = x
    let _fencePosY = y
    gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
    gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.3
    gameController.map.map[_fencePosY][_fencePosX].obj.position.z = 8;
    gameController.map.map[_fencePosY][_fencePosX].obj.position.x = _fencePosX * 16;
    gameController.map.map[_fencePosY][_fencePosX].obj.position.y = _fencePosY * 16;
    scene.add(gameController.map.map[_fencePosY][_fencePosX].obj);
    gameController.map.map[_fencePosY][_fencePosX].blocked = true;
    if (gameController.map.map[_fencePosY + 1] !== undefined) gameController.map.map[_fencePosY + 1][_fencePosX].blocked = true;
    if (gameController.map.map[_fencePosY - 1] !== undefined) gameController.map.map[_fencePosY - 1][_fencePosX].blocked = true;
}

let _tempBSeed = "1100001111000100000110001101101011000101100000111000101000001110101100011010000111101111110001000010111001110011110000111001110110110010110011110111110011100000111001011101011110011000010110111100011010001101100101000001110111110001011000010000101100001101011100011100010"
let _addDecorations = () => {
    for (let n = 0; n < gameController.map.map.length; n++) {
        for (let m = 0; m < gameController.map.map[n].length; m++) {
            if (_tempBSeed.charAt(n)) {
                let _num = Number(_tempBSeed.charAt(n + m))
                if (_num == 1) {
                    let _randFlow = Math.random()
                    if (_randFlow < 0.3) {
                        _prepareObjTexture("flower1")
                    } else if (_randFlow < 0.6) {
                        _prepareObjTexture("flower2")
                    } else if (_randFlow < 0.9) {
                        _prepareObjTexture("flower3")
                    } else {
                        _prepareObjTexture("rock")
                    }
                    let _texF = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                    let geometry123 = new THREE.PlaneGeometry(16, 16);
                    let material123 = new THREE.MeshPhongMaterial({
                        map: _texF,
                        transparent: true
                    });
                    let _fencePosX = n
                    let _fencePosY = m
                    gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
                    if (Math.random() < 0.2 && !gameController.map.map[_fencePosY][_fencePosX].farm && !gameController.map.map[_fencePosY][_fencePosX].farm) scene.add(gameController.map.map[_fencePosY][_fencePosX].obj);
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.x = _fencePosX * 16;
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.y = _fencePosY * 16;
                    gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.3
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.z = 5;

                } else {
                    let _randFlow = Math.random()
                    if (_randFlow < 0.3) {
                        _prepareObjTexture("flower4")
                    } else if (_randFlow < 0.6) {
                        _prepareObjTexture("flower3")
                    } else if (_randFlow < 0.9) {
                        _prepareObjTexture("bush")
                    } else {
                        _prepareObjTexture("rock")
                    }
                    let _texF = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                    let geometry123 = new THREE.PlaneGeometry(16, 16);
                    let material123 = new THREE.MeshPhongMaterial({
                        map: _texF,
                        transparent: true
                    });
                    let _fencePosX = n
                    let _fencePosY = m
                    gameController.map.map[_fencePosY][_fencePosX].obj = new THREE.Mesh(geometry123, material123);
                    if (Math.random() < 0.1 && !gameController.map.map[_fencePosY][_fencePosX].farm && !gameController.map.map[_fencePosY][_fencePosX].farm) scene.add(gameController.map.map[_fencePosY][_fencePosX].obj);
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.x = _fencePosX * 16;
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.y = _fencePosY * 16;
                    gameController.map.map[_fencePosY][_fencePosX].obj.rotation.x = 0.3
                    gameController.map.map[_fencePosY][_fencePosX].obj.position.z = 5;
                }
            }
        }
    }
}

//declaration
const plantArray = []
plantArray.push(new Plant("Berry", 60, 1), new Plant("Carrot", 200, 3), new Plant("Sunflower", 500, 5))
const itemArray = []
itemArray.push(new Item("Berry seeds", 1), new Item("Carrot seeds", 1), new Item("Sunflower seeds", 1), new Item("Water", 10, true), new Item("Shears", 100))

// gameController.weather.currentWeather = "lightRain"


const gameController = new GameController();
const gameTime = new GlobalTime();
window.addEventListener('load', async (event) => {
    //START hub
    document.getElementById("GUI_siteLogo").style.height = (document.getElementById("GUI_nftory").offsetTop / 1.6) + "px"
    document.getElementById("GUI_siteLogo").style.left = (window.innerWidth / 2) - (document.getElementById("GUI_siteLogo").offsetWidth / 2) + "px"
    document.getElementById("GUI_siteLogo").style.top = document.getElementById("GUI_nftory").offsetTop / 5 + "px"
    //startHeaderParticles();
    document.getElementById("GUI_MM_login").addEventListener('click', (event) => {
        controller.connectMM()
    });
    document.getElementById("GUI_loadingBlack").style.animation = "fadeIn 3s"
    setTimeout(() => {
        document.getElementById("GUI_loadingBlack").hidden = true;
    }, "2000")
    document.getElementById("nftHolder").style.width = "100%";
    controller.getStatsFromOS();
    //   controller._addStartCard();
    controller.web3 = new Web3(window.ethereum);
    controller.contractInstance = new controller.web3.eth.Contract(myAbi, Contract);
    if (!window.ethereum) {
        let p = document.createElement('p');
        typewiterArray.push(new Typewiter(p, "Looks like you dont have MetaMask..", 70))
        p.classList.add("thumbnail_align")
        document.getElementById("GUI_MM_login").style.filter = "grayscale(1)"
        document.getElementById("GUI_MM_login").disabled = true;
        document.getElementById("nftHolder").appendChild(p)
    } else {
        window.ethereum.on('accountsChanged', function(accounts) {
            controller.connectMM();
        })
    }

    //typewiterArray.push(new Typewiter(document.getElementById("GUI_latest"),"Connecting to pixelboi network..",50))
    //START GAME
    //gameController.inventory = JSON.parse(JSON.stringify(itemArray));
    gameController._closeInventory();
    gameController._drawInventory();
    createInventory(gameController.inventory)
    let testMap = new GameMap()
    testMap.newMap(21, 21)
    testMap.addFarm(5, 5, 8, 8)
    gameController.map = testMap;
    await addLayer2(36)
    _addFence(8, 6)
    testMap.addWater(6, 7)
    gameController.map.addTree(18, 18, "tree")
    const weather = new WeatherControl()
    gameController.weather = weather;
    gameController.map.map[1][1].obj = planeWatering;
    scene.add(gameController.map.map[1][1].obj);
    _addFence(11, 17)

    gameController.weather.foggy();
    gameController.weather._stopAllWeather();
    gameController.weather.currentTimeOfDay = "night"
    await testMap.addHouse(14, 18)
    gameController.shop = new Shop()
    camera.rotation.x = 0.5;
    _addDecorations()
    _addMapBoarders()
    await gameController.map.addTree(17, 7, "tree")
    await gameController.map.addTree(6, 15, "tree")
    await gameController.map.addTree(3, 5, "tree")
    await gameController.map.addTree(5, 17, "tree")


    await gameController.map.addTree(17, 1, "tree")
    await gameController.map.addTree(16, 1, "tree")
    await gameController.map.addTree(15, 2, "tree")
    await gameController.map.addTree(14, 1, "tree")

    await gameController.map.addTree(16, 3, "tree")
    await gameController.map.addTree(14, 0, "tree")
    await gameController.map.addTree(11, 1, "tree")
    await gameController.map.addTree(13, 3, "tree")


    _plantAForest()
    _addSmoke()
    addGoose(5, 5)
    addGoose(5, 15)
    addGoose(8, 10)
    addQuestLady(4,7)
    document.getElementById("GUI_InventoryScreen").addEventListener('mouseover', (event) => {
        if (gameController.inventory[event.path[0].id] == undefined) {
            return;
        }
        if (gameController.inventory[event.path[0].id].amount > 0) {
            document.getElementById("GUI_hoverInfo").hidden = false;
            document.getElementById("GUI_hoverInfo").textContent = gameController.inventory[event.path[0].id].name;
            document.getElementById("GUI_hoverInfo").style.top = (document.getElementById("GUI_InventoryScreen").offsetTop + event.path[0].offsetTop) + "px"
            document.getElementById("GUI_hoverInfo").style.left = (document.getElementById("GUI_InventoryScreen").offsetLeft + event.path[0].offsetLeft) + "px"
        }
    });

    document.getElementById("GUI_Energy").addEventListener('mouseover', (event) => {
        document.getElementById("GUI_hoverInfo").hidden = false;
        document.getElementById("GUI_hoverInfo").textContent = "Energy:" + gameController.energy.toFixed(2) + "%";
        document.getElementById("GUI_hoverInfo").style.top = document.getElementById("GUI_Energy").offsetTop + "px"
        document.getElementById("GUI_hoverInfo").style.left = document.getElementById("GUI_Energy").offsetLeft + "px"
    });

    document.getElementById("GUI_xpBar").addEventListener('mouseover', (event) => {
        document.getElementById("GUI_hoverInfo").hidden = false;
        document.getElementById("GUI_hoverInfo").textContent = "LVL:" + gameController.lvl + " XP:(" + gameController.xp.toFixed(2) + "/" + expSet[gameController.lvl] + ")";
        document.getElementById("GUI_hoverInfo").style.top = document.getElementById("GUI_xpBar").offsetTop + "px"
        document.getElementById("GUI_hoverInfo").style.left = document.getElementById("GUI_xpBar").offsetLeft + "px"
    });

    document.getElementById("GUI_playButton").addEventListener("click", () => {
        switchScreen()
    });
    document.getElementById("GUI_backToHub").addEventListener("click", () => {
        switchScreen();
    });

    document.getElementById("GUI_emotion_thumbsdown").addEventListener("click", () => {
        emotion_thumbsdown()
    });
    document.getElementById("GUI_emotion_thumbsup").addEventListener("click", () => {
        emotion_thumbsup()
    });
    document.getElementById("GUI_emotion_sayHello").addEventListener("click", () => {
        emotion_sayHello()
    });
    document.getElementById("GUI_chatToggleButton").addEventListener("click", () => {
        _toggleChat()
    });

    document.getElementById("GUI_questScene").addEventListener("click", () => {
        _movieSceneClick();
    });

    document.getElementById("GUI_musicOff").addEventListener("click", () => {
        _turnAllMusicOff();
    });


    document.getElementById("GUI_chatInputItself").addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            shareMessageWithWorld()
        }
        // do something
    });


    document.getElementById("GUI_shopButton").addEventListener("click", () => {
        if (document.getElementById("GUI_shopButton").textContent == "BUY") {
            for (let n = 0; n < gameController.shop.sellingItems.length; n++) {
                if (gameController.shop.sellingItems[n].name == gameController.shop.selectedBuyItem) {
                    if (gameController.balance >= gameController.shop.sellingItems[n].price) {
                        gameController.shop.buyItem(gameController.shop.selectedBuyItem)
                        sound_kaching.play()
                        sound_kaching.stop()
                        sound_kaching.play()
                    }
                }
            }
        } else {
            for (let n = 0; n < gameController.inventory.length; n++) {
                if (gameController.inventory[n].name == gameController.shop.selectedSellItem && gameController.inventory[n].amount > 0) {
                    gameController.shop.sellItem(gameController.shop.selectedSellItem)
                    sound_kaching.play()
                    sound_kaching.stop()
                    sound_kaching.play()
                }
            }
        }
    });


    animate();
});
//night
const moonLight = new THREE.AmbientLight(0x000fff, 0.5, 1);
moonLight.position.set(0, 0, 5);
moonLight.intensity = 0;
scene.add(moonLight);

let _plantAForest = async () => {
    for (let n = 22; n < 30; n++) {
        for (let m = 0; m < 35; m++) {
            if (Math.random() < 0.5) await gameController.map.addTree(n, m)
        }
    }
    for (let n = 0; n < 21; n++) {
        for (let m = 21; m < 35; m++) {
            if (Math.random() < 0.5) await gameController.map.addTree(n, m)
        }
    }
    for (let n = -8; n < 0; n++) {
        for (let m = 0; m < 35; m++) {
            if (Math.random() < 0.5) await gameController.map.addTree(n, m)
        }
    }
}
// create an AudioListener and add it to the camera
// const listener = new THREE.AudioListener();
// camera.add( listener );
// create the PositionalAudio object (passing in the listener)
const soundSea = new THREE.PositionalAudio(listener);

// load a sound and set it as the PositionalAudio object's buffer
const audioLoaderMusic = new THREE.AudioLoader();
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/breathtakingSite/soundSea.mp3', function(buffer) {
    soundSea.setBuffer(buffer);
    soundSea.setRefDistance(120);
    soundSea.setRolloffFactor(16)
    soundSea.setLoop(true);
    soundSea.setVolume(3.3);
    // soundSea.setMaxDistance(1)
});

const soundBirds = new THREE.PositionalAudio(listener);
audioLoader.load('https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/sounds/birds.mp3', function(buffer) {
    soundBirds.setBuffer(buffer);
    soundBirds.setRefDistance(100);
    soundBirds.setRolloffFactor(16)
    soundBirds.setLoop(true);
    soundBirds.setVolume(0.4);
    // soundBirds.setMaxDistance(1)
});
let kon = ["me/","gentle-","glitch.","grand-","artichoke."]
const onlineadr = "wss://"+kon[1]+kon[3]+kon[4]+kon[2]+kon[0]
const wsadr = "ws://localhost:8081"
let utf8decoder = new TextDecoder();
var exampleSocket = new WebSocket(onlineadr)
class MessageTemplate {
    constructor() {
        this.type;
        this.msg;
    }
}

function isOpen(ws) {
    return ws.readyState === ws.OPEN
}
let connectingTemp;
let sendMessageWS = (msg) => {
    if (isOpen(exampleSocket)) {
        let _msg = JSON.stringify(msg)
        console.log("sending " + _msg)
        exampleSocket.send(_msg)
    } else {
        if (exampleSocket.readyState == 0) {
          //  console.log("connection in progress please wait")
        } else {
          //  console.log("not connected, trying to reconnect")
            exampleSocket = ''
            exampleSocket = new WebSocket(onlineadr);
        }
        if (gameOn) {
            soundSea.stop();
            soundBirds.stop();
            sound_walking.play();
            sound_walking.stop();
            switchScreen()
        } else {
            connectingTemp = setTimeout(() => {
              _sendHelloMessage();
            }, 1000)
        }
    }
    return true;
}
exampleSocket.onmessage = (event) => {
    reciveSocket(JSON.parse(event.data));
}
let _sendHelloMessage = () => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'init:hello'
    _helloMsg.msg = gameController.boid
    sendMessageWS(_helloMsg)
}
//
let _sendMoveArray = (ma) => {
    let _msg = new MessageTemplate
    _msg.type = 'game:movearray'
    _msg.msg = {
        x: ma[ma.length - 1].y,
        y: ma[ma.length - 1].x,
        boid: gameController.boid
    }
    sendMessageWS(_msg)
}

let recivePublicFarm = (farm) => {
    let _y = 8;
    let _x = 8;
    let y = 5;
    let x = 5;
    for (let n = _y; n < y + _y; n++) {
        for (let m = _x; m < x + _x; m++) {
            gameController.map.map[n][m].farm.planted = farm[n - _y][m - _x].planted
            //  gameController.map.map[n][m].farm.planted.ripeTime++;
            //gameController.map.map[n][m].farm.active = farm[n-_y][m-_x].active
            gameController.map.map[n][m].farm.watered = farm[n - _y][m - _x].watered
        }
    }
}

let recivePlayerList = (data) => {

    recivePublicFarm(data.msg.farm)
    let newOnlineArray = data.msg.onlinePlayers;
    for (let n = 0; n < newOnlineArray.length; n++) {
        let isme = false;
        if (newOnlineArray[n].boid == gameController.boid) {
            isme = true;
        }
        let isnew = true;
        for (let m = 0; m < gameController.map.players.length; m++) {
            if (gameController.map.players[m].boid == newOnlineArray[n].boid) {
                isnew = false;
                if (isme) {
                    let _boid = newOnlineArray[n].boid
                    gameController.energy = newOnlineArray[n].energy;
                    gameController.xp = newOnlineArray[n].xp;
                    gameController.balance = newOnlineArray[n].balance;
                    gameController.map.players[m].activeControl = true;
                    cameraPosition = m;
                    gameController.inventory = [];
                    gameController.inventory = JSON.parse(JSON.stringify(newOnlineArray[n].inventory));
                    document.getElementById("GUI_boiAvatar").src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + _boid.slice(5, _boid.length) + ".png"
                    gameController.firstQuest = newOnlineArray[n].firstQuest;
                    _addXpToMe(gameController.xp)

                }
            }
        }
        if (isnew) {
            if (newOnlineArray[n].boid == gameController.boid) {
                gameController.energy = newOnlineArray[n].energy;
                gameController.map.addPlayer(true, newOnlineArray[n].lastPosition.x, newOnlineArray[n].lastPosition.y, newOnlineArray[n].boid)
                gameController.inventory = [];
                gameController.firstQuest = newOnlineArray[n].firstQuest;
                gameController.balance = newOnlineArray[n].balance;
                gameController.xp = newOnlineArray[n].xp
                gameController.inventory = JSON.parse(JSON.stringify(newOnlineArray[n].inventory));
                cameraPosition = gameController.map.players.length - 1;
                _addXpToMe(gameController.xp)
                if (newOnlineArray[n].lastPosition.x == 14 && newOnlineArray[n].lastPosition.y == 17) {
                    setTimeout(() => {
                        currentDialogue = startDialogue;
                        gameController.map.players[gameController.map.players.length - 1].newDestination(newOnlineArray[n].lastPosition.x * 16, (newOnlineArray[n].lastPosition.y - 1) * 16, true);
                        _toggleQuest()
                    }, 300)
                }
            } else {
                gameController.map.addPlayer(false, newOnlineArray[n].lastPosition.x, newOnlineArray[n].lastPosition.y, newOnlineArray[n].boid)
                gameController.map.players[gameController.map.players.length-1].direction = Math.floor(Math.random()*4)
            }
        }
    }
}



let recivePlayerMove = (data) => {
    if (data.boid == gameController.boid) {
        return false;
    } else {
        for (let n = 0; n < gameController.map.players.length; n++) {
            if (gameController.map.players[n].boid == data.boid) {
                gameController.map.players[n].newDestination(data.x * 16, data.y * 16, false)
                return;
            }
        }
    }
}

let reciveSocket = (data) => {

    if (data.time !== undefined) {
        let sTime = JSON.parse(data.time)
        gameController.weather.hour = sTime.hour
        gameController.weather.minutes = sTime.minutes
        gameController.weather.currentDay = sTime.currentDay
    }
    //console.log("recived data:", data)
    if (data.type == 'init:_hello') {
        recivePlayerList(data)
    }
    if (data.type == 'game:_movearray') {
        recivePlayerMove(data.msg)
    }
    if (data.type == 'game:_emote') {
        //planeEmote.rotation.x = 0
        if (data.msg.type == "hello") {
            _emotion_sayHello(data.msg.boid)
        }
        if (data.msg.type == "thumbsup") {
            _emotion_thumbsup(data.msg.boid)
        }
        if (data.msg.type == "thumbsdown") {
            _emotion_thumbsdown(data.msg.boid)
        }
    }
    if (data.type == "game:_viewShop") {
        reciveShopData(data.msg)
    }
    if (data.type == "game:_reciveXp") {
        _addXpToMe(Number(data.msg))
    }
    if (data.type == "game:_reciveInventory") {
        gameController.balance = JSON.parse(JSON.stringify(data.msg.balance))
        gameController.inventory = [];
        gameController.inventory = JSON.parse(JSON.stringify(data.msg.inventory))
    }
    if (data.type == "game:_chatMessage") {
        reciveNewChatMessage(data)
    }
    if (data.type == "game:_time") {
    }
    if (data.type == "site:_hello") {

        _showTop5(data)
    }
}

const _showTop5 = (data) => {
    let _players = data.msg
    for (let n = 0; n < _players.length; n++) {
        let _boid = _players[n].boid
        const newLi = document.createElement("p");
        newLi.classList.add('social_icon');
        newLi.style.width = "20%";
        const newi = document.createElement("img");
        newi.style = "width:100px;height:100px;border-radius:50px;"
        newi.src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + _boid.slice(5, _boid.length) + ".png"
        newLi.appendChild(newi)
        newLi.innerHTML += "<br> <p>" + _boid + "</p>"
        newLi.innerHTML += "<br> <p>" + _players[n].xp + "XP</p>"
        newLi.innerHTML += "<br> <p>" + _players[n].balance + "💰</p>"
        document.getElementById("GUI_top5").appendChild(newLi)
    }
}

const reciveShopData = (data) => {
    document.getElementById("GUI_shoplistSell").innerHTML = '<h2>Buy:</h2>'
    document.getElementById("GUI_shoplistBuy").innerHTML = '<h2>Sell:</h2>'
    document.getElementById("GUI_shop").hidden = false;
    gameController.shop.sellingItems = data.selling;
    let buy = data.buying;
    let sell = data.selling;
    for (let n = 0; n < data.selling.length; n++) {
        let p = document.createElement("p");
        p.id = data.selling[n].name
        p.addEventListener("click", (e) => {
            sound_click.play();
            for (let em of document.getElementById("GUI_shoplistSell").children) {
                em.style = "background: rgba(0,0,0,0);"
            }
            for (let em2 of document.getElementById("GUI_shoplistBuy").children) {
                em2.style = "background: rgba(0,0,0,0);"
            }
            e.path[0].style = "background: rgba(0,0,0,0.8);"
            gameController.shop.selectedBuyItem = e.path[0].id
            document.getElementById("GUI_shopItemName").textContent = gameController.shop.selectedBuyItem;
            document.getElementById("GUI_shopButton").textContent = "BUY"
            document.getElementById("GUI_shopAmountPreview").textContent = "x99"
        });
        p.textContent = data.selling[n].name + " 💰" + data.selling[n].price
        document.getElementById("GUI_shoplistSell").appendChild(p)
    }
    for (let m = 0; m < data.buying.length; m++) {
        for (let i = 0; i < gameController.inventory.length; i++) {
            if (gameController.inventory[i].name == data.buying[m].name) {
                if (gameController.inventory[i].amount > 0) {
                    let p = document.createElement("p");
                    p.id = data.buying[m].name
                    p.addEventListener("click", (e) => {
                        sound_click.play();
                        for (let em of document.getElementById("GUI_shoplistSell").children) {
                            em.style = "background: rgba(0,0,0,0);"
                        }
                        for (let em2 of document.getElementById("GUI_shoplistBuy").children) {
                            em2.style = "background: rgba(0,0,0,0);"
                        }
                        e.path[0].style = "background: rgba(0,0,0,0.8);"
                        gameController.shop.selectedSellItem = e.path[0].id
                        document.getElementById("GUI_shopItemName").textContent = gameController.shop.selectedSellItem;
                        document.getElementById("GUI_shopButton").textContent = "SELL"
                        document.getElementById("GUI_shopAmountPreview").textContent = "x1"
                    });
                    p.textContent = data.buying[m].name + " 💰" + data.buying[m].price + " X" + gameController.inventory[i].amount
                    document.getElementById("GUI_shoplistBuy").appendChild(p)
                }
            }
        }
    }
}

const animateSelection = () => {
    for (let n = 0; n < document.getElementById("nftHolder").children.length; n++) {
        if (document.getElementById("nftHolder").children[n].id == gameController.boid) {
            document.getElementById("nftHolder").children[n].style = "border-radius: 25px;"
            document.getElementById("nftHolder").children[n].style.backgroundColor = "#b14434"
        } else {
            document.getElementById("nftHolder").children[n].style.backgroundColor = "rgb(0,0,0,0)"
        }
    }
}
const selectBoi = (name, dom) => {
    if (name.slice(0, 3) !== "Boi") {
        return;
    }
    document.getElementById("GUI_latest").textContent = "Selected: " + name
    gameController.boid = name;
    document.getElementById("GUI_playButton").disabled = false;
    document.getElementById("GUI_playButton").style = "border-radius: 0px 0px 50px 50px;filter: grayscale(0);"
}


let tempHoverInfo = undefined;

const emotion_sayHello = () => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:emote'
    _helloMsg.msg = {
        type: "hello",
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}

const emotion_thumbsdown = () => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:emote'
    _helloMsg.msg = {
        type: "thumbsdown",
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}

const _emotion_thumbsdown = (_player) => {
    let player = gameController.map.players[0]
    for (let n = 0; n < gameController.map.players.length; n++) {
        if (gameController.map.players[n].boid == _player) {
            player = gameController.map.players[n];
            n = gameController.map.players.length;
        }
    }
    document.getElementById("GUI_emotion_thumbsdown").disabled = true;
    player.emote.opacity = 1;
    player.emote.map = _texEmoteDown;
    _emotionBuble = setTimeout(() => {
        player.emote.opacity = 0;
        document.getElementById("GUI_emotion_thumbsdown").disabled = false;
    }, 2000)
}
const emotion_thumbsup = () => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:emote'
    _helloMsg.msg = {
        type: "thumbsup",
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}

const _emotion_thumbsup = (_player) => {
    let player = gameController.map.players[0]
    for (let n = 0; n < gameController.map.players.length; n++) {
        if (gameController.map.players[n].boid == _player) {
            player = gameController.map.players[n];
            n = gameController.map.players.length;
        }
    }
    document.getElementById("GUI_emotion_thumbsup").disabled = true;
    player.emote.opacity = 1;
    player.emote.map = _texEmoteUp;
    _emotionBuble = setTimeout(() => {
        player.emote.opacity = 0;
        document.getElementById("GUI_emotion_thumbsup").disabled = false;
    }, 2000)
}

let _emotionBuble = false;

const _emotion_sayHello = (_player) => {
    let player = gameController.map.players[0]
    for (let n = 0; n < gameController.map.players.length; n++) {
        if (gameController.map.players[n].boid == _player) {
            player = gameController.map.players[n];
            n = gameController.map.players.length;
        }
    }
    document.getElementById("GUI_emotion_sayHello").disabled = true;
    player.emote.opacity = 1;
    player.emote.map = _texEmote;
    _emotionBuble = setTimeout(() => {
        player.emote.opacity = 0;
        document.getElementById("GUI_emotion_sayHello").disabled = false;
    }, 2000)
}

const locatePlayerByObjId = (id) => {
    tempHoverInfo = undefined;
    let temp = false;
    for (let n = 0; n < gameController.map.players.length; n++) {
        if (gameController.map.players[n].obj.id == id) {
            document.getElementById("GUI_hoverInfo").hidden = false;
            var miniImgPlayer = document.createElement("IMG");
            miniImgPlayer.src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + gameController.map.players[n].boid.slice(5, gameController.map.players[n].boid.length) + ".png"
            document.getElementById("GUI_hoverInfo").textContent = gameController.map.players[n].boid
            document.getElementById("GUI_hoverInfo").style.top = (event.clientY - 40) + "px"
            document.getElementById("GUI_hoverInfo").style.left = event.clientX + "px"
            miniImgPlayer.width = 30;
            miniImgPlayer.height = 30;
            miniImgPlayer.style = "border-radius:20px;"
            document.getElementById("GUI_hoverInfo").appendChild(miniImgPlayer)
            temp = true;
        }
    }
    if (!temp) {
        document.getElementById("GUI_hoverInfo").hidden = true;
    }
}

let intervalID;

let boiSkinArr = [{"skin":"pale"},{"skin":"choko"},{"skin":"Zombie"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"choko"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"choko"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"Demon"},{"skin":"Zombie"},{"skin":"Demon"},{"skin":"pink"},{"skin":"pale"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"pale"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"Zombie"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"choko"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"pale"},{"skin":"Demon"},{"skin":"pink"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pale"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pale"},{"skin":"choko"},{"skin":"choko"},{"skin":"pale"},{"skin":"Demon"},{"skin":"Demon"},{"skin":"Demon"},{"skin":"Demon"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"choko"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"choko"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"pink"},{"skin":"Demon"},{"skin":"choko"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pale"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pink"},{"skin":"pale"},{"skin":"pale"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"Zombie"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"choko"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"pale"},{"skin":"pale"},{"skin":"choko"},{"skin":"pink"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pale"},{"skin":"choko"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"pale"},{"skin":"choko"},{"skin":"choko"},{"skin":"choko"},{"skin":"pink"},{"skin":"Demon"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pale"},{"skin":"pale"},{"skin":"pale"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"pale"},{"skin":"pale"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"Demon"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pale"},{"skin":"Demon"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"pink"},{"skin":"Demon"},{"skin":"pink"},{"skin":"choko"},{"skin":"Skeleton"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"pale"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pale"},{"skin":"pale"},{"skin":"Skeleton"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pale"},{"skin":"Demon"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"Skeleton"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"choko"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"choko"},{"skin":"choko"},{"skin":"pale"},{"skin":"pink"},{"skin":"choko"},{"skin":"choko"},{"skin":"choko"},{"skin":"pale"},{"skin":"Demon"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"Zombie"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Zombie"},{"skin":"pink"},{"skin":"choko"},{"skin":"Demon"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pale"},{"skin":"choko"},{"skin":"choko"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"Vampire"},{"skin":"choko"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"pink"},{"skin":"Skeleton"},{"skin":"pale"},{"skin":"choko"},{"skin":"pale"},{"skin":"pale"},{"skin":"Demon"},{"skin":"pale"},{"skin":"pale"},{"skin":"pink"},{"skin":"pale"},{"skin":"pink"},{"skin":"pink"}]



const askToPlantASeed = (x, y, itemname) => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:farming_plant'
    _helloMsg.msg = {
        x: x - 8,
        y: y - 8,
        name: itemname,
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}

const askToCropAPlant = (x, y) => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = "game:farming_crop"
    _helloMsg.msg = {
        x: x - 8,
        y: y - 8,
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}


const addGoose = (x, y) => {
    let _questNPC = new Player()
    _questNPC.boid = "quest girl"
    _questNPC.activeControl = false;
    _questNPC._texP = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/chick_idle.png");
    _questNPC._texW = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/chick_walk.png");
    // _preparePlayerTexture("lady")
    // _questNPC._texP = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
    // _preparePlayerTexture("ladyWalk")
    //_questNPC._texW = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
    _questNPC.idleannie = new TextureAnimator(_questNPC._texP, 4, 4, 2, 3, 100);
    _questNPC.walkingannie = new TextureAnimator(_questNPC._texW, 4, 4, 2, 3, 100);
    //
    // let _texShopKeep = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
    // _preparePlayerTexture("ladyWalk")
    // let _texShopKeepWalk = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
    // let ladyannie = new TextureAnimator(_texShopKeep,4, 4, 2, 3, 175);
    // let ladyannieWalk = new TextureAnimator(_texShopKeepWalk,4, 4, 2, 3, 175);
    const geometryShopKeep = new THREE.PlaneGeometry(globalX, (globalY));
    const materialShopKeep = new THREE.MeshPhongMaterial({
        map: _questNPC._texP,
        transparent: true
    });
    const planeShopKeep = new THREE.Mesh(geometryShopKeep, materialShopKeep);
    planeShopKeep.position.x = globalX * x;
    planeShopKeep.position.y = globalY * y;
    planeShopKeep.position.z = 7;
    planeShopKeep.rotation.x = 0.5
    _questNPC.obj = planeShopKeep;
    gameController.map.players.push(_questNPC);
    scene.add(_questNPC.obj)
    //_addGoose(x,y,_questNPC.obj)
}


let ladyannie;
let ladyquest;
const addQuestLady = (x, y) => {
    _preparePlayerTexture("lady")
    let _texShopKeep = new THREE.TextureLoader().load(tileCanvasPlayer.toDataURL());
    ladyannie = new TextureAnimator(_texShopKeep, 4, 4, 2, 3, 175);
    const geometryShopKeep = new THREE.PlaneGeometry(globalX, (globalY + (globalY / 2)));
    const materialShopKeep = new THREE.MeshPhongMaterial({
        map: _texShopKeep,
        transparent: true
    });
    const planeShopKeep = new THREE.Mesh(geometryShopKeep, materialShopKeep);
    planeShopKeep.position.x = globalX * x;
    planeShopKeep.position.y = globalY * y;
    planeShopKeep.position.z = 8;
    planeShopKeep.rotation.x = 0.5
    scene.add(planeShopKeep)
    _addQuestLady(x, y, planeShopKeep)
}
let planeShopKeep;
let _texQuest = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/quest.png");
let _texQuestAwait = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/questAwait.png");
let _texQuestDone = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mooodev/pixelBois/main/webGame/images/questDone.png");
let _addQuestLady = (x, y, pp) => {
    const geometryShopKeep = new THREE.PlaneGeometry(globalX / 1.3, globalY / 2);
    const materialShopKeep = new THREE.MeshPhongMaterial({
        map: _texQuest,
        transparent: true
    });
    planeShopKeep = new THREE.Mesh(geometryShopKeep, materialShopKeep);
    planeShopKeep.position.x = globalX * x;
    planeShopKeep.position.y = (globalY * y) + 10;
    planeShopKeep.position.z = 20;
    planeShopKeep.rotation.x = 0.5
    ladyquest = planeShopKeep;
    pp.add(ladyquest)
    scene.add(ladyquest)
}

const expSet = [0, 300, 900, 2700, 6600, 14000, 23000, 34000, 48000, 69000]
const _addXpToMe = (xp) => {
    gameController.xp = xp;
    let curlvl = 0;
    for (let n = 0; n < expSet.length; n++) {
        if (xp > expSet[n]) {
            curlvl++;
        } else {
            n = expSet.length;
        }
    }
    if (gameController.lvl < curlvl) {
        sound_MusicEnterance.play();
        gameController.lvl = curlvl;
        //lvl up
    }
}

const _toggleChat = () => {

    if (document.getElementById("GUI_openChat").style.height == "" || document.getElementById("GUI_openChat").style.height == "55px") {

        document.getElementById("GUI_openChat").style.height = "40%"
    } else {

        document.getElementById("GUI_openChat").style.height = "55px"
    }
    //document.getElementById("GUI_openChat").hidden = false;

}

const _movieSceneClick = () => {
    sound_click.play();
    if (typewiterArray.length > 0) {
        for (let n = 0; n < typewiterArray.length; n++) {
            if (typewiterArray[n].position > 1) {
                typewiterArray[n].target.textContent = typewiterArray[n].text;
                typewiterArray[n].position = typewiterArray[n].text.length;
            }
        }
    } else {
        _toggleQuest();
    }
}

const _toggleQuest = () => {
    if (document.getElementById("GUI_questScene").style.zIndex == '' ||
        document.getElementById("GUI_questScene").style.zIndex == -1) {
        document.getElementById("GUI_questScene").style.zIndex = 50;
        document.getElementById("GUI_heroHolder").style.opacity = 0;
        typewiterArray.push(new Typewiter(document.getElementById("GUI_questText"), currentDialogue.currentText.text, 25))
        typewiterArray[typewiterArray.length - 1].quest = true;
        document.getElementById("GUI_questButtonHolder").innerHTML = ''
    } else {
        document.getElementById("GUI_questButtonHolder").innerHTML = ''
        document.getElementById("GUI_questScene").style.zIndex = -1;
        document.getElementById("GUI_heroHolder").style.opacity = 1;
        //sound_MusicEnterance.play();
    }

}

const _postChatMessage = (msg) => {
    const p = document.createElement("p");
    p.textContent = msg;
    document.getElementById("GUI_chatMessageHolder").appendChild(p)
    document.getElementById("GUI_chatMessageHolder").scrollTo(0, document.getElementById("GUI_chatMessageHolder").scrollHeight);
}


const askToWaterAPlant = (x, y) => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:farming_water'
    _helloMsg.msg = {
        x: x - 8,
        y: y - 8,
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}


const _turnAllMusicOff = () => {
    sound_MusicEnterance.play();
    sound_MusicEnterance.stop();
}

const requestToUseEdible = () => {
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:edible'
    _helloMsg.msg = {
        name: gameController.selectedItem.name,
        boid: gameController.boid
    }
    sendMessageWS(_helloMsg)
}

const shareMessageWithWorld = () => {
    if (document.getElementById("GUI_chatInputItself").value.length > 256 || document.getElementById("GUI_chatInputItself").value == '') return;
    let _helloMsg = new MessageTemplate
    _helloMsg.type = 'game:chatMessage'
    _helloMsg.msg = {
        text: document.getElementById("GUI_chatInputItself").value,
        boid: gameController.boid
    }
    document.getElementById("GUI_chatInputItself").value = ''
    sendMessageWS(_helloMsg)
}

const reciveNewChatMessage = (data) => {
    if (data.msg.text.length > 256 || data.msg.boid.length > 10) return;
    let _text = data.msg.boid + ":" + " " + JSON.stringify(data.msg.text);
    _postChatMessage(_text)
}

const _saySiteHello = () => {
    let _siteMsg = new MessageTemplate
    _siteMsg.type = 'site:hello'
    sendMessageWS(_siteMsg)
}

const _requestWaterBucket = () => {
    let _siteMsg = new MessageTemplate
    _siteMsg.type = 'game:waterbucket'
    _siteMsg.msg = {
        boid: gameController.boid
    }
    sendMessageWS(_siteMsg)
}
const _requestWaterRefill = () => {
    let _siteMsg = new MessageTemplate
    _siteMsg.type = 'game:waterRefill'
    _siteMsg.msg = {
        boid: gameController.boid
    }
    sendMessageWS(_siteMsg)
}


const _startQuest = () => {
    let _siteMsg = new MessageTemplate
    _siteMsg.type = 'game:quest'
    _siteMsg.msg = {
        boid: gameController.boid
    }
    gameController.firstQuest = false;
    //  planeShopKeep.material.map = _texQuestAwait;
    sendMessageWS(_siteMsg)
}

const _getTime = () => {
    let _siteMsg = new MessageTemplate
    _siteMsg.type = 'game:time'
    _siteMsg.msg = {
        boid: gameController.boid
    }
    sendMessageWS(_siteMsg)
}

const _secondsToMinutes = (seconds) => {
    let _minutes = Math.floor(seconds / 60)
    let leftOver = ((seconds / 60) - Math.floor(seconds / 60)) * 60
    let time = _minutes + ":" + Math.round(leftOver)
    return time;
}


const _decreasePlayerEnergy = (player, e) => {
    player.energy -= e;
    if (player.energy <= 0) {
        sound_fail.play();
        player.energy = 0
        return false;
    }
    if (!player.energy) {
        sound_fail.play();
        player.energy = 0
        return false;
    }
    return true;
}
document.addEventListener('contextmenu', event => event.preventDefault());
})();