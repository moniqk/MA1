class house extends Phaser.Scene {
  constructor() {
    super({
      key: "house",
    });

    // Put global variable here
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
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
    this.load.image("floor", "assets/City-01.png");

    this.load.image("bag", "assets/cashbag.png");
    this.load.image("placeplant", "assets/placeplant.png");
    

    this.load.audio("placeSnd","assets/planting.wav")

  }

  create() {
    console.log("*** house scene");

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    
   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "house" });
    this.placeSnd = this.sound.add("placeSnd").setVolume(0.5);

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let livingroomTiles = map.addTilesetImage("2_LivingRoom_32x32", "livingroom");
    let bathroomTiles = map.addTilesetImage("3_Bathroom_32x32", "bathroom");
    let roomTiles = map.addTilesetImage("Room_Builder_32x32", "room");
    let kitchenTiles = map.addTilesetImage("12_Kitchen_32x32", "kitchen");
    let bedroomTiles = map.addTilesetImage("4_Bedroom_32x32", "bedroom");
    let floorTiles = map.addTilesetImage("City-01", "floor");



    // Step 5  create an array of tiles
    let tilesArray = [
      livingroomTiles,
      bathroomTiles,
      roomTiles,
      kitchenTiles,
      bedroomTiles,
      floorTiles,
  
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
    this.kitchenwalls = map.createLayer("kitchenwalls",tilesArray,0,0);
    this.decoLayer = map.createLayer("decoLayer",tilesArray,0,0);
    this.decoLayer2 = map.createLayer("decoLayer2",tilesArray,0,0);
    this.itemLayer = map.createLayer("itemLayer",tilesArray,0,0);


    
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");

    this.placeplant=this.physics.add.image(417, 1018, "placeplant") 
    this.placeplant2=this.physics.add.image(733, 164, "placeplant") 
    this.placeplant3=this.physics.add.image(1088, 436, "placeplant") 

    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down")



    this.player.setScale(0.8);
    window.player = this.player;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });

     this.scene.launch("showInventory")

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
        this.player.setCollideWorldBounds(true); // don't go out of the this.map 
    
        this.groundLayer.setCollisionByProperty({floor: true });
        this.wallLayer.setCollisionByProperty({houseWall: true });
        this.wallLayer2.setCollisionByProperty({toiletWall: true });
        this.decoLayer.setCollisionByProperty({table: true });
        this.decoLayer2.setCollisionByProperty({table: true });
        this.decoLayer.setCollisionByProperty({furniture: true });
        this.decoLayer2.setCollisionByProperty({furniture: true });
        this.kitchenwalls.setCollisionByProperty({kitchenwall: true });



        // this.playerwill collide with the level tiles
      // this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.groundLayer, this.player);
      this.physics.add.collider(this.wallLayer, this.player);
      this.physics.add.collider(this.wallLayer2, this.player);
      this.physics.add.collider(this.decoLayer, this.player);
      this.physics.add.collider(this.decoLayer2, this.player);
      this.physics.add.collider(this.kitchenwalls, this.player);


        this.physics.add.overlap(this.player, this.placeplant, this.plantBag, null, this);
        this.physics.add.overlap(this.player, this.placeplant2, this.plantBag, null, this);
        this.physics.add.overlap(this.player, this.placeplant3, this.plantBag, null, this);


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

  plantBag(player,placeplant){
    console.log("place plant overlap player")
    // lose a life
    //shake the camera
    this.placeSnd.play()
    window.bag--
    placeplant.disableBody(true,true);
    updateInventory.call(this)
    if (window.bag >= 1 ){
       
      this.scene.stop('house');
      this.scene.stop("showInventory")
      this.scene.start("youwin") 
    }   
  }

} //////////// end of class world ////////////////////////
