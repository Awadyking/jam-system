import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const Options = {
  backend:{
  loadPath: '/lang/{{lng}}/translation.json',
  } ,
  fallbackLng: "en",
  detection:{
    order: ["localStorage" , "htmlTag"],
    caches: ["localStorage"]
  } , 
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init(Options);

export default i18n
