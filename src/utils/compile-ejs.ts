import ejs from 'ejs'
const compileEjs = (template: string, data: any): Promise<string> => {
	return new Promise((resolve, reject) => {
		ejs.renderFile(template, data, (err, result) => {
			if (err) {
				console.error('模板编译失败')
				reject(err)
				return
			}
			resolve(result)
		})
	})
}
export default compileEjs
