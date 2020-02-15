<template>
  <div id="app">
    <router-view
      v-if="authenticated"
      :poops="formattedPoops"
      :workout="formattedWorkout"
    />
    <Login :login="authenticate" v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Firebase, { FirebaseValue } from '@/classes/Firebase';
import Time from '@/classes/Time';
import Login from '@/components/Login.vue';
import { MultipleValue } from '@/components/DataMultiple.vue';
import { InstanceValue } from '@/components/DataInstance.vue';
import { ActivityItem } from '@/constants/activities';

type Store = 'workout' | 'poops';
interface FormattedMultiple {
  value: FirebaseValue;
  type: ActivityItem['type'];
  id: ActivityItem['id'];
  time: Time;
}
type FormattedInstance = Time;

@Component({ components: { Login } })
export default class App extends Vue {
  authenticated = false;
  email?: string;
  firebase: Firebase = new Firebase();
  id?: string;
  workout: Array<MultipleValue> = [];
  poops: Array<InstanceValue> = [];

  get formattedPoops(): Array<FormattedInstance> {
    return Array.from(this.poops)
      .sort()
      .reverse()
      .map(epoch => new Time(epoch) as FormattedInstance);
  }
  get formattedWorkout(): Array<FormattedMultiple> {
    return Array.from(this.workout)
      .sort()
      .reverse()
      .map(
        ([epoch, value, type, id]: MultipleValue) =>
          ({
            value,
            type,
            id,
            time: new Time(epoch as number),
          } as FormattedMultiple)
      );
  }

  authenticate(email: string, password: string) {
    this.firebase
      .authenticate(email, password)
      .catch(this.handleUnauthenticated);
  }
  handleUnauthenticated() {
    this.authenticated = false;
  }
  initialize() {
    this.firebase.initialize((data: { email: string; uid: string }) => {
      // We're waiting for signed in. This is called multiple times.
      if (data) {
        this.email = data.email;
        this.id = data.uid;
        this.authenticated = true;
        this.initializeData();
      } else this.authenticated = false;
    });
  }
  initializeData() {
    this.firebase.subscribe('poops', {
      added: (k: string, v: InstanceValue) => this.poops.push(v),
    });
    this.firebase.subscribe('workout', {
      added: (k: string, v: MultipleValue) => this.workout.push(v),
    });
  }

  mounted() {
    this.initialize();
  }
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  text-align: center;
  background: #111;
}
section {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background: #111;
  color: white;
}
a {
  text-decoration: none;
  color: #ffbb00;
}
*:focus {
  outline: 2px solid #ffbb00;
}
</style>
