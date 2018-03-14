import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database/database";
import {HttpClient,HttpHeaders} from "@angular/common/http";
@Injectable()
export class LugaresService{

  API_URL:String = 'https://square-1520381533872.firebaseio.com';
  ls:any = {};
  lugares:any = [
    {id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre:'Florería la Gardenia'},
    {id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre:'Donas la pasadita'},
    {id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre:'Veterinaria Huellitas Felices'},
    {id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre:'Sushi Suhiroll'},
    {id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre:'Hotel la Gracia'},
    {id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre:'Zapatería el Clavo'},
  ];
  constructor(private afDB:AngularFireDatabase, private http:HttpClient){}
  public getLugares(){
    //acceso via socket
    //return this.afDB.list('lugares/');
    if(window.localStorage){
      this.ls = localStorage.getItem('firebase:authUser:AIzaSyAPVuKucwSB72vsXGS8OQTh6Nvxr0wiMP0:[DEFAULT]')
      this.ls = JSON.parse(this.ls)
    }
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.get(`${this.API_URL}/lugares.json?auth=${this.ls.stsTokenManager.accessToken}`);

  }
  public buscarLugar(id){
    return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
  }
  public guardarLugar(lugar){
    //acceso via socket
    //this.afDB.database.ref(`lugares/${lugar.id}`).set(lugar);

    //acceso via http
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post(`${this.API_URL}/lugares.json`, lugar, {headers:headers});
  }
  public editarLugar(lugar){
    return this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }
  public obtenerGeoData(lugar){
    //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
    return this.http.get(`http://maps.google.com/maps/api/geocode/json?address=${lugar.calle},${lugar.ciudad},${lugar.pais}`);
  }
  public getLugar(id){
    return this.afDB.object(`lugares/${id}`);
  }
}
