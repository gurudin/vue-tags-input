<template>
  <div :class="bsStyle" @click="blur">
    <span class="label" :class="'label-' + labelStyle" v-for="(item,inx) in tagsValue">{{item.tag}} <i data-role="remove" @click="removeTag(inx)"></i></span><input type="text" :size="inputSize" :placeholder="placeholder" v-model.trim="currentValue" @keyup="keyAction" ref="tagsinput" />
  </div>
</template>

<script>
export default {
  name: 'tagsInput',
  props: {
    bootstrap: {
      type: Number,
      default: 4,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    labelStyle: {
      type: String,
      default: 'info',
      required: false
    },
    dataValue: {
      type: null,
      required: false
    },
    callback: {
      type: null,
      required: false
    },
    onChange: {
      type: null,
      required: false
    },
  },
  data() {
    return {
      tagsValue: Array,
      currentValue: ''
    };
  },
  computed: {
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
    bsStyle() {
      return "input-tag-bs" + this.bootstrap;
    }
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
      
      if (event.key == 'Enter' || event.key == ',' || event.key == 'Meta') {
        let _this = this;
        let tmpTagArr = [];
        tmpTagArr = this.currentValue.split(',');

        tmpTagArr.forEach(arr => {
          let tmpArr = arr.split('，');
          tmpArr.forEach(row => {
            if (row != '') {
              if (typeof _this.callback == 'function') {
                let tagLen = _this.tagsValue.length;
                _this.tagsValue.push({ tag: row, loading: true});

                let res = _this.callback({action: 'add', value: row}, tagLen);
                
                res == true ? _this.tagsValue[tagLen].loading = false : _this.tagsValue.splice(tagLen, 1);
              } else {
                _this.tagsValue.push({ tag: row, loading: false});
              }

              if (typeof _this.onChange == 'function') {
                _this.onChange(_this.getTag())
              }
            }
          });
        });

        this.currentValue = '';
      }
    },
    removeTag(inx) {
      if (typeof this.callback == 'function') {
        if (this.callback({action: 'remove', value: this.tagsValue[inx].tag}, inx)) {
          this.tagsValue.splice(inx, 1);
        }
      } else {
        this.tagsValue.splice(inx, 1);
      }

      if (typeof this.onChange == 'function') {
        this.onChange(this.getTag())
      }
    },
    setTag(tags) {
      let tagsValue = [];
      tags.forEach((row, inx) => {
        tagsValue[inx] = { tag: row, loading: false};
      });

      this.tagsValue = tagsValue;
    },
    getTag() {
      let tagsValue = [];
      this.tagsValue.forEach(row => {
        tagsValue.push(row.tag);
      });

      return tagsValue;
    },
    clearTag() {
      this.tagsValue = [];
    }
  },
  created() {
    if (typeof this.dataValue == 'undefined' || this.dataValue == '') {
      this.tagsValue = [];
    } else {
      var tagsValue = [];
      this.dataValue.forEach((row, inx) => {
        tagsValue[inx] = { tag: row, loading: false };
      });

      this.tagsValue = tagsValue;
    }
  }
}
</script>

<style>
.input-tag-bs3 [data-role="remove"], .input-tag-bs4 [data-role="remove"] {
  margin-left: 5px;
  cursor: pointer;
}
.input-tag-bs3 [data-role="remove"]:after, .input-tag-bs4 [data-role="remove"]:after {
  content: "x";
  padding: 0px 2px;
}
.input-tag-bs3 .label, .input-tag-bs4 .label {
  display: block;
  /* float: left; */
  margin: 10px 0 0 10px;
}

.input-tag-bs3 {
  display: block;
  max-width: 100%;
  min-height: 34px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.input-tag-bs3 input {
  width: auto;
  outline:none;
  margin: 8px 10px;
  border: none;
  font: inherit;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
}
.input-tag-bs3 input::placeholder {
  color: #999;
  opacity: 1;
  font-weight: 800;
}
.input-tag-bs3 .label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
.input-tag-bs3 .label-default {
  background-color: #777;
}
.input-tag-bs3 .label-primary {
  background-color: #337ab7;
}
.input-tag-bs3 .label-success {
  background-color: #5cb85c;
}
.input-tag-bs3 .label-info {
  background-color: #5bc0de;
}
.input-tag-bs3 .label-warning {
  background-color: #f0ad4e;
}
.input-tag-bs3 .label-danger {
  background-color: #d9534f;
}

.input-tag-bs4 {
  display: block;
  width: 100%;
  min-height: calc(2.25rem + 2px);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.input-tag-bs4 input {
  width: auto;
  outline:none;
  border: none;
  font: inherit;
  font-family: inherit;
  margin: 8px 10px;
  font-size: 1rem;
  color: #495057;
}
.input-tag-bs4 input::placeholder {
  color: #6c757d;
  opacity: 1;
  font-weight: 700;
}
.input-tag-bs4 .label {
  display: inline-block;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
}
.input-tag-bs4 .label-primary {
  color: #fff;
  background-color: #007bff;
}
.input-tag-bs4 .label-secondary {
  color: #fff;
  background-color: #6c757d;
}
.input-tag-bs4 .label-success {
  color: #fff;
  background-color: #28a745;
}
.input-tag-bs4 .label-danger {
  color: #fff;
  background-color: #dc3545;
}
.input-tag-bs4 .label-warning {
  color: #212529;
  background-color: #ffc107;
}
.input-tag-bs4 .label-info {
  color: #fff;
  background-color: #17a2b8;
}
.input-tag-bs4 .label-light {
  color: #212529;
  background-color: #f8f9fa;
}
.input-tag-bs4 .label-dark {
  color: #fff;
  background-color: #343a40;
}
</style>

