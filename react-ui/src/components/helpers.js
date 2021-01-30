import { notify } from 'react-notify-toast';

const url = 'http://192.168.8.34:8081'

const _fetchData = ({ route, success_callback, error_callback }) => {
  // console.log('TOKEN: ',localStorage.getItem("react-token"));
  fetch(`${url}/${route}`, {redirect: 'follow', credentials: 'include', headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("react-token")
  }})
    .then(data => data.json())
    // .then(function(data) {return data.json()})
    .then(response => success_callback(response))
    .catch(error => error_callback ? error_callback(error.toString()) : console.log(error));
};

/**
 * _postData()
 * An helper function that posts data to the database
 * @params route (string) => the api route to submit on
 * @params data (object) => item to be submitted
 * @params callback => optional callback function
 */
const _postData = ({ route, data, callback, error_cb=f=>f }) => {
  fetch(`${url}/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("react-token")
  },
    body: JSON.stringify(data),
  })
    .then(function(response) {
      if (response.status >= 400) {
        // throw new Error('Bad response from server');
        error_cb()
      }
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      if (data === 'success') {
        if (callback) callback();
      }
    })
    .catch(function(err) {
      return err;
    });
};

/**
 * _deleteData()
 * An helper function that deletes data from the database
 * @params route (String) => the api route
 * @params data (object) => object containing the details of
 * the item to be deleted
 * @params callback (func) => optional callback
 */
const _deleteData = ({ route, data, callback }) => {
  fetch(`${url}/${route}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("react-token")
  },
    body: JSON.stringify(data),
  })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      if (data === 'success') {
        if (callback) callback();
      }
    })
    .catch(function(err) {
      return err;
    });
};

const _updateData = ({ route, data, callback }) => {
  fetch(`${url}/${route}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("react-token")
    },
    body: JSON.stringify(data),
  })
    .then(function(response) {
      // if the status of the response is greater than 400, then error is returned
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      if (data === 'success') {
        if (callback) callback();
      }
    })
    .catch(function(err) {
      return err;
    });
};

const toCamelCase = str => {
  return str[0].toUpperCase() + str.substr(1);
};

const _customNotify = msg => {
  let myColor = { background: '#239', text: '#FFFFFF' };
  notify.show(msg, 'custom', 3000, myColor);
};

const _warningNotify = msg => {
  let myColor = { background: '#f11', text: '#FFFFFF' };
  notify.show(msg, 'custom', 3000, myColor);
};

const _convertArrOfObjToArr = arr => {
  let result = [];
  for (let o of arr) {
    result.push(Object.values(o));
  }
  return result;
};

// const _checkPresence = (arr, testId) => {
//   let errArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].id === testId ? errArr.push(true) : errArr.push(false);
//   }
//   return errArr.includes(true) ? true : false;
// };

export {
  _fetchData,
  _postData,
  _deleteData,
  _updateData,
  toCamelCase,
  _customNotify,
  _warningNotify,
  _convertArrOfObjToArr,
};
