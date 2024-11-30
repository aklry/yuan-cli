import logSymbols from 'log-symbols'

class Log {
	info(message: string) {
		console.log(logSymbols.info, message)
	}
	success(message: string) {
		console.log(logSymbols.success, message)
	}
	error(message: string) {
		console.log(logSymbols.error, message)
	}
	warning(message: string) {
		console.log(logSymbols.warning, message)
	}
}

const log = new Log()
export default log
