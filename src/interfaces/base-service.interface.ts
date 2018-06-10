import {Observable} from "rxjs/Observable";

export interface IFirebaseService<T> {
  GetAll(): Observable<T[]>;
  Get(id: number): Observable<T>;
  Save(entity: T): Observable<void>;
  Update(entity: T): Observable<void>;
  Delete(entity: T): Observable<void>;
}
