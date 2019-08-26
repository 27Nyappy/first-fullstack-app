import Component from '../Component.js';

class CubItem extends Component {
    renderHTML() {
        const cub = this.props.cub;
        console.log(cub)

        return /*html*/`
        <li class="cub-item">
            <a href="cub-detail.html?id=${cub.id}">
                <h2 class="name-title">${cub.name}</h2>
                <img class="cub-list-image" src="${cub.url}" alt="${cub.name} image">
                <p class="list-text">${cub.size}</p>
                <p class="list-text">Weight in Lbs: <span class="weight-span">${cub.weight}</span></p>
                <p class="list-text">Will I survive petting? <span class="pet-span">${cub.friendly}</span></p>
                <p class="list-text">${cub.funFact}.</p>
            </a>
        </li>
        `;
    }
}

export default CubItem;