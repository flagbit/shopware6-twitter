import template from './sw-cms-el-config-twitter-button.html.twig';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-config-twitter-button', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            selectOptions: [{
                id: 'share',
                name: this.$tc('sw-cms.elements.twitterButton.share.label'),
            },
            {
                id: 'mention',
                name: this.$tc('sw-cms.elements.twitterButton.mention.label'),
            },
            {
                id: 'follow',
                name: this.$tc('sw-cms.elements.twitterButton.follow.label'),
            },
            {
                id: 'hashtag',
                name: this.$tc('sw-cms.elements.twitterButton.hashtag.label'),
            },
            {
                id: 'message',
                name: this.$tc('sw-cms.elements.twitterButton.message.label'),
            }],
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-button');
        },

        showHandleField() {
            return (this.element.config.buttonType && typeof this.element.config.buttonType.value === 'string' &&
                this.element.config.buttonType.value !== 'share');
        },

        showUserId() {
            return (this.element.config.buttonType && typeof this.element.config.buttonType.value === 'string' &&
                this.element.config.buttonType.value === 'message')
        }
    }
});
