import { runCommand, log, getConfig, deployUtils } from '../../utils'
import chalk from 'chalk'
import path from 'node:path'

export const cicdAction = async () => {
	try {
		await runCommand('npm', ['run', 'lint'])
		await runCommand('npm', ['run', 'build'])
		log.info(chalk.blue('Running continuous integration checks and deployment...'))
		const { host, username, password, port, remotePath, releasePath } = await getConfig()
		const { compressFile, connect, runCommander, uploadFile, disconnect } = deployUtils
		const outputPath = path.resolve(process.cwd(), 'dist')
		const localFile = path.resolve(process.cwd(), 'dist.zip')
		// 压缩要上传的文件
		await compressFile(outputPath, localFile)
		// 连接远程服务器
		await connect(host, username, password, port)
		// 删除服务器上的旧文件
		await runCommander(`rm -rf ${releasePath}`, remotePath)
		// 上传新文件
		await uploadFile(localFile, `${remotePath}${releasePath}`)
		// 解压文件
		await runCommander(`unzip -o ${releasePath} -d ${remotePath}`, remotePath)
		// 删除压缩包
		await runCommander(`rm -rf ${releasePath}`, remotePath)
		// 重命名
		await runCommander(`mv dist ${releasePath}`, remotePath)
		// 断开ssh连接
		await disconnect()
		log.success(chalk.green('部署成功'))
	} catch (error) {
		log.error(chalk.red(`Error occurred during CI:${error}`))
	}
}
