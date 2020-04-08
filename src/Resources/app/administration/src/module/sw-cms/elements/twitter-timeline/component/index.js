import template from './sw-cms-el-twitter-timeline.html.twig';
import './sw-cms-el-twitter-timeline.scss';

const {Component, Mixin} = Shopware;


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
        twitterHandle() {
            const elemData = this.element.config;
            if (elemData && elemData.twitterHandle) {
                return 'https://twitter.com/' + elemData.twitterHandle.value;
            }
        },

        setTwitterHref(twitterHref) {
            const elemData = this.element.config;
            if (elemData && elemData.twitterHref) {
                this.element.config.twitterHref.value = twitterHref;
            }
        },

        twitterHref() {
            const elemData = this.element.config;
            const twitterHandle = this.twitterHandle();
            if (elemData && elemData.timelineType) {
                if (elemData.timelineType.value === 'profile') {
                    return twitterHandle;
                }

                if (elemData.timelineType.value === 'profileLikes') {
                    return twitterHandle + '/likes';
                }

                if (elemData.timelineType.value === 'collections' && elemData.timelineCollection) {
                    return twitterHandle + '/timelines/' + elemData.timelineCollection.value;
                }

                if (elemData.timelineType.value === 'lists' && elemData.timelineList) {
                    return twitterHandle + '/lists/' + elemData.timelineList.value;
                }
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
            const component = this.$refs.twitterTimeline;
            const twitterHref = this.twitterHref();
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(this.twitterText()));
            a.className = 'twitter-timeline';
            a.title = this.twitterText();
            a.href = twitterHref;
            component.appendChild(a);
            this.setTwitterHref(twitterHref);
        },

        removeTwitterJs() {
            const element = this.queryTwitterSrc();
            if (element.length === 1) {
                const item = element.item(0);
                item.remove()
            }
        },

        removeTwitterIframe() {
            const element = this.$refs.twitterTimeline;
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
