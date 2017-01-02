class Views {
    constructor() {
        this.exo = document.querySelector('#exo');
        this.data = new Data();
        this.data.fetch().then(() => this.draw());
        new Actions(this, this.exo);
    }

    draw(value) {
        let template = `<tr><th scope=row">{id}</th><td>{nom}</td><td>{ville}</td><td>{sejours}</td></tr>`;
        let tbody = this.exo.querySelector('tbody');

        if (value == undefined)
            value = "";

        tbody.innerHTML = "";
        let nbsejours = 0;
        this.data.getData().map((item) => {
            tbody.innerHTML += template
                .replace('{id}', item.id)
                .replace('{nom}', item.nom)
                .replace('{ville}', item.ville)
                .replace('{sejours}', () => {
                    return Object.keys(item.sejours).map((key) => {
                        if (value == "" || (value == key)) {
                            nbsejours += item.sejours[key];
                            return `${key}: ${item.sejours[key]}`;
                        }
                    }).join("<br>");
                });

            if (nbsejours > 0)
                this.exo.querySelector('#count').innerHTML = `Il y a eu ${nbsejours}`
        });
    }
}
