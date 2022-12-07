class showInventory extends Phaser.Scene {

  constructor() {
      super({
          key: 'showInventory',
          active: false
      });
  }

  // incoming data from other scene
  init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }

  preload() {
    this.load.image("bag", 'assets/cashbag.png');
    this.load.image("heart", 'assets/heart.png');
  }

  create() {
    this.scene.bringToTop(showInventory)

    this.heartimg1 = this.add.image (480,50,'heart').setScrollFactor(0).setVisible(false).setScale(0.1);
    this.heartimg2 = this.add.image (530,50,'heart').setScrollFactor(0).setVisible(false).setScale(0.1);
    this.heartimg3 = this.add.image (580,50,'heart').setScrollFactor(0).setVisible(false).setScale(0.1);

    this.bag1 = this.add.image (50,50,'bag').setScrollFactor(0).setVisible(false).setScale(1.2);
    this.bag2 = this.add.image (100,50,'bag').setScrollFactor(0).setVisible(false).setScale(1.2);
    this.bag3 = this.add.image (150,50,'bag').setScrollFactor(0).setVisible(false).setScale(1.2);
    this.bag4 = this.add.image (200,50,'bag').setScrollFactor(0).setVisible(false).setScale(1.2);
   

      // Recv an event, call the method
      this.events.on('inventory', this.updateScreen, this)
  }

  update() {
  }

  updateScreen(data) {
       console.log('Received event inventory', data)
      
       switch ( data.heart ) {

        case 3: 
            this.heartimg1.setVisible(true)
            this.heartimg2.setVisible(true)
            this.heartimg3.setVisible(true)
            break;

        case 2:
            this.heartimg1.setVisible(true)
            this.heartimg2.setVisible(true)
            this.heartimg3.setVisible(false)
            break;

        case 1:
            this.heartimg1.setVisible(true)
            this.heartimg2.setVisible(false)
            this.heartimg3.setVisible(false)
            break;
         
        case 0:
            this.heartimg1.setVisible(false)
            this.heartimg2.setVisible(false)
            this.heartimg3.setVisible(false)
            break;    

        default:
        break;
    }
      
       switch ( data.bag ) {

          case 4:
            this.bag1.setVisible(true)
            this.bag2.setVisible(true)
            this.bag3.setVisible(true)
            this.bag4.setVisible(true)
              break;    

          case 3:
            this.bag1.setVisible(true)
            this.bag2.setVisible(true)
            this.bag3.setVisible(true)
            this.bag4.setVisible(false)
              break;    

          case 2:
            this.bag1.setVisible(true)
            this.bag2.setVisible(true)
            this.bag3.setVisible(false)
            this.bag4.setVisible(false)
              break;  
              
          case 1: 
          this.bag1.setVisible(true)
          this.bag2.setVisible(false)
          this.bag3.setVisible(false)
          this.bag4.setVisible(false)
              break; 

            case 0: 
            this.bag1.setVisible(false)
            this.bag2.setVisible(false)
            this.bag3.setVisible(false)
            this.bag4.setVisible(false)
                  break;     
          default: 
              break;
      }
      
  }
}
