/**
 * 
 * @description 公用的js
 * @author    hcf  
 * @warning   
 * 
 */

/**
* @desc 函数防抖（debounce）
* @param func 目标函数
* @param waitTime 延迟执行毫秒数
* @param immediate true - 立即执行， false - 延迟执行
*/
function deboundce(func, waitTime, immediate) {
    let timer;
    return function () {
        let content = this;
        let args = arguments;

        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, waitTime);
            if (callNow) func.apply(content, args);
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
            }, waitTime)
        }
    }
}
