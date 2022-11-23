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
    this.load.spritesheet("policeman", "assets/police.png", {frameWidth: 16,frameHeight: 16,
    });
}

create() {

    this.anims.create({
        key: "popo",
        frames: this.anims.generateFrameNumbers("policeman", { start: 0, end: 5 }),
        frameRate: 2,
        repeat: -1,
      });

}

} // end of class