class gameover extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameover'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("gameover", 'assets/gameover.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    this.load.audio("loseSnd","assets/lose.mp3")
    }

    create() {

    console.log('*** gameover scene');
        
    let spaceDown = this.input.keyboard.addKey('ENTER')
    this.add.image(0, 0, "gameover").setOrigin(0, 0);
    console.log("this is gameover")
        
    this.loseSnd = this.sound.add ("loseSnd", {loop: true}).setVolume(0.2)
    this.loseSnd.play()
        
        spaceDown.on("down",function () {
              console.log("Jump to main scene");
              this.loseSnd.stop()
      
              this.scene.start(
                "bank"
              );
            },
            this
          );
 

    }


}