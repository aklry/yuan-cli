import { NodeSSH } from 'node-ssh'
import fs from 'node:fs'
import archiver from 'archiver'
import { log } from '../utils'
import chalk from 'chalk'

class Deploy {
	private ssh: NodeSSH

	constructor() {
		this.ssh = new NodeSSH()
	}

	connect(host: string, username: string, password: string, port: number) {
		return new Promise((resolve, reject) => {
			this.ssh
				.connect({
					host,
					username,
					password,
					port
				})
				.then(() => {
					log.success(chalk.green('连接成功'))
					resolve(void 0)
				})
				.catch(err => {
					log.error(chalk.red(`连接失败:${err}`))
					reject(err)
				})
		})
	}

	async disconnect() {
		this.ssh.dispose()
	}

	runCommander(command: string, path: string) {
		return new Promise(resolve => {
			this.ssh.execCommand(command, { cwd: path }).then(result => {
				resolve(result)
			})
		})
	}

	compressFile(targetDir: string, localFile: string) {
		return new Promise(resolve => {
			// 创建可写流
			const output = fs.createWriteStream(localFile)
			const archive = archiver('zip', {
				zlib: { level: 9 }
			})
			archive.pipe(output)
			archive.directory(targetDir, 'dist')
			archive.finalize()

			archive.on('close', () => {
				log.success(chalk.green(`压缩文件成功:${(archive.pointer() / 1024 / 1024).toFixed(2)}MB`))
				resolve(void 0)
			})
		})
	}

	uploadFile(local: string, remote: string) {
		return new Promise(resolve => {
			this.ssh
				.putFile(local, remote)
				.then(() => {
					log.success(chalk.green('上传文件成功'))
					resolve(void 0)
				})
				.catch(err => {
					log.error(chalk.red(`上传文件失败:${err}`))
				})
		})
	}
}

function bindMethods(instance: Deploy) {
	return new Proxy(instance, {
		get(target, prop) {
			const value = target[prop as keyof Deploy]
			if (typeof value === 'function') {
				return value.bind(instance)
			}
			return value
		}
	})
}

export default bindMethods(new Deploy())
