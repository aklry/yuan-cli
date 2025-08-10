import fs from 'fs'

const writeFile = (filePath: string, content: string) => {
	return fs.promises.writeFile(filePath, content)
}

export default writeFile
