import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update'

const program = new Command('yuan')
program.version(version, '-v, --version', 'output the current version')

program.command('update').description('更新脚手架 yuan-cli').action(async (dirName: string) => {
    await update(dirName)
})

program.command('create').description('创建一个项目').argument('name', '项目名称').action(async (dirName: string) => {
    if (dirName) {
        create(dirName)
    } else {
        console.log(dirName)
    }
})

program.parse()