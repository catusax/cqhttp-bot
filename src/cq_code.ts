export class CqCode {
    message: string = ''
    at: number = 0 // 消息里第一个被at的人，用于判断at事件
    // image:string
    // record:string //录音
    // face:number //表情
    // emoji:string
    // share:string
    // contact:string //推荐联系人
    // music:string
    // shake:string
    // poke:string
    // xml:string
    // json:string
    constructor(str: string) {
        this.message = str.replace(/\[CQ.*?\]/gm, '') // 删掉所有coolq码
        if (str.startsWith('[CQ:')) {
            // cq码
            const type = /(?<=^\[CQ:)[a-z]*(?=,)/gm.exec(str)![0] || 'text' // 肯定能匹配到
            if (type == 'at') {
                const num = /(?<=^\[CQ:at,qq=)[0-9]*(?=\])/g.exec(str)![0] || '0'
                // tslint:disable-next-line: radix
                this.at = parseInt(num)
            }
        } else {
            this.message = str
        }

        this.message = this.message.trim()
    }
}
