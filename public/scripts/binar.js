function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
//return new list cars with updated availableAt
static populateCars = (cars) => {
  return cars.map((car) => {
    const isPositive = getRandomInt(0, 1) === 1;
    const timeAt = new Date();
    const mutator = getRandomInt(1000000, 100000000);
    const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

    return {
      ...car,
      availableAt,
    };
  })
}

//to return list cars and check if already stored in localstorage before or not
//if not, it will fetch the data and save to localstorage
//if already, it will get data from localstorage
static async listCars(filterer) {
  let cars;
  let cachedCarsString = localStorage.getItem("CARS");

  if (!!cachedCarsString) {
    const cacheCars = JSON.parse(cachedCarsString);
    cars = this.populateCars(cacheCars);
  } else {
    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    const body = await response.json();
    cars = this.populateCars(body)

    //save data to localStorage
    localStorage.setItem("CARS", JSON.stringify(cars));
  }

  //to filter the list cars
  if (filterer instanceof Function) return cars.filter(filterer);

  return cars;
}
}
