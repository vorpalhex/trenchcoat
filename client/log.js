const ipcRenderer = require('electron').ipcRenderer;

function sendLog(level, ...args){
  return ipcRenderer.send('log', level, ...args)
}

module.exports = {
  trace: (...args) => sendLog('trace', ...args),
  debug: (...args) => sendLog('debug', ...args),
  info: (...args) => sendLog('info', ...args),
  warn: (...args) => sendLog('warn', ...args),
  error: (...args) => sendLog('error', ...args),
};
