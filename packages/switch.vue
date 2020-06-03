<template>
  <!-- 关于label里包裹checkbox有个坑！
    1.因为label会指向checkbox 所以给label绑定事件会先传递给CheckBox(从而引发事件冒泡)，
    2.所以会重复调用2次事件，导致组件出错
    解决方法：
    1.给内部其他标签绑定事件
    2.把CheckBox移动至label外部
    3.把label标签改为div -->
  <label class="zf-switch" :class="{ 'is-checked': this.value }">
    <!-- 用于使组件支持name传值，隐藏input -->
    <input
      class="zf-switch__input"
      type="checkbox"
      ref="input"
      :name="name"
      @click="handleClick"
    />
    <span class="zf-switch__core" ref="core">
      <span class="zf-switch__button"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: "ZF-switch",
  props: {
    //来子父组件v-model的传值，父组件v-model是语法糖，等同于:value="value" @input="value=event.target.value"
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    //开
    activeColor: {
      type: String,
      default: "",
    },
    //关
    inactiveColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },

  components: {},

  methods: {
    //来子父组件v-model的传值，父组件v-model是语法糖，等同于:value="value" @input="value=event.target.value"
    //把双向数据中的input事件传给父组件
    //事件冒泡 ：当一个元素接收到事件的时候 会把他接收到的事件传给自己的父级，一直到window 。（注意这里传递的仅仅是事件 并不传递所绑定的事件函数。所以如果父级没有绑定事件函数，就算传递了事件 也不会有什么表现 但事件确实传递了。）
    async handleClick() {
      console.log("label");
      this.$emit("input", !this.value);
      //点击时改变开关颜色
      //等待value发生改变，DOM更新，this.$emit传给父组件，父组件再传给子组件为异步操作
      await this.$nextTick();
      //this.$nextTick().then()
      this.setBackgroundColor();
      // 使input和switch组件的值同步
      this.$refs.input.checked = this.value;
    },
    //操控开关颜色
    setBackgroundColor() {
      if (this.activeColor || this.inactiveColor) {
        console.log("label2");
        let newColor = this.value ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      }
    },
  },
  mounted() {
    // 使input和switch组件的值同步
    this.$refs.input.checked = this.value;
    // 设置背景色
    this.setBackgroundColor();
  },
};
</script>

<style lang="scss">
.zf-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  //隐藏为了支持name属性的input
  .zf-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .zf-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .zf-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}

//选中的样式
.zf-switch.is-checked {
  .zf-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .zf-switch__button {
      transform: translateX(20px);
    }
  }
}
</style>
