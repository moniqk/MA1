class levelTwo extends Phaser.Scene {

    constructor() {
        super({
            key: 'levelTwo'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("Level2", 'assets/Level2.png');
        this.load.image("cityss", 'assets/cityss.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    }

    create() {

        console.log('*** 2ndLvl scene');


        let spaceDown = this.input.keyboard.addKey('SPACE')

        this.add.image(0, 0, "cityss").setOrigin(0, 0).setScale(0.36);
        this.add.image(0, 0, "Level2").setOrigin(0, 0)
        console.log("this is lvl2")

        // Check for spacebar or any key here
  

        // On spacebar event, call the world scene        
        spaceDown.on(
            "down",
            function () {
              console.log("this is lvl2");
      
      
              this.scene.start(
                "world"
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