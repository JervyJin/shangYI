<template>
<!-- 红包编辑 -->
  <div class="container">
    <h1>你领取了一个红包</h1>
    <p>XX月XX日</p>
    <p id="firstShow">你成功领取了【商户名称】发放的红包。<br>红包金额：【具体金额】</p>
    <p id="remarkShow">【祝福语】</p>
    <span class="tipsMore">详情</span>
  </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
        mounted() {
        }
    };
</script>
<style scoped>
  .tipsBox h1 {
    font-size: 18px;
    line-height: 28px;
    font-family: Microsoft YaHei;
  }
  .tipsMore {
    width: 100%;
    border-top: 1px solid #ddd;
    display: block;
    margin-top: 5px;
    padding-top: 5px;
  }
</style>
