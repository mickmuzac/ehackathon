# Running Server
Make sure you have mongo installed and started.

Install dependencies and create config file:
```sh
$ cd ehackathon-server
$ npm install
$ cp config/config.sample.json config/config.json
```
Update config.json with reddit key, reddit secret and session secret. Then start the server:

```sh
$ npm start
```