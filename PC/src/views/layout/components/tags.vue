<template>
    <div class="tags" v-if="showTags">
      <ul>
        <li
          class="tags-li"
          v-for="(item,index) in tagsList"
          :class="{'active': isActive(item.path)}"
          :key="index" 
        >
          <router-link :to="item.path" class="tags-li-title">{{item.text}}</router-link>
          <span class="tags-li-icon" @click="closeTags(index)" v-if="item.text != '首页'">
            <i class="iconmessage-close iconfont"></i>
          </span>
        </li>
      </ul>
      <!-- <div class="tags-close-box">
      <MenuButton text="标签选项" :plain="true">
        <Menu>
          <MenuItem text="关闭其他" @click="closeOther()"></MenuItem>
          <MenuItem text="关闭所有" @click="closeAll()"></MenuItem>
        </Menu>
      </MenuButton>
      </div>--> 
    </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 12) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          text: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        });
      }
      bus.$emit("tags", this.tagsList);
    },
    // 关闭单个标签
    closeTags(index) { 
      console.log(index,'index')

      if(index == 0 && this.tagsList[index].text == '首页'){
        return
      }

      const delItem = this.tagsList.splice(index, 1)[0];
      console.log(this.tagsList,'tagsList')

      const item = this.tagsList[index]? this.tagsList[index]: this.tagsList[index - 1];
      console.log(item,'item')

        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        } else {
          this.$router.push("/home");
        }

    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/home");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);

    // 监听关闭当前页面的标签页
    bus.$on("close_current_tags", () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push("/home");
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    });
  }
};
</script>
<style scoped>
.tags {
  position: relative;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  background: #F1F1F1;
  padding-right: 120px;
}
.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.tags-li {
  float: left;
  margin:0 5px 5px;
  border-radius:0;
  overflow: hidden;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}
/* .tags-li:not(.active):hover {
  background: #dfdfdf;
} */
.tags-li.active {
  color: #388dfe;
  background: #fff;
  height: 40px;
  line-height: 40px;
  border-top: 2px solid #18A7E1
}
.tags-li.active .iconfont{
  color: #333
}
.tags-li-title {
  float: left;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}
.tags-li.active .tags-li-title {
  color: #0579CB;
  font-weight: bold;
  font-style: 16px;
}
.tags-close-box {
  position: absolute;
  right: 20px;
  top: 5px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.tags .tags-li .iconfont{
  font-size: 12px;
}
</style>