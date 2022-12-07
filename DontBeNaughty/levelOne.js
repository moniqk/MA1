class levelOne extends Phaser.Scene {

    constructor() {
        super({
            key: 'levelOne'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("Level1", 'assets/Level1.png');
        this.load.image("bankss", 'assets/bankss.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    }

    create() {

        console.log('*** 1stLvl scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
 
        //window.music = this.music
    

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
        this.add.image(0, 0, "bankss").setOrigin(0, 0).setScale(0.36);
      

        this.add.image(0, 0, "Level1").setOrigin(0, 0)
        console.log("this is lvl1")
     

        // On spacebar event, call the world scene
        spaceDown.on(
          "down",
          function () {
            console.log("this is lvl1");
    
    
            this.scene.start(
              "bank"
            );
          },
          this
        );
        


        // Add any text in the main page
        // this.add.text(100, 300, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}