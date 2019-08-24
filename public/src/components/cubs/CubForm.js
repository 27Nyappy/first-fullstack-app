import Component from '../Component.js';
import { addCub } from '../../services/cubs-api.js';

class FormApp extends Component {
    onRender(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);
            const cub = {
                name: formData.get('name'),
                url: formData.get('image'),
                size: formData.get('size-id'),
                weight: +formData.get('weight'),
                friendly: formData.get('friendly') === 'on',
                funFact: formData.get('fun-fact')
            };
            addCub(cub)
                .then(() => {
                    // window.location = `cub-list.html`;
                })
                .catch(err => {
                    console.log('cub not saved', err);
                });
        });
    }
    renderHTML() {
        console.log(this.props);
        const sizes = this.props.sizes;
        console.log(sizes)
        const optionsList = sizes.map(size => {
            return /*html*/`<option value="${size.id}">${size.size}</option>`;
        });
        return /*html*/`
        <form class ="cub-form">
            <p>
                <label for="name">Name</label>
                <input id="name" name="name" required placeholder="Wild Cub">
            </p>
            <p>
                <label for="image">Image URL</label>
                <input type="url" id="image" name="image" required placeholder="Image URL">
            </p>
            <p>
                <label for="size">Size</label>
                <select id="size" name="size-id" required>
                    <option disabled selected>&lt;Select a size&gt;</option>
                    ${optionsList.join('')}
                </select>
            </p>
            <p>
                <label for="weight">Weight in pounds</label>
                <input type="number" id="weight" name="weight" required>
            </p>
            <p>
                <label for="friendly">Will I survive petting?</label>
                <input type="checkbox" name="friendly">
            </p>
            <p>
                <label for="fun-fact">Fun Fact</label>
                <textarea name="fun-fact" id="" cols="30" rows="10" required></textarea>
            </p>
            <p>
                <button>Add new cub</button>
            </p>
        </form>
        `;
    }
}

export default FormApp;