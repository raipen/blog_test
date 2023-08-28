const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/entry.js', // webpack 최초 진입점(엔트리 포인트) 파일 경로를 설정합니다.
  output: { // webpack을 실행한 후의 결과물의 이름/경로 등을 설정합니다.
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.html', // 번들링 파일을 주입하여 번들링 폴더로 복사할 대상 HTML 파일을 설정합니다.
    }),
  ],
  devServer: { // webpack-dev-server 옵션을 설정합니다.
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true, // 404 페이지 대신 index.html로 이동합니다.
    hot: true, // 모듈 전체를 다시 로드하지 않고 변경된 사항만 갱신합니다.
    port: 3000,
    open: true,
  },
  resolve: { // resolve: import를 할 때 확장자를 생략할 수 있습니다.
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  module: {
    // loader 설정 - 등록한 로더의 뒤의 요소부터 번들링에 반영
    // node_modules 제외
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[contenthash].[ext]',
        },
      },
    ],
  },
};