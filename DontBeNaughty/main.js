class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("homepage", 'assets/homepage.jpg');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    }

    create() {

        console.log('*** main scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        this.bgMusic = this.sound.add ("bgMusic", {loop: true}).setVolume(0.2)
        this.bgMusic.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        let spaceDown = this.input.keyboard.addKey('SPACE')
        this.add.image(0, 0, "homepage").setOrigin(0, 0);
        console.log("this is homepage")
        
        
        spaceDown.on("down",function () {
              console.log("Jump to story1 scene");
              this.bgMusic.play()
      
              this.scene.start(
                "storyOne"
              );
            },
            this
          );
        

        // Create all the game animations here

    }


}