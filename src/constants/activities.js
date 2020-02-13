const activities = [
  { label: "Poop", icon: "💩", type: "instance", store: "poops" },
  {
    label: "Workout",
    icon: "🏋️",
    type: "multiple",
    store: "workout",
    items: [
      { type: "qty", initial: 10, id: "pushup" },
      { type: "sec", initial: 60, id: "plank" },
      { type: "qty", initial: 100, id: "crunch" },
      { type: "qty", initial: 100, id: "cross_crunch" }
    ]
  }
];

export default activities;
