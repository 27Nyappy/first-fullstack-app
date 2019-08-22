import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Wild Cubs';

        return /*html*/`
        <header>
            <img id="logo" src='assets/logo.png' alt='Tiger paw print'>
            <h1>${title}</h1>
            <nav>
                <a href="./index.html">Home</a>
                <a href="./cub-list.html">Wild Cats</a>
                <a href="./cub-form.html">Add a New  Cat</a>
            </nav>
        </header>   
        `;
    }
}

export default Header;