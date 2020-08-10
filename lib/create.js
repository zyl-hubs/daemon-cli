const fs = require('fs');
const path = require('path');
const MetalSmith = require('metalsmith'); // 模板编译

module.exports = async (name, cmd, result) => {
  /**
   * #TODO
   * 1、如果有ask.js或ask.json文件，根据询问用户输入值插入到项目模板中，那么下载后就需要对模板进行编译后再生成项目
   * 2、生成项目后开辟子进程安装依赖
   * 3、展示依赖安装进度
   */
  console.log(name, cmd);
  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    // 直接拷贝
  } else {
    // 把git上的项目下载下来，如果有ask文件就是一个复杂的模板，我们需要用户选择，选择后编译模板
  }
};
