import { PlElement, html, css } from "polylib";
import "@plcmp/pl-icon";

class PlIconButton extends PlElement {
	static get properties() {
		return {
			iconset: { type: String },
            icon: { type: String},
			disabled: { type: Boolean, reflect: true },
            tabindex: { type: String, value: '0', reflectToAttribute: true}
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
                color: var(--grey-dark);
                user-select: none;
                cursor: pointer;
                outline: none;
                transition: background .3s ease-in-out;
            }

            :host(:hover),:host(:focus) {
                background: var(--grey-light);
                color: var(--black-base);
            }

            :host(:active) {
                background: var(--grey-base);
                color: var(--black-base);
            }

            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
                pointer-events: none;
            }
		`;
	}
	static get template() {
		return html`
            <pl-icon iconset="[[iconset]]" icon="[[icon]]"></pl-icon>
        `;
	}
}

customElements.define('pl-icon-button', PlIconButton);
