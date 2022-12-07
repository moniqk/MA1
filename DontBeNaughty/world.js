class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
}

  preload() {
    //Step 1, load JSON
    this.load.tilemapTiledJSON("world", "assets/1CityMap.tmj");
    this.load.spritesheet("thief", "assets/thief.png", {frameWidth: 32, frameHeight: 64});

    //Step 2 : Preload any images here
    this.load.image("building", "assets/Buildings32x32.png");
    this.load.image("street", "assets/Street32x32.png");
    this.load.image("item", "assets/City-01.png");
    this.load.image("cardown", 'assets/cardownwardsred.png');
    this.load.image("carright", 'assets/greengoright.png');
    this.load.image("carright", 'assets/bluegoright.png');
    this.load.image("carpolice", 'assets/policegoleft.png');

    
    //Preload any sound here
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    this.load.audio("hornSnd","assets/horn.mp3")
  }

  create() {
    console.log("*** world scene");

   // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world" });




    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    let streetTiles = map.addTilesetImage("Street32x32", "street");
    let cityTiles = map.addTilesetImage("City-01", "item");

    this.bgMusic = this.sound.add ("bgMusic", {loop: true}).setVolume(0.2)
    // this.bgMusic.play()
    this.bgMusic.stop()

    this.hornSnd = this.sound.add("hornSnd").setVolume(0.3);
    
    

    // Step 5  create an array of tiles
    let tilesArray = [
      buildingTiles,
      streetTiles,
      cityTiles,
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
    this.buildingsNDecoLayer = map.createLayer("buildingsNDecoLayer",tilesArray,0,0);

    
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
   
//car go down---------------------------------------
    this.time.addEvent({
      delay: 0,
      callback: this.moveDown1,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 0,
      callback: this.moveDown2,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 0,
      callback: this.moveDown3,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 0,
      callback: this.moveDown4,
      callbackScope: this,
      loop: false,
    });

//car go right---------------------------------------
    this.time.addEvent({
      delay: 0,
      callback: this.moveRight1,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRight2,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRight3,
      callbackScope: this,
      loop: false,
    });

//car go left--------------------------------------- 
    this.time.addEvent({
      delay: 0,
      callback: this.moveLeft1,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 0,
      callback: this.moveLeft2,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 0,
      callback: this.moveLeft3,
      callbackScope: this,
      loop: false,
    });




    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "thief").play("down")
  
//car go down---------------------------------------
    this.car1=this.physics.add.image(1795, 573, "cardown")
    this.car2=this.physics.add.image(291, 98, "cardown")
    this.car3=this.physics.add.image(1215, 481, "cardown")

//car go right---------------------------------------
    this.car5=this.physics.add.image(740, 1095, "carright")
    this.car6=this.physics.add.image(1358, 777, "carright")
    this.car7=this.physics.add.image(796, 93, "carright")
    this.car8=this.physics.add.image(1137, 578, "carright") //static

//car go left--------------------------------------- 
    this.car9=this.physics.add.image(791, 391, "carpolice") //static
    this.car10=this.physics.add.image(1725, 839, "carpolice")
    this.car11=this.physics.add.image(1713, 1157, "carpolice")
    this.car12=this.physics.add.image(1479, 167, "carpolice")

  
    this.player.setScale(0.6);
    window.player = this.player;


        this.cursors = this.input.keyboard.createCursorKeys();
        
      this.streetLayer.setCollisionByProperty({ grass: true });
      this.streetLayer.setCollisionByProperty({ checkeredTiles: true });
      this.buildingsNDecoLayer.setCollisionByProperty({ trafficCone: true });
    
        // this.playerwill collide with the level tiles
      // this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.streetLayer, this.player);
      this.physics.add.collider(this.buildingsNDecoLayer, this.player);


      this.physics.add.overlap(this.player, this.car1, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car2, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car3, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car4, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car5, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car6, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car7, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car8, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car9, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car10, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car11, this.hitCar, null, this);
      this.physics.add.overlap(this.player, this.car12, this.hitCar, null, this);

    
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor("#ccccff");

        this.timedEvent = this.time.addEvent({
          delay: 1000,
          callback: updateInventory,
          callbackScope: this,
          loop: false,
        });
  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 1989 &&
      this.player.x < 1995 &&
      this.player.y > 755 &&
      this.player.y < 900
    ) {
      this.levelThree();
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
  levelThree(player, tile) {
    console.log("lvl3 function");
    this.scene.start("levelThree");
  }

 
  hitCar(player,carright){
    console.log("carright overlap player")
    // lose a life
    //shake the camera
    this.cameras.main.shake(100);
    this.hornSnd.play()
    window.heart--
    carright.disableBody(true,true);
    updateInventory.call(this)
    if (window.heart == 0){
       
      this.scene.stop('world');
      this.scene.stop("showInventory")
      this.scene.start("gameover") 
    }   
  }

  hitCar(player,cardown){
    console.log("cardown overlap player")
    // lose a life
    //shake the camera
    this.cameras.main.shake(100);
    this.hornSnd.play()
    window.heart--
    cardown.disableBody(true,true);
    updateInventory.call(this)
    if (window.heart == 0){
       
      this.scene.stop('world');
      this.scene.stop("showInventory")
      this.scene.start("gameover") 
    }   
  }

  hitCar(player,carpolice){
    console.log("carpolice overlap player")
    // lose a life
    //shake the camera
    this.cameras.main.shake(100);
    this.hornSnd.play()
    window.heart--
    carpolice.disableBody(true,true);
    updateInventory.call(this)
    if (window.heart == 0){
       
      this.scene.stop('world');
      this.scene.stop("showInventory")
      this.scene.start("gameover") 
    }   
  }
 

  // Tween Movement ////////////
 //car go down---------------------------------------
 moveDown1() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 6000,
    tweens: [
      {
        y: 573,
      },
      {
        y: 1220,
      },
    ],
  });
}

moveDown2() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 7000,
    tweens: [
      {
        y: 98,
      },
      {
        y: 1098,
      },
    ],
  });
}

moveDown3() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 6000,
    tweens: [
      {
        y: 481,
      },
      {
        y: 1041,
      },
    ],
  });
}



    //car go right---------------------------------------
    moveRight1() {
      this.tweens.timeline({
        targets: this.car5, 
        loop: -1, // loop forever
        ease: "Linear",
        duration: 4000,
        tweens: [
          {
            x: 740,
          },
          {
            x: 1713,
          },
        ],
      });
    }
    moveRight2() {
      this.tweens.timeline({
        targets: this.car6, 
        loop: -1, // loop forever
        ease: "Linear",
        duration: 4000,
        tweens: [
          {
            x: 1358,
          },
          {
            x: 1960,
          },
        ],
      });
    }
    moveRight3() {
      this.tweens.timeline({
        targets: this.car7, 
        loop: -1, // loop forever
        ease: "Linear",
        duration: 3000,
        tweens: [
          {
            x: 796,
          },
          {
            x: 1584,
          },
        ],
      });
    }
    moveRight4() {
      this.tweens.timeline({
        targets: this.car8, 
        loop: -1, // loop forever
        ease: "Linear",
        duration: 5500,
        tweens: [
          {
            x: 1137,
          },
          {
            x: 1713,
          },
        ],
      });
    }

 //car go left---------------------------------------
 moveLeft1() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car10, 
    loop: -1, // loop forever
    ease: "Linear",
    duration: 5500,
    tweens: [
      {
        x: 1725,
      },
      {
        x: 1333,
      },
    ],
  });
}

moveLeft2() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car11, 
    loop: -1, // loop forever
    ease: "Linear",
    duration: 5500,
    tweens: [
      {
        x: 1713,
      },
      {
        x: 742,
      },
    ],
  });
}
moveLeft3() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.car12, 
    loop: -1, // loop forever
    ease: "Linear",
    duration: 5500,
    tweens: [
      {
        x: 1479,
      },
      {
        x: 412,
      },
    ],
  });
}


 
  
} //////////// end of class world ////////////////////////
