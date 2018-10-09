import tagsComponent from "./TagsInput.vue";

const TagsInput = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }

    Vue.component('TagsInput', tagsComponent)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TagsInput);
}

export default TagsInput
