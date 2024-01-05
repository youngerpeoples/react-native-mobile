import toast from "../lib/toast";

export default class ToastException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ToastException';
        toast(message);
    }
}