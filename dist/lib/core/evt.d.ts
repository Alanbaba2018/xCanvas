interface Handler {
    fn: any;
    ctx: any;
}
export default class Evt {
    events: {
        [k: string]: Handler[];
    };
    constructor();
    hasEvent(evt: string): boolean;
    on(evt: string, fn: object, context?: any): this;
    once(evt: string, fn: object, context?: any): void;
    fire(evt: string, data?: {
        sourceTarget?: any;
        [k: string]: any;
    }): void;
    off(evt: string, fn?: any, context?: any): void;
    listens(evt: string): boolean;
}
export {};
