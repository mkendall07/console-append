/**
 * console-append is a tiny utility to append any string to all console.* functions. For example, if you wanted to add a timestamp to every invocation of console.log():
 * console-append.addAppender(function(){ return new Date().getTime()});
 */

(function(consoleAppend, undefined) {
  if(typeof consoleAppend.addAppender === 'function') {
    return;
  }
  var consoleBackup = window.console;
  /**
   * @param {function} function that returns a string to append
   */
  consoleAppend.addAppender = function(func) {
    if(!isFunc(func)){
        console.error('first argument must by of type function');
        return;
    }

    var logBinded = console.log.bind(window.console);
    var newConsole = function () {
      var appendText = '';
      try{
        appendText = func().toString();
      }catch(e) {
        console.log(e);
      }
        
        //do our append
        Array.prototype.unshift.call(arguments, appendText);
        logBinded(...arguments);
    }
    window.console.log = newConsole;
  };
 
  consoleAppend.restore  = function(){
      window.console = consoleBackup;
  }

  function isFunc(input) {
     return typeof input === 'function';
  }
})(window.consoleAppend= window.consoleAppend || {});