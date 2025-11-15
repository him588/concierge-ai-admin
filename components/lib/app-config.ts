import { DynamicConfig } from "@/components/types/types";

class AppConfig {
  private static config: DynamicConfig;

  static set(value: DynamicConfig) {
    console.log(value);
    this.config = { ...value };
  }

  static get env(): DynamicConfig {
    return this.config;
  }

  static setAppConfig(value: DynamicConfig) {
    if (value) {
      this.config = { ...value };
    }
  }
}

export default AppConfig;
