const BASE_URL = 'http://localhost:3000';

class RestAPI {

  static async fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  static async getAllUsers() {
    const url = `${BASE_URL}/api/users`;
    return await RestAPI.fetchData(url);
  }

  static async getUserByUsernameAndPassword(username, password) {
    const url = `${BASE_URL}/api/users/login`;
    const body = { username, password };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async createUser(name, username, email, phone) {
    const url = `${BASE_URL}/api/users`;
    const body = { name, username, email, phone };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEmailByUsername(username, email) {
    const url = `${BASE_URL}/api/users/${username}/email`;
    const body = { email };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePhoneByUsername(username, phone) {
    const url = `${BASE_URL}/api/users/${username}/phone`;
    const body = { phone };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateNameByUsername(username, name) {
    const url = `${BASE_URL}/api/users/${username}/name`;
    const body = { name };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePasswordByUsername(username, password) {
    const url = `${BASE_URL}/api/users/${username}/password`;
    const body = { password };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }
}

export default RestAPI;
