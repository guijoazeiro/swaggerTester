export const GlobalConfig = {
  _baseUrl: null,
  _authUrl: null,
  _authUsername: null,
  _authPassword: null,
  _maxDuration: null,

  init({ baseUrl, authUrl, authUsername, authPassword, maxDuration }) {
    this._baseUrl = baseUrl;
    this._authUrl = authUrl;
    this._authUsername = authUsername;
    this._authPassword = authPassword;
    this._maxDuration = maxDuration;
    Object.freeze(this);
  },

  get baseUrl() {
    if (!this._baseUrl) throw new Error("Config não inicializada!");
    return this._baseUrl;
  },

  get authUrl() {
    if (!this._authUrl) throw new Error("Config não inicializada!");
    return this._authUrl;
  },

  get authUsername() {
    if (!this._authUsername) throw new Error("Config não inicializada!");
    return this._authUsername;
  },

  get authPassword() {
    if (!this._authPassword) throw new Error("Config não inicializada!");
    return this._authPassword;
  },

  get maxDuration() {
    if (!this._maxDuration) throw new Error("Config não inicializada!");
    return this._maxDuration;
  },
};
