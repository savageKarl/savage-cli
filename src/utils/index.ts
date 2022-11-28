import path from 'path';
import fs from 'fs-extra'
import chalk from 'chalk'
import symbols from 'log-symbols'
import _ from 'lodash'
/**
 * 当前cli所在路径
 */
// const cliPath = path.resolve(".")

/**
 * 
 * @param {*} filepath file路径,需要带/,默认拼接cli所在路径cliPath
 * @param {*} object 需要写入的对象
 */
export function wirteSync (filepath: string, jsonObject: any) {
    fs.writeFileSync(filepath, JSON.stringify(jsonObject, null, '\t'))
}
/**
 * 
 * @param {*} message 成功打印
 */
export function successConsole (message: any) {
    console.log(chalk.green(message))
}

/**
 * 
 * @param {*} message 错误打印
 */
export function errorConsole (message: any) {
    console.log(symbols.error, chalk.red(message))
}
/**
 * 
 * @param {*} url git地址转成可下载地址
 */
export function gitTogitdown (url: string) {
    // 最后的地址格式
    // 域名:所有者/项目名称#分支
    // 例如https://gitea.51trust.com:front/vueDemo#master
    // "vue":"https://gitea.51trust.com:front/vueDemo#master",
    // "vue2":"https://gitea.51trust.com/front/vueDemo.git"
    // let tmpUrl = _.replace(url, ".git", "#master")
    // let tmpArray = _.split(tmpUrl, '/');
    // let result = tmpArray[0] + "//" + tmpArray[2] + ":" + tmpArray[3] + "/" + tmpArray[4]
    return url
}


