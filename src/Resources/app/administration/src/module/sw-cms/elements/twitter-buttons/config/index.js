import template from './sw-cms-el-config-twitter-buttons.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-twitter-buttons', {
    template,

    inject: [
        'configDataProviderService'
    ],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.buttonType': {
            handler() {
                this.configDataProviderService.setSyncData(this.$data.buttonOptions);
            },
            deep: true
        },
        'element.config.handle': {
            handler() {
                this.configDataProviderService.setSyncData(this.$data.buttonOptions);
            },
            deep: true
        },
        'element.config.userId': {
            handler() {
                this.configDataProviderService.setSyncData(this.$data.buttonOptions);
            },
            deep: true
        }
    },

    data() {
        return {
            scriptInit: false,
            userId: '',
            handle: '',
            buttonType: '',
            buttonOptions: [
                {
                    id: 'share',
                    name: this.$tc('sw-cms.elements.twitterButtons.share.label'),
                    href: 'https://twitter.com/share',
                    class: 'twitter-share-button',
                    message: 'Tweet',
                },
                {
                    id: 'follow',
                    name: this.$tc('sw-cms.elements.twitterButtons.follow.label'),
                    href: 'https://twitter.com/__HANDLE__',
                    class: 'twitter-follow-button',
                    message: 'Follow @__HANDLE__',
                },
                {
                    id: 'mention',
                    name: this.$tc('sw-cms.elements.twitterButtons.mention.label'),
                    href: 'https://twitter.com/intent/tweet?screen_name=__HANDLE__',
                    class: 'twitter-mention-button',
                    message: 'Tweet to @__HANDLE__',
                },
                {
                    id: 'hashtag',
                    name: this.$tc('sw-cms.elements.twitterButtons.hashtag.label'),
                    href: 'https://twitter.com/intent/tweet?button_hashtag=__HANDLE__',
                    class: 'twitter-hashtag-button',
                    message: 'Tweet #__HANDLE__',
                },
                {
                    id: 'message',
                    name: this.$tc('sw-cms.elements.twitterButtons.message.label'),
                    href: 'https://twitter.com/messages/compose?recipient_id=__USER_ID__',
                    class: 'twitter-dm-button',
                    message: 'Message @__HANDLE__',
                }
            ],
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-buttons');
        },
        initTwitterScript() {
            if (this.$data.scriptInit) {
                const element = document.querySelector('#twitter-platform-script');
                if (element) {
                    element.remove();
                    this.$data.scriptInit = false;
                }
            }
            this.$data.scriptInit = true;

            let twitterIframe = document.createElement('script');
            twitterIframe.async = true;
            twitterIframe.defer = true;
            twitterIframe.setAttribute('id', 'twitter-platform-script');
            twitterIframe.setAttribute('charset', 'utf-8');
            twitterIframe.setAttribute('src', 'https://platform.twitter.com/widgets.js');

            document.head.appendChild(twitterIframe);
        },
        showHandle() {
            const excludes = ['share'];
            let types = '';
            for (let [key, button] of Object.entries(this.$data.buttonOptions)) {
                if (excludes.includes(button.id)) {
                    continue;
                }
                types += button.id;
            }

            return '' !== this.element.config.buttonType &&
                types.includes(this.element.config.buttonType);
        },
        showUserId() {
            return 'message' === this.element.config.buttonType;
        }
    },
});
