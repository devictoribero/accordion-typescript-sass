import ElementNotFoundAccordionException from '../Exceptions/ElementNotFoundAccordionException';
import WrongFormatAccordionException from '../Exceptions/WrongFormatAccordionException';
import NodeGivenDoesNotExistAccordionException from "../Exceptions/NodeGivenDoesNotExistAccordionException";

export default class Accordion {
  static CLASS_TAB = 'Accordion-tab';
  static CLASS_TAB_CONTENT = 'Accordion-tabContent';
  static CLASS_TAB_EXPANDED = 'is-expanded';
  static CLASS_TAB_SELECTED = 'is-selected';
  static CLASS_UTILITY_NONE = 'u-none';

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

    this.subscribeTabs(this.tabs);
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

  destroy() {
    // TODO
    console.log('destroying');
  }

  private getTabs() {
    const htmlCollection = this.root.getElementsByClassName(Accordion.CLASS_TAB);

    let foo = [];
    foo.push(...htmlCollection);

    return foo;
  }

  private getTabsContent() {
    const htmlCollection = this.root.getElementsByClassName(Accordion.CLASS_TAB_CONTENT);

    let foo = [];
    foo.push(...htmlCollection);

    return foo;
  }

  private subscribeTabs(tabs : Array<any>) {
    tabs.map((tab: any, index: number) => {
      tab.addEventListener(
        'click',
        (event: MouseEvent) => this.handleClick(event, index)
      );
      tab.addEventListener(
        'keyup',
        (event: KeyboardEvent) => this.handleOnKeypUp(event, index)
      );
      tab.addEventListener(
        'focus',
        (event: FocusEvent) => this.handleFocus(event, index)
      );
      tab.addEventListener(
        'blur',
        (event: any) => this.handleBlur(event, index)
      );
    });
  }

  private handleClick(event: MouseEvent, index: number) {
    const tabContent = this.tabsContent[index];

    if (tabContent.classList.contains(Accordion.CLASS_TAB_EXPANDED)) {
      this.closeTab(index);
      return;
    }

    if (this.isAnyTabExpanded()) {
      this.getTabsContent().map((tab, index) => {
        this.closeTab(index);
      });
    }

    this.openTab(index);
  }

  private handleOnKeypUp(event: KeyboardEvent, index: number) {
    if (event.keyCode !== 13) { return; }

    const tabContent = this.tabsContent[index];
    if (tabContent.classList.contains(Accordion.CLASS_TAB_EXPANDED)) {
      this.closeTab(index);
      return;
    }

    if (this.isAnyTabExpanded()) {
      this.getTabsContent().map((tab, index) => {
        this.closeTab(index);
      });
    }

    this.openTab(index);
  }

  private handleFocus(event: FocusEvent, index: number) {
    const tab = this.tabs[index];

    tab.setAttribute('aria-selected', "true");
    tab.classList.add(Accordion.CLASS_TAB_SELECTED);
  }

  private handleBlur(event: FocusEvent, index: number) {
    const tab = this.tabs[index];

    tab.setAttribute('aria-selected', "false");
    tab.classList.remove(Accordion.CLASS_TAB_SELECTED);
  }


  private openTab(index: number) {
    const tab = this.tabs[index];
    const tabContent = this.tabsContent[index];

    tab.classList.add(Accordion.CLASS_TAB_EXPANDED);
    tabContent.classList.add(Accordion.CLASS_TAB_EXPANDED);
    tabContent.classList.remove(Accordion.CLASS_UTILITY_NONE);
    tabContent.setAttribute('aria-hidden', "false");
    tabContent.setAttribute('aria-expanded', "true");
  }

  private closeTab(index: number) {
    const tab = this.tabs[index];
    const tabContent = this.tabsContent[index];

    tab.classList.remove(Accordion.CLASS_TAB_EXPANDED);
    tabContent.classList.remove(Accordion.CLASS_TAB_EXPANDED);
    tabContent.classList.add(Accordion.CLASS_UTILITY_NONE);
    tabContent.setAttribute('aria-hidden', "true");
    tabContent.setAttribute('aria-expanded', "false");
  }

  private getExpandedTabs() {
    return this.tabs.filter(
      (tab) =>
        tab.classList.contains(Accordion.CLASS_TAB_EXPANDED)
    );
  }

  private isAnyTabExpanded() {
    return this.getExpandedTabs().length > 0;
  }
}