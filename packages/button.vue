<template>
  <button
    class="zf-button"
    :class="[
      `zf-button--${type}`,
      `zf-button--${size}`,
      { 'is-round': `${type}` == 'Point-1' ? '' : round },
      { 'is-circle': `${type}` == 'Point-1' ? '' : circle },
      { 'is-disabled': disabled },
      { 'is-nofilter': nofilter },
      { 'is-nofocus': nofocus },
      { 'is-rightAngle': rightAngle },
    ]"
    :disabled="disabled"
    @click="handleClick"
    @dblclick="handledblClick"
  >
    <i v-if="icon" :class="icon"></i>
    <!-- 当按钮只存在icon不存在文本时候，通过$slot.default是否传入插槽 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
//const { log } = console;
export default {
  name: "ZF-button",
  props: {
    type: {
      //数据类型
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "medium", //中号
    },
    round: {
      type: Boolean,
      default: false, //不传值(不设定属性)就默认false
    },
    circle: {
      type: Boolean,
      default: false, //不传值(不设定属性)就默认false
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nofilter: {
      //关闭滤镜模糊
      type: Boolean,
      default: false,
    },
    nofocus: {
      //关闭focus
      type: Boolean,
      default: false,
    },
    rightAngle: {
      //开启直角
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log("this.rightAngle", this.rightAngle);
    // log(this.$slots);
  },
  methods: {
    //通常情况<ZF-button @click>是失效的，可以<ZF-button @click.native>
    //.native修饰符：在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加'. native'事件是无法触发的。

    //使<ZF-button></ZF-button>支持点击事件(减少代码冗余)
    handleClick(e) {
      this.$emit("click", e);
    },
    handledblClick(e) {
      this.$emit("dblclick", e);
    },
  },
};
</script>

<style lang="scss">
.zf-button {
  display: inline-block;
  line-height: 1; //数字和像素都可以
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  -webkit-appearance: none; //appearance 属性允许您使元素看上去像标准的用户界面元素
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  //禁止元素文字被选中
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  //鼠标点击时候
  &:not(.is-disabled):active {
    color: #3a8ee6;
  }
}

// 炫彩流光Streamer-1 start--------------------------------------------------------------------
/* 炫彩流光按钮主体 */
.zf-button--Streamer-1 {
  position: relative;
  border: none;
  text-align: center; /*字体水平居中*/
  font-family: sans-serif; /*非衬线体*/
  box-sizing: border-box; /*盒模型大小规则*/
  /*渐变背景*/
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%; /*背景大小*/
  z-index: 1;
  &:not(.is-disabled):hover,
  &:not(.is-disabled):not(.is-nofocus):focus {
    animation: Streamer-1-animate 8s linear infinite alternate; /*动画: 名称 时间 线性 循环 播放完回退播放*/
  }
  /* 炫彩流光按钮外围 */
  &::before {
    /*之前添加*/
    content: ""; /*内容*/
    position: absolute; /*绝对定位*/
    top: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
    left: -5px;
    right: -5px;
    bottom: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    filter: blur(20px); /*过渡：模糊*/
    opacity: 0; /*透明度*/
    transition: 1s; /*过渡时间*/
    z-index: -1;
  }

  //存在disabled，nofilter属性时排除hover功能
  &:not(.is-disabled):not(.is-nofilter):hover::before,
  &:not(.is-disabled):not(.is-nofilter):not(.is-nofocus):focus::before {
    filter: blur(20px);
    opacity: 1;
    animation: Streamer-1-animate 8s linear infinite; /*注意动画名称统一*/
  }
}

@keyframes Streamer-1-animate {
  0% {
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}

// 炫彩流光 end----------------------------------------------------------------------------------------------

// 炫彩流光Streamer-2 start--------------------------------------------------------------------
// 中图层
.zf-button--Streamer-2::before {
  content: "";
  position: absolute; /*通过绝对定位使伪元素撑开宽高，相对定位不行*/
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background-color: #252526;
  border-radius: 4px;
  z-index: -1;
}
//主体图层
.zf-button--Streamer-2 {
  position: relative;
  background-color: #252526;
  outline: none;
  border: none;
  letter-spacing: 1px;
}

.zf-button--Streamer-2:not(.is-disabled):hover::before,
.zf-button--Streamer-2:not(.is-disabled):not(.is-nofocus):focus::before {
  //background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
  background: linear-gradient(#03a9f4, #f441a5, #ffeb3b);
  animation: zf-button--Streamer-2 1.5s linear infinite;
}
//外图层 模糊
.zf-button--Streamer-2:not(.is-disabled):not(.is-nofilter):hover::after,
.zf-button--Streamer-2:not(.is-disabled):not(.is-nofilter):not(.is-nofocus):focus::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(#03a9f4, #f441a5, #ffeb3b);
  filter: blur(20px);
  z-index: -1;
}

@keyframes zf-button--Streamer-2 {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

//炫彩流光Streamer-2 禁用模糊
.zf-button--Streamer-2.is-nofilter {
  &::after {
    content: none;
  }
}

// 炫彩流光Streamer-2 end--------------------------------------------------------------------

// 断点Point-1 start--------------------------------------------------------------------
// 主体
.zf-button--Point-1 {
  position: relative;
  background: none;
  border: 3px solid #03a9f4;
  color: #03a9f4;
  font-family: 700;
}

.zf-button--Point-1::before,
.zf-button--Point-1::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 3px;
  background: #1e1e1e;
  transform: skewX(50deg);
  transition: 0.4s linear;
}

// 上图层
.zf-button--Point-1::before {
  top: -3px;
  left: 10%;
}

// 下图层
.zf-button--Point-1::after {
  bottom: -3px;
  right: 10%;
}

.zf-button--Point-1:not(.is-disabled):hover::before,
.zf-button--Point-1:not(.is-disabled):not(.is-nofocus):focus::before {
  left: 70%;
}

.zf-button--Point-1:not(.is-disabled):hover::after,
.zf-button--Point-1:not(.is-disabled):not(.is-nofocus):focus::after {
  right: 70%;
}

// 断点Point-1 end--------------------------------------------------------------------

//大 中 小 超小
.zf-button--big {
  padding: 16px 24px;
  font-size: 18px;
  border-radius: 6px;
}

.zf-button--small {
  padding: 10px 18px;
  font-size: 12px;
  border-radius: 3px;
}

.zf-button--min {
  padding: 8px 16px;
  font-size: 10px;
  border-radius: 2px;
}

//直角
.is-rightAngle {
  border-radius: 0;
  &::after,
  &::before {
    border-radius: 0;
  }
}

//圆角函数
@mixin commonRound($radius, $padding1, $padding2) {
  border-radius: $radius;
  padding: $padding1 $padding2;
}

// 圆角
.zf-button.is-round {
  @include commonRound(25px, 12px, 23px);
  &::after,
  &::before {
    @include commonRound(25px, 12px, 23px);
  }
}

//圆形按钮
.zf-button.is-circle {
  @include commonRound(50%, 12px, 12px);
  &::after,
  &::before {
    @include commonRound(50%, 12px, 12px);
  }
}

//当按钮里同时存在icon和文本
.zf-button [class*="zf-icon-"] + span {
  margin-left: 5px;
}

//禁用样式
.zf-button.is-disabled {
  // W3C上没有的属性 not-allowed和no-drop 是cursor光标类型。
  // 它们的鼠标样式都相同。不同的是：
  // no-drop:用于标示被拖起的对象不允许在光标的当前位置被放下。
  // not-allowed:用于标示请求的操作禁止执行。
  cursor: not-allowed;
}
</style>
