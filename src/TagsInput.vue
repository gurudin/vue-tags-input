<template>
  <div class="form-control" :style="boxStyle" @click="blur">

    <span :class="'bg-'+labelStyle+' label-'+labelStyle" :style="badgeStyle" v-for="opt in dataValue">{{opt}} 
      <button type="button" class="close" aria-label="Close" :style="removeStyle">
        <i aria-hidden="true">&times;</i>
      </button>
    </span>

    <input
      type="text"
      :style="inputStyle"
      :placeholder="placeholder"
      :size="inputSize"
      v-model="currentValue"
      @keyup="keyAction"
      ref="tagsinput">

    <input type="hidden" :value="value">

    {{dataValue}}
  </div>
</template>

<script>
export default {
  name: 'tagsInput',
  props: {
    /**
     * 绑定数据
     *
     * @type {String|Array}
     *
     * @required false
     */
    value: {
      type: null,
      required: false,
      default: ''
    },
    /**
     * 占位描述
     * 
     * @type {String}
     * 
     * @required false
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Enter tag'
    },
    /**
     * label 风格
     * 
     * @type {String}
     * 
     * @required false
     */
    labelStyle: {
      type: String,
      default: 'info',
      required: false
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  computed: {
    dataValue: {
      get() {
        return typeof this.value == 'string'
          ? this.value.split(",")
          : this.value;
      },
      set() {

      }
    },
    boxStyle() {
      return {
        'padding': '0 12px !important',
      };
    },
    inputStyle() {
      return {
        'outline': 'none',
        'border': '0!important',
        'color': '#495057',
        'height': '27px',
        'margin-top': '3px',
      };
    },
    badgeStyle() {
      return {
        'border-radius': '5px',
        'padding': '5px 9px',
        'margin': '-2px 3px 0 0',
        'display': 'inline-block',
        'font-size': '12px',
        'font-weight': '700',
        'line-height': '1',
        'color': '#fff',
        'vertical-align': 'middle',
      };
    },
    removeStyle() {
      return {
        'font-size': '12px',
        'margin-left': '10px',
        'color': 'white'
      };
    },
    inputSize() {
      if (this.currentValue != '') {
        var reg = /[\u4e00-\u9fa5\uF900-\uFA2D]/; 
        if (reg.test(this.currentValue)) {
          return this.currentValue.length * 2;
        } else {
          return this.currentValue.length;
        }
      }
      return typeof this.placeholder == 'undefined' ? 1 : this.placeholder.length;
    },
  },
  methods: {
    blur() {
      this.$refs.tagsinput.focus();
    },
    keyAction(event) {
      
    },
  }
}
</script>
