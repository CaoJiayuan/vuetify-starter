import dayjs from 'dayjs'

let formatters = {}

export function registerDatetimeFormatter(name, fm) {
    formatters[name] = fm
}

const ts = {
    encode(date) {
        return dayjs(date).unix()
    },
    decode(ts) {
        if (ts) {
            return dayjs.unix(ts).toISOString()
        }
        return null
    }
}

const def = {
    encode(date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    decode(date) {
        if (date) {
            return dayjs(date).toISOString()
        }
        return null
    }
}

export function initDefaultDtFormatter() {
    registerDatetimeFormatter('ts', ts)
}


export function getFormatter(name) {
    return formatters[name] || def
}
