import template from './sw-cms-el-config-twitter-buttons.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-twitter-buttons', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            userId: '',
            handle: '',
            buttonType: '',
            buttonOptions: [
                {
                    id: 'share',
                    name: this.$tc('sw-cms.twitterButtons.share.label'),
                },
                {
                    id: 'follow',
                    name: this.$tc('sw-cms.twitterButtons.follow.label'),
                },
                {
                    id: 'mention',
                    name: this.$tc('sw-cms.twitterButtons.mention.label'),
                },
                {
                    id: 'hashtag',
                    name: this.$tc('sw-cms.twitterButtons.hashtag.label'),
                },
                {
                    id: 'message',
                    name: this.$tc('sw-cms.twitterButtons.message.label'),
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

        showHandle() {
            let types = '';
            for (let [key, value] of Object.entries(this._data.buttonOptions)) {
                types += value.id;
            }

            return '' !== this.element.config.twitterButtons.buttonType &&
                types.includes(this.element.config.twitterButtons.buttonType);
        },

        showUserId() {
            return 'message' === this.element.config.twitterButtons.buttonType;
        }
    },
});
