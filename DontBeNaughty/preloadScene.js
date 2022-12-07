class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/1CityMap.tmj');
    this.load.tilemapTiledJSON('map', 'assets/tamanMap.tmj');
    this.load.tilemapTiledJSON('map', 'assets/houseMap.tmj');
    this.load.tilemapTiledJSON('map', 'assets/bankMap.tmj');
    this.load.spritesheet('thief', 'assets/thief.png', {frameWidth: 32, frameHeight: 64});
    this.load.spritesheet("policeman", "assets/police.png", {frameWidth: 16,frameHeight: 16, });

    //Pages
    this.load.image("homepage", 'assets/homepage.jpg');

    //Images
    this.load.image("bag", 'assets/cashbag.png');
    this.load.image("heart", 'assets/heart.png');
    

    
    //Audio
    this.load.audio("collectSnd","assets/collect.wav")
    this.load.audio("hornSnd","assets/horn.mp3")
    this.load.audio("mumblingSnd","assets/mumbling.mp3")
    this.load.audio("winSnd","assets/win.wav")
    this.load.audio("loseSnd","assets/lose.mp3")
    this.load.audio("placeSnd","assets/planting.wav")
}

} // end of class

window.bag = 0
window.heart = 3
