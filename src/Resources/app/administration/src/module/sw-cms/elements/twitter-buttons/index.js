import './service/configDataProvider.service'
import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twitter-buttons',
    label: 'sw-cms.elements.twitterButtons.label',
    component: 'sw-cms-el-twitter-buttons',
    configComponent: 'sw-cms-el-config-twitter-buttons',
    previewComponent: 'sw-cms-el-preview-twitter-buttons',
    service: 'configDataProviderService',
    defaultConfig: {
        handle: '',
        userId: '',
        buttonType: '',
        buttonOptions: {}
    }
});
