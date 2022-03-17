import { PlElement, html, css } from "polylib";
import "@plcmp/pl-icon";

class PlIconButton extends PlElement {
    static get properties() {
        return {
            iconset: { type: String },
            size: { type: Number, value: '16' },
            variant: { type: String, reflectToAttribute: true, value: 'secondary' },
            icon: { type: String },
            disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
            tabindex: { type: String, value: '0', reflectToAttribute: true },
            hidden: { type: Boolean, reflectToAttribute: true },
            negative: { type: Boolean, reflectToAttribute: true }
        }
    }

    static get css() {
        return css`
			:host {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                box-sizing: border-box;
                border-radius: 4px;
                color: #FFFFFF;
                user-select: none;
                cursor: pointer;
                outline: none;
                flex-shrink: 0;
                transition: background .3s ease-in-out;
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
            }

            :host([variant=link]:active) {
                background: transparent;
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

            :host([disabled]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }
		`;
    }

    static get template() {
        return html`
            <pl-icon size="[[size]]" iconset="[[iconset]]" icon="[[icon]]"></pl-icon>
        `;
    }

    disabledObserver(disabled) {
        if (disabled) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }

}

customElements.define('pl-icon-button', PlIconButton);
