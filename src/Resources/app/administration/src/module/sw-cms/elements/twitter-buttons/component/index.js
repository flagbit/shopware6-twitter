import template from './sw-cms-el-twitter-buttons.html.twig';
import './sw-cms-el-twitter-buttons.scss';

const camelCase = require('lodash.camelcase');
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
        'element.config.buttonType': {
            handler() {
                this.updateFrontend();
            },
            deep: true
        },
        'element.config.scriptInit': {
            handler() {
                this.updateFrontend();
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

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('twitter-buttons');
        },
        updateFrontend() {
            const buttonType = this.element.config.buttonType;
            if ('' === buttonType) {
                return;
            }

            // const component = this.$refs.twitterButtons;
            // if (component) {
            //     const hasChild = !!component.firstChild;
            //     if (hasChild) {
            //         const childElement = component.firstChild;
            //         // remove script if button has been changed
            //         if (childElement instanceof HTMLIFrameElement && !childElement.className.includes(buttonType)) {
            //             component.removeChild(component.firstChild);
            //             this.initTwitterScript();
            //         }
            //     }
            // }

            this.$data.hrefText = this.getAttrByType(
                buttonType,
                'href'
            );
            this.$data.classText = this.getAttrByType(
                buttonType,
                'class'
            );
            this.$data.message = this.getAttrByType(
                buttonType,
                'message'
            );
        },
        getAttrByType(type, attr) {
            const options = this.configDataProviderService.getSyncData();
            for (let [key, button] of Object.entries(options)) {
                if (type === button.id && attr in button) {
                    return this.replaceWithDataAttr(button[attr]);
                }
            }

            return '';
        },
        replaceWithDataAttr(text) {
            let matchedAttr = text.match(/__[A-Z]+(_[A-Z]+)*__/g);
            if (!matchedAttr) {
                return text;
            }
            const attr = camelCase(matchedAttr[0]);

            return text.replace(matchedAttr[0], this.element.config[attr]);
        },
    }
});
