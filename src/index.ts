import { Command } from 'commander'
import { create, update, addCpnAction, helpOptions } from './core'

const program = new Command('yuan')

helpOptions(program)

program
	.command('update')
	.description('更新脚手架 aklry-cli')
	.action(async () => {
		await update()
	})

program
	.command('create')
	.description('创建一个项目')
	.argument('name', '项目名称')
	.action(async (dirName: string) => {
		if (dirName) {
			create(dirName)
		} else {
			console.log(dirName)
		}
	})
program
	.command('add-cpn <cpnname> [...others]')
	.description('add a new vue component to the project, for example: yuan add-cpn my-component -d src/components')
	.action((cpnName: string) => addCpnAction(cpnName, program))

// 让commander解析命令行参数
program.parse(process.argv)
