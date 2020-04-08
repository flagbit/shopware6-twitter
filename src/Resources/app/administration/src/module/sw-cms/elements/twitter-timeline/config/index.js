import template from './sw-cms-el-config-twitter-timeline.html.twig';

const {Component, Mixin} = Shopware;

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
        }
    }
});
