class Data {
    fetch() {
        return fetch('http://hevaweb.com/etablissements.php')
            .then((response) => response.json())
            .then((json) => this.data = json)
            .catch((ex) => console.error('parsing failed', ex));
    }

    getData() {
        return this.data;
    }
}
