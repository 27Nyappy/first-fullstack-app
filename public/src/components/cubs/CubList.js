import Component from '../Component.js';
import CubItem from './CubItem.js';

class CubList extends Component {

    onRender(dom) {
        const cubs = this.props.cubs;
        console.log(cubs);
        cubs.forEach(cub => {
            const props = { cub: cub };
            const cubItem = new CubItem(props);
            const cubItemDOM = cubItem.renderDOM();
            dom.appendChild(cubItemDOM);
        });
    }
    renderHTML() {
        return /*html*/`
            <ul id="cub-list"></ul>
        `;
    }
}

export default CubList;