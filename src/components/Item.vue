<template>
  <div>
    <button class="main" @click="() => handler(value)">{{ id }}</button>
    <button class="inc" @click="value = Math.max(0, value - 5)">-</button>
    <span>
      {{ value }}
      <span>{{type}}</span>
    </span>
    <button class="inc" @click="value = value + 5">+</button>
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    type: String,
    initial: Number,
    id: String,
    handler: Function
  },
  data() {
    return {
      value: this.initial
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: center;
  + div {
    margin-top: 1rem;
  }
}
button,
div > span {
  font-size: 1rem;
  appearance: none;
  display: block;
  color: white;
  &:not(.main) {
    width: 50px;
  }
  &.main {
    flex: 1;
    margin-right: 1rem;
  }
}
div > span {
  line-height: 1;
  font-size: 0.9em;
}
span span {
  display: block;
}

button {
  border-radius: 9px;
  background: #222;
  padding: 0.5rem 0.5rem;
  border: 4px solid #202020;
}
</style>