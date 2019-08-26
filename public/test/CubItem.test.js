import CubItem from '../src/components/cubs/CubItem.js';

const test = QUnit.test;

QUnit.module('Renders cub');

test('renders cub', assert => {
   // arrange
    const cub = {
        name: 'Jaguar',
        size: 'Large',
        weight: 165,
        friendly: false,
        url: 'assets/jaguar.jpg',
        funFact: 'Jaguars have no defined breeding season and will mate any time of year.'
    };
    const expected = /*html*/`
        <li class="cub-item">
            <h2 class="name-title">${cub.name}</h2>
            <img class="cub-list-image" src="${cub.url}" alt="${cub.name} image">
            <p class="list-text">${cub.size}</p>
            <p class="list-text">Weight in Lbs: <span class="weight-span">${cub.weight}</span></p>
            <p class="list-text">Will I survive petting? <span class="pet-span">${cub.friendly}</span></p>
            <p class="list-text">${cub.funFact}.</p>
        </li>
    `;
   // act
    const props = { cub: cub };
    const cubItem = new CubItem(props);
    const html = cubItem.renderHTML();
   // assert
    assert.htmlEqual(html, expected);
});

