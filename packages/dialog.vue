<template>
  <transition name="dialog-fade">
    <!-- 遮罩 click.self只触发遮罩，防止冒泡-->
    <div class="zf-dialog__wrapper" v-show="visible" @click.self="handleClose">
      <!-- 主体 -->
      <div class="zf-dialog" :style="{ width, 'margin-top': top }">
        <div class="zf-dialog__header">
          <!-- 头部插槽 -->
          <slot name="title">
            <!-- 如果存在slot则不生成span，反之则生成 -->
            <span class="zf-dialog__title">{{ title }}</span>
          </slot>
          <button class="zf-dialog__headerbtn" @click="handleClose">
            <i class="zf-icon-close"></i>
          </button>
        </div>
        <div class="zf-dialog__body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <!-- 如果底部插槽不传值则消除该DOM所占的位置 -->
        <div class="zf-dialog__footer" v-if="$slots.footer">
          <!-- 底部插槽 -->
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ZF-dialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    width: {
      type: String,
      default: "50%",
    },
    top: {
      // margin-top
      type: String,
      default: "15vh",
    },
    visible: {
      // 动态隐藏对话框
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$slots);
  },

  components: {},

  methods: {
    handleClose() {
      console.log("handleClose");
      //.sync可让子组件直接修改props
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.zf-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .zf-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    // 给dialog主体设置独立位移动画(如果给遮罩层设置会出现底部滚动白条)
    animation: zf-dialog-body 0.4s linear 1;
    @keyframes zf-dialog-body {
      0% {
        transform: translate3d(0, -20px, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    &__header {
      padding: 20px 20px 10px;
      .zf-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .zf-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      //::v-deep .zf-button:first-child
      // 如果组件之间都存在scoped 那么无法dialog组件里修改button组件样式
      // 因为scoped会新增各组件独立的“属性”和"属性选择器"
      // 深度选择器会把button组件的“属性选择器”修改为dailog组件的“属性选择器”从而操控button的样式
      .zf-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

//过渡动画
.dialog-fade-enter-active {
  animation: dialog-fade-in 0.4s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out 0.4s;
}

@keyframes dialog-fade-in {
  0% {
    // 如果给dialog遮罩设置位移动画(会出现底部滚动白条)
    //transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    //transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    //transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    //transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
