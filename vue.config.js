const ossRegion = process.env.ALI_OSS_REGION
const ossBuildPath = 'static/vuetify-starter'
const isOss = process.env.STATIC_BUILD_MODE === 'oss'
const ossBucket = process.env.ALI_OSS_BUCKET
module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    chainWebpack: config => {
        if (isOss) {
            config
                .plugin('webpack-aliyun-oss-plugin')
                .use(require('webpack-aliyun-oss-plugin'), [{
                    buildPath: `${ossBuildPath}/**`, //更换构建目录
                    region: ossRegion,
                    ak: process.env.ALI_OSS_AK,
                    sk: process.env.ALI_OSS_SK,
                    bucket: process.env.ALI_OSS_BUCKET,
                    filter: function (asset) {
                        return !/\.html$/.test(asset)
                    }
                }])
        }
    },
    publicPath: (process.env.NODE_ENV !== 'development' && isOss) ? (`https://${ossBucket}.${ossRegion}.aliyuncs.com/${ossBuildPath}`) : './',
}
