export interface FrameFn {
  (td: number, progress: number): any;
}

export enum FrameRunnerEnum {
  INVALID_FRAME = 1,
  INVALID_DURATION = 2,
  INVALID_TIMESCALE = 3,
}

export class FrameRunner {
  private _callable: FrameFn;
  private _running: boolean;

  private _duration: number; /// In ms or Infinity to be infinite
  private _timeScale: number; /// 0.1 <-> 1(0.1, 0.5, 1)

  private _lastFrameTimestamp: number;
  private _timePassed: number;



  private _runner() {
    if (this._running === false) {
      return;
    }

    const now = performance.now();
    const td  = (now - this._lastFrameTimestamp) * this._timeScale;

    this._timePassed += td;
    this._lastFrameTimestamp = now;

    const progress = Math.min(1, this._timePassed / this._duration);

    this._callable(td, progress);

    if (progress === 1) {
      this._running = false;
    } else {
      requestAnimationFrame(this._runner.bind(this));
    }
  }

  public constructor(callable: FrameFn, duration: number, timeScale: number) {
    if (typeof callable !== 'function') {
      throw new Error(`FrameRunner, error ${FrameRunnerEnum.INVALID_FRAME}`);
    }

    if (duration <= 0) {
      throw new Error(`FrameRunner, error ${FrameRunnerEnum.INVALID_DURATION}`);
    }

    if (timeScale <= 0 || timeScale > 1) {
      throw new Error(`FrameRunner, error ${FrameRunnerEnum.INVALID_TIMESCALE}`);
    }

    this._callable = callable;
    this._running  = false;

    this._duration  = duration;
    this._timeScale = timeScale;

    this._timePassed = 0;
    this._lastFrameTimestamp = 0;
  }

  public run() {
    if (this._running) {
      return;
    }

    this._running = true;
    this._lastFrameTimestamp = performance.now();
    requestAnimationFrame(this._runner.bind(this));
  }

  public reset() {
    this._lastFrameTimestamp = 0;
    this._running            = false;
    this._timePassed         = 0;
  }

  public stop() {
    this._running = false;
  }



  public updateTimeScale(timeScale: number) {
    if (timeScale > 0 && timeScale <= 1) {
      this._timeScale = timeScale;
    }
  }
}
