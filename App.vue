<script>
	import { syncGlobalI18nUI } from "./utils/ui";

	export default {
		onLaunch: function() {
			console.log('App Launch')
			syncGlobalI18nUI()
		},
		onShow: function() {
			console.log('App Show')
			syncGlobalI18nUI()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
