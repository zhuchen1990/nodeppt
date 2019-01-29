import DOM from 'webslides/src/js/utils/dom';
import {default as Slide, Events as SlideEvents} from 'webslides/src/js/modules/slide';

export default class Echarts {
    constructor(wsInstance) {
        this.ws_ = wsInstance;

        const echartsNode = DOM.toArray(this.ws_.el.querySelectorAll('.echarts'));
        const echartsData = DOM.toArray(this.ws_.el.querySelectorAll('.echarts-data'));

        if (echartsNode.length) {
            echartsNode.forEach((chart, j) => {
                const {i} = Slide.getSectionFromEl(chart);
                const slide = wsInstance.slides[i - 1];
                slide.echartsInit = false;
                slide.echartsNode = chart;
                slide.echartsData = echartsData[j];
                // slide.el.addEventListener(SlideEvents.ENTER, Echarts.onSectionEnter);
                slide.el.addEventListener(SlideEvents.ENABLE, Echarts.onSectionEnter);
            });
        }
    }

    static onSectionEnter(event) {
        const slide = event.detail.slide || {};
        const {echartsNode, echartsInit, echartsData} = slide;
        console.log(slide)
        if (!echartsInit) {
            setTimeout(() => {
                const et = echarts.init(echartsNode, window.echartsTheme_);
                try {
                    const data = JSON.parse(echartsData.innerHTML.trim());
                    et.setOption(data);
                    slide.echartsInit = true;
                } catch (e) {}
            }, 800);
        }
    }
}