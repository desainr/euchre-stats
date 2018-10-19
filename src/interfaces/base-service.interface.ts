import {Observable} from "rxjs";

export interface IFirebaseService<T, E> {
  GetAll(): Observable<T[]>;
  Get(guid: string): Observable<T>;
  Save(entity: E): Observable<void>;
  Update(entity: E): Observable<void>;
  Delete(entity: E): Observable<void>;
}
