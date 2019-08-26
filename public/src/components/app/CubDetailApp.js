import Component from '../Component.js';
import Header from './Header.js';
import QUERY from '../../services/QUERY.js';
import CubDetail from '../cubs/CubDetail.js';
import { getCub } from '../../services/cubs-api.js';

class CubDetailApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const params = QUERY.parse(window.location.search);
        const id = params.id;


        if(!id) {
            // window.location = 'cub-list.html';
            return;
        }

        getCub(id)
            .then(cub => {
                const cubDetail = new CubDetail(cub);
                main.appendChild(cubDetail.renderDOM());
            });

    }
    renderHTML() {
        const cub = this.props.cub;
        return /*html*/`
        <div>
            <main>
            </main>
            
        </div>
        `;
    }
}

export default CubDetailApp;