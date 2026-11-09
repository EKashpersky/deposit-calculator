import { environment as commonEnv } from './common';



export const environment = {
  ...commonEnv,
  name: 'development',
  apiUrl: 'http://localhost:3000/api'
};