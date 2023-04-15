declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.json';

declare interface console {
  log: any;
  error: any;
  warn: any;
  info: any;
  debug: any;
  trace: any;
  time: any;
}
