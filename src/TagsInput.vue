<template>
  <span class="tags-box">
    <div class="form-control" :style="boxStyle" @click="blur">

      <span :class="'bg-'+labelStyle+' label-'+labelStyle" :style="badgeStyle" v-for="(opt,inx) in dataValue">{{opt}} 
        <button type="button" class="close" aria-label="Close" :style="removeStyle" @click="remove(inx)">
          <i aria-hidden="true">&times;</i>
        </button>
      </span><input
        type="text"
        :style="inputStyle"
        :placeholder="placeholder"
        :size="inputSize"
        v-model.trim="currentValue"
        @keyup="keyAction"
        ref="tagsinput">

    </div>
    <input type="hidden" :value="value">
  </span>
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
    /**
     * 是否去重复
     *
     * @type {Boolean}
     *
     * @required false
     */
    unique: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      tags: [],
      currentValue: '',
      modelType: 'array',
    };
  },
  computed: {
    dataValue() {
      if (typeof this.value == 'undefined') {
        return this.tags;
      }
      
      if (typeof this.value == 'string') {
        return this.value == '' ? [] : this.value.split(",");
      } else {
        return this.value;
      }
    },
    boxStyle() {
      return {
        'padding': '4px 12px 0 12px',
        'height': 'auto !important',
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
        'margin-bottom': '5px',
        'margin-right': '4px',
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
      if (this.currentValue == '' && (event.key == 'ArrowLeft' || event.key == 'ArrowRight')) {
        let current = event.target;
        event.key == 'ArrowLeft'
          ? (current.previousSibling != null ? current.previousSibling.before(current) : '')
          : (current.nextSibling != null ? current.nextSibling.after(current) : '');

        this.blur();
        return false;
      }

      if (event.key == 'Enter' || event.key == ',' || event.key == '，' || event.key == 'Meta') {
        if (this.currentValue == '') {
          return false;
        }
        this.setTags(this.currentValue);
        this.currentValue = '';
      }
    },
    remove(inx) {
      if (typeof this.value == 'undefined') {
        this.tags.splice(inx, 1);
      } else {
        if (typeof this.value == 'string') {
          var tags = this.value.split(",");
          tags.splice(inx, 1);

          this.$emit('input', tags.join(","));
        } else {
          this.value.splice(inx, 1);
        }
      }
    },
    setTags(tags) {
      if (typeof tags == 'string') {
        var tagsArr = tags.split(/,|，/);
      } else {
        var tagsArr = tags;
      }

      tagsArr = tagsArr.filter(n =>{ return n; });

      if (typeof this.value == 'undefined') {
        this.tags = this.unique
          ? Array.from(new Set(this.tags.concat(tagsArr)))
          : this.tags.concat(tagsArr);
      } else {
        if (this.modelType == 'string') {
          var tmpTags = this.value == null || this.value == ''
            ? tagsArr.join(",")
            : this.value + "," + tagsArr.join(",");
          
          if (this.unique) {
            let tmpUnique = Array.from(new Set(tmpTags.split(",")));
            tmpTags = tmpUnique.join(",");
          }
        } else {
          var tmpTags = this.unique
            ? Array.from(new Set(this.value.concat(tagsArr)))
            : this.value.concat(tagsArr);
        }
        
        this.$emit('input', tmpTags);
      }
    },
    getTags(mode = 'array') {
      if (typeof this.value == 'undefined') {
        return mode == 'array'
          ? this.tags
          : this.tags.join(",");
      } else {
        if (mode == 'array') {
          var tags = typeof this.value == 'string'
            ? this.value.split(",")
            : this.value;
        } else {
          var tags = typeof this.value == 'string'
            ? this.value
            : this.value.join(",");
        }

        return tags;
      }
    },
    clearTags() {
      this.tags = [];
      if (this.modelType == 'string') {
        this.$emit('input', null);
      } else {
        this.$emit('input', []);
      }
    }
  },
  created() {
    if (typeof this.value != 'undefined') {
      if (typeof this.value == 'string') {
        this.modelType = 'string';
      } else {
        this.modelType = 'array';
      }
    }
  }
}
</script>
