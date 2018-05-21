import ElementNotFoundAccordionException from '../Exceptions/ElementNotFoundAccordionException';
import WrongFormatAccordionException from '../Exceptions/WrongFormatAccordionException';
import NodeGivenDoesNotExistAccordionException from "../Exceptions/NodeGivenDoesNotExistAccordionException";

export default class Accordion {
  private CLASS_TAB = 'Accordion-tab';
  private CLASS_TAB_CONTENT = 'Accordion-tabContent';
  private CLASS_TAB_EXPANDED = 'is-expanded';
  private CLASS_TAB_SELECTED = 'is-selected';
  private CLASS_UTILITY_NONE = 'u-none';

  private root: any;
  private tabs: Array<any>;
  private tabsContent: Array<any>;

  constructor(rootNode: any) {
    if (!rootNode) {
      throw new NodeGivenDoesNotExistAccordionException();
    }

    this.root = rootNode;
    this.tabs = this.getTabs();
    this.tabsContent = this.getTabsContent();

    if (this.tabs.length !== this.tabsContent.length) {
      throw new WrongFormatAccordionException()
    }

    this.subscribeTabs();
  }

  static CreateFromElementId(elementId: string) {
    return new Accordion(document.getElementById(elementId));
  }

  static CreateFromElementsClassName(elementClasses: string) {
    const elements = document.getElementsByClassName(elementClasses);
    if (elements.length === 0) {
      throw new ElementNotFoundAccordionException();
    }

    let accordions = [];
    for (let i = 0, n = elements.length; i < n; i++) {
      accordions.push(new Accordion(elements[i]));
    }

    return accordions;
  }

  private getTabs() {
    const htmlCollection = this.root.getElementsByClassName(this.CLASS_TAB);

    let foo = [];
    foo.push(...htmlCollection);

    return foo;
  }

  private getTabsContent() {
    const htmlCollection = this.root.getElementsByClassName(this.CLASS_TAB_CONTENT);

    let foo = [];
    foo.push(...htmlCollection);

    return foo;
  }

  private subscribeTabs() {
    this.root.addEventListener(
      'click',
      (event: MouseEvent) => this.handleClick(event)
    );
    this.root.addEventListener(
      'keyup',
      (event: KeyboardEvent) => this.handleOnKeypUp(event)
    );
    this.root.addEventListener(
      'focus',
      (event: FocusEvent) => this.handleFocus(event)
    );
    this.root.addEventListener(
      'blur',
      (event: any) => this.handleBlur(event)
    );
  }

  private handleClick(event: MouseEvent) {
    const tab = event.target;
    if (!tab.matches(`.${this.CLASS_TAB}`)) {
      return;
    }

    const ariaControlledAtr= tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(ariaControlledAtr);

    if (tabContent.classList.contains(this.CLASS_TAB_EXPANDED)) {
      this.closeTab(tab.id);
      return;
    }

    if (this.isAnyTabExpanded()) {
      this.getTabs().map(tab => {
        this.closeTab(tab.id);
      });
    }

    this.openTab(tab.id);
  }

  private handleOnKeypUp(event: KeyboardEvent) {
    if (event.keyCode !== 13) { return; }

    const tab = event.target;
    const ariaControlledAtr = tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(ariaControlledAtr);

    if (tabContent.classList.contains(this.CLASS_TAB_EXPANDED)) {
      this.closeTab(tab.id);
      return;
    }

    if (this.isAnyTabExpanded()) {
      this.getTabs().map((tab, index) => {
        this.closeTab(tab.id);
      });
    }

    this.openTab(tab.id);
  }

  private handleFocus(event: FocusEvent) {
    const tab = event.target;

    tab.setAttribute('aria-selected', "true");
    tab.classList.add(this.CLASS_TAB_SELECTED);
  }

  private handleBlur(event: FocusEvent) {
    const tab = event.target;

    tab.setAttribute('aria-selected', "false");
    tab.classList.remove(this.CLASS_TAB_SELECTED);
  }


  private openTab(tabId: string) {
    const tab = document.getElementById(tabId);
    const ariaControlledAtr= tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(ariaControlledAtr);

    tab.classList.add(this.CLASS_TAB_EXPANDED);
    tabContent.classList.add(this.CLASS_TAB_EXPANDED);
    tabContent.classList.remove(this.CLASS_UTILITY_NONE);
    tabContent.setAttribute('aria-hidden', "false");
    tabContent.setAttribute('aria-expanded', "true");
  }

  private closeTab(tabId: string) {
    const tab = document.getElementById(tabId);
    const ariaControlledAtr= tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(ariaControlledAtr);

    tab.classList.remove(this.CLASS_TAB_EXPANDED);
    tabContent.classList.remove(this.CLASS_TAB_EXPANDED);
    tabContent.classList.add(this.CLASS_UTILITY_NONE);
    tabContent.setAttribute('aria-hidden', "true");
    tabContent.setAttribute('aria-expanded', "false");
  }

  private getExpandedTabs() {
    return this.tabs.filter(
      (tab) =>
        tab.classList.contains(this.CLASS_TAB_EXPANDED)
    );
  }

  private isAnyTabExpanded() {
    return this.getExpandedTabs().length > 0;
  }

  addTab(tabText: string, tabContentText: string, icon: string = null) {
    const tab = this.createTabStructure(tabText, icon);
    const tabContent = this.createTabContentStructure(tabContentText);

    this.tabs.push(tab);
    this.tabsContent.push(tabContent);

    this.root.appendChild(tab);
    this.root.appendChild(tabContent);
  }

  private createTabStructure(tabText: string, icon: string) {
    const tabToCreate = document.createElement('dt');
    const numExistingTabs = this.getTabs().length;

    tabToCreate.appendChild(document.createTextNode(tabText));
    tabToCreate.id = `accordion-section-header-${numExistingTabs + 1}`;
    tabToCreate.classList.add(this.CLASS_TAB);
    tabToCreate.setAttribute('role', 'tab');
    tabToCreate.setAttribute('aria-selected', 'false');
    tabToCreate.setAttribute(
      'aria-controls', `accordion-section-body-${numExistingTabs + 1}`
    );
    tabToCreate.setAttribute('tabindex', '0');

    return tabToCreate;
  }

  private createTabContentStructure(tabContentText: string) {
    const tabContentToCreate = document.createElement('dd');
    const paragraph = document.createElement('p');
    const numExistingTabs = this.getTabs().length;

    paragraph.appendChild(document.createTextNode(tabContentText));

    tabContentToCreate.id = `accordion-section-body-${numExistingTabs + 1}`;
    tabContentToCreate.classList.add(this.CLASS_TAB_CONTENT, this.CLASS_UTILITY_NONE);
    tabContentToCreate.setAttribute('role', 'tabpanel');
    tabContentToCreate.setAttribute('aria-hidden', 'true');
    tabContentToCreate.setAttribute('aria-expanded', 'false');
    tabContentToCreate.setAttribute(
      'aria-labelledby', `accordion-section-header-${numExistingTabs + 1}`
    );

    tabContentToCreate.appendChild(paragraph);

    return tabContentToCreate;
  }

}
