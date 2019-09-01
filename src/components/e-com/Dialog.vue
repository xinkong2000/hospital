<template>
	<span @click="ab">[{{ text }}]</span>
</template>
<script type="text/javascript">
import Vue from 'vue';
	export default{
		name: 'ed-dialog',
		data(){
			return {
				text: '名字'
			}
		},
		methods: {
			ab(){
				alert(1)
			}
		}
	}
</script>