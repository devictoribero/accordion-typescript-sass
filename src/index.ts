import './styles/main.sass';
import Accordion from "./Infrastructure/Accordion/Entity/Accordion";

const accordion = new Accordion(document.getElementById('example1'));


const example1 = document.getElementById('example1-wrapper');
const formOpeners = example1.getElementsByClassName('Button-openForm');

// Open the FORM
for (let i = 0, n = formOpeners.length; i < n; i++) {
  formOpeners[i].addEventListener('click', event => {
    const form = example1.getElementsByClassName('AddSectionForm')[0];
    form.classList.remove('u-none');
  });
}

// Submit the FORM
const form = example1.getElementsByClassName('AddSectionForm')[0];
form.addEventListener('submit', event => {
  event.preventDefault();
  const tabText = form.getElementsByClassName(
    'AddSectionForm-input--tab'
  )[0].value;
  const tabContextText = form.getElementsByClassName(
    'AddSectionForm-input--tabcontext'
  )[0].value;

  accordion.addTab(tabText, tabContextText);
  form.classList.add('u-none');

});

// Cancel the FORM
const cancelFormButtons = example1.getElementsByClassName(
  'AddSectionForm-actionBarButton--cancel'
);
for (let i = 0, n = formOpeners.length; i < n; i++) {
  cancelFormButtons[i].addEventListener('click', event => {
    const form = example1.getElementsByClassName('AddSectionForm')[0];
    form.classList.add('u-none');
  });
}