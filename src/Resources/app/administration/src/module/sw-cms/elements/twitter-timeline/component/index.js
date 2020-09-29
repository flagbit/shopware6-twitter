import template from './sw-cms-el-twitter-timeline.html.twig';
import './sw-cms-el-twitter-timeline.scss';
import twitter from '../../../../../lib/twitter';

const {Component, Mixin} = Shopware;


Component.register('sw-cms-el-twitter-timeline', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.handle': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        },
        'element.config.timelineType': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        },
        'element.config.timelineCollection': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        },
        'element.config.timelineList': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        updateTwitterJs() {
            const element = this.element.config;
            const component = this.$refs.twitterTimeline;
            const href = twitter.getTwitterTimelineHref(element, twitter.getHandle(element));
            const className = 'twitter-timeline';

            twitter.removeTwitterJs();
            twitter.removeTwitterIframe(component);
            twitter.addTwitterLink(component, href, twitter.getTwitterTimelineText(element), className)
            twitter.addTwitterJs();
            this.updateValues(href);
        },

        createdComponent() {
            this.initElementConfig('twitter-timeline');
        },

        updateValues(href) {
            this.element.config.href.value = href;
        }
    }
});
