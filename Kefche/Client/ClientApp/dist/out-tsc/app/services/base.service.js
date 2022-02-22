export class BaseService {
    constructor(httpClient, path) {
        this.httpClient = httpClient;
        this.path = path;
    }
    create(data) {
        return this.httpClient.post(this.path, data);
    }
    edit(data, id) {
        return this.httpClient.put(this.path + '/' + id, data);
    }
    all() {
        return this.httpClient.get(this.path);
    }
    get(id) {
        return this.httpClient.get(this.path + '/' + id);
    }
    delete(id) {
        return this.httpClient.delete(this.path + '/' + id);
    }
    editSingleOccurance(data, id) {
        return this.httpClient.put(this.path + `/${id}/edit-occurrence`, data);
    }
}
//# sourceMappingURL=base.service.js.map