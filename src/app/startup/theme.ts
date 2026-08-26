import { ThemeService } from '@shared/theme.service';



export function appStartupSetupTheme(theme: ThemeService) {
  if (theme.canDetectTheme()) {
    theme.setTheme(theme.detectTheme());
  }
}