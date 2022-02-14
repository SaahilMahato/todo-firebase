/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

import './components/app-view';
import './components/add-task-view';
import './components/task-view';
import './services/database';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyApp extends LitElement {
  /**
   * Gets style.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css``,
    ];
  }
  render() {
    return html`<main><app-view></app-view></main>`;
  }
}

customElements.define('my-app', MyApp);
