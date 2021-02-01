import firebase from "firebase/app";
import config from "./config";

import "firebase/analytics";

export const builder = (): firebase.app.App => {
  return firebase.initializeApp(config);
};

export default builder;
