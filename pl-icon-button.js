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
        negative: { type: Boolean, reflectToAttribute: true },
        loading: { type: Boolean, reflectToAttribute: true},
        animated: { type: Boolean }
    }

    static css = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: var(--pl-base-size);
            height: var(--pl-base-size);
            background: var(--pl-primary-base);
            color: var(--pl-background-color);
            border: 1px solid var(--pl-primary-base);
            border-radius: var(--pl-border-radius);
            font: var(--pl-text-font);
            flex-shrink: 0;
            overflow: hidden;
            outline: none;
            user-select: none;
            cursor: pointer;
            transition: background .3s ease-in-out, border .3s ease-in-out, color .3s ease-in-out;;
        }

        :host([hidden]) {
            display: none;
        }

        :host([disabled]) {
            cursor: not-allowed;
            color: var(--pl-grey-dark);
        }

        :host([loading]){
            cursor: wait;
        }

        :host([variant=primary]:hover:not([loading],[disabled])),
        :host([variant=primary]:focus-visible:not([loading],[disabled])){
            background: var(--pl-primary-dark);
            border: 1px solid var(--pl-primary-darkest);
        }

        :host([variant=primary]:active:not([loading],[disabled])){
            background: var(--pl-primary-darkest);
            border: 1px solid var(--pl-primary-darkest);
        }
        
        :host([variant=secondary]){
            background: var(--pl-primary-lightest);
            color: var(--pl-primary-base);
            border: 1px solid var(--pl-primary-light);
        }

        :host([variant=secondary]:hover:not([loading],[disabled])),
        :host([variant=secondary]:focus-visible:not([loading],[disabled])){
            background: var(--pl-primary-light);
            color: var(--pl-primary-dark);
            border: 1px solid var(--pl-primary-light);
        }

        :host([variant=secondary]:active:not([loading],[disabled])){
            background: var(--pl-primary-light);
            color: var(--pl-primary-darkest);
            border: 1px solid var(--pl-primary-darkest);
        }

        /* ghost */
        :host([variant=ghost]){
            background: transparent;
            color: var(--pl-primary-base);
            border: 1px solid var(--pl-primary-base);
        }

        :host([variant=ghost]:hover:not([loading],[disabled])),
        :host([variant=ghost]:focus-visible:not([loading],[disabled])){
            background: var(--pl-primary-light);
            color: var(--pl-primary-dark);
            border: 1px solid var(--pl-primary-light);
        }

        :host([variant=ghost]:active:not([loading],[disabled])){
            background: var(--pl-primary-light);
            color: var(--pl-primary-dark);
            border: 1px solid var(--pl-primary-dark);
        }

        /* link */
        :host([variant=link]) {
            background: transparent;
            color: var(--pl-primary-base);
            border: 1px solid transparent;
        }

        :host([variant=link]:hover:not([loading],[disabled])),:host([variant=link]:focus-visible:not([loading],[disabled])){
            background: transparent;
            color: var(--pl-primary-dark);
            text-decoration: underline;
        }

        :host([variant=link]:hover:not([loading],[disabled])) ::slotted(*),
        :host([variant=link]:focus-visible:not([loading],[disabled])) ::slotted(*){
            filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
        }

        :host([variant=link]:active:not([loading],[disabled])){
            background: transparent;
            color:  var(--pl-primary-darkest);
            text-decoration: underline;
        }

        :host([variant=link]:active:not([loading],[disabled])) ::slotted(*){
            filter:none;
        }

        :host([variant="primary"][disabled]), :host([variant="secondary"][disabled]){
            background: var(--pl-grey-light);
            border: 1px solid var(--pl-grey-light);
            color: var(--pl-grey-dark);
        }

        :host([disabled][variant="ghost"]){
            background: transparent;
            border: 1px solid var(--pl-grey-light);
            color: var(--pl-grey-dark);
        }

        :host([disabled][variant="link"]){
            background: transparent;
            color: var(--pl-grey-dark);
            text-decoration: none;
        }

        :host([disabled][variant=link]) ::slotted(*){
            filter:none;
        }

        :host([negative]) {
            --pl-primary-base: var(--pl-negative-base);
            --pl-primary-light: var(--pl-negative-light);
            --pl-primary-lightest: var(--pl-negative-lightest);
            --pl-primary-dark: var(--pl-negative-dark);
            --pl-primary-darkest: var(--pl-negative-darkest);
        }
    `;

    static template = html`
        <pl-icon size="[[size]]" iconset="[[iconset]]" icon="[[icon]]" animated="[[animated]]"></pl-icon>
    `;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            if (this.disabled || this.loading) {
                e.stopPropagation();
            }
        }, { capture: true });
        
        this.tabIndex = this.tabIndex != -1 ? this.tabIndex : 0;
    }

    disabledObserver(disabled) {
        if (disabled) {
            this.lastTabIndex = this.tabIndex;
            this.tabIndex = -1;
        } else {
            this.tabIndex = this.lastTabIndex;
        }
    }
}

customElements.define('pl-icon-button', PlIconButton);
