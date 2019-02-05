var path = require('path');

module.exports = {
    mode: "none",
    entry: {
        "public/en": "./src/public/en/index.jsx",
        "public/ru": "./src/public/ru/index.jsx",
        "public/en/catalog": "./src/public/en/catalog/index.jsx",
        "public/ru/catalog": "./src/public/ru/catalog/index.jsx",
        "public/en/value": "./src/public/en/value/index.jsx",
        "public/ru/value": "./src/public/ru/value/index.jsx",
        "private/en": "./src/private/en/index.jsx",
        "private/ru": "./src/private/ru/index.jsx",
        "private/en/uservalues": "./src/private/en/uservalues/index.jsx",
        "private/ru/uservalues": "./src/private/ru/uservalues/index.jsx",
        "private/en/catalog": "./src/private/en/catalog/index.jsx",
        "private/ru/catalog": "./src/private/ru/catalog/index.jsx",
        "private/en/value": "./src/private/en/value/index.jsx",
        "private/ru/value": "./src/private/ru/value/index.jsx",
        "private/en/uservalue": "./src/private/en/uservalue/index.jsx",
        "private/ru/uservalue": "./src/private/ru/uservalue/index.jsx",
        "private/en/profile/artist": "./src/private/en/profile/artist/index.jsx",
        "private/ru/profile/artist": "./src/private/ru/profile/artist/index.jsx",
        "private/en/newvalue/pict": "./src/private/en/newvalue/pict/index.jsx",
        "private/ru/newvalue/pict": "./src/private/ru/newvalue/pict/index.jsx",
        "private/en/editvalue/pict": "./src/private/en/editvalue/pict/index.jsx",
        "private/ru/editvalue/pict": "./src/private/ru/editvalue/pict/index.jsx",
    },
    output:{
        path: path.resolve(__dirname, './'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/',
        filename: "[name]/bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react", {
                        'plugins': ['@babel/plugin-proposal-class-properties']}]    // используемые плагины
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}