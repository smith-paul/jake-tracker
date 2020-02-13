<template>
  <div class="chart">
    {{icon}}
    <div class="items">
      <span v-for="item in sortedByTime" :key="item.epoch">
        {{ item.time.date }} {{ item.time.time }}
        {{ item.id }} {{ item.value }} {{ item.type }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    items: { type: Array, required: true }
  },
  data() {
    return {};
  },
  computed: {
    sortedByTime() {
      return Array.from(this.items).sort((a, b) => {
        if (a.time.time > b.time.time) return 1;
        if (a.time.time < b.time.time) return -1;
        return 0;
      });
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>