import {Observable} from "rxjs";

export interface IFirebaseReadUpdate<T> {
  GetAll(): Observable<T[]>;
  Get(uid: string): Observable<T>;
  Update(entity: T): Observable<void>;
}
