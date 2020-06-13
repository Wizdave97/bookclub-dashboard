class SideBar {
    static state = false;
    constructor() {
        this.sideBar = document.getElementById('sidebar');
        this.sideBarToggler = document.getElementById('toggle-sidebar');
        this.overlay = document.getElementById('overlay');
        this.closeSideBar = document.getElementById('sidebar-close');
        this.addListeners();
    }

    addListeners() {
        this.sideBarToggler.addEventListener('click', this.toggleSideBar.bind(this));
        this.overlay.addEventListener('click', this.toggleSideBar.bind(this));
        this.closeSideBar.addEventListener('click', this.toggleSideBar.bind(this));
    }

    toggleSideBar() {
        switch (SideBar.state) {
            case true:
                this.sideBar.classList.remove('show-sidebar');
                this.overlay.classList.remove('show-overlay');
                break;
            default:
                this.sideBar.classList.add('show-sidebar');
                this.overlay.classList.add('show-overlay');
                break;
        }
        SideBar.state = !SideBar.state;
    }

}
class NavBar {
    static searchContainerState = false;
    constructor(){
        this.searchContainer = document.getElementById('search-container');
        this.searchClose = document.getElementById('search-close');
        this.searchOpen = document.getElementById('search-open');
        this.searchInput = document.getElementById('search-input');
        this.suggestions = document.getElementById('suggestions');
        this.addListeners();
        this.watchScreenSize();
    }
    addListeners() {
        matchMedia('(min-width: 1024px)').addListener(this.watchScreenSize.bind(this));
        this.searchClose.addEventListener('click', this.toggleSearchContainer.bind(this));
        this.searchOpen.addEventListener('click', this.toggleSearchContainer.bind(this));
        this.searchInput.onfocus = () => {
            this.suggestions.classList.add('show-suggestions');
        }
        this.searchInput.onblur = () => {
            this.suggestions.classList.remove('show-suggestions');
        }
    }
    watchScreenSize() {
        const mql = window.matchMedia('(min-width: 1024px)');
        if (mql.matches){
            this.searchInput.setAttribute('placeholder', 'Search books, authors, genres, etc.');
        }
        else {
            this.searchInput.setAttribute('placeholder', 'Search');
        }
    }
    toggleSearchContainer() {
        switch (NavBar.searchContainerState) {
            case true:
                this.searchContainer.classList.remove('search-container-show');
                break;
            default:
                this.searchContainer.classList.add('search-container-show');
                break;
        }
        NavBar.searchContainerState = !NavBar.searchContainerState;
    }
}
class Carousel {
    constructor() {
        this.openCarouselOverlay = document.getElementsByClassName('open-carousel-overlay');
        this.closeCarouselOverlay = document.getElementsByClassName('close-carousel-overlay');
        Array.from(this.openCarouselOverlay).map((el, index) => {
            el.addEventListener('click', this.show(index).bind(this));
        });
        Array.from(this.closeCarouselOverlay).map((el, index) => {
            el.addEventListener('click', this.close(index).bind(this));
        });
    }
    show = (index) => () => {
        this.openCarouselOverlay[index].parentElement.classList.add('show-carousel-overlay');
        this.openCarouselOverlay[index].style.display = 'none';
    }
    close = (index) => () => {
        this.openCarouselOverlay[index].parentElement.classList.remove('show-carousel-overlay');
        this.openCarouselOverlay[index].style.display = 'block'
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new SideBar();
    new NavBar();
    new Carousel();
})