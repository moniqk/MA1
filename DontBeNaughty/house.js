class house extends Phaser.Scene {
  constructor() {
    super({
      key: "house",
    });

    // Put global variable here
  }

  preload() {
    //Step 1, load JSON
    this.load.tilemapTiledJSON("house", "assets/houseMap.tmj");
    this.load.spritesheet("thief", "assets/thief.png", {frameWidth: 32, frameHeight: 64});

    //Step 2 : Preload any images here
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
    this.load.image("bathroom", "assets/3_Bathroom_32x32.png");
    this.load.image("room", "assets/Room_Builder_32x32.png");
    this.load.image("kitchen", "assets/12_Kitchen_32x32.png");
    this.load.image("bedroom", "assets/4_Bedroom_32x32.png");
  }

  create() {
    console.log("*** house scene");

   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "house" });


    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let livingroomTiles = map.addTilesetImage("2_LivingRoom_32x32", "livingroom");
    let bathroomTiles = map.addTilesetImage("3_Bathroom_32x32", "bathroom");
    let roomTiles = map.addTilesetImage("Room_Builder_32x32", "room");
    let kitchenTiles = map.addTilesetImage("12_Kitchen_32x32", "kitchen");
    let bedroomTiles = map.addTilesetImage("4_Bedroom_32x32", "bedroom");


    // Step 5  create an array of tiles
    let tilesArray = [
      livingroomTiles,
      bathroomTiles,
      roomTiles,
      kitchenTiles,
      bedroomTiles,
 
  
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

    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.wallLayer2 = map.createLayer("wallLayer2",tilesArray,0,0);
    this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
    this.decoLayer = map.createLayer("decoLayer",tilesArray,0,0);
    this.decoLayer2 = map.createLayer("decoLayer2",tilesArray,0,0);
    this.itemLayer = map.createLayer("itemLayer",tilesArray,0,0);


    
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down")

    this.player.setScale(0.8);
    window.player = this.player;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });

   

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
        this.player.setCollideWorldBounds(true); // don't go out of the this.map 
    
        this.groundLayer.setCollisionByProperty({outdoor: true });
        this.wallLayer.setCollisionByProperty({houseWall: true });
        this.wallLayer2.setCollisionByProperty({toiletWall: true });

        // this.playerwill collide with the level tiles
      // this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.groundLayer, this.player);
      this.physics.add.collider(this.wallLayer, this.player);
      this.physics.add.collider(this.wallLayer2, this.player);




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

} //////////// end of class world ////////////////////////
