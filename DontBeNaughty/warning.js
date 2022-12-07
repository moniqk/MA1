class warning extends Phaser.Scene {

    constructor() {
        super({
            key: 'warning'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("warning", 'assets/warning.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    }

    create() {

        console.log('*** warning scene');

        
        let spaceDown = this.input.keyboard.addKey('SPACE')
        this.add.image(0, 0, "warning").setOrigin(0, 0);
        console.log("this is warning")
        
        
        spaceDown.on("down",function () {
              console.log("Jump to lvl1 scene");
              this.bgMusic.play()
      
              this.scene.start(
                "bank"
              );
            },
            this
          );
        // Check for spacebar or any key here
        // var spaceDown = this.input.keyboard.addKey('SPACE');

        // // On spacebar event, call the world scene        
        // spaceDown.on('down', function () {
        //     console.log('Jump to home scene');

        //     this.scene.start('bank',
        //         // Optional parameters
        //         {

        //         }
        //     );
        // }, this);


        // Add any text in the main page
        // this.add.text(100, 300, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}