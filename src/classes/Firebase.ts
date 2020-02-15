import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

interface FirebaseConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

const CONFIG: FirebaseConfig = {
  apiKey: 'AIzaSyCtcIjp7kkoLd8oOopNGkQoeUSvh5wK5PA',
  appId: '1:1004034953781:web:3c70b9a0ac84fda906577c',
  authDomain: 'jake-tracker.firebaseapp.com',
  databaseURL: 'https://jake-tracker.firebaseio.com',
  messagingSenderId: '1004034953781',
  projectId: 'jake-tracker',
  storageBucket: 'jake-tracker.appspot.com',
};

export type FirebaseValue = string | object | boolean | number;
type SubscribeHandler = 'added' | 'changed' | 'removed';
type SubscribeHandlerSettings = { [K in SubscribeHandler]?: Function };

export default class Firebase {
  config: FirebaseConfig = CONFIG;
  email: string | null = null;

  constructor() {
    if (!firebase.apps.length) firebase.initializeApp(this.config);
  }

  authenticate(email: string, password: string) {
    this.email = email;
    return new Promise((_, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(reject);
    });
  }

  initialize(callback: Function) {
    if (!firebase.apps.length) firebase.initializeApp(this.config);
    firebase.auth().onAuthStateChanged(user => callback(user));
  }

  subscribe(namespace: string, handlers: SubscribeHandlerSettings = {}) {
    const ref = firebase.database().ref(namespace);
    const { added, changed, removed } = handlers;
    if (added) ref.on('child_added', data => added(data.key, data.val()));
    if (changed) ref.on('child_changed', data => changed(data.key, data.val()));
    if (removed) ref.on('child_removed', data => removed(data.key));
  }

  push(namespace: string, props: FirebaseValue) {
    const ref = firebase.database().ref(namespace);
    const newRef = ref.push();
    newRef.set(props);
  }

  update(namespace: string, id: string, props: FirebaseValue) {
    const ref = firebase.database().ref(namespace);
    const childRef = ref.child(id);
    childRef.update(props);
  }

  delete(namespace: string, id: string) {
    const ref = firebase.database().ref(namespace);
    ref.child(id).set(null);
  }

  set(namespace: string, id: string, key: string, value: FirebaseValue) {
    const ref = firebase.database().ref(namespace);
    const childRef = ref.child(`${id}/${key}`);
    childRef.set(value);
  }

  signOut() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(resolve)
        .catch(reject);
    });
  }
}
