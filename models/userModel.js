class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }
}

module.exports = User;
