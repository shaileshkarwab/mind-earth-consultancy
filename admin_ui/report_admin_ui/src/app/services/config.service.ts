import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Config {
  apiURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config | null = null;

  constructor(private httpClient: HttpClient) {}

  /**
   * Load configuration from config.json file
   */
  async loadConfig(): Promise<Config> {
    if (this.config) {
      return this.config;
    }

    try {
      this.config = await firstValueFrom(
        this.httpClient.get<Config>('/assets/config.json')
      );
      return this.config;
    } catch (error) {
      console.error('Failed to load config:', error);
      throw error;
    }
  }

  /**
   * Get configuration value
   */
  getConfig(): Config | null {
    return this.config;
  }

  /**
   * Get a specific config value
   */
  get<K extends keyof Config>(key: K): Config[K] | undefined {
    return this.config?.[key];
  }

  /**
   * Get API URL from config
   */
  getApiUrl(): string {
    return this.config?.apiURL || '';
  }
}
