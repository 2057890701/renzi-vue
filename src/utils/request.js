import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// axios默认加了一层data
		const { success, message, data } = response.data
		//   要根据success的成功与否决定下面的操作
		if (success) {
			return data //直接返回data，不像之前那样给数据包裹了一层 ***
		} else {
			// 业务已经错误了 还能进then ? 不能 ！ 应该进catch
			Message.error(message) // 提示错误消息
			return Promise.reject(new Error(message))
		}
	},
	(error) => {
		Message.error(error.message) // 提示错误信息
		return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
	}
)
export default service // 导出axios实例
