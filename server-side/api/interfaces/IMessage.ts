export interface IMessage {
    status: number,
    code?: string,
    msg?: string,
    json?: object | string
}