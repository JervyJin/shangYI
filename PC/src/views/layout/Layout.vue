<template>
  <div class="wrapper" :class="{'content-collapsed':collapsed}">
    <v-head></v-head>
    <vSidebar />
    <div class="content-box">
      <v-tags></v-tags> 
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>

            <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
          </keep-alive>
          <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./components/Header";
import vSidebar from "./components/Sidebar.vue";
import vTags from "./components/tags.vue";
import bus from "./components/bus";
export default {
  data() {
    return {
      collapsed: false,
      tagsList:[],
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapsed", msg => {
      this.collapsed = msg;
    });
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name   && arr.push(msg[i].name );
      }
      this.tagsList = arr;
      console.log(this.tagsList);
    });
  }
};
</script>

<style>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>