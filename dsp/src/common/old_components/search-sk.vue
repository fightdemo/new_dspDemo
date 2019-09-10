<template>
  <div>
    <div class="search">
      <input
        class="form-control search-input"
        type="text"
        v-model="searchValue"
        :placeholder="placeholder"
        @keyup="keyupFunc($event)"
      />
      <i class="search-icon" @click="clickFunc()"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        searchValue: ""
    };
  },
  props: {
    placeholder: {
        type: String,
        default: "请输入搜索内容"
    }
  },
  methods: {
    clickFunc(item) {
      this.$emit("search", this.searchValue);
    },
    keyupFunc(e) {
      if (e.keyCode == 13) {
        this.$emit("search", this.searchValue);
      }
    }
  }
};
</script>

<style lang="less">
</style>