<template>
	<div class="container">
		<text class="title">Hello Eros</text>
		<text class="desc">一套 Vue 代码，两端原生应用。</text>
   </div>
</template>
<script>
import Abstract from '../class/abstract'

const abstract = new Abstract()
	export default {
		data() {
    return {}
  },
  created() {
    abstract.setVue(this)
    //  abstract.log('dddd123')
    abstract.log(dddd)
    }
	}
</script>
<style scoped>
	.container {
		flex:1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title {
		font-size: 100px;
	}
	.desc {
		font-size: 30px;
	}	
</style>