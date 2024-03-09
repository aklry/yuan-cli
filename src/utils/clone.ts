import simpleGit, {SimpleGitOptions} from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'
import log from '../utils/log'
const figlet = require('figlet')

// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 80,
        frames: ['-', '-', '-', '-'].map(item => chalk.green(item))
    }
})

const greaterPrinter = async () => {
   await figlet('aklry-cli', (error: any, data: any) => {
    console.log(data)
   })
}

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
    log.success(chalk.blueBright(`==================================`))
    log.success(chalk.blueBright(`=== 欢迎使用 yuan-cli 脚手架 ===`))
    log.info(chalk.blueBright(`=== cd ${projectName} ===`))
    log.info(chalk.blueBright(`=== pnpm install ===`))
    log.info(chalk.blueBright(`=== pnpm run dev ===`))
    log.success(chalk.blueBright(`==================================`))
    greaterPrinter()
    } catch(error: string | any) {
        log.error(error)
    }
}