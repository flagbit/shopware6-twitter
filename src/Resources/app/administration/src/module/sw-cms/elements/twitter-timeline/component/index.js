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
        getTwitterHandle() {
            const elemData = this.element.config;
            const twitterUrl = 'https://twitter.com/';
            if (elemData && elemData.twitterHandle) {
                return twitterUrl + elemData.twitterHandle.value;
            }

            return twitterUrl + 'flagbit';
        },

        setTwitterHref(twitterHref) {
            const elemData = this.element.config;
            if (elemData && elemData.twitterHref) {
                elemData.twitterHref.value = twitterHref;
            }
        },

        getTwitterHref() {
            const elemData = this.element.config;
            const twitterHandle = this.getTwitterHandle();
            if (elemData && elemData.timelineType) {
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

            return twitterHandle; // default profile will be returned
        },

        getTwitterText() {
            const elemData = this.element.config;
            if (elemData && elemData.twitterHandle) {
                return 'Tweets by ' + elemData.twitterHandle.value;
            }

            return 'Tweets by flagbit';
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
            const twitterHref = this.getTwitterHref();
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(this.getTwitterText()));
            a.className = 'twitter-timeline';
            a.title = this.getTwitterText();
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
