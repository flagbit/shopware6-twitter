import template from './sw-cms-el-twitter-button.html.twig';
import './sw-cms-el-twitter-button.scss';
import twitter from '../../../../../lib/twitter';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-twitter-button', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.buttonType': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        },
        'element.config.handle': {
            handler() {
                this.updateTwitterJs();
            },
            deep: true
        },
        'element.config.userId': {
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
            const component = this.$refs.twitterButton;
            const href = twitter.getTwitterButtonHref(element);
            const className = twitter.getTwitterButtonClassName(element);
            const text = twitter.getTwitterButtonText(element);

            twitter.removeTwitterJs();
            twitter.removeTwitterIframe(component);
            twitter.addTwitterLink(component, href, text, className)
            twitter.addTwitterJs();
            this.updateValues(href, className)
        },

        createdComponent() {
            this.initElementConfig('twitter-button');
        },

        updateValues(href, className, text) {
            this.element.config.href.value = href;
            this.element.config.className.value = className;
        }
    }
});
