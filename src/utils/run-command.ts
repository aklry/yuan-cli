import { spawn } from 'node:child_process'
const runCommand = (command: string, args: string[], options: Record<string, any> = {}) => {
	const platform = process.platform
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			shell: platform === 'win32',
			stdio: 'inherit',
			...options
		})
		child.on('close', (code: number) => {
			if (code === 0) {
				resolve(true)
			} else {
				reject(new Error(`Command failed with exit code ${code}`))
			}
		})
		child.on('error', error => {
			reject(error)
		})
	})
}

export default runCommand
