<template>
  <div id="app">
    <router-view v-if="authenticated" :poops="formattedPoops" :workout="formattedWorkout" />
    <Login :login="authenticate" v-else />
  </div>
</template>

<script>
import Firebase from "@/classes/Firebase";
import Time from "@/classes/Time";
import Login from "@/components/Login";

export default {
  data() {
    return {
      authenticated: false,
      firebase: new Firebase(),
      workout: [],
      poops: []
    };
  },
  computed: {
    formattedPoops() {
      return Array.from(this.poops)
        .sort()
        .reverse()
        .map(epoch => new Time(epoch));
    },
    formattedWorkout() {
      return Array.from(this.workout)
        .sort()
        .reverse()
        .map(([epoch, value, type, id]) => ({
          value,
          type,
          id,
          time: new Time(epoch)
        }));
    }
  },
  methods: {
    authenticate(email, password) {
      this.firebase
        .authenticate(email, password)
        .catch(this.handleUnauthenticated);
    },
    handleUnauthenticated() {
      this.authenticated = false;
    },
    initialize() {
      this.firebase.initialize(data => {
        // We're waiting for signed in. This is called multiple times.
        if (data) {
          this.email = data.email;
          this.id = data.uid;
          this.authenticated = true;
          this.initializeData();
        } else this.authenticated = false;
      });
    },
    initializeData() {
      this.firebase.subscribe("poops", {
        added: (k, v) => this.onAdd("poops", k, v)
      });
      this.firebase.subscribe("workout", {
        added: (k, v) => this.onAdd("workout", k, v)
      });
    },
    onAdd(type, key, value) {
      this[type].push(value);
    }
  },
  components: { Login },
  mounted() {
    this.initialize();
  }
};
</script>

<style lang="scss">
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
