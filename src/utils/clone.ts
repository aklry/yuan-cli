import simpleGit, {SimpleGitOptions} from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'

// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 80,
        frames: ['-', '-', '-', '-'].map(item => chalk.green(item))
    }
})
const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
 };
export const clone = async (url: string, projectName: string, options: string[]) => {
    const git = simpleGit(gitOptions)
    try {
        await logger(git.clone(url, projectName, options), '正在下载模板', {
            estimate: 50000
        })
        // 下面就是一些相关的提示
    console.log()
    console.log(chalk.blueBright(`==================================`))
    console.log(chalk.blueBright(`=== 欢迎使用 yuan-cli 脚手架 ===`))
    console.log(chalk.blueBright(`=== cd ${projectName} ===`))
    console.log(chalk.blueBright(`=== pnpm install ===`))
    console.log(chalk.blueBright(`=== pnpm run dev ===`))
    console.log(chalk.blueBright(`==================================`))
    console.log()
    } catch(error) {
        console.error(error)
    }
}