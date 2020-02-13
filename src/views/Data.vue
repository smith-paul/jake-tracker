<template>
  <section>
    <DataInstance
      v-if="$route.params.type === 'instance'"
      :icon="activities[0].icon"
      :items="instance"
    />
    <DataMultiple
      v-else-if="$route.params.type === 'multiple'"
      :icon="activities[1].icon"
      :items="multiple"
    />
    <router-link to="/">Controller</router-link>
  </section>
</template>

<script>
import DataInstance from "@/components/DataInstance";
import DataMultiple from "@/components/DataMultiple";
import activities from "@/constants/activities";

export default {
  props: {
    poops: { type: Array, required: true },
    workout: { type: Array, required: true }
  },
  data() {
    return {
      activities: activities
    };
  },
  computed: {
    instance() {
      if (this.$route.params.type !== "instance") return [];
      if (this.$route.params.store === "poops") return this.poops;
      return [];
    },
    multiple() {
      if (this.$route.params.type !== "multiple") return [];
      if (this.$route.params.store === "workout") return this.workout;
      return [];
    }
  },
  components: { DataInstance, DataMultiple }
};
</script>

<style lang="scss" scoped>
</style>