const refs = {
  dayInterface: document.querySelector('[data-value="days"]'),
  hourInterface: document.querySelector('[data-value="hours"]'),
  minInterface: document.querySelector('[data-value="mins"]'),
  secInterface: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }
  startTimer() {
    const timeBefore = this.targetDate;
    upgradeInterface(0);
  
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const leftTime = timeBefore - currentTime;
      upgradeInterface(leftTime);
    }, 1000);
  }
  stopTimer(){
    clearInterval(this.intervalId);
    this.intervalId = null;
    upgradeInterface(0);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Feb 11, 2021"),
});

timer.startTimer();
// timer.stopTimer();

function upgradeInterface(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.dayInterface.textContent = `${days}`;
  refs.hourInterface.textContent = `${hours}`;
  refs.minInterface.textContent = `${mins}`;
  refs.secInterface.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}
