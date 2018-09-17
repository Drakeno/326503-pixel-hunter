class Timer {
  constructor() {
    this.currentTime = null;
    this.callback = null;
    this.timeoutId = null;
    this.container = null;
  }

  configure(startTime, container, timeWarningCallback, timeOverCallback) {
    this.currentTime = startTime;
    this.container = container;
    this.callback = timeOverCallback;
    this.timeWarningCallback = timeWarningCallback;
    return this;
  }

  getTime() {
    return this.currentTime;
  }

  start() {
    const tick = () => {
      this.container.innerHTML = this.currentTime;
      this.currentTime--;

      if (this.currentTime < 0) {
        this.callback();
      } else if (this.currentTime < 5) {
        this.timeWarningCallback();
        this.timeoutId = setTimeout(tick, 1000);
      } else {
        this.timeoutId = setTimeout(tick, 1000);
      }
    };

    tick();
  }
  stop() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
    this.callback = null;
  }
}

const timer = new Timer();
export default timer;
