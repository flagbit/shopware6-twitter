import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twitter-button',
    label: 'sw-cms.elements.twitterButton.label',
    component: 'sw-cms-el-twitter-button',
    configComponent: 'sw-cms-el-config-twitter-button',
    previewComponent: 'sw-cms-el-preview-twitter-button',
    defaultConfig: {
        href: {
            source: 'static',
            value: '',
        },
        handle: {
            source: 'static',
            value: 'flagbit',
        },
        buttonType: {
            source: 'static',
            value: 'share',
        },
        userId: {
            source: 'static',
            value: '',
        },
        className: {
            source: 'static',
            value: '',
        }
    }
});
