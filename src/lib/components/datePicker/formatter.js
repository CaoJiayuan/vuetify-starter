import dayjs from 'dayjs'

let formatters = {}

export function registerDateFormatter(name, fm) {
    formatters[name] = fm
}

const ts = {
    encode(date) {
        return dayjs(date).unix()
    },
    decode(ts) {
        if (ts) {
            return dayjs.unix(ts).format('YYYY-MM-DD')
        }
        return null
    }
}

const def = {
    encode(date) {
        return date
    },
    decode(date) {
        return date
    }
}


export function initDefaultFormatter() {
    registerDateFormatter('ts', ts)
}


export function getFormatter(name) {
    return formatters[name] || def
}