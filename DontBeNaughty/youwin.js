class youwin extends Phaser.Scene {

    constructor() {
        super({
            key: 'youwin'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("winner", 'assets/winner.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    this.load.audio("winSnd","assets/win.wav")
    }

    create() {

        console.log('*** winner scene');

        this.winSnd = this.sound.add ("winSnd", {loop: true}).setVolume(0.2)
        this.winSnd.play()
        this.bgMusic = this.sound.add ("bgMusic", {loop: true}).setVolume(0.2)
        this.bgMusic.stop()
        
window.bag = 0
window.heart = 3
        
        let spaceDown = this.input.keyboard.addKey('ENTER')
        this.add.image(0, 0, "winner").setOrigin(0, 0);
        console.log("this is winning")
        
        
        spaceDown.on("down",function () {
              console.log("Jump to lvl1 scene");
              this.winSnd.stop()
      
              this.scene.start(
                "main"
              );
            },
            this
          );
  
    }


}