# Passport-Daldalso
- Daldalso authentication strategy for Passport

## Install

	$ npm install passport-daldalso
	
## Usage

This module will provide the profile data you requested.
Refer to [this article](https://daldal.so/w/Daldalso/Document/seq/4) for profile data provided.
	

| Name | Data Type | Description |
|:----:|--------|------|
| key | String | User Identifier |
| id | String | Simplified User Identifier |
| name＊ | String | Nickname |
| displayName＊ | String | Nickname |
| email＊ | String | Email Address |
| account＊ | String | Email Address |
| libra＊ | JSON | Libra Data |
| libra.level＊ | - | - |
| libra.prev＊ | - | - |
| libra.next＊ | - | - |
| profile＊ | JSON | Profile Data |
| profile.image＊ | String | Profile Image URL |
| profile.text＊ | String | Introduction |

＊: To get this data, you need to get permission about this from Daldalso.
