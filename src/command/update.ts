import chalk from "chalk"
import process from 'child_process'
import ora from "ora"

const spinner = ora({
    text: 'Updating...',
    spinner: {
        interval: 80,
        frames: ['-', '-', '-', '-'].map(item => chalk.blue(item))
    },
    color: 'yellow'
})

export const update = async (dirName: string) => {
    spinner.start()
    process.exec('pnpm install -g aklry-cli@latest', (error) => {
        spinner.stop()
        if (!error) {
            console.log(chalk.greenBright('更新成功'))
        } else {
            console.error(chalk.redBright(error))
        }
    })
}