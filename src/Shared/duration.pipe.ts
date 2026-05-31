import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'duration',
  standalone: true,
  pure: false,
})
export class DurationPipe implements PipeTransform {
  private _pluralizer = new Intl.PluralRules();

  public transform(duration: number, scale: string): string {
    const plural = this._pluralizer.select(duration);
    return `units.${scale}.${plural}`;
  }
}
