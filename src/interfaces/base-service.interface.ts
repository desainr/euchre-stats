import {Observable} from "rxjs";

export interface IFirebaseService<T> {
  GetAll(): Observable<T[]>;
  Get(guid: string): Observable<T>;
  Save(entity: T): Observable<void>;
  Update(entity: T): Observable<void>;
  Delete(entity: T): Observable<void>;
}
