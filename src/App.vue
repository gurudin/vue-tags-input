<template>
  <div id="app">
    <h2>Examples</h2>
    <hr>

    <div>
      <h4>bs3</h4>
      <tags-input 
       :bootstrap="3"
       placeholder="Bootstrap 3"
       :data-value="[1, 2, 3]"></tags-input>
    </div>

    <div>
      <h4>bs4</h4>
      <tags-input 
       :bootstrap="4"
       placeholder="Bootstrap 4"></tags-input>
    </div>
  </div>
</template>

<script>
import TagsInput from "./TagsInput";

export default {
  name: 'App',
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
</style>
