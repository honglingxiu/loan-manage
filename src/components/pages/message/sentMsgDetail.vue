<template>
	<div>
		<el-form :model="message" ref="message" label-position="left" label-width="100px">
			<el-form-item label="发送时间：" >
				<span>{{message.time}}</span>
			</el-form-item>
			<el-form-item label="消息标题：" prop="title">
				<span>{{message.title}}</span>
			</el-form-item>
			<el-form-item label="消息内容：" prop="content">
				<span>{{message.content}}</span>
			</el-form-item>
			
		</el-form>
	</div>
</template>
<script>
	export default{
		props:['message'],
		watch:{
			message:function(msg){
				this.message = msg;
			}
		}
	}
</script>