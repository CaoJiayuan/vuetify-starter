export interface ToastOptions {
    timeout ?: Number,
    top ?: Boolean,
    right ?: Boolean,
    bottom ?: Boolean,
    left ?: Boolean
}

interface toastFunc {
    (content: string, type ?: string, options ?: ToastOptions): void
}

export declare const toast: toastFunc

declare module 'vue/types/vue' {
    export interface Vue {
        $toast: toastFunc
    }
}

