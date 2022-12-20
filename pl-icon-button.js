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
            outline:none;
            display: block;
            user-select: none;
            --pl-icon-button-background: var(--primary-base);
            --pl-icon-button-color: var(--primary-lightest);
            --pl-icon-button-border: 1px solid var(--primary-base);
        }

        :host([hidden]) {
            display: none;
        }

        :host([disabled]) {
            cursor: not-allowed;
            --pl-icon-button-color: var(--grey-dark);
        }

        :host([disabled]) .wrapper{
            pointer-events: none;
        }

        /* negative */
        :host([negative]) {
            --primary-base: var(--negative-base);
            --primary-light: var(--negative-light);
            --primary-lightest: var(--negative-lightest);
            --primary-dark: var(--negative-dark);
            --primary-darkest: var(--negative-darkest);
        }

        :host .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--base-size-md);
            height: var(--base-size-md);
            box-sizing: border-box;
            border-radius: var(--border-radius);
            border: var(--pl-icon-button-border);
            cursor: pointer;
            background: var(--pl-icon-button-background);
            color: var(--pl-icon-button-color);
            transition: background .3s ease-in-out;
        }

        :host([variant=primary]) .wrapper:hover,
        :host([variant=primary]) .wrapper:focus{
            --pl-icon-button-background: var(--primary-dark);
        }

        :host([variant=primary]) .wrapper:active{
            --pl-icon-button-background: var(--primary-darkest);
        }
        
        :host([variant=secondary]) .wrapper{
            --pl-icon-button-background: var(--primary-lightest);
            --pl-icon-button-color: var(--primary-base);
            --pl-icon-button-border: 1px solid var(--primary-light);
        }

        :host([variant=secondary]) .wrapper:hover,
        :host([variant=secondary]) .wrapper:focus{
            --pl-icon-button-background: var(--primary-light);
            --pl-icon-button-color: var(--primary-dark);
            --pl-icon-button-border: 1px solid var(--primary-light);
        }

        :host([variant=secondary]) .wrapper:active{
            --pl-icon-button-background: var(--primary-light);
            --pl-icon-button-color: var(--primary-darkest);
            --pl-icon-button-border: 1px solid var(--primary-base);
        }

        /* ghost */
        :host([variant=ghost]) .wrapper{
            --pl-icon-button-background: transparent;
            --pl-icon-button-color: var(--primary-base);
            --pl-icon-button-border: 1px solid var(--primary-base);
        }

        :host([variant=ghost]) .wrapper:hover,
        :host([variant=ghost]) .wrapper:focus{
            --pl-icon-button-background: var(--primary-light);
            --pl-icon-button-color: var(--primary-dark);
            --pl-icon-button-border: 1px solid var(--primary-light);
        }

        :host([variant=ghost]) .wrapper:active{
            --pl-icon-button-background: var(--primary-light);
            --pl-icon-button-color: var(--primary-dark);
            --pl-icon-button-border: 1px solid var(--primary-dark);
        }

        /* link */
        :host([variant=link]) {
            --pl-icon-button-background: transparent;
            --pl-icon-button-color: var(--primary-base);
            --pl-icon-button-border: 1px solid transparent;
        }

        :host([variant=link]) .wrapper:hover,:host([variant=link]) .wrapper:focus{
            --pl-icon-button-background: transparent;
            --pl-icon-button-color: var(--primary-dark);
            transition: none;
            filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
        }

        :host([variant=link]) .wrapper:active{
            --pl-icon-button-background: transparent;
            --pl-icon-button-color:  var(--primary-darkest);
        }

        :host([variant="primary"][disabled]) .wrapper, :host([variant="secondary"][disabled]) .wrapper{
            --pl-icon-button-background: var(--grey-light);
            --pl-icon-button-border: 1px solid var(--grey-light);
            --pl-icon-button-color: var(--grey-dark);
        }

        :host([disabled][variant="ghost"]) .wrapper{
            --pl-icon-button-border: 1px solid var(--grey-light);
            --pl-icon-button-color: var(--grey-dark);
        }

        :host([disabled][variant="link"]) .wrapper{
            --pl-icon-button-color: var(--grey-dark);
        }
    `;

    static template = html`
        <div class="wrapper">
            <pl-icon size="[[size]]" iconset="[[iconset]]" icon="[[icon]]"></pl-icon>
        </div>
    `;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            if(this.disabled) {
                e.stopPropagation();
            }
        }, { capture: true })
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
