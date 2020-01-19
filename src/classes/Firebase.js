const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const config = require("@/secrets/config");

export default class Firebase {
  constructor() {
    this.email = null;
    if (!firebase.apps.length) firebase.initializeApp(this.config);
  }

  get config() {
    return config.default;
  }

  authenticate(email, password) {
    this.email = email;
    return new Promise((_, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(reject);
    });
  }

  initialize(callback) {
    if (!firebase.apps.length) firebase.initializeApp(Firebase.config);
    firebase.auth().onAuthStateChanged(callback);
  }

  subscribe(namespace, handlers = {}) {
    const ref = firebase.database().ref(namespace);
    const { added, changed, removed } = handlers;
    if (added) ref.on("child_added", data => added(data.key, data.val()));
    if (changed) ref.on("child_changed", data => changed(data.key, data.val()));
    if (removed) ref.on("child_removed", data => removed(data.key));
  }

  push(namespace, props) {
    const ref = firebase.database().ref(namespace);
    const newRef = ref.push();
    newRef.set(props);
  }

  update(namespace, id, props) {
    const ref = firebase.database().ref(namespace);
    const childRef = ref.child(id);
    childRef.update(props);
  }

  delete(namespace, id) {
    const ref = firebase.database().ref(namespace);
    ref.child(id).set(null);
  }

  set(namespace, id, key, value) {
    const ref = firebase.database().ref(namespace);
    const childRef = ref.child(`${id}/${key}`);
    childRef.set(value);
  }

  signOut() {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase.auth().signOut();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
