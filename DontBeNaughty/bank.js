class bank extends Phaser.Scene {
  constructor() {
    super({
      key: "bank",
    });

    // Put global variable here
  }

  
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
}

  preload() {
    //Step 1, load JSON
    this.load.tilemapTiledJSON("bank", "assets/bankMap.tmj");
    this.load.spritesheet("thief", "assets/thief.png", {frameWidth: 32, frameHeight: 64});
    this.load.spritesheet("policeman", "assets/police.png", {frameWidth: 33, frameHeight: 64});

    //Step 2 : Preload any images here
    
    this.load.image("jail", "assets/18_Jail_32x32.png");
    this.load.image("interior", "assets/Room_Builder_32x32.png");
    this.load.image("city", "assets/City-01.png");

    this.load.image("bag", 'assets/cashbag.png');
    this.load.image("heart", 'assets/heart.png');
    this.load.image("Level1img", 'assets/Level1.png');


    //Preload any sound here
    this.load.audio("collectingSnd","assets/collect.wav")
    this.load.audio("hornSnd","assets/horn.mp3")
    this.load.audio("mumblingSnd","assets/mumbling.mp3")
    this.load.audio("winSnd","assets/win.wav")
    this.load.audio("loseSnd","assets/lose.mp3")
    this.load.audio("heySnd","assets/hey.mp3")
    this.load.audio("placeSnd","assets/planting.wav")
    
    
  
  }

  create() {
    console.log("*** bank scene");


   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "bank" });
    
    this.collectingSnd = this.sound.add("collectingSnd").setVolume(0.3);
    this.heySnd = this.sound.add("heySnd").setVolume(0.3);
    


    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let jailTiles = map.addTilesetImage("18_Jail_32x32", "jail");
    let cityTiles = map.addTilesetImage("City-01", "city");
    let interiorTiles = map.addTilesetImage("Room_Builder_32x32", "interior");
    

    // Step 5  create an array of tiles
    let tilesArray = [
      jailTiles,
      cityTiles,
      interiorTiles,
    ];

     // Add main player here with physics.add.sprite
     this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("thief", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
      });
  
      this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("thief", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
      });
  
      this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("thief", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("thief", { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1,
        });

        this.anims.create({
          key: "popo",
          frames: this.anims.generateFrameNumbers("policeman", { start: 0, end: 5 }),
          frameRate: 2,
          repeat: -1,
        });
  
        
    // Step 6  Load in layers by layers
  
    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
    this.itemLayer = map.createLayer("itemLayer",tilesArray,0,0);
    
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
    var bag = map.findObject("objectLayer", obj => obj.name === "bag");
    var bag2 = map.findObject("objectLayer", obj => obj.name === "bag2");
    var bag3 = map.findObject("objectLayer", obj => obj.name === "bag3");
    var bag4 = map.findObject("objectLayer", obj => obj.name === "bag4");


    // this.time.addEvent({ delay: secs, callback: myfunction, callbackScope: this, loop: true });

    // this.time.addEvent({
    //   delay: 5000,
    //   callback: this.label,
    //   callbackScope: this,
    //   loop: false,
    // });

    

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 100,
      callback: this.moveRightLeft,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 100,
      callback: this.moveRightLeft2,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp2,
      callbackScope: this,
      loop: false,
    });

 

    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down");
    this.police = this.physics.add.sprite(135, 400, "policeman").play("popo").setScale(0.6);
    this.police2 = this.physics.add.sprite(500, 450, "policeman").play("popo").setScale(0.6);
    this.police3 = this.physics.add.sprite(80, 600, "policeman").play("popo").setScale(0.6);
    //2nd police u see
    this.police4 = this.physics.add.sprite(800, 600, "policeman").play("popo").setScale(0.6);

    this.bag=this.physics.add.image(bag.x, bag.y,"bag").setScale(0.7);
    this.bag2=this.physics.add.image(bag2.x, bag2.y,"bag").setScale(0.7);
    this.bag3=this.physics.add.image(bag3.x, bag3.y,"bag").setScale(0.7);
    this.bag4=this.physics.add.image(bag4.x, bag4.y,"bag").setScale(0.7);


    this.player.setScale(0.6);
    window.player = this.player;
    // 
    
    // this.level1img = this.add.image(this.camera.height, this.camera.width, "Level1img").setOrigin(0, 0);

   
  
        this.cursors = this.input.keyboard.createCursorKeys();
        
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool
    //this.physics.add.collider(mapLayer, this.player);

    this.groundLayer.setCollisionByProperty({ outdoor: true });
    this.itemLayer.setCollisionByProperty({ barricade: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.itemLayer, this.player);

  this.physics.add.overlap(this.player, this.bag, this.collectBag, null, this);
  this.physics.add.overlap(this.player, this.bag2, this.collectBag, null, this);
  this.physics.add.overlap(this.player, this.bag3, this.collectBag, null, this);
  this.physics.add.overlap(this.player, this.bag4, this.collectBag, null, this);

  this.physics.add.overlap(this.player, this.police, this.hitPolice, null, this);
  this.physics.add.overlap(this.player, this.police2, this.hitPolice, null, this);
  this.physics.add.overlap(this.player, this.police3, this.hitPolice, null, this);
  this.physics.add.overlap(this.player, this.police4, this.hitPolice, null, this);

  this.timedEvent = this.time.addEvent({
    delay: 1000,
    callback: updateInventory,
    callbackScope: this,
    loop: false,
  });


 


    // camera follow player
    //this.cameras.main.startFollow(this.player);
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
      
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor("#ccccff");
        
        this.scene.launch("showInventory")

  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 1131 &&
      this.player.x < 1161 &&
      this.player.y > 186 &&
      this.player.y < 300
    ) {
      this.levelTwo();
    }


    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
      this.player.flipX = false; // flip the sprite to the left
      //console.log('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("left", true);
      this.player.flipX = true; // use the original sprite looking to the right
      //console.log('right');
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }
    
  } /////////////////// end of update //////////////////////////////
  

  collectBag (player, bag)
  {
        console.log("collectBag")
    
        this.collectingSnd.play();
        window.bag++
        bag.disableBody(true, true);
        //this.updateInventory()
        updateInventory.call(this)
    }

   
    hitPolice(player,police){
      console.log("police overlap player")
      // lose a life
      //shake the camera
      this.cameras.main.shake(100);
      this.heySnd.play();
      window.heart--
      police.disableBody(true,true);
      updateInventory.call(this)
      if (window.heart == 0){
         
        this.scene.stop('world');
        this.scene.stop("showInventory")
        this.scene.start("gameover") 
      }   
    }
  
  

  // Function to jump to taman
  levelTwo(player, tile) {
    console.log("level2 function");
    this.scene.start("levelTwo");
  }
// Tween Movement //
  moveRightLeft() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.police, 
      loop: -1, // loop forever
      ease: "Linear",
      duration: 1500,
      tweens: [
        {
          x: 300,
        },
        {
          x: 135,
        },
      ],
    });
  }

  moveRightLeft2() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.police2, 
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2000,
      tweens: [
        {
          x: 800,
        },
        {
          x: 500,
        },
      ],
    });
  }

  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.police3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1600,
      tweens: [
        {
          y: 710,
        },
        {
          y: 600,
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.police4,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 740,
        },
        {
          y: 600,
        },
      ],
    });
  }

  // label(){
  //   console.log("labelGone");
  //   this.Level1img.setVisible(false);

  
  // }

  
} //////////// end of class world ////////////////////////
