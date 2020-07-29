var util = require('util'),
	_ = require('underscore'),
	Profile = require('./profile'),
	OAuth2Strategy = require('passport-oauth').OAuth2Strategy, 
	InternalOAuthError = require('passport-oauth').InternalOAuthError,
	uid = require('uid2');
	
function Strategy(options, verify) {
	options = options || {};

	options.authorizationURL = options.authorizationURL || 'https://daldal.so/oauth/authorize';
	options.tokenURL = options.tokenURL || 'https://daldal.so/oauth/token';
	options.state = uid(24);
	
	this.__options = options;
	OAuth2Strategy.call(this, options, verify);
	this.name = 'daldalso';
	this._profileURL = options.profileURL || "https://daldal.so/oauth/api/me";
	this._oauth2.setAccessTokenName('access_token');
};
util.inherits(Strategy, OAuth2Strategy);
Strategy.prototype.authorizationParams = function (options) {
	var params = _.extend({}, options);
	params['response_type'] = 'code';
	
	if (this.__options.svcType !== undefined) params['svctype'] = this.__options.svcType;
	if (this.__options.authType !== undefined) params['auth_type'] = this.__options.authType;
	
	return params;
};

Strategy.prototype.userProfile = function(accessToken, done) {
	this._oauth2.useAuthorizationHeaderforGET(true);
	this._oauth2.get(this._profileURL, accessToken, function (err, body, res) {
		if (err) { return done(new InternalOAuthError('Failed to fetch user profile', err)); }

		var parsed = null;
		var regex = /[^0-9]/gi;
		
		try{
			parsed = JSON.parse(body);
		} catch (err) {
			return done(new InternalOAuthError('Failed to parse API response', err));
		}
		
		var key = parsed.key.replace(regex, "");
		var name = parsed.name;
		var account = parsed.account;
		var _profile = parsed.profile;
		
		if(!(key && name)){
			return done(new InternalOAuthError('Empty API Response'));
		}
		var profile = { provider: 'daldalso' };
		profile.id = key;
		profile.name = name;
		profile.displayName = name;
		profile.email = account;
		profile.image = _profile.image;
		profile.exordial = _profile.text;
	
		done(null, profile);
	});
};

module.exports = Strategy;
