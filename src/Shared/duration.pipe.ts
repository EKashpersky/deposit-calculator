import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Pipe({
  name: 'duration',
  standalone: true,
  pure: false,
})
export class DurationPipe implements PipeTransform {
  private _pluralizer: Intl.PluralRules;

  public constructor() {
    this._pluralizer = new Intl.PluralRules(
      inject(TranslateService).getCurrentLang()!
    );
  }

  public transform(duration: number, scale: string): string {
    const plural = this._pluralizer.select(duration);
    return `units.${scale}.${plural}`;
  }
}
