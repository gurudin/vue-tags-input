import tagsComponent from "./TagsInput.vue";

const TagsInput = {
  install: function (Vue) {
    Vue.component('TagsInput', tagsComponent)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TagsInput);
}

export default TagsInput
