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
    this.load.spritesheet('thief', 'assets/thief.png', {frameWidth: 32, frameHeight: 64});
}

create() {


}

} // end of class