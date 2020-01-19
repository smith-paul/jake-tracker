<template>
  <section>
    <button @click="addPoop">💩</button>
    <span>{{ last }}</span>
    <!-- <br /> -->
    <!-- <input v-model="customPoop" type="text" />
    <br />
    <button @click="addCustomPoop">custom</button>-->
    <router-link to="/data">Data</router-link>
  </section>
</template>

<script>
import Firebase from "@/classes/Firebase";
import Time from "@/classes/Time";

export default {
  name: "controller",
  props: {
    poops: { type: Array, required: true }
  },
  data() {
    return {
      customPoop: new Date().toLocaleString(),
      firebase: new Firebase()
    };
  },
  computed: {
    last() {
      if (!this.poops.length) return "";
      const poop = this.poops[0];
      return `Last poop ${poop.agoInWords()}`;
    }
  },
  methods: {
    // addCustomPoop() {
    //   const d = new Date(this.customPoop);
    //   if (d) this.firebase.push("poops", d.getTime());
    // },
    addPoop() {
      if (window.confirm("Are you sure you're pooping?"))
        this.firebase.push("poops", Time.now());
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-size: 5rem;
  appearance: none;
  display: block;
  width: 100%;
  border-radius: 9px;
  background: #222;
  border: 4px solid #202020;
  flex: 1;
}
span {
  font-style: italic;
  margin: 0.5rem 0;
}
input {
  width: 400px;
  font-size: 2rem;
}
</style>