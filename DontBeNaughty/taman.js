class taman extends Phaser.Scene {
  constructor() {
    super({
      key: "taman",
    });

    // Put global variable here
  }

  preload() {
    //Step 1, load JSON
    this.load.tilemapTiledJSON("taman", "assets/tamanMap.tmj");
    this.load.spritesheet("thief", "assets/thief.png", {frameWidth: 32, frameHeight: 64});

    //Step 2 : Preload any images here
    this.load.image("building", "assets/Buildings32x32.png");
    this.load.image("street", "assets/Street32x32.png");
    this.load.image("item", "assets/City-01.png");
    this.load.image("village", "assets/village32x32.png");
    this.load.image("insides", "assets/Interiors_32x32.png");
    this.load.image("forest", "assets/forest_tiles.png");
  }

  create() {
    console.log("*** taman scene");

   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "taman" });


    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    let streetTiles = map.addTilesetImage("Street32x32", "street");
    let cityTiles = map.addTilesetImage("City-01", "item");
    let villageTiles = map.addTilesetImage("village32x32", "village");
    let interiorTiles = map.addTilesetImage("Interiors_32x32", "insides");
    let forestTiles = map.addTilesetImage("forest_tiles", "forest");


    // Step 5  create an array of tiles
    let tilesArray = [
      buildingTiles,
      streetTiles,
      cityTiles,
      villageTiles,
      interiorTiles,
      forestTiles,
 
  
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
  
        
    // Step 6  Load in layers by layers

    this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);
    this.decoLayer = map.createLayer("decoLayer",tilesArray,0,0);
    this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);


    
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down")

    this.player.setScale(0.6);
    window.player = this.player;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });

   

        this.cursors = this.input.keyboard.createCursorKeys();
      

        this.streetLayer.setCollisionByProperty({ grass: true });
        this.decoLayer.setCollisionByProperty({ trafficCones: true });

        // this.playerwill collide with the level tiles
      // this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.streetLayer, this.player);
      this.physics.add.collider(this.decoLayer, this.player);



    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

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
      this.player.x > 1475 &&
      this.player.x < 1502 &&
      this.player.y > 403 &&
      this.player.y < 428
    ) {
      this.house();
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
 // Function to jump to house
 house(player, tile) {
  console.log("house function");
  this.scene.start("house");
}
} //////////// end of class world ////////////////////////
