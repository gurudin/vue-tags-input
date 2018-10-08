import tagsComponent from "./TagsInput.vue";

const TagsInput = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('TagsInput', tagsComponent)
  }
}

export default TagsInput
