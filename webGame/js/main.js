let testvar1;
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
            console.log(ev)
            
         let _arrtest = ev.composedPath()
         let _boiidtest = _arrtest[2]
         
          console.log(_boiidtest )
           testvar1 = ev.composedPath()
            selectBoi(_boiidtest.id , _boiidtest)
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
