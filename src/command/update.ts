import chalk from "chalk"
import process from 'child_process'
import ora from 'ora'

const spinner = ora({
    text: 'Updating...',
    spinner: {
        interval: 80,
        frames: ['-', '-', '-', '-'].map(item => chalk.blue(item))
    },
    color: 'yellow'
})

export const update = async () => {
    spinner.start()
    process.exec('npm install aklry-cli@latest -g', (error) => {
        spinner.stop()
        if (!error) {
            console.log(chalk.greenBright('更新成功'))
        } else {
            console.error(chalk.redBright(error))
        }
    })
}