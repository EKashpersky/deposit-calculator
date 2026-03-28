export class Duration {
  private _scale: 'years' | 'months';
  private _duration: number;

  public constructor(scale: 'years' | 'months', duration: number) {
    this._scale = scale;
    this._duration = duration;
  }

  public withDurationScale(scale: 'years' | 'months') {
    if (this._scale === 'months' && scale === 'years') {
      this._duration = this._duration / 12;
    } else if (this._scale === 'years' && scale === 'months') {
      this._duration = this._duration * 12;
    }

    this._scale = scale;

    return this;
  }

  public withDuration(duration: number) {
    this._duration = duration;

    return this;
  }

  public duration() {
    return this._duration
  }

  public scale() {
    return this._scale;
  }

  public durationInMonths() {
    return this._scale === 'years' ? this._duration * 12 : this._duration;
  }
  
  public durationInYears() {
    return this._scale === 'years' ? this._duration : this._duration / 12;
  }
}