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
        'element.config.twitterButtons': {
            handler() {
                this.configDataProviderService.setSyncData(this.$data.buttonOptions);
            },
            deep: true
        }
    },

    data() {
        return {
            userId: '',
            handle: '',
            buttonType: '',
            buttonOptions: [
                {
                    id: 'share',
                    name: this.$tc('sw-cms.elements.twitterButtons.share.label'),
                    href: 'https://twitter.com/share?ref_src=twsrc%5Etfw',
                    class: 'twitter-share-button',
                    message: 'Tweet',
                },
                {
                    id: 'follow',
                    name: this.$tc('sw-cms.elements.twitterButtons.follow.label'),
                    href: this.replaceWithDataAttr('https://twitter.com/__ATTR__?ref_src=twsrc%5Etfw', 'handle'),
                    class: 'twitter-follow-button',
                    message: this.replaceWithDataAttr('Follow @__ATTR__', 'handle'),
                },
                {
                    id: 'mention',
                    name: this.$tc('sw-cms.elements.twitterButtons.mention.label'),
                    href: this.replaceWithDataAttr('https://twitter.com/intent/tweet?screen_name=__ATTR__&ref_src=twsrc%5Etfw', 'handle'),
                    class: 'twitter-mention-button',
                    message: this.replaceWithDataAttr('Tweet to @__ATTR__', 'handle'),
                },
                {
                    id: 'hashtag',
                    name: this.$tc('sw-cms.elements.twitterButtons.hashtag.label'),
                    href: this.replaceWithDataAttr('https://twitter.com/intent/tweet?button_hashtag=__ATTR__&ref_src=twsrc%5Etfw', 'handle'),
                    class: 'twitter-hashtag-button',
                    message: this.replaceWithDataAttr('Tweet #__ATTR__', 'handle'),
                },
                {
                    id: 'message',
                    name: this.$tc('sw-cms.elements.twitterButtons.message.label'),
                    href: this.replaceWithDataAttr('https://twitter.com/messages/compose?recipient_id=__ATTR__&ref_src=twsrc%5Etfw', 'userId'),
                    class: 'twitter-dm-button',
                    message: this.replaceWithDataAttr('Message @__ATTR__', 'handle'),
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
        replaceWithDataAttr(text, attr) {
            return text.replace('__ATTR__', this.element.config.twitterButtons[attr]);
        },
        showHandle() {
            let types = '';
            for (let [key, button] of Object.entries(this._data.buttonOptions)) {
                types += button.id;
            }

            return '' !== this.element.config.twitterButtons.buttonType &&
                types.includes(this.element.config.twitterButtons.buttonType);
        },
        showUserId() {
            return 'message' === this.element.config.twitterButtons.buttonType;
        }
    },
});
