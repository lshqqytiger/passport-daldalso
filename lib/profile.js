/**
 * Parse Profile of User
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */

module.exports.parse = (data) => {
	data = JSON.parse(data);
	
    var _profile = { provider: "daldalso" };
	
	_profile.id = data.key.replace(regex, "");
	_profile.fullid = data.key;
	_profile.name = data.name;
	_profile.displayName = data.name;
	_profile.email = data.account;
	_profile.image = data.profile.image;
	_profile.exordial = data.profile.text;

    return _profile;
};