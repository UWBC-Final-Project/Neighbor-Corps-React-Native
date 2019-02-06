import axios from "axios";

const heroku = 'https://young-sands-49140.herokuapp.com'

export default {

  // ======== USER AUTHENTICATION ======== 

  // Login
  // `data` is the data to be sent as the request body
  // this is different than axios.post( address, queryString), which the data is sent as the query parameters
  logIn: function(body) {
    return axios({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      url: heroku + '/api/auth/login',
      data: body
    });
  }, 

  // Signup
  signUp: function(body) {
    return axios({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      url: heroku + '/api/auth/signup',
      data: body
    });
  }, 

  //Logout
  logOut: function() {
    return axios.get(heroku + "/api/auth/logout");
  },

  //Update Profile
  update: function(body) {
    return axios({
      method: 'put',
      headers: { 'content-type': 'application/json' },
      url: heroku + '/api/users/find/currentUser',
      data: body
    });
  }, 

  // ======== USER'S TASKS ======== 
  // Current's user task
  getTasksByCurrentUser: function() {
    return axios.get(heroku + "/api/tasks/currentUser");
  },

  // Update Task
  updateTask: function(id, isComplete) {
    return axios({
      method: 'put',
      headers: { 'content-type': 'application/json' },
      url: heroku + '/api/tasks/' + id,
      // Data will display accordingly to whether isComplete is set to true or false
      // In this project, only UNCOMPLETED (isComplete: false) tasks will be displayed on task feed
      data: {
        taskCompletion: isComplete
      }
    });
  }, 

  // Gets all Users
  getUsers: function() {
    return axios.get(heroku + "/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get(heroku + "/api/users/" + id);
  },
  // Gets the current user info
  getCurrentUser: function() {
    return axios.get(heroku + "/api/users/find/currentUser");
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete(heroku + "/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post(heroku + "/api/users", userData);
  },
  // Gets all Tasks
  getTasks: function() {
    return axios.get(heroku + "/api/tasks", {
      params: {
        taskCompletion: false
      }
    });
  },
  // Gets the Task with the given id
  getTask: function(id) {
    return axios.get(heroku + "/api/tasks/" + id);
  },
  // Deletes the Task with the given id
  deleteTask: function(id) {
    return axios.delete(heroku + "/api/tasks/" + id);
  },
  // Saves a Task to the database
  saveTask: function(taskData) {
    return axios.post(heroku + "/api/tasks", taskData);
  },
  // Gets all Comments
  getComments: function() {
    return axios.get(heroku + "/api/comments");
  },
  // Gets all Comments
  getTasksComments: function(id) {
    return axios.get(heroku + "/api/comments/task/" + id);
  },
  // Gets the Comment with the given id
  getComment: function(id) {
    return axios.get(heroku + "/api/comments/" + id);
  },
  // Deletes the Comment with the given id
  deleteComment: function(id) {
    return axios.delete(heroku + "/api/comments/" + id);
  },
  // Saves a Comment to the database
  saveComment: function(commentData) {
    return axios.post(heroku + "/api/comments", commentData);
  }
  // <----  KPH Adding Boilerplate to get to the express API
  
};
