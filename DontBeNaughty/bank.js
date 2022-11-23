class bank extends Phaser.Scene {
  constructor() {
    super({
      key: "bank",
    });

    // Put global variable here
  }

  
  init(data) {
    this.player = data.player
   
}

  preload() {
    //Step 1, load JSON
    this.load.tilemapTiledJSON("bank", "assets/bankMap.tmj");
    this.load.spritesheet("thief", "assets/thief.png", {frameWidth: 32, frameHeight: 64});
    this.load.spritesheet("policeman", "assets/police.png", {frameWidth: 32, frameHeight: 64});

    //Step 2 : Preload any images here
    
    this.load.image("jail", "assets/18_Jail_32x32.png");
    this.load.image("interior", "assets/Room_Builder_32x32.png");
    this.load.image("city", "assets/City-01.png");

    this.load.image("bag", 'assets/cashbag.png');
     


    //Preload any sound here
    this.load.audio("bgMusic","assets/evilgenius.mp3")
  }

  create() {
    console.log("*** bank scene");

   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "bank" });


    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let jailTiles = map.addTilesetImage("18_Jail_32x32", "jail");
    let cityTiles = map.addTilesetImage("City-01", "city");
    let interiorTiles = map.addTilesetImage("Room_Builder_32x32", "interior");

    this.bgMusic = this.sound.add ("bgMusic", {loop: true}).setVolume(0.2)
    this.bgMusic.play()
    // this.bgMusic.stop() 
    

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




    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp,
      callbackScope: this,
      loop: false,
    });

    // this.timedEvent = this.time.addEvent({
    //   delay: 1000,
    //   callback: this.delayOneSec,
    //   callbackScope: this,
    //   loop: false,
    // });

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

    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down")
    this.police = this.physics.add.sprite(135, 400, "policeman").play("popo").setScale(0.6);
    this.police2 = this.physics.add.sprite(500, 450, "policeman").play("popo").setScale(0.6);
    this.bag=this.physics.add.image(bag.x,bag.y,"bag").setScale(0.7);
    this.bag2=this.physics.add.image(bag2.x,bag2.y,"bag").setScale(0.7);

    this.player.setScale(0.6);
    window.player = this.player;

    window.bag = this.bag
  
        this.cursors = this.input.keyboard.createCursorKeys();
        
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool
    //this.physics.add.collider(mapLayer, this.player);

    this.groundLayer.setCollisionByProperty({ outdoor: true });
    this.itemLayer.setCollisionByProperty({ barricade: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.itemLayer, this.player);


  this.physics.add.overlap(this.player, this.bag, collectBag, null, this);
  this.physics.add.overlap(this.player, this.bag2, collectBag, null, this);
  this.physics.add.overlap(this.player, this.police, hitPolice, null, this);
  this.physics.add.overlap(this.player, this.police2, hitPolice, null, this);

  function collectBag (player, bag)
  {
      bag.disableBody(true, true);
  }

  function collectBag (player, bag2)
  {
      bag2.disableBody(true, true);
  }

  function hitPolice (player, police)
  {
      police.disableBody(true, true);
      this.cameras.main.shake(300)
  }

  function hitPolice (player, police2)
  {
      police2.disableBody(true, true);
      this.cameras.main.shake(300)
  }


    // this.physics.add.overlap(this.player, this.bag, this.collectBag, null, this )

// this function will be called when the this.playertouches a coin



    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor("#ccccff");

  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 1131 &&
      this.player.x < 1161 &&
      this.player.y > 186 &&
      this.player.y < 262
    ) {
      this.world();
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
  
  
  // Function to jump to taman
  world(player, tile) {
    console.log("world function");
    this.scene.start("world");
  }

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

  
} //////////// end of class world ////////////////////////
