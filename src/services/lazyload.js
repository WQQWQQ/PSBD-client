import defaultImg from '../images/default.jpg';
import {
    addEvent,
    removeEvent
}
from './utils';
export default(Vue, option = {}) => {
    const lazyload = (el, binding) => {
        if(!el || el.getAttribute('data-load')) return;
        let {
            src,
            defaultSrc = defaultImg,
            container = window
        } = binding.value;
        let defaultImage = document.createElement("div"),
            img;
        defaultImage.style.cssText = `width:100%;height:100%;background:#eff6ff url(${defaultSrc}) center no-repeat;`;
        const errorFn = () => {
            el.setAttribute('data-load', true);
            img && el.hasChildNodes() && el.removeChild(img);
            el.appendChild(defaultImage);
        }
        if(!src) {
            errorFn();
            return;
        }
        img = new Image();
        img.style.cssText = "height:100%;width:100%;";
        img.onerror = errorFn;
        el.appendChild(img);
        const scrollFn = (e) => {
            requestAnimationFrame(() => {
                if(el.getBoundingClientRect().top + 10 < top.innerHeight) {
                    img.src = src;
                    el.setAttribute('data-load', true);
                    removeEvent(container, 'scroll', scrollFn);
                }
            });
        }
        addEvent(container, 'scroll', scrollFn);
        scrollFn();
    };
    Vue.directive('lazyload', {
        inserted: lazyload,
        update: lazyload
    });
}
