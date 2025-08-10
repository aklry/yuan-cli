import { Command } from 'commander'
import { compileEjs, writeFile } from '../../utils'
import path from 'path'
export const addCpnAction = async (cpnName: string, program: Command) => {
	const templatePath = path.resolve(__dirname, './templates/component.ejs')
	const result = await compileEjs(templatePath, {
		cpnName,
		lowerCaseCpnName: cpnName.toLowerCase()
	})
	const destDir = program.opts().dest || 'src/components'
	const destPath = path.resolve(process.cwd(), destDir)
	const destFilePath = path.resolve(destPath, `./${cpnName}.vue`)
	await writeFile(destFilePath, result)
}
