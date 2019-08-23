import Component from '../Component.js';
import Header from './Header.js';
import CubForm from '../cubs/CubForm.js';
import { getSizes } from '../../services/cubs-api.js';

class CubFormApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'Add a cub' });
        dom.prepend(header.renderDOM());
        const main = dom.querySelector('main');
        getSizes()
            .then(sizes => {
                console.log(sizes);
                const cubForm = new CubForm({ sizes });
                main.appendChild(cubForm.renderDOM());
            });
    }
    renderHTML() {
        return /*html*/`
            <div>
                <main></main>
            </div>
        `;
    }
}

export default CubFormApp;
