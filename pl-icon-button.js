import { PlElement, html, css } from "polylib";
import "@plcmp/pl-icon";

class PlIconButton extends PlElement {
    static properties = {
        iconset: { type: String },
        size: { type: Number, value: '16' },
        variant: { type: String, reflectToAttribute: true, value: 'secondary' },
        icon: { type: String },
        disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
        tabindex: { type: String, value: '0', reflectToAttribute: true },
        hidden: { type: Boolean, reflectToAttribute: true },
        negative: { type: Boolean, reflectToAttribute: true }
    }

    static css = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--base-size-md);
            height: var(--base-size-md);;
            box-sizing: border-box;
            border-radius: var(--border-radius);
            color: var(--primary-lightest);
            user-select: none;
            cursor: pointer;
            outline: none;
            flex-shrink: 0;
            transition: background .3s ease-in-out;
        }

        :host([hidden]) {
            display: none;
        }

        /* primary */
        :host([variant=primary]) {
            background: var(--primary-base);
        }

        :host([variant=primary]:hover),
        :host([variant=primary]:focus) {
            background: var(--primary-dark);
        }

        :host([variant=primary]:active) {
            background: var(--primary-darkest);
        }

        /* primary-negative */
        :host([variant=primary][negative]) {
            --primary-base: var(--negative-base);
            --primary-dark: var(--negative-dark);
            --primary-darkest: var(--negative-darkest);
        }

        /* secondary */
        :host([variant=secondary]) {
            background: var(--primary-lightest);
            color: var(--primary-base);
            border: 1px solid var(--primary-light);
        }

        :host([variant=secondary]:hover),:host([variant=secondary]:focus) {
            background: var(--primary-light);
            color: var(--primary-dark);
            border: 1px solid var(--primary-light);
        }

        :host([variant=secondary]:active) {
            background: var(--primary-light);
            color: var(--primary-darkest);
            border: 1px solid var(--primary-base);
        }

        /* ghost */
        :host([variant=ghost]) {
            background: transparent;
            color: var(--primary-base);
            border: 1px solid var(--primary-base);
        }

        :host([variant=ghost]:hover),:host([variant=ghost]:focus) {
            border: 1px solid var(--primary-base);
            color: var(--primary-base);
            background: var(--primary-lightest);
        }

        :host([variant=ghost]:active) {
            background: var(--primary-light);
            color: var(--primary-dark);
            border: 1px solid var(--primary-dark);
        }

        /* link */
        :host([variant=link]) {
            background: transparent;
            color: var(--primary-base);
        }

        :host([variant=link]:hover),:host([variant=link]:focus) {
            background: transparent;
            color: var(--primary-dark);
            filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
        }

        :host([variant=link]:active) {
            background: transparent;
            filter: none;
            color:  var(--primary-darkest);
        }

        /* negative */
        :host([negative]) {
            --primary-base: var(--negative-base);
            --primary-light: var(--negative-light);
            --primary-lightest: var(--negative-lightest);
            --primary-dark: var(--negative-dark);
            --primary-darkest: var(--negative-darkest);
        }

        :host([disabled][variant="primary"]) {
            background: var(--grey-light);
            border: none;
            color: var(--grey-dark);
            cursor: not-allowed;
            pointer-events: none;
        }

        :host([disabled][variant="secondary"]) {
            border: 1px solid var(--grey-light);
            background: var(--grey-lightest);
            color: var(--grey-dark);
            cursor: not-allowed;
            pointer-events: none;
        }

        :host([disabled][variant="ghost"]) {
            border: 1px solid var(--grey-light);
            background: transparent;
            color: var(--grey-dark);
            cursor: not-allowed;
            pointer-events: none;
        }

        :host([disabled][variant="link"]) {
            border: none
            background: treansparent;
            color: var(--grey-dark);
            cursor: not-allowed;
            pointer-events: none;
        }
    `;

    static template = html`
        <pl-icon size="[[size]]" iconset="[[iconset]]" icon="[[icon]]"></pl-icon>
    `;

    disabledObserver(disabled) {
        if (disabled) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }
}

customElements.define('pl-icon-button', PlIconButton);
