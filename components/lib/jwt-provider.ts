import { decodeJwtToken } from "../helper/helper";
import { AuthToken, MetaData } from "../types/types";

export class JWTProvider {
  private static accessToken?: string;
  private static userDetails?: AuthToken;
  private static metaData: MetaData;

  private static updateMeta() {
    if (this.accessToken) {
      this.metaData = {
        Authorization: `Bearer ${this.accessToken}`,
      };
    }
  }

  static setAccessToken(token: string) {
    this.accessToken = token;
    this.userDetails = decodeJwtToken(token);
    this.updateMeta();
  }

  static get AccessToken(): string | undefined {
    return this.accessToken;
  }

  static get UserDetails(): AuthToken | undefined {
    return this.userDetails;
  }

  static get MetaData(): MetaData {
    return this.metaData;
  }

  static clear() {
    this.accessToken = undefined;
    this.userDetails = undefined;
  }
}
