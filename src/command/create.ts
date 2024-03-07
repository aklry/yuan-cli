import { input, select } from '@inquirer/prompts'
import path from 'path'
import fs from 'fs-extra'
import { clone } from '../utils/clone'
import { name, version } from '../../package.json'
import axios, { AxiosResponse } from 'axios'
export interface ITemplateInfo {
    name: string // 模板名称
    downloadUrl: string // 模板下载地址
    description: string // 模板描述
    branch: string // 模板分支
}

export const templates: Map<string, ITemplateInfo> = new Map([
    ['Vue3 + Vite + TypeScript-template', {
        name: 'Vue3 + Vite + TypeScript',
        downloadUrl: 'https://github.com/aklry/admin-pro.git',
        description: 'Vue3 + Vite + TypeScript企业级中后台模板',
        branch: 'master'
    }]
])

export const getNpmInfo = async (packageName: string) => {
    const npmUrl = `https://registry.npmjs.org/${packageName}`
    let res = {}
    try {
        res = await axios.get(npmUrl)
    } catch(error) {
        console.error(error)
    }
    return res
}

export const getNpmLatestVersion = async (packageName: string) => {
    const { data } = (await getNpmInfo(packageName)) as AxiosResponse
    return data['dist-tags'].latest
}

export const checkVersion = async (name: string, version: string) => {
    const latestVersion = await getNpmLatestVersion(name)
    if (latestVersion && version !== latestVersion) {
        console.log(`当前版本${version}，最新版本${latestVersion}，请及时更新`)
    }
}

export const create = async (dirName?: string) => {
    // 初始化模板列表
    const template = Array.from(templates).map((item: [string, ITemplateInfo]) => {
        const [name, info] = item
        return {
            name,
            value: name,
            description: info.description
        }
    })
    if (!dirName) {
        dirName = await input({
            message: '请输入项目名称',
        })
    }
    const filePath = path.resolve(process.cwd(), dirName)
    const isOverWrite = async (dirName: string) => {
        const run = await select({
            message: `当前目录已存在${dirName}，是否覆盖？`,
            choices: [
                { name: '覆盖', value: true },
                { name: '取消', value: false }
            ]
        })
        return run
    }
    if (fs.existsSync(filePath)) {
        const run = await isOverWrite(dirName)
        if (run) {
            await fs.remove(filePath)
        } else {
            return // 不做处理
        }
    }

    // 检查版本更新
    await checkVersion(name, version)

    const templateName = await select({
        message: '请选择模板',
        choices: template
    })
    const templateInfo = templates.get(templateName)
    if (templateInfo) {
        clone(templateInfo.downloadUrl, dirName, ['-b', templateInfo.branch])
    }
}