import { Injectable } from '@angular/core';
import {
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  LumberjackLogDriverLog,
  LumberjackLogLevel,
} from '@ngworker/lumberjack';



/// Fatal is the critical, only shorter
type AppLogLevel = LumberjackLogLevel | 'fatal';

const LEVEL_COLORS: Record<string, string> = {
  fatal: 'color: #ef4444; font-weight: bold;',
  error: 'color: #f87171;',
  warn:  'color: #fbbf24;',
  info:  'color: #60a5fa;',
  debug: 'color: #9ca3af;',
  trace: 'color: #6b7280;',
};

const TIME_STYLE  = 'color: #6b7280;';
const SCOPE_STYLE = 'color: #c4b5fd;';
const MSG_STYLE   = 'color: inherit;';

@Injectable()
export class ColoredConsoleDriver implements LumberjackLogDriver {
  readonly config: LumberjackLogDriverConfig = {
    levels: ['critical', 'error', 'warn', 'info', 'debug', 'trace'],
    identifier: 'ColoredConsoleDriver',
  };

  logCritical(driverLog: LumberjackLogDriverLog): void {
    // critical → fatal
    this.write('fatal', driverLog);
  }

  logError(driverLog: LumberjackLogDriverLog): void {
    this.write('error', driverLog);
  }

  logWarning(driverLog: LumberjackLogDriverLog): void {
    this.write('warn', driverLog);
  }

  logInfo(driverLog: LumberjackLogDriverLog): void {
    this.write('info', driverLog);
  }

  logDebug(driverLog: LumberjackLogDriverLog): void {
    this.write('debug', driverLog);
  }

  logTrace(driverLog: LumberjackLogDriverLog): void {
    this.write('trace', driverLog);
  }

  private write(level: AppLogLevel, { log }: LumberjackLogDriverLog): void {
    const time = new Date(log.createdAt)
      .toISOString()
      .slice(11, 23);

    const levelLabel = level.toUpperCase().padEnd(5).slice(0, 5); /// always 5
    const scope = (log.scope ?? '').padEnd(30).slice(0, 30);      /// always 30

    /// 12 + 2 + 5 + 2 + 30 + 2 = 53
    const format =
      `%c${time}  %c${levelLabel}  %c${scope}  %c${log.message}`;

    console.log(
      format,
      TIME_STYLE,
      LEVEL_COLORS[level] ?? MSG_STYLE,
      SCOPE_STYLE,
      MSG_STYLE
    );

    /// Payload should always be a separate line in order to keep adjustments
    if (log.payload !== undefined) {
      console.log(log.payload);
    }
  }
}