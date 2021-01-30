import React from "react";
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';
import translationJP from './locales/jp/translation.json';
import { moment } from 'moment'
import Backbone from 'backbone';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    pl: {
        translation: translationPL
    },
    jp: {
        translation: translationJP
    }
};

// var app = {};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
		lng: 'en',
		fallbackLng: ['en', 'pl', 'jp'],

        // have a common namespace used around the full app
        ns: ['translations'],
        detection: {
            order: ['querystring', 'navigator'],
        },
        // fallbackLng: 'en',
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
		react: {
            wait: true
        }
    })
	// .on('languageChanged', function(lng) {
    // // E.g. set the moment locale with the current language
    // moment.locale(lng);

    // then re-render your app
//     app.render();
// });

var LangView = Backbone.View.extend({
    events: {
        'change .language-selector': 'onLangChange',
    },

    onLangChange: function(e) {
        // only change the language
        i18n.changeLanguage(e.currentTarget.value);
    }
});

// app.view = new LangView();

// ('#app').html(app.view.render().el);
export default i18n