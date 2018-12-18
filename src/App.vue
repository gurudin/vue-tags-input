<template>
  <div id="app">
    <h2>Examples</h2>
    <hr>
    <input type="text" class="form-control" placeholder="Username" ref="tagsinput">
    <br>

    <tagsInput
      v-model="options"
      labelStyle="primary"
      ref='tags'></tagsInput>
    
    <br>
    <button class="btn btn-info btn-sm" @click="setTags()">@setTags()</button>
    <button class="btn btn-info btn-sm" @click="getTags()">@getTags()</button>
    <button class="btn btn-info btn-sm" @click="clearTags()">@clearTags()</button>
  </div>
</template>

<script>
import TagsInput from "./TagsInput";

export default {
  name: 'App',
  data() {
    return {
      options: ['PHP', 'Javascript', 'Vue'],
      // options: 'PHP,JAVA,GO',
    };
  },
  methods: {
    setTags() {
      this.$refs.tags.setTags('a,b,,');
    },
    getTags() {
      console.log(this.$refs.tags.getTags());
      console.log(this.$refs.tags.getTags('string'));
    },
    clearTags() {
      this.$refs.tags.clearTags();
    }
  },
  components: {
    TagsInput
  }
}
</script>

<style>
@import "https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css";
/* @import "https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"; */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
