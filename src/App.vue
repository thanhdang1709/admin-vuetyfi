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
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
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
    this.$Progress.finish();
  },
  methods: {
    ...mapActions("alert", ["clear"]),
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.clear();
    },
    created() {
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          this.$Progress.parseMeta(meta);
        }
        this.$Progress.start();
        next();
      });
      this.$router.afterEach(() => {
        this.$Progress.finish();
      });
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
