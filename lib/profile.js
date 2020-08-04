/**
 * Parse Profile of User
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */

module.exports.parse = (data) => {
	if(typeof data != "object") data = JSON.parse(data);
	
    var profile = { provider: "daldalso" };
	
	profile.id = data.key.replace(/[^0-9]/gi, "");
	profile.fullid = data.key;
	profile.name = data.name;
	profile.displayName = data.name;
	profile.email = data.account;
	profile.image = data.profile.image;
	profile.exordial = data.profile.text;

    return profile;
};