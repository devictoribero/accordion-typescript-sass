# accordion-typescript-sass
This is an accordion made with Vanilla Javascript, Ecmascript6, Typescript and sass preprocessor.
  
  
## Installation
To install the accordion you need yarn installed in your computer.
To install yarn run `sudo apt-get install yarn`

Once you have yarn installed run: `yarn install`

To run the project: `npm start`

## Previous concepts

- Ecmascript 6: http://es6-features.org/#Constants

- Typescript: https://www.typescriptlang.org/docs/home.html

- Sass Preprocessor: https://sass-lang.com/guide


## Usage
To use the accordion it has to be well formed.

- The parent node has to have to class  `class="Accordion"`

- The tabs have `class="Accordion-tab"`

- The content have `class="Accordion-tabContent"`

- The `id` is mandatory in the static elements

- The `aria-controls`, `aria-selected`, `aria-expanded`, `aria-labelledby` are *mandatory* 

- The `role` attribute is not mandatory but recommended


```html
<dl class="Accordion Accordion--hasShadow u-oh" role="tablist">
  <dt
    class="Accordion-tab"
    role="tab"
    aria-selected="false"
    id="accordion-section-header-1"
    aria-controls="accordion-section-body-1"
    tabindex="0"
  >
    <i class="Accordion-tabIcon fas fa-home"></i>
    Home
  </dt>
  <dd
    class="Accordion-tabContent u-none"
    role="tabpanel"
    aria-hidden="true"
    aria-expanded="false"
    id="accordion-section-body-1"
    aria-labelledby="accordion-section-header-1"
  >
    <p>Section 1 Content...</p>
  </dd>
</dl>
```
Minimal example:

```html
<dl class="Accordion u-oh">
  <dt
    class="Accordion-tab"
    aria-selected="false"
    id="accordion-section-header-1"
    aria-controls="accordion-section-body-1"
  >
    <i class="Accordion-tabIcon fas fa-home"></i>
    Home
  </dt>
  <dd
    class="Accordion-tabContent u-none"
    aria-expanded="false"
    id="accordion-section-body-1"
    aria-labelledby="accordion-section-header-1"
  >
    <p>Section 1 Content...</p>
  </dd>
</dl>
```

## Exceptions
- NodeGivenNotFound: Throws an error when the node given is not found or is null

- WrongFormatAccordionException: Throws an error when the accordion is not well formatted

- ElementNotFoundAccordionException: When the element given does not exist



