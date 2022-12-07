var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32*20,
    height: 32*20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, storyOne, storyTwo, levelOne, bank, levelTwo, world, levelThree , taman, levelFour, house, showInventory, gameover, youwin]

 
};


window.bag = 0
window.heart = 3



var game = new Phaser.Game(config);


// }