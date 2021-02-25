import OAuth2Strategy, {
  InternalOAuthError,
  VerifyFunction,
  StrategyOptions,
} from "passport-oauth2";
import uid from "uid2";

import { Profile } from "./types";
import parseProfile from "./profile";

const defaultAuthorizationURL = "https://daldal.so/oauth/authorize";
const defaultTokenURL = "https://daldal.so/oauth/token";
const defaultUserProfileURL = "https://daldal.so/oauth/api/me";

const setupOptions = (options: StrategyOptions) => {
  options.authorizationURL = defaultAuthorizationURL;
  options.tokenURL = defaultTokenURL;
  options.state = uid(24);

  return options;
};

export default class Strategy extends OAuth2Strategy {
  constructor(options: StrategyOptions, verify: VerifyFunction) {
    super(setupOptions(options), verify);

    this.name = "daldalso";
    this._oauth2.setAccessTokenName("access_token");
    this._oauth2.useAuthorizationHeaderforGET(true);
  }

  userProfile(
    accessToken: string,
    done: (error: Error | null, profile?: any) => void
  ) {
    this._oauth2.get(defaultUserProfileURL, accessToken, (err, body, res) => {
      if (err) {
        return done(
          new InternalOAuthError("Failed to fetch user profile", err)
        );
      }

      const _body = body ? body.toString() : "";

      try {
        body = JSON.parse(_body);
      } catch (err) {
        return done(
          new InternalOAuthError("Failed to parse API response", err)
        );
      }

      if (!body) {
        return done(new Error("Empty API Response"));
      }

      const profile: Profile = parseProfile(body);
      profile._raw = _body;
      profile._json = JSON.parse(_body);

      done(null, profile);
    });
  }
}

module.exports = Strategy;
