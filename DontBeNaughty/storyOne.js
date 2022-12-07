class storyOne extends Phaser.Scene {

    constructor() {
        super({
            key: 'storyOne'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("story1", 'assets/story1.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    this.load.audio("mumblingSnd","assets/mumbling.mp3")
    }

    create() {

        console.log('*** story1 scene');

        this.mumblingSnd = this.sound.add ("mumblingSnd", {loop: true}).setVolume(0.3)
        this.mumblingSnd.play()
            
        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        let spaceDown = this.input.keyboard.addKey('SPACE')
        this.add.image(0, 0, "story1").setOrigin(0, 0)
        console.log("this is story1")
        
        
        spaceDown.on("down",function () {
              console.log("Jump to story2 scene");
              this.mumblingSnd.stop()
      
              this.scene.start(
                "storyTwo"
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