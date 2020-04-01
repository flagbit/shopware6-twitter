import template from './sw-cms-el-twitter-timeline.html.twig';
import './sw-cms-el-twitter-timeline.scss';

const { Component, Mixin } = Shopware;


Component.register('sw-cms-el-twitter-timeline', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    watch: {
        'element.config.twitterHandle': {
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
        twitterHandle() {
            const elemData = this.element.config;

            if (elemData && elemData.twitterHandle) {
                return 'https://twitter.com/' + this.element.config.twitterHandle.value;
            }
        },

        twitterText() {
            const elemData = this.element.config;

            if (elemData && elemData.twitterHandle) {
                return 'Tweets by ' + this.element.config.twitterHandle.value;
            }
        },

        getTwitterJsSrc() {
          return 'https://platform.twitter.com/widgets.js';
        },

        queryTwitterSrc() {
            return document.querySelectorAll(`script[src="${this.getTwitterJsSrc()}"]`);
        },

        queryComponent() {
            return document.getElementById('flagbit-twitter-timeline');
        },

        addTwitterJs() {
            if (this.queryTwitterSrc().length === 0) {
                const twitterScript = document.createElement('script');
                twitterScript.setAttribute('src', this.getTwitterJsSrc());
                twitterScript.setAttribute('charset', 'utf-8');
                twitterScript.setAttribute('async', '');
                document.head.appendChild(twitterScript);
            }
        },

        addTwitterLink() {
            let component = this.queryComponent();
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(this.twitterText()));
            a.className = 'twitter-timeline';
            a.title = this.twitterText();
            a.href = this.twitterHandle();
            component.appendChild(a);
        },

        removeTwitterJs() {
            const element = this.queryTwitterSrc();
            if (element.length === 1) {
                const item = element.item(0);
                item.remove()
            }
        },

        removeTwitterIframe() {
            const element = this.queryComponent();
            element.textContent = '';
        },

        updateTwitterJs() {
            this.removeTwitterJs();
            this.removeTwitterIframe();
            this.addTwitterLink();
            this.addTwitterJs();
        },

        createdComponent() {
            this.initElementConfig('twitter-timeline');
        }
    }
});
