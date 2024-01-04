
let ws:WebSocket|null;

export const connect = (
    url: string,
    onMessage: (data: string) => void,
    onClose: () => void,
) => {
    ws = new WebSocket(url);
    ws.onopen = () => {
        console.log('ws open');
    };
    ws.onmessage = (e) => {
        onMessage(e.data);
        console.log('ws message', e);
    };
    ws.onerror = (e) => {
        console.log('ws error', e.message);
    };
    ws.onclose = (e) => {
        onClose();
        console.log('ws close', e.code, e.reason);
    };
    return {
        destory: () => {
            ws?.close();
            ws =  null;
        },
        reconnect: () => {
            if (ws) {
                ws.close();
            }
            ws = new WebSocket(url);
        }
    };
}