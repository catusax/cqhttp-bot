import { clone } from './utils'

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

    constructor(data: any) {
        this.copy(data, this)
    }

    private copy(source: any, dest: any) {
        for (const key in dest) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key]
            }
        }
    }
    /** 生成快速回复 */
    quick_reply(text: string): QuickReply {
        const resp: QuickReply = {
            action: '.handle_quick_operation',
            params: {
                context: clone(this),
                operation: {
                    reply: text,
                },
            },
            echo: text,
        }
        return resp
    }
}

export type QuickReply = {
    action: string
    params: handle_quick_operation | undefined
    echo: string
}

type handle_quick_operation = {
    context: CqMessageEvent
    operation: reply
}

type reply = {
    reply: string
}
