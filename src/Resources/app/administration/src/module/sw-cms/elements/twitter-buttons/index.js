import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'twitter-buttons',
    label: 'sw-cms.elements.customTwitterButtonsElement.label',
    component: 'sw-cms-el-twitter-buttons',
    configComponent: 'sw-cms-el-config-twitter-buttons',
    previewComponent: 'sw-cms-el-preview-twitter-buttons',
    defaultConfig: {
        twitterButtons: {
            handle: '',
            userId: '',
            buttonType: '',
            buttonOptions: {
                share: {
                    label: 'Twitter Share Button',
                    placeholder: '',
                    class: 'twitter-share-button',
                },
                follow: {
                    label: 'Twitter Follow Button',
                    placeholder: 'Paste a profile URL or @username',
                    class: 'twitter-follow-button',
                },
                mention: {
                    label: 'Twitter Mention Button',
                    placeholder: 'Paste a profile URL or @username',
                    class: 'twitter-mention-button',
                },
                hashtag: {
                    label: 'Twitter Hashtag Button',
                    placeholder: 'Paste a hashtag URL or #hashtag',
                    class: 'twitter-hashtag-button',
                },
                message: {
                    label: 'Twitter Message Button',
                    placeholder: 'Paste a profile URL or @username',
                    class: 'twitter-dm-button',
                }
            }
        }
    }
});
