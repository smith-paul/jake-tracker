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
import {
  FormatStoreInstance,
  FormatStoreMultiple,
  FormattedInstance,
  FormattedMultiple,
  StoreInstance,
  StoreMultiple,
} from '@/App.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { DataInstance, DataMultiple } })
export default class Controller extends Vue {
  @Prop({ required: true }) private instances!: FormatStoreInstance;
  @Prop({ required: true }) private multiples!: FormatStoreMultiple;

  activities: Array<Activity> = activities;

  get store() {
    return this.$route.params.store;
  }
  get type() {
    return this.$route.params.type;
  }

  get instance(): Array<FormattedInstance> {
    if (this.type !== 'instance') return [];
    const instance = this.instances[this.store as StoreInstance];
    return instance || [];
  }
  get multiple(): Array<FormattedMultiple> {
    if (this.type !== 'multiple') return [];
    const multiple = this.multiples[this.store as StoreMultiple];
    return multiple || [];
  }
}
</script>

<style scoped></style>
