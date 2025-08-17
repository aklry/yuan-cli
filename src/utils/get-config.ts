import { input, password } from '@inquirer/prompts'

const getConfig = async () => {
	const host = await input({
		message: '请输入服务器地址',
		default: '127.0.0.1'
	})
	const username = await input({
		message: '请输入用户名',
		default: 'root'
	})
	const psw = await password({
		message: '请输入密码',
		mask: '*'
	})
	const port = await input({
		message: '请输入端口',
		default: '22'
	})
	const remotePath = await input({
		message: '请输入远程部署目录',
		default: '/www/wwwroot/'
	})
	const releasePath = await input({
		message: '请输入发布目录',
		default: 'release'
	})
	return {
		host,
		username,
		password: psw,
		port: Number(port),
		remotePath,
		releasePath
	}
}

export default getConfig
