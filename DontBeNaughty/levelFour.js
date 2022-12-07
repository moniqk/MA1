class levelFour extends Phaser.Scene {

    constructor() {
        super({
            key: 'levelFour'
        });
    
        // Put global variable here
        
    }


    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("Level4", 'assets/Level4.png');
        this.load.image("housess", 'assets/housess.png');

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        
    this.load.audio("bgMusic","assets/evilgenius.mp3")
    }

    create() {

        console.log('*** 4thLvl scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //window.music = this.music


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        let spaceDown = this.input.keyboard.addKey('SPACE')
        this.add.image(0, 0, "housess").setOrigin(0, 0).setScale(0.36);
        this.add.image(0, 0, "Level4").setOrigin(0, 0)
        console.log("this is lvl4")

        spaceDown.on('down', function () {
            console.log('Jump to home scene');

            this.scene.start('house',
                // Optional parameters
                {

                }
            );
        }, this);



        // Add any text in the main page
        // this.add.text(100, 300, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}