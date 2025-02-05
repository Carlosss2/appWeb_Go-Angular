import { Product } from "../product";
import { Observable } from 'rxjs';

export abstract class ProductGateway{

abstract create(product: Product): Observable<Product>;
abstract getAll(): Observable<Product[]>;
 
abstract update(product: Product): Observable<Product>;
abstract delete(id: number): Observable<void>;
}