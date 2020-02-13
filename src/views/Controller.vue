<template>
  <section>
    <div v-for="activity in activities" :key="activity.label">
      <h3>
        {{ activity.icon }} {{ activity.label }}
        <router-link class="link" :to="`/data/${activity.type}/${activity.store}`">Data</router-link>
      </h3>
      <button
        v-if="activity.type === 'instance'"
        @click="() => addInstance(activity)"
      >{{ activity.icon }}</button>
      <div v-else>
        <Item
          v-for="item in activity.items"
          :key="item.id"
          :type="item.type"
          :id="item.id"
          :initial="item.initial"
          :handler="(value) => addItem(activity, item, value)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Firebase from "@/classes/Firebase";
import Item from "@/components/Item";
import Time from "@/classes/Time";
import activities from "@/constants/activities";

export default {
  name: "controller",
  props: {
    workout: { type: Array, required: true },
    poops: { type: Array, required: true }
  },
  components: { Item },
  data() {
    return {
      activities,
      customPoop: new Date().toLocaleString(),
      firebase: new Firebase()
    };
  },
  computed: {},
  methods: {
    addInstance({ label, store }) {
      if (window.confirm(`Please confirm the ${label}`))
        this.firebase.push(store, Time.now());
    },
    addItem({ label: mainLabel, store }, { type, id }, value) {
      const v = [Time.now(), value, type, id];
      if (window.confirm(`Please confirm ${value} ${type} ${mainLabel} ${id}`))
        this.firebase.push(store, v);
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