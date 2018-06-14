import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { RootObjectBusinessById } from "../models/businessById";

const data_KEY = "data_";

@Injectable()
export class FavoriteDataProvider {
  constructor(private storage: Storage) {
    console.log("Hello FavoriteDataProvider");
  }

  addFavoriteData(data: RootObjectBusinessById) {
    this.storage.set(this.getdataKey(data), JSON.stringify(data));
    console.log("4")
  }

  removeFavoriteData(data: RootObjectBusinessById) {
    this.storage.remove(this.getdataKey(data));
    console.log("3,")
  }

  isFavortieData(data: RootObjectBusinessById) {
    console.log("1,")
    return this.storage.get(this.getdataKey(data));
    
  }

  toogleFavoriteData(data: RootObjectBusinessById) {
    this.isFavortieData(data).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteData(data)
          : this.addFavoriteData(data)
    );
  }

  getdataKey(data: RootObjectBusinessById) {
    console.log("2,", data)
    return data_KEY + data.id.toString();
  }

  getFavoriteDatas(): Promise<RootObjectBusinessById[]> {
    return new Promise(resolve => {
      let results: RootObjectBusinessById[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(data_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data)))
            )
        );
      return resolve(results);
    });
  }
}
