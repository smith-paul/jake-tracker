<template>
  <section>
    <DataInstance
      v-if="type === 'instance'"
      :icon="activities[0].icon"
      :items="instance"
    />
    <DataMultiple
      v-else-if="type === 'multiple'"
      :icon="activities[1].icon"
      :items="multiple"
    />
    <router-link to="/">Controller</router-link>
  </section>
</template>

<script lang="ts">
import DataInstance from '@/components/DataInstance.vue';
import DataMultiple from '@/components/DataMultiple.vue';
import activities, { Activity } from '@/constants/activities';
import { MultipleValue } from '@/components/DataMultiple.vue';
import { InstanceValue } from '@/components/DataInstance.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { DataInstance, DataMultiple } })
export default class Controller extends Vue {
  @Prop({ required: true }) private workout!: Array<MultipleValue>;
  @Prop({ required: true }) private poops!: Array<InstanceValue>;

  activities: Array<Activity> = activities;

  get store() {
    return this.$route.params.store;
  }
  get type() {
    return this.$route.params.type;
  }

  get instance() {
    if (this.type !== 'instance') return [];
    if (this.store === 'poops') return this.poops;
    return [];
  }
  get multiple() {
    if (this.type !== 'multiple') return [];
    if (this.store === 'workout') return this.workout;
    return [];
  }
}
</script>

<style scoped></style>
