<template>
  <v-app>
    <ToolBar />
    <v-main class="mt-5">
      <v-container fluid>
        <v-alert
          v-if="alert.message"
          :type="alert.type"
          close-text="Close Alert"
          dismissible
        >{{ alert.message }}</v-alert>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  mounted() {
    setTimeout(() => this.clear(), 3000);
  },
  methods: {
    ...mapActions("alert", ["clear"]),
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.clear();
    },
  },
};
</script>

<style scoped>
.slide-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
  animation: slide-out 0.2s ease forwards;
}
.slide-leave {
  opacity: 1;
  transform: translate(0);
}
@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px);
  }
}
.alert-danger {
  color: red;
}
</style>
