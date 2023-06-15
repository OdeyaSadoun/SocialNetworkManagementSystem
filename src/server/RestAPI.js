class Server {
    static async getUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      return users;
    }
  
    static async getTodos() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();
      return todos;
    }
  
    static async getTodosByUserId(userId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      const todos = await response.json();
      return todos;
    }
  
    static async getAlbums() {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const albums = await response.json();
      return albums;
    }
  
    static async getAlbumsByUserId(userId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
      const albums = await response.json();
      return albums;
    }
  
    static async getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      return posts;
    }
  
    static async getPostsByUserId(userId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = await response.json();
      return posts;
    }
  
    static async getComments() {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const comments = await response.json();
      return comments;
    }
  
    static async getCommentsByPostId(postId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const comments = await response.json();
      return comments;
    }
  
    static async getPhotos() {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const photos = await response.json();
      return photos;
    }
  
    static async getPhotosByAlbumId(albumId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const photos = await response.json();
      return photos;
    }
  }
  
  export default Server;
  