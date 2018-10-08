<template>
  <div id="app">
    <h2>Examples</h2>
    <hr>

    <div>
      <h4>bs3</h4>
      <tags-input 
       :bootstrap="3"
       placeholder="Bootstrap 3"
       :data-value="[1, 2, 3]"
       label-style="warning"></tags-input>
    </div>

    <div>
      <h4>bs4</h4>
      <tags-input 
       :bootstrap="4"
       placeholder="Bootstrap 4"
       :data-value="['A', 'B', 'C']"
       label-style="dark"
       :callback="bt4call"
       ref="bs4"></tags-input>

      <button type="button" class="btn btn-primary" @click="setTag">@setTag</button>
      <button type="button" class="btn btn-primary" @click="getTag">@getTag</button>
      <button type="button" class="btn btn-primary" @click="clearTag">@clearTag</button>
    </div>
  </div>
</template>

<script>
import TagsInput from "./TagsInput";

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    bt4call(tag, inx) {
      var _this = this;
      setTimeout(() => {
        if (tag == 1) {
          _this.$refs.bs4.removeTag(inx)
        }
      }, 1000);

      return true;
    },
    setTag() {
      var tags = ['D', 'E', 'F'];
      this.$refs.bs4.setTag(tags);
    },
    getTag() {
      console.log(this.$refs.bs4.getTag());
    },
    clearTag() {
      this.$refs.bs4.clearTag();
    }
  },
  components: {
    TagsInput
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  /* line-height: 1.5; */
  cursor: pointer;
  margin-top: 10px;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
