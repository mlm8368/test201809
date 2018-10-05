<template>
  <image :src="PART"
    v-if="show"
    :style="loadingStyle"
    resize="contain"
    quality="original"></image>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: 36
      },
      height: {
        type: [Number, String],
        default: 36
      }
    },
    data: () => ({
      PART: 'bmlocal://assets/loading.gif'
    }),
    computed: {
      loadingStyle () {
        const { height, width } = this;
        return {
          height: `${height}px`,
          width: `${width}px`
        }
      }
    }
  };
</script>