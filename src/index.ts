import './styles/main.sass';
import Accordion from "./Infrastructure/Accordion/Entity/Accordion";

const accordion = new Accordion(document.getElementById('example1'));
accordion.addTab('newtab', 'newcontent');
