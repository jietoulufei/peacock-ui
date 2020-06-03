<template>
  <div class="zf-input" :class="{ 'zf-input--suffix': showSuffix }">
    <input
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      class="zf-input__inner"
      :class="[{ 'is-disabled': disabled }]"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
    />
    <span class="zf-input__suffix">
      <i
        v-if="isclearable"
        class="zf-input__icon zf-icon-circle-close"
        @click="clear"
      ></i>
      <i
        v-if="showPassword"
        class="zf-input__icon zf-icon-view"
        :class="{ 'zf-icon-view-active': passwordVisible }"
        @click="handlePasswordVisible"
      ></i>
    </span>
  </div>
</template>

<script>
//  <ZF-input type="text" placeholder="v-model" v-model="username"></ZF-input>
//  v-model="username"是语法糖 等价 :value="username" @input="username=$event.target.value"
//  组件内部只需props value 和this.emit("input", e.target.value);即可
export default {
  name: "ZF-input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    clearable: {
      //清空按钮
      type: Boolean,
      default: false,
    },
    showPassword: {
      //密码眼图标
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //password切换变量
      passwordVisible: false,
    };
  },
  computed: {
    //外部组件必须添加v-model 才能触发下列监听器
    //监听clear和password图标
    showSuffix() {
      return this.clearable || this.showPassword;
    },
    isclearable() {
      return this.clearable && this.value;
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clear() {
      this.$emit("input", "");
    },
    //动态切换是否为password
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style lang="scss">
.zf-input {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .zf-input__inner {
    cursor: pointer;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #000;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
//清空和密码显示 按钮
.zf-input--suffix {
  .zf-input__inner {
    padding-right: 30px;
  }
  .zf-input__suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    //高亮password眼睛
    .zf-icon-view-active {
      color: red;
    }
  }
}
</style>
