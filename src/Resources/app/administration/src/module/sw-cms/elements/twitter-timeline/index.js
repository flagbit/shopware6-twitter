import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twitter-timeline',
    label: 'sw-cms.elements.customTwitterTimelineElement.label',
    component: 'sw-cms-el-twitter-timeline',
    configComponent: 'sw-cms-el-config-twitter-timeline',
    previewComponent: 'sw-cms-el-preview-twitter-timeline',
    defaultConfig: {
        twitterHandle: {
            source: 'static',
            value: ''
        }
    }
});
