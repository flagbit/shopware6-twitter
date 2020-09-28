import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twitter-timeline',
    label: 'sw-cms.elements.twitterTimeline.label',
    component: 'sw-cms-el-twitter-timeline',
    configComponent: 'sw-cms-el-config-twitter-timeline',
    previewComponent: 'sw-cms-el-preview-twitter-timeline',
    defaultConfig: {
        href: {
            source: 'static',
            value: '',
        },
        handle: {
            source: 'static',
            value: 'flagbit',
            required: true
        },
        timelineType: {
            source: 'static',
            value: 'profile'
        },
        timelineList: {
            source: 'static',
            value: ''
        },
        timelineCollection: {
            source: 'static',
            value: ''
        }
    }
});
