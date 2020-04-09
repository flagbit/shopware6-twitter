import template from './sw-cms-el-twitter-buttons.html.twig';
import './sw-cms-el-twitter-buttons.scss';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-twitter-buttons', {
    template,

    inject: [
        'configDataProviderService'
    ],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.twitterButtons': {
            handler: async function() {
                if ('' === this.element.config.twitterButtons.buttonType) {
                    return;
                }

                this.$data.hrefText = this.getAttrByType(
                    this.element.config.twitterButtons.buttonType,
                    'href'
                );
                this.$data.classText = this.getAttrByType(
                    this.element.config.twitterButtons.buttonType,
                    'class'
                );
                this.$data.message = this.getAttrByType(
                    this.element.config.twitterButtons.buttonType,
                    'message'
                );
                await this.$nextTick();
            },
            deep: true
        }
    },

    data() {
        return {
            hrefText: '',
            classText: '',
            message: '',
        };
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
        },
        getAttrByType(type, attr) {
            const options = this.configDataProviderService.getSyncData();
            for (let [key, button] of Object.entries(options)) {
                if (type === button.id && attr in button) {
                    return button[attr];
                }
            }

            return '';
        }
    }
});
