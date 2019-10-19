<template>
    <div id="pc_login">
        <van-button type="info" class="Submitbtn" @click="confirm">确认</van-button>
    </div>
</template>
<script>
    import {
        pcLogin
    } from "@/api/index";
export default {
  data() {
    return {
        code: this.$route.query.code || '',
        state: this.$route.query.state || ''
    };
  },
  mounted () {
      console.log(this.code, this.state);
  },
  methods: {
      confirm () {
          pcLogin(
              {
                  code: this.code,
                  state: this.state
              }
          ).then(res => {
              console.log(res);
              if (res.Code === 0) {
                  console.log(9999999);
                  Window.close();
              }
          })
      }
  },
};
</script>
<style scoped>
#pc_login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
#pc_login .Submitbtn{
    width: calc(100% - 60px) !important;
    margin: -40px auto 0;
}
</style>
