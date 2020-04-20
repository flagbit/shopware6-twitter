import template from './sw-cms-el-config-twitter-timeline.html.twig';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-config-twitter-timeline', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            selectOptions: [
                {
                    id: 'profile',
                    name: this.$tc('sw-cms.elements.twitterTimeline.type.profile'),
                },
                {
                    id: 'profileLikes',
                    name: this.$tc('sw-cms.elements.twitterTimeline.type.profileLikes'),
                },
                {
                    id: 'collections',
                    name: this.$tc('sw-cms.elements.twitterTimeline.type.collections'),
                },
                {
                    id: 'lists',
                    name: this.$tc('sw-cms.elements.twitterTimeline.type.lists'),
                }
            ],
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-timeline');
        },

        showListsField() {
            return (this.element.config.timelineType.value === 'lists');
        },

        showCollectionsField() {
            return (this.element.config.timelineType.value === 'collections')
        }
    }
});
