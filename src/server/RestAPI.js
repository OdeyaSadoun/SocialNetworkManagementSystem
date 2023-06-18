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

  //*******************************************************/

  static async getTodosByUsername(username) {
    const url = `${BASE_URL}/api/users/${username}/todos`;
    return await RestAPI.fetchData(url);
  }

  static async getCompletedTodosByUsername(username) {
    const url = `${BASE_URL}/api/users/${username}/todos/completed`;
    return await RestAPI.fetchData(url);
  }

  static async getIncompleteTodosByUsername(username) {
    const url = `${BASE_URL}/api/users/${username}/todos/incomplete`;
    return await RestAPI.fetchData(url);
  }

  static async addTodoByUsername(username, userid, title, completed) {
    const url = `${BASE_URL}/api/users/${username}/todos`;
    const body = { userid, title, completed };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateTodoCompletionStatus(username, taskId, completed) {
    const url = `${BASE_URL}/api/users/${username}/todos/${taskId}/editcompleted`;
    const body = { completed };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateTodoTitle(username, taskId, title) {
    const url = `${BASE_URL}/api/users/${username}/todos/${taskId}/edittitle`;
    const body = { title };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteTodoByUsername(username, taskId) {
    const url = `${BASE_URL}/api/users/${username}/todos/${taskId}`;
    const options = {
      method: 'DELETE'
    };
    return await RestAPI.fetchData(url, options);
  }

  //*******************************************************/
  
  static async getPostsByUsername(username) {
    const url = `${BASE_URL}/api/users/${username}/posts`;
    return await RestAPI.fetchData(url);
  }

  static async getPostsInAlphabeticalOrder(username) {
    const url = `${BASE_URL}/api/users/${username}/posts/alphabeticalOrder`;
    return await RestAPI.fetchData(url);
  }

  static async addPostByUsername(username, userid, title, completed) {
    const url = `${BASE_URL}/api/users/${username}/posts`;
    const body = { userid, title, completed };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePostTitle(username, postId, title) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/edittitle`;
    const body = { title };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePostBody(username, postId, body) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/editbody`;
    body = { body };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deletePostByUsername(username, postId) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}`;
    const options = {
      method: 'DELETE'
    };
    return await RestAPI.fetchData(url, options);
  }

  //*******************************************************/

  static async getCommentsByPostId(username, postId) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/comments`;
    return await RestAPI.fetchData(url);
  }

  static async addCommentToPost(username, postId, content) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/comments`;
    const body = { postid: postId, content };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateCommentContent(username, postId, commentId, content) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/comments/${commentId}/edit`;
    const body = { content };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteComment(username, postId, commentId) {
    const url = `${BASE_URL}/api/users/${username}/posts/${postId}/comments/${commentId}`;
    const options = {
      method: 'DELETE'
    };
    return await RestAPI.fetchData(url, options);
  }
}

export default RestAPI;