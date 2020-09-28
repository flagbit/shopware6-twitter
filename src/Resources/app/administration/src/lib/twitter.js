export default class Twitter {
    static getTwitterJsSrc()
    {
        return 'https://platform.twitter.com/widgets.js';
    }

    static getTwitterBaseUrl()
    {
        return 'https://twitter.com/';
    }

    static queryTwitterSrc()
    {
        return document.querySelectorAll(`script[src="${this.getTwitterJsSrc()}"]`);
    }

    static addTwitterJs()
    {
        if (this.queryTwitterSrc().length === 0) {
            const twitterScript = document.createElement('script');
            twitterScript.setAttribute('src', this.getTwitterJsSrc());
            twitterScript.setAttribute('charset', 'utf-8');
            twitterScript.setAttribute('async', '');
            document.head.appendChild(twitterScript);
        }
    }

    static removeTwitterJs()
    {
        const element = this.queryTwitterSrc();
        if (element.length === 1) {
            const item = element.item(0);
            item.remove()
        }
    }

    static removeTwitterIframe(element)
    {
        if (typeof element !== 'undefined') {
            element.textContent = '';
        }
    }

    static getTwitterTimelineHref(elementConfig, twitterHandle)
    {
        if (elementConfig && elementConfig.timelineType) {
            if (elementConfig.timelineType.value === 'profileLikes') {
                return twitterHandle + '/likes';
            }

            if (elementConfig.timelineType.value === 'collections' && elementConfig.timelineCollection) {
                return twitterHandle + '/timelines/' + elementConfig.timelineCollection.value;
            }

            if (elementConfig.timelineType.value === 'lists' && elementConfig.timelineList) {
                return twitterHandle + '/lists/' + elementConfig.timelineList.value;
            }
        }

        return twitterHandle; // default profile will be returned
    }

    /**
     * @param elementConfig
     * @returns {string|*}
     *
     * Share-Button: <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
     * Mention-Button: <a href="https://twitter.com/intent/tweet?screen_name=TwitterDev&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @TwitterDev</a>
     * Follow-Button: <a href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @TwitterDev</a>
     * Hash-Tag-Button: <a href="https://twitter.com/intent/tweet?button_hashtag=LoveTwitter&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">Tweet #LoveTwitter</a>
     * Message-Button: <a href="https://twitter.com/messages/compose?recipient_id=1234&ref_src=twsrc%5Etfw" class="twitter-dm-button" data-screen-name="Brocksinet" data-show-count="false">Message @Brocksinet</a>
     *
     */
    static getTwitterButtonHref(elementConfig)
    {
        const twitterUrl = Twitter.getTwitterBaseUrl();
        if (Twitter.isTwitterButtonValid(elementConfig)) {
            const twitterHandle = Twitter.getHandle(elementConfig, false);
            if (elementConfig.buttonType.value === 'mention') {
                return twitterUrl + 'intent/tweet?screen_name=' + twitterHandle + '&ref_src=twsrc%5Etfw';
            }

            if (elementConfig.buttonType.value === 'follow') {
                return twitterUrl + twitterHandle + '?ref_src=twsrc%5Etfw';
            }

            if (elementConfig.buttonType.value === 'hashtag') {
                return twitterUrl + 'intent/tweet?button_hashtag=' + twitterHandle + '&ref_src=twsrc%5Etfw';
            }

            if (elementConfig.buttonType.value === 'message' && elementConfig.userId) {
                return twitterUrl + 'messages/compose?recipient_id=' + elementConfig.userId.value + '&ref_src=twsrc%5Etfw';
            }
        }

        return twitterUrl + '/share?ref_src=twsrc%5Etfw'; // default share button
    }

    static getTwitterButtonClassName(elementConfig)
    {
        if (elementConfig && elementConfig.buttonType) {
            if (elementConfig.buttonType.value !== 'message') {
                return 'twitter-' + elementConfig.buttonType.value + '-button';
            }
        }

        return 'twitter-dm-button';
    }

    /**
     *
     * @param elementConfig
     * @param addTwitterUrl
     * @returns {string}
     */
    static getHandle(elementConfig, addTwitterUrl = true)
    {
        let twitterUrl = '';
        if (true === addTwitterUrl) {
            twitterUrl  = Twitter.getTwitterBaseUrl();
        }
        if (elementConfig && elementConfig.handle) {
            return twitterUrl + elementConfig.handle.value;
        }

        return twitterUrl + 'flagbit';
    }

    /**
     * @param elementConfig
     * @returns {string}
     */
    static getTwitterTimelineText(elementConfig)
    {
        if (elementConfig && elementConfig.handle && elementConfig.handle.value !== '') {
            return 'Tweets by ' + elementConfig.handle.value;
        }

        return 'Tweets by flagbit';
    }

    /**
     * @param elementConfig
     * @returns {string}
     */
    static getTwitterButtonText(elementConfig)
    {
        const twitterHandle = Twitter.getHandle(elementConfig, false);
        if (Twitter.isTwitterButtonValid(elementConfig)) {
            if (elementConfig.buttonType.value === 'mention') {
                return 'Tweet to @' + twitterHandle;
            }

            if (elementConfig.buttonType.value === 'follow') {
                return 'Follow @' + twitterHandle;
            }

            if (elementConfig.buttonType.value === 'hashtag') {
                return 'Tweet #' + twitterHandle;
            }

            if (elementConfig.buttonType.value === 'message') {
                return 'Message @' + twitterHandle;
            }
        }

        return 'Tweet'; // default Share Button
    }

    static isTwitterButtonValid(elementConfig)
    {
        return (elementConfig && elementConfig.buttonType  && elementConfig.handle
            && typeof elementConfig.buttonType.value === 'string')
    }

    /**
     * @param component
     * @param href
     * @param text
     * @param className
     */
    static addTwitterLink(component, href, text, className)
    {
        let a = document.createElement('a');
        a.appendChild(document.createTextNode(text));
        a.className = className;
        a.title = text;
        a.href = href;
        component.appendChild(a);
    }
}
