//web3


//minting web3

var walking = false;

var audio = new Audio('https://mooodev.github.io/pixelBois/breathtakingSite/musicFinMin.mp3');
audio.loop=true;

      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      }else{

      }
var currentAcc;

var activatePassive = () => {
walking = true;
audio.play();
console.log("Thanks for visiting :b")
}

var activateMeta = async () => {
  console.log("activating metamask")
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account, "connected to net")
  currentAcc = account;
  document.getElementById("totalCount").innerHTML = "Connected with " + account
  document.getElementById("connectButton").hidden = true;
  document.getElementById("mintButton").hidden = false;
  walking = true;
  audio.play();
  getTotalMinted();
}
var web3;

var getTotalMinted = async () => {
  await contractInstance.methods.totalMinted().call().then(function(total) {
  console.log(total);
  document.getElementById("infoBar").innerHTML = "Minted: " + total + "/420"
});
}

var mint = async () => {
  document.getElementById("totalCount").innerHTML = "trying to mint"
  await contractInstance.methods.mintFree().send({from: web3.eth.accounts.givenProvider.selectedAddress}).then(function(total) {
  document.getElementById("totalCount").innerHTML = "Congrtz you minted your NFT!"
  getTotalMinted();
  console.log(total);
});
}

const Contract = "0x0568A87e64E65f4cC7898E08f0e57FFe2AA6241f"
var myAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseTokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxAmount",
				"type": "uint256"
			}
		],
		"name": "changeMaxMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintFree",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_baseTokenURI",
				"type": "string"
			}
		],
		"name": "setBaseTokenURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var contractInstance;




//three js

  class MainThreeScreen{
    constructor(){
      this.planes = []
      this.players = [];
      this.lights = []
      this.scene = new THREE.Scene();
      this.camera =  new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1,1000);
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.bgColors = [0xffffff,0x000000,0xfff000]
      this.mainOpacity = 1;
      //this.pageController = new PageController()
      this.init();
    }
    init(){
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      console.log("screen height is " + window.innerHeight)
      document.getElementById("screenHolder").appendChild( this.renderer.domElement );
      this.camera.position.z = 500;
      var changeEqualH = (window.innerHeight/850)+0.1;
      this.camera.zoom = changeEqualH;
      this.camera.updateProjectionMatrix();
      console.log("initiatedMainScreen")
    }
    opacity(x){
      if(x - this.mainOpacity > 0.1){
        this.mainOpacity += 0.01;
        document.getElementById("screenHolder").style.opacity = this.mainOpacity
      }else if(x - this.mainOpacity < -0.1){
        this.mainOpacity -= 0.01;
        document.getElementById("screenHolder").style.opacity = this.mainOpacity
      }
    }
    addToScene(obj){
      this.scene.add( obj );

      console.log("added a page")
    }
    addPlane(b64texture,b64textureHead,zind){
      var playerTexture = new THREE.TextureLoader().load(b64texture)
      var playerTextureHead = new THREE.TextureLoader().load(b64textureHead)
      //this.planes.push(player)
      var geometry = new THREE.PlaneGeometry( 500, 500 );
      var material,materialHead;

      material = new THREE.MeshBasicMaterial({
            map: playerTexture,
            side: THREE.DoubleSide,
            transparent: true
        });
        materialHead = new THREE.MeshBasicMaterial({
              map: playerTextureHead,
              side: THREE.DoubleSide,
              transparent: true
          });
      var plane = new THREE.Mesh( geometry, material );
      var planeHead = new THREE.Mesh( geometry, materialHead );
    //  plane.rotation.y += 180;
  //  this.planes.push(plane)
      plane.position.z = zind
      planeHead.position.z = zind + 1
      //plane.position.y = -200+(this.players.length * -30)
    //  plane.position.x = (Math.random()*1000)-500
      if(Math.random()< 0.5){
      //  plane.rotation.y += 3.14
      }
      this.players.push(plane)
      this.addToScene( this.players[this.players.length-1] );
      this.players.push(planeHead)
      this.addToScene( this.players[this.players.length-1] );
    }
    addSmallLight(x,y){

    }
    addColoredLight(x,y,color){

    }
  }


var tileSetMain = document.createElement("img")
tileSetMain.crossOrigin = "Anonymous";
tileSetMain.src = "https://mooodev.github.io/pixelBois/breathtakingSite/tileset.png"



var plane;
var  cylinder;
var  cylinder2;

var screen;
window.onload = function() {
  web3 = new Web3(window.ethereum);
  contractInstance = new web3.eth.Contract(myAbi, Contract);
  screen = new MainThreeScreen()
  screen.camera.position.y = 160
  screen.camera.position.x = 300
  screen.camera.position.z = 500
  var canvaz2 = document.createElement("canvas")
  canvaz2.width = 1000;
  canvaz2.height = 500;
  var ctx2 = canvaz2.getContext("2d")
  ctx2.drawImage(tileSetMain, 0,2000, 255,125, 0, 0, 1000,500);
  let draw = canvaz2.toDataURL()

  var canvaz3 = document.createElement("canvas")
  canvaz3.width = 1000;
  canvaz3.height = 500;
  var ctx3 = canvaz3.getContext("2d")
  ctx3.drawImage(tileSetMain, 0,2125, 255,100, 0, 0, 1000,500);
  let draw2 = canvaz3.toDataURL()


  const texture = new THREE.TextureLoader().load( draw );
  const texture2 = new THREE.TextureLoader().load( draw2 );



  const geometry = new THREE.CylinderGeometry( 900, 900, 1000, 18 );
  const material = new THREE.MeshBasicMaterial( {map:texture} );
   cylinder = new THREE.Mesh( geometry, material );
  screen.scene.add(  cylinder );
cylinder.position.z = - 900
cylinder.position.x = 300
cylinder.position.y = 500

const geometry2 = new THREE.CylinderGeometry( 900, 900, 700, 18 );
const material2 = new THREE.MeshBasicMaterial( {map:texture2} );
 cylinder2 = new THREE.Mesh( geometry2, material2 );
screen.scene.add(  cylinder2 );
cylinder2.position.z = - 900
cylinder2.position.x = 300
cylinder2.position.y = -350


generateRandomBoi(commonLayerDatabase,naturalBois)
animate();
};

  class Boi{
    constructor(_id){
      this.idname = _id
      this.traits = [];
      this.uniqueProof;
    }
    addTrait(name,item){
      let trait = new TraitLayer(name)
      trait.items = item;
      this.traits.push(trait)
      return;
    }
  }
  class TraitLayer {
      constructor(_name) {
          this.name = _name;
          this.items = [];
      }
  }
  class LayerDatabase {
      constructor() {
          this.traitLayers = [];
      }
      addNewLayers(layerArray) {
          for (var n = 0; n < layerArray.length; n++) {
              let newTrait = new TraitLayer(layerArray[n])
              this.traitLayers.push(newTrait)
          }
          return;
      }
      addItemsToLayer(_layerName, itemArray) {
          for (var n = 0; n < this.traitLayers.length; n++) {
              if (this.traitLayers[n].name == _layerName) {
                  this.traitLayers[n].items = itemArray;
              }
          }
          return;
      }
  }

  var commonLayerDatabase = new LayerDatabase();

  commonLayerDatabase.addNewLayers(["Skin", "Countor", "Acessories","Clothes", "Eyes", "Head", "Mouth"])

  commonLayerDatabase.addItemsToLayer("Skin", ["Vanilla", "Chocholate", "Coffie", "Milk"])
  commonLayerDatabase.addItemsToLayer("Countor", ["Slim", "Slick", "Cutout"])
  commonLayerDatabase.addItemsToLayer("Acessories", ["Shaved", "Hairy", "Extra Hairy","Curly chest","None", "New Heart", "King boy tattoo", "69 tattoo",
      "Sailor boy tattoo", "Wanna know where theese scars from?", "Plastic surgery planner", "New arm", "Fatty checks", "Red stone amulet",
      "Blue stone amulet", "Unshaven", 'Stressed out',"Crybaby","Creep","Tatas"
  ])
  commonLayerDatabase.addItemsToLayer("Clothes", ["White t", "Black t", "W hoodie", "B hoodie", "White tank", "Black tank", "OBOY Hoodie black",
      "Boys branded green hoodie", "Boys branded white t", "Boys branded black t", "Hacked boi", "WestBoyz", "EastBois", "Cashemir Polo", "GM Polo Block",
      "GM Polo White", "Is it just me?", "Doctor", "Im tired boss", "Karate boi", "Clerk", "Office boi", "Gm special edition", "Snowboomba", "Gray Classic",
      "Chich", "Boiiie black shirt"
  ])
  commonLayerDatabase.addItemsToLayer("Eyes", ["Boi", "Glad boi", "Sleepy boi", "Snake boi", "Poker face", "Hypnotised",
      "Excited boi", "Serious boi", "Shocked" ,"Its just allergies", "Paralized", "Confused", "Jelly boi", "Hyped","Transpotter", "Feelgood", "Bashed",
      "Up only", "Wink wink", "Riddick", "Eye surgery", "Dazed"
  ])
  commonLayerDatabase.addItemsToLayer("Head", ["Bald", "Clean cut", "Boi pattern baldness", "Light Bobby", "Tight Bobby", "Dark Bobby",
      "Dark Bob", "Light Bob", "Surfer boi", 'Glam boi', "Afro boi", "Damaged", "Luxerious hair", "Purple punk", "Green punk", "Red punk", "Mission black",
      "Bubble bath time", "Saving private boi", "Fisher boi", "Gm mam", "Cilop", "Biker helmet", "Panama", "Custo", "Magician hat", "Comrad GM hat"
  ])
  commonLayerDatabase.addItemsToLayer("Mouth", ["Hapi boi", "Very hapi", "Confused", "Drool", "I dont know Rick", "Grrr", "Stalin stash", "Jazz boi",
      "Black beard", "Santa beard", "Red beard", "Shark", "Timid", "Yez", "Slowboi", "Shy boi", "Bunny boi", "Gusar", "Haha", "Spice must flow", "Judgment boi",
      "Zapped", "Muhahah", "Almost happy", "Shocked", "Just do it", "Glad"
  ])

  var backgroundDatabase = new LayerDatabase();
  backgroundDatabase.addNewLayers(["Background"])
  commonLayerDatabase.addItemsToLayer("Background", ["Spooky night", "Surfer beach", "Starry night", "Strawberry fields"])

  var rareLayerDatabase = new LayerDatabase();
  rareLayerDatabase.addNewLayers(["Skeleton", "Zombie", "Vampire", "Demon", "Ghost"])



  var generateRandomBoi = (database, destination) => {
      var newBoi = new Boi(naturalBois.length );
      var uniqnessCheck = [];
      for (var n = 0; n < database.traitLayers.length; n++) {
          var randTrait = Math.floor(Math.random() * database.traitLayers[n].items.length);
          newBoi.addTrait(database.traitLayers[n].name, database.traitLayers[n].items[randTrait])
          uniqnessCheck.push(randTrait)
      }
      for (var m = 0; m < destination.length; m++) {
          if (destination[m].uniqueProof.toString() == uniqnessCheck.toString()) {
              //console.log("The boi is not unique")
              m = destination.length;
              return false;
          }
      }
      newBoi.uniqueProof = uniqnessCheck;
      destination.push(newBoi)
      //grapx
      var canvaz = document.createElement("canvas")
      var canvazHead = document.createElement("canvas")
      canvaz.width = 1000;
      canvaz.height = 1000;
      canvazHead.width = 1000;
      canvazHead.height = 1000;
      var ctx = canvaz.getContext("2d")
      var ctxHead = canvazHead.getContext("2d")
      canvaz.id = newBoi.idname
      canvaz.addEventListener("click",(e)=>{
        console.log(
        naturalBois[e.path[0].id].traits)
      });
      //document.getElementById("screen").append(canvaz)
      //do bg
      var randXBg = Math.floor(Math.random() * 10)
      var tempXBg = randXBg * 1000;
    //  ctx.drawImage(tilesetBgImg, 0,0, 1000,1000, 0, 0, 1000,1000);
    //  screen.addPlane(canvaz.toDataURL(),1)
      let _size = 125
      ctx.clearRect(0, 0,1000,1000);
      //skin
      tempXBg = uniqnessCheck[0] * _size;
      ctx.drawImage(tileSetMain, tempXBg,0, _size,_size, 0, 0, 1000,1000);
      //countor
      tempXBg = uniqnessCheck[1] * _size;
    //  ctx.drawImage(tilesetImg, tempXBg,_size*1, _size,_size, 0, 0, 1000,1000);
      //Acessories
      tempXBg = uniqnessCheck[2] * _size;
      ctx.drawImage(tileSetMain, tempXBg,1750, _size,_size, 0, 0, 1000,1000);
      //clothes
      tempXBg = uniqnessCheck[3] * _size;
      ctxHead.drawImage(tileSetMain, tempXBg,1000, _size,_size, 0, 0, 1000,1000);
      //eyes
      tempXBg = uniqnessCheck[4] * _size;
      ctx.drawImage(tileSetMain, tempXBg,1250, _size,_size, 0, 0, 1000,1000);
      //head
      tempXBg = uniqnessCheck[5] * _size;
      ctxHead.drawImage(tileSetMain, tempXBg,1500, _size,_size, 0, 0, 1000,1000);
      //mouth
      tempXBg = uniqnessCheck[6] * _size;
      ctx.drawImage(tileSetMain, tempXBg,1375, _size,_size, 0, 0, 1000,1000);
      screen.addPlane(canvaz.toDataURL(),canvazHead.toDataURL(),50)
console.log("adding plane")
      //console.log(newBoi)
  }


var naturalBois = [];


var xSpeed = 0;
var ySpeed = 0;
var goingUp = true;

function animate() {
if(walking){
if(screen !== undefined){
if(screen.players[0] !== undefined){

  if(screen.players[0].position.y < 0){
    //hit floor
    ySpeed = ySpeed*-1
  }

  if(goingUp){
    ySpeed += 0.1
    if(screen.players[0].position.y > 10){
      //  xSpeed = xSpeed * 0.95
      goingUp = false;
    }
  }
  if(!goingUp){
    ySpeed -= 0.1
    if(screen.players[0].position.y < 0){
      goingUp = true;
    }
  }
  ySpeed = ySpeed * 0.91
    screen.players[0].position.y += ySpeed
    xSpeed = ySpeed *1.2
    screen.players[1].position.y +=   xSpeed
}
}
}

 if(walking){
 if( cylinder2 !== undefined) cylinder2.rotation.y -= 0.001
}
 if( cylinder !== undefined) cylinder.rotation.y -= 0.0005

  requestAnimationFrame( animate );
  screen.renderer.render( screen.scene, screen.camera );
}
