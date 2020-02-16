<template>
  <div class="chart">
    {{ icon }}
    <div class="items">
      <p v-for="(group, k) in groups" :key="k">
        <strong>{{ k }}</strong
        ><br />
        {{ group.week }} wk, {{ group.month }} mo, {{ group.year }} yr
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
    const groups: { [k: string]: Array<FormattedMultiple> } = {};
    const res: { [k: string]: {} } = {};
    this.sortedByTime.forEach(({ type, value, id, time }) => {
      if (!groups[id]) groups[id] = [];
      groups[id].push({ type, value, id, time });
    });
    for (const k in groups) {
      const stats = { week: 0, month: 0, year: 0 };
      const shallow = Array.from(groups[k]);
      stats.week = shallow
        .filter(v => v.time.ago.weeks === 0)
        .reduce((a, b) => a + (b.value as number), 0);
      stats.month = shallow
        .filter(v => v.time.ago.months === 0)
        .reduce((a, b) => a + (b.value as number), 0);
      stats.year = shallow
        .filter(v => v.time.ago.years === 0)
        .reduce((a, b) => a + (b.value as number), 0);
      res[k] = stats;
    }
    return res;
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
