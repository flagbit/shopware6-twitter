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
                    name: this.$tc('sw-cms.twitter-buttons.label.buttonOptionShare'),
                },
                {
                    id: 'follow',
                    name: this.$tc('sw-cms.twitter-buttons.label.buttonOptionFollow'),
                },
                {
                    id: 'mention',
                    name: this.$tc('sw-cms.twitter-buttons.label.buttonOptionMention'),
                },
                {
                    id: 'hashtag',
                    name: this.$tc('sw-cms.twitter-buttons.label.buttonOptionHashtag'),
                },
                {
                    id: 'message',
                    name: this.$tc('sw-cms.twitter-buttons.label.buttonOptionMessage'),
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
    },
});
