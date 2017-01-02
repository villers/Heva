class Actions {
    constructor(view, dom) {
        this.view = view;
        this.dom = dom;

        this.initTableSorter();
        this.initDate();
    }

    initTableSorter() {
        new TableSorter(this.dom.querySelector('table'));

    }

    initDate() {
        this.dom.querySelector("#dates").addEventListener('change', this.changeDate.bind(this));
    }

    changeDate(item) {
        this.view.draw(item.target.value);
    }
}
