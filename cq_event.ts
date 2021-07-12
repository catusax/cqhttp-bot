export class CqMessageEvent {
    time: number | undefined
    self_id: number | undefined
    post_type: string | undefined
    message_type: string | undefined
    sub_type: string | undefined
    message_id: number | undefined
    user_id: number | undefined
    message: any
    raw_message: string | undefined
    font: number | undefined
    sender: any
    group_id: number | undefined
    anonymous: any

    constructor(data:any){
        this.copy(data,this)
    }

    private copy(source:any, dest:any) {
        for (let key in dest) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
    }
    /** 生成快速回复的api字符串*/
    quick_reply(text: string): string {
        let resp: api = {
            action: '.handle_quick_operation',
            params: {
                context: this,
                operation: {
                    reply: text
                }
            },
            echo: text
        }
        return JSON.stringify(resp)
    }
}


interface api {
    action: string,
    params: handle_quick_operation,
    echo: string
}

interface handle_quick_operation {
    context: any,
    operation: reply
}

interface reply {
    reply: string
}

