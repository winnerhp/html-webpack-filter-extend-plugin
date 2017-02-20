// HtmlWebpackFilterExtendPlugin.js

function HtmlWebpackFilterExtendPlugin(options) {
}

HtmlWebpackFilterExtendPlugin.prototype.replace = function(html) {
    return html.replace(/\{\%\s*load\s+([^\%\}]+)\%\}/g,'')
            .replace(/\{\%\s*static_url\s+((['"])([^'"\%\}]+)\2)\s*\%\}/g,'')
            .replace(/\|(jsonify|to_local_web|datetime2_chinese_day)/g,'')
            .replace(/\|highlight\:.+\}\}/g,'');
}

HtmlWebpackFilterExtendPlugin.prototype.apply = function(compiler) {
    var that = this;
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            htmlPluginData.html = that.replace(htmlPluginData.html);
            callback(null, htmlPluginData)
        });
    });
};

module.exports = HtmlWebpackFilterExtendPlugin;