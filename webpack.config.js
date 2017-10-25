const path = require('path');

module.exports = {
    devServer: {
        inline: true,
        port: 3000
    },
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets:['es2015', 'react']
            }
        }]
    }
};


/*
const path = require('path');

module.exports = {
entry: './path/to/my/entry/file.js',
output: {
path: path.resolve(__dirname, 'dist'),
filename: 'my-first-webpack.bundle.js'
}
};


{ 
    test: /\.jsx?$/,         // Match both .js and .jsx files
    exclude: /node_modules/, 
    loader: "babel", 
    query:
      {
        presets:['react']
      }

      Invalid:
  `{ presets: [{option: value}] }`
Valid:
  `{ presets: [['presetName', {option: value}]] }`

}
*/