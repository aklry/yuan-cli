import { Command } from 'commander'
import pkg from '../../../package.json'

export const helpOptions = (program: Command) => {
	program.version(pkg.version, '-v, --version', 'output the current version')
	// 增加其他options
	program.option('-d, --dest <dest>', 'a destination folder, for example: -d src/components')

	program.on('--help', () => {
		console.log('')
		console.log('Examples:')
		console.log('  $ yuan add-cpn my-component -d src/components')
		console.log('  $ yuan create my-project')
		console.log('  $ yuan update')
	})
}
