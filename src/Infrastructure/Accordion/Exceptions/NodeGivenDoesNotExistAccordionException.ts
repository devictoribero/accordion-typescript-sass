export default class NodeGivenDoesNotExistAccordionException extends Error {
  constructor() {
    super('Node given does not exist');
  }
}