<template>
  <div class="chart">
    {{ icon }}
    <div class="items">
      <span v-for="item in sortedByTime" :key="item.epoch">
        {{ item.time.date }} {{ item.time.time }} {{ item.id }}
        {{ item.value }} {{ item.type }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Time from '@/classes/Time';
import { FirebaseValue } from '../classes/Firebase';
import { ActivityItem } from '../constants/activities';

interface Item {
  time: Time;
}

export type MultipleValue = Array<
  number | FirebaseValue | ActivityItem['type'] | ActivityItem['id']
>;

@Component
export default class DataMultiple extends Vue {
  @Prop() private icon!: string;
  @Prop({ required: true }) private items!: Array<Item>;

  get sortedByTime() {
    return Array.from(this.items).sort((a: Item, b: Item) => {
      if (a.time.time > b.time.time) return 1;
      if (a.time.time < b.time.time) return -1;
      return 0;
    });
  }
}
</script>

<style scoped></style>
