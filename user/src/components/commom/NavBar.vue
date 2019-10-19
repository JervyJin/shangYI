<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow  @click-left="$router.go(-1)">
      <van-icon name="ellipsis" slot="right" class="f-20" />
    </van-nav-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  methods: {
    onClickLeft() {
        this.$router.go(-1)
    },
  }
};
</script>
<style>

</style>