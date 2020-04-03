import template from './sw-cms-el-twitter-buttons.html.twig';
import './sw-cms-el-twitter-buttons.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-twitter-buttons', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.twitterButtons': {
            handler() {
                console.log('component config', this.element.config.twitterButtons);
            },
            deep: true
        }
    },

    mounted() {
        this.initTwitterScript();
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-buttons');
        },
        initTwitterScript() {
            let twitterIframe = document.createElement('script');
            twitterIframe.async = true;
            twitterIframe.defer = true;
            twitterIframe.setAttribute('charset', 'utf-8');
            twitterIframe.setAttribute('src', 'https://platform.twitter.com/widgets.js');

            document.head.appendChild(twitterIframe);
        }
    }
});
