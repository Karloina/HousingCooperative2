import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js';

var keycloak = new Keycloak({
    url: 'http://192.168.8.34:8080/auth',
    realm: 'springboot',
    clientId: 'ui-client'
  });


  keycloak.init({onLoad: 'login-required'}).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    window.keycloak = keycloak;

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();

    // console.log('TOKEN', keycloak.token);
    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);


    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});
