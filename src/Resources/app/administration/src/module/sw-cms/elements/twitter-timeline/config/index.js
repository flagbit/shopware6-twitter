import template from './sw-cms-el-config-twitter-timeline.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-twitter-timeline', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-timeline');
        },

        onBlur(event) {
            this.emitChanges(event.currentTarget.value);
        },

        emitChanges(content) {
            if (content !== this.element.config.twitterHandle.value) {
                this.element.config.twitterHandle.value = content;
                this.$emit('element-update', this.element);
            }
        },

        shouldShowTimelineList() {
            return (this.element.config.timelineType.value === 'lists');
        },

        shouldShowTimelineCollection() {
            return (this.element.config.timelineType.value === 'collections');
        }
    }
});
