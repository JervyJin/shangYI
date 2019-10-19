<template>
  <div id="app">
    <!-- <router-view/> -->
     <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    .van-dropdown-menu__title::after{
      top: 0.18rem;
    }
</style>
