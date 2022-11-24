(function () {
let gameOn = false;
const switchScreen = () => {

if(!gameOn && exampleSocket.readyState !== 1){
  //exampleSocket = new WebSocket(onlineadr)
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
let grassTex = "data:image/png;base64,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"
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
                //let _tex = new THREE.TextureLoader().load(grassTex);
                const geometry = new THREE.PlaneGeometry(globalX, globalY);
                const material = new THREE.MeshPhongMaterial({
                  color:0x62ab45
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
                this.map[n][m].obj.material.color.set(0x8f4c60);
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
        //document.getElementById("GUI_boiAvatar").src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + _boid.slice(5, _boid.length) + ".png"
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
        if (this.timeOfDay == 2) {
            //ev
            if (this.hour > 21 && light.intensity > 0.5) light.intensity -= 0.0005
            if (this.hour > 22 && light.intensity > 0.4) light.intensity -= 0.001
            if (scene.fog.near > 1) scene.fog.near -= 0.1
            if (scene.fog.far > 275) scene.fog.far -= 0.1
            if (light.intensity > 0.7) light.intensity -= 0.00001
            if (moonLight.intensity < 0.1) moonLight.intensity += 0.0001
        }
        if (this.timeOfDay == 3) {
            //night
            if (scene.fog.far > 255) scene.fog.far -= 0.1
            if (light.intensity > 0.1) light.intensity -= 0.001
            if (moonLight.intensity < 0.3) moonLight.intensity += 0.001
            if (smokeArray[0].material.opacity < 0.6) {
                for (let n = 0; n < smokeArray.length; n++) {
                    smokeArray[n].material.opacity += 0.01
                }

            }
        }
        if (this.timeOfDay == 0) {
            //mning
            //  if(scene.fog.near < 200)scene.fog.near += 1
            if (moonLight.intensity > 0) moonLight.intensity -= 0.001
            //if(scene.fog.far < 500)scene.fog.far += 0.1
            if (light.intensity < 1) light.intensity += 0.001
            if (smokeArray[0].material.opacity > 0) {
                for (let n = 0; n < smokeArray.length; n++) {
                    smokeArray[n].material.opacity -= 0.001
                }
            }
        }
        if (this.timeOfDay == 1) {
            //day
            if (light.intensity < 1) light.intensity += 0.01
        }










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
    color: 0x62ab45
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



var _FarmbgString = "data:image/png;base64,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";

let playerTexture = "data:image/png;base64,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";

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
        //console.log("sending " + _msg)
        exampleSocket.send(_msg)
    } else {
        if (exampleSocket.readyState == 0) {
          //  console.log("connection in progress please wait")
        } else {
          //  console.log("not connected, trying to reconnect")
            exampleSocket = ''
            return;
            //exampleSocket = new WebSocket(onlineadr);
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


          if(gameController.map.map[n][m].farm.planted && !farm[n - _y][m - _x].planted){
            let x = m
            let y = n
            if (gameController.map.map[y][x].farm.planted.name == "Berry") {
                _prepareObjTexture("berry3")
            } else if (gameController.map.map[y][x].farm.planted.name == "Carrot") {
                _prepareObjTexture("carrot3")
            } else {
                _prepareObjTexture("sunflower3")
            }
            gameController.map.map[y][x].farm.obj.position.y = y * 16;
            let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
            gameController.map.map[y][x].farm.obj.material.map = _tex
            gameController.map.map[y][x].farm.obj.geometry = new THREE.PlaneGeometry(globalX, globalY);
            gameController.map.map[y][x].farm.planted = false;
            gameController.map.map[y][x].farm.watered = false;
            setTimeout(function() {
                _prepareObjTexture("rock")
                let _tex = new THREE.TextureLoader().load(tileCanvas.toDataURL());
                gameController.map.map[y][x].farm.obj.material.map = _tex
            }, 2000);
          }

          // if(gameController.map.map[n][m].farm.planted.name == farm[n - _y][m - _x].planted &&   gameController.map.map[n][m].farm.watered !== farm[n - _y][m - _x].watered){
          //   gameController.map.map[n][m].farm.watered = farm[n - _y][m - _x].watered
          // }else if(gameController.map.map[n][m].farm.planted.name !== farm[n - _y][m - _x].planted){
          //   gameController.map.map[n][m].farm.planted = farm[n - _y][m - _x].planted
          //   gameController.map.map[n][m].farm.watered = farm[n - _y][m - _x].watered
          // }

          if(gameController.map.map[n][m].farm.planted.name !== farm[n - _y][m - _x].planted.name){
            gameController.map.map[n][m].farm.planted = farm[n - _y][m - _x].planted
            gameController.map.map[n][m].farm.watered = farm[n - _y][m - _x].watered
          }

            //gameController.map.map[n][m].farm.planted = farm[n - _y][m - _x].planted
            //gameController.map.map[n][m].farm.watered = farm[n - _y][m - _x].watered
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
                    document.getElementById("GUI_boiAvatar").src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + gameController.boid.slice(5, gameController.boid.length) + ".png"
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
                document.getElementById("GUI_boiAvatar").src = "https://raw.githubusercontent.com/mooodev/pixelBois/main/pfpDownloader/images/" + gameController.boid.slice(5,gameController.boid.length) + ".png"
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
