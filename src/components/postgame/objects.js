export class Player {
  constructor(){
    this.items = {};
    this.itemStack = [{}];
    this.purchaseOrder = [];
    this.skillOrder = [];
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.totalGold = 0;
    this.currentGold = 0;
    this.effectiveGold = 0;
    this.cs = 0;
    this.level = 0;
    this.xp = 0;
    this.wardsKilled = 0;
    this.greenWards = 0;
    this.pinkWards = 0;
    this.blueWards = 0;
    this.totalWards = 0;
    this.x = 0;
    this.y = 0;
  }
};

export class Team {
  constructor(){
    this.towers = 0;
    this.gold = 0;
    this.effectiveGold = 0;
    this.kills = 0;
    this.dragons = 0;
    this.barons = 0;
    this.heralds = 0;
    this.inhibitors = 0;
    this.wards = 0;
    this.deaths = [];
  }
}