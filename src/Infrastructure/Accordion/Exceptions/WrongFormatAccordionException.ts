export default class WrongFormatAccordionException extends Error {
  constructor() {
    super('Accordion has wrong format.');
  }
}