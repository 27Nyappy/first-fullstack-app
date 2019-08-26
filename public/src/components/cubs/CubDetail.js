import Component from '../Component.js';


class CubDetail extends Component {
    renderHTML() {
        const cub = this.props;
        
        return /*html*/`
        <div class="cub-item">
            <h2 class="name-title">${cub.name}</h2>
            <img class="cub-list-image" src="${cub.url}" alt="${cub.name} image">
            <p class="list-text">${cub.size}</p>
            <p class="list-text">Weight in Lbs: <span class="weight-span">${cub.weight}</span></p>
            <p class="list-text">Will I survive petting? <span class="pet-span">${cub.friendly}</span></p>
            <p class="list-text">${cub.fun_fact}.</p>
        </div>
        `;
    }
}

export default CubDetail;

