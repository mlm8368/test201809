<script lang="js" src="./login.js"></script>
<template>
	<div class="container">
		<text class="title">Hello Eros</text>		
		<text class="desc">一套 Vue 代码，两端原生应用222336。</text>		
    <text class="desc">{{s}}</text>	
	</div>
</template>
<style scoped>
	.container {
		display: flex;
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