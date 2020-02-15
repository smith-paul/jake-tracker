<template>
  <section>
    <div v-for="activity in activities" :key="activity.label">
      <h3>
        {{ activity.icon }} {{ activity.label }}
        <router-link
          class="link"
          :to="`/data/${activity.type}/${activity.store}`"
          >Data</router-link
        >
      </h3>
      <button
        v-if="activity.type === 'instance'"
        @click="() => addInstance(activity)"
      >
        {{ activity.icon }}
      </button>
      <div v-else>
        <Item
          v-for="item in activity.items"
          :key="item.id"
          :type="item.type"
          :id="item.id"
          :initial="item.initial"
          :handler="value => addItem(activity, item, value)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Firebase, { FirebaseValue } from '@/classes/Firebase';
import Item from '@/components/Item.vue';
import Time from '@/classes/Time';
import activities, { Activity, ActivityItem } from '@/constants/activities';
import { FormatStoreInstance, FormatStoreMultiple } from '@/App.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { Item } })
export default class Controller extends Vue {
  @Prop({ required: true }) private instances!: FormatStoreInstance;
  @Prop({ required: true }) private multiples!: FormatStoreMultiple;

  activities: Array<Activity> = activities;
  firebase: Firebase = new Firebase();

  addInstance({ label, store }: Activity): void {
    if (window.confirm(`Please confirm the ${label}`))
      this.firebase.push(store, Time.now());
  }

  addItem(
    { label: mainLabel, store }: Activity,
    { type, id }: ActivityItem,
    value: FirebaseValue
  ): void {
    const v = [Time.now(), value, type, id];
    if (window.confirm(`Please confirm ${value} ${type} ${mainLabel} ${id}`))
      this.firebase.push(store, v);
  }
}
</script>

<style scoped>
button {
  font-size: 5rem;
  appearance: none;
  display: block;
  width: 100%;
  border-radius: 9px;
  background: #222;
  border: 4px solid #202020;
}
span {
  font-style: italic;
  margin: 0.5rem 0;
}
input {
  width: 400px;
  font-size: 2rem;
}
h3 {
  text-transform: uppercase;
}
.link {
  font-size: 0.8em;
}
</style>
