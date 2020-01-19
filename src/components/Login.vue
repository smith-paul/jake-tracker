<template>
  <div>
    <h1>💩</h1>
    <input type="email" placeholder="email" v-model="email" />
    <br />
    <input type="password" placeholder="password" v-model="password" />
    <br />
    <button type="button" @click="submit" :disabled="!valid">Submit</button>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {
    login: { type: Function, required: true }
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    submit() {
      this.login(this.email, this.password);
    }
  },
  computed: {
    valid() {
      return !!this.email && !!this.password;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 4rem;
}
input,
button {
  font-size: 1.5rem;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  margin: 0.125rem 0;
  border: none;
}
</style>