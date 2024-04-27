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
        <div>
            <slot name="default"></slot>
        </div>
    </div>
</template>

<script setup>
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
}
</style>