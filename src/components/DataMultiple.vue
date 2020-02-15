<template>
  <div class="chart">
    {{ icon }}
    <div class="items">
      <p v-for="(group, k) in groups" :key="k">
        {{ k }}: this week {{ group.week }} this month {{ group.month }} this
        year {{ group.year }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseValue } from '@/classes/Firebase';
import { ActivityItem } from '@/constants/activities';
import { FormattedMultiple } from '@/App.vue';

export type MultipleValue = Array<
  number | FirebaseValue | ActivityItem['type'] | ActivityItem['id']
>;

@Component
export default class DataMultiple extends Vue {
  @Prop() private icon!: string;
  @Prop({ required: true }) private items!: Array<FormattedMultiple>;

  get groups() {
    const groups: { [k: string]: [] } = {};
    this.sortedByTime.forEach(({ type, value, id, time }) => {
      if (!groups[id]) groups[id] = [];
      groups[id].push({ type, value, id, time });
    });
    for (const k in groups) {
      const stats = { week: 0, month: 0, year: 0 };
      stats.week = groups[k]
        .filter(v => v.time.ago.weeks === 0)
        .reduce((a, b) => a + b.value, 0);
      stats.month = groups[k]
        .filter(v => v.time.ago.months === 0)
        .reduce((a, b) => a + b.value, 0);
      stats.year = groups[k]
        .filter(v => v.time.ago.years === 0)
        .reduce((a, b) => a + b.value, 0);
      groups[k] = stats;
    }
    return groups;
  }

  get sortedByTime() {
    return Array.from(this.items).sort(
      (a: FormattedMultiple, b: FormattedMultiple) => {
        if (a.time.time > b.time.time) return 1;
        if (a.time.time < b.time.time) return -1;
        return 0;
      }
    );
  }
}
</script>

<style scoped></style>
