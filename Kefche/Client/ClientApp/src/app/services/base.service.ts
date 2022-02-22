import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseService<T> {
	constructor(private httpClient: HttpClient, private path: string) {
	}

	create(data: T): Observable<any> {
		return this.httpClient.post(this.path, data);
	}

	edit(data: T, id: any): Observable<any> {
		return this.httpClient.put<T>(this.path + '/' + id, data);
	}

	all<TModel>(): Observable<TModel[]> {
		return this.httpClient.get<TModel[]>(this.path);
	}

	get<TModel>(id: any): Observable<TModel> {
		return this.httpClient.get<TModel>(this.path + '/' + id);
	}

	delete(id: any): Observable<any> {
		return this.httpClient.delete<T>(this.path + '/' + id);
	}

	editSingleOccurance(data: T, id: any): Observable<any> {
		return this.httpClient.put<T>(this.path + `/${id}/edit-occurrence`, data);
	}
}
