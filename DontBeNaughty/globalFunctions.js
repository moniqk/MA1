function updateInventory() {
  console.log("*** updateInventory()")
  // Emit events showInventory
  this.inventory = {}
  this.inventory.heart = window.heart
  this.inventory.bag = window.bag

  console.log('*** updateInventory() Emit event', this.inventory)
  this.invEvent = (event, data) =>  { this.scene.get('showInventory').events.emit(event, data); }
  this.invEvent("inventory", this.inventory);
}


  

  function hitCar(player,car) {
    this.hornSnd.play(); 
      window.heart--
      //this.updateInventory()
      updateInventory.call(this)
  
    if (window.heart == 0){
      this.scene.start("gameover");
      this.loseSnd.play();
    }
  }

  function hitPolice(player,police) {
    this.hornSnd.play(); 
      window.heart--
      //this.updateInventory()
      updateInventory.call(this)
  
    if (window.heart == 0){
      this.scene.start("gameover");
      this.loseSnd.play();
    }
  }