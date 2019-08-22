import Component from '../Component.js';
import Header from './Header.js';
import CubList from '../cubs/CubList.js';
import { getCubs } from '../../services/cubs-api.js';


class ListApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'Wild Cats' });
        dom.prepend(header.renderDOM());
        
        const list = new CubList({ cubs: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());
        console.log('hello')
        getCubs().then(cubs => {
            console.log(cubs)
            list.update({ cubs });
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

export default ListApp;