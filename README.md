# Passport-Daldalso
- Daldalso authentication strategy for Passport (OAuth 2.0)

## English

### Install

```bash
$ npm install passport-daldalso
```

### Usage

This module will provide the profile data you requested.
Refer to [this article](https://daldal.so/w/Daldalso/Document/seq/4) for profile data provided.

#### Create a Satellite (Daldalso OAuth Application)

First of all, you must create a satellite.
Visit [Daldalso OAuth Register Page](https://daldal.so/oauth/register) and register your satellite.

#### Configure Strategy

```javascript
var DaldalsoStrategy = require('passport-daldalso').Strategy;

passport.use(new DaldalsoStrategy({
	clientID: config.daldalso.clientID,
	clientSecret: config.daldalso.clientSecret,
	callbackURL: config.daldalso.callbackURL
}, function(accessToken, refreshToken, o, done) {
	User.findOne({
		'id': o.id
    }, function(err, user) {
            if (!user) {
                user = new User({
					key: o.key,
                    name: o.name,
                    provider: 'daldalso',
                    profile: o.profile
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `daldalso` strategy, to authenticate requests.

For example, as route middleware in an Express application:

```javascript
app.route('/login/daldalso')
    .get(passport.authenticate('daldalso', {
        failureRedirect: config.daldalso.loginFail
    }), users.signin);

app.route('/login/daldalso/callback')
    .get(passport.authenticate('daldalso', {
        failureRedirect: config.daldalso.loginFail
    }), users.createAccount, users.authCallback);
```

## 한국어

### 설치

```bash
$ npm install passport-daldalso
```

### 사용 안내

이 모듈은 요청된 프로필 정보를 달달소로부터 받아오고, 제공합니다.
[이 문서](https://daldal.so/w/Daldalso/Document/seq/4) 에서 제공되는 프로필 정보에 대해 더 자세히 알아볼 수 있습니다.

#### 송수신체 등록하기 (달달소 OAuth 애플리케이션)

'달달소 계정으로 로그인' 기능을 구현하기 위해서는, 가장 먼저 송수신체를 등록해야 합니다.
[달달소 송수신체 등록하기](https://daldal.so/oauth/register) 에 접속하고 송수신체를 등록 해주세요.
송수신체 등록 심사가 끝나면, 식별자와 고윳값을 받게 됩니다.
고윳값은 [내 송수신체 목록](https://daldal.so/oauth/me) 의 송수신체 클릭 후 상단 메뉴의 '고윳값 복사' 기능을 통해 복사할 수 있습니다.

#### Strategy 설정

```javascript
var DaldalsoStrategy = require('passport-daldalso').Strategy;

passport.use(new DaldalsoStrategy({
	clientID: config.daldalso.clientID,
	clientSecret: config.daldalso.clientSecret,
	callbackURL: config.daldalso.callbackURL
}, function(accessToken, refreshToken, o, done) {
	User.findOne({
		'id': o.id
    }, function(err, user) {
            if (!user) {
                user = new User({
					key: o.key,
                    name: o.name,
                    provider: 'daldalso',
                    profile: o.profile
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));
```

#### 인증 요청

Express 애플리케이션의 라우트 미들웨어 예제이다.

```javascript
app.route('/login/daldalso')
    .get(passport.authenticate('daldalso', {
        failureRedirect: config.daldalso.loginFail
    }), users.signin);

app.route('/login/daldalso/callback')
    .get(passport.authenticate('daldalso', {
        failureRedirect: config.daldalso.loginFail
    }), users.createAccount, users.authCallback);
```

## Special Thanks

- 쪼리핑

## License

[MIT](http://opensource.org/licenses/MIT)

ⓒ 2020-2021 이승훈