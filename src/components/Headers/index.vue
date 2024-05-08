<template>
    <div class="header">
        <div class="top">
            <div class="left">
                <slot name="left"></slot>
            </div>
            <div class="center">
                <slot name="center"></slot>
            </div>
            <div class="right">
                <slot name="right"></slot>
            </div>
        </div>
        <div v-show="props.show">
            <div class="lock">
                <div class="lock-left" @click="toggle('up')">
                    {{ props.leftTitle }}
                </div>
                <div class="lock-center" v-if="props.chapter">{{ props.chapter }}</div>
                <div class="lock-right" @click="toggle('next')">
                    {{ props.rightTitle }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    leftTitle: {
        type: String,
        default: "上一章",
    },
    rightTitle: {
        type: String,
        default: "下一章",
    },
    chapter: String,
});
const emit = defineEmits(["toggle"]);
const toggle = (type) => emit("toggle", type);
</script>

<style lang="scss" scoped>
.header {
    font-size: var(--header-font-size, 14px);
    box-shadow: 0px 2px 5px 0px rgba(11, 36, 85, 0.13);
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--header-bg-color, none);
        padding: 10px;

        .left,
        .center,
        .right {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-basis: 0;
            flex-grow: 1;
            min-width: 0;
            overflow: hidden;
        }

        .left {
            justify-content: flex-start;
        }

        .center {
            justify-content: center;
        }

        .right {
            justify-content: flex-end;
        }
    }

    .bottom {
        margin-bottom: 5px;
    }

    .lock {
        bottom: 8px;
        font-size: 12px;
        color: rgb(100, 100, 100);
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        .lock-left,
        .lock-right {
            cursor: pointer;

            &:hover {
                color: #389cff;
            }
        }
    }
}
</style>