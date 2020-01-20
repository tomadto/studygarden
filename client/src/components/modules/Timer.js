// taken and modified from https://stackoverflow.com/a/52685672 and other answers in the question

export default class Timer {
  constructor(funcToRun, delayInterval, repeat, runAtStart){
    this.funcToRun = funcToRun;
    this.delayInterval = delayInterval;
    this.repeat = repeat;
    this.count = 0;
    this.startTime = performance.now();
    this.isRunning = runAtStart;
    const _this = this;
    console.log("DDD")
    this.timeout = window.setTimeout(
      () => {
        _this.tick();
      }, this.delay
    )
  };
  tick() {
    if(this.isRunning)  {
      this.funcToRun();
      this.count++;
    };
    //adjusts delay if previous tick was lagging
    if (this.repeat === -1 || (this.repeat >0 && this.count < this.repeat)){
      let adjustedDelay = Math.max(1,
        this.startTime + ((this.count+1)*this.delayInterval)-performance.now());
      const _this = this;
      this.timeout = window.setTimeout( () => {_this.tick();}, adjustedDelay)
    };
    //for testing
    //console.log(this.count);
  };
  stop() {
    window.clearTimeout(this.timeout);
  };

  pause() {
    this.isRunning = false;
  };

  resume() {
    this.isRunning = true;
  }
  getCount(){
    return this.count();
  }

  addTime(time){
    //probably wont need but
    if (time >= 0){
      this.repeat = this.repeat + time;
    } else {
      throw new error("currently cannot add a negative amount of time")
    }
  }
}
