class TableSorter {
    constructor(table) {
        this.table = table;
        this.ordering = [
            {id: 2, direction: 'asc'},
            {id: 1, direction: 'asc'}
        ];

        this.sortTable();
        table.querySelector('thead').addEventListener('click', this.click.bind(this))
    }

    click(event) {
        let src = event.srcElement;
        if (src.tagName.toLowerCase() !== 'th')
            return;

        if (!event.shiftKey)
            this.ordering = [{
                id: src.cellIndex,
                direction: src.classList.contains('asc') ? 'desc' : 'asc'
            }];
        else {
            let order = Utils.find(this.ordering, (item) =>  item.id === src.cellIndex);

            if (order)
                order.direction = order.direction === 'asc' ? 'desc' : 'asc';
            else
                this.ordering.push({
                    id: src.cellIndex,
                    direction: 'asc'
                });
        }

        this.sortTable();
    }


    sortTable() {
        let thead = this.table.querySelector('thead');
        let tbody = this.table.querySelector('tbody');
        let rows = Utils.toArray(tbody.rows);
        let headers = Utils.toArray(thead.rows[0].cells);

        let current = Utils.toArray(thead.querySelectorAll('.desc, .asc'));

        current.filter((item) => !!item).forEach((item) => {
            item.classList.remove('desc');
            item.classList.remove('asc');
        });

        headers.filter((item) => !!item).forEach((header) => {
            header.classList.remove('desc');
            header.classList.remove('asc');
        });

        this.ordering.forEach((order) => {
            let index = order.id;
            let direction = order.direction || 'asc';

            let header = headers[index];
            header.classList.add(direction);
        });

        rows.sort((a, b) => {
            let i = 0;
            let result = 0;
            let order = this.ordering[i];
            let textA;
            let textB;
            let direction;

            while (order && result === 0) {
                direction = order.direction === 'desc' ? -1 : 1;
                textA = a.cells[order.id].textContent.trim();
                textB = b.cells[order.id].textContent.trim();

                if (Utils.isNumeric(textA) && Utils.isNumeric(textB)) {
                    result = direction * (parseFloat(textA) - parseFloat(textB));
                } else {
                    result = direction * textA.localeCompare(textB);
                }

                i += 1;
                order = this.ordering[i];
            }

            return result;
        }).forEach((row) => tbody.appendChild(row));
    }
}
