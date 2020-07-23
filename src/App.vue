<template>
  <v-app>
    <ToolBar />
    <v-main class="mt-5" >
      <transition name="slide">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
         <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>

import ToolBar from './components/ToolBar';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    ToolBar,
  },
  computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
          console.log(to, from);
            this.clearAlert();
        }
    } 
};
</script>

<style scoped>
.slide-leave-active{
  transition: opacity 0.2s ease;
  opacity: 0;
  animation: slide-out 0.2s ease forwards;

}
.slide-leave{
  opacity: 1;
  transform: translate(0);
}
@keyframes slide-out {
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(10px);
  }
}
</style>

